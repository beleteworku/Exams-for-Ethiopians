import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizProgress } from '@/components/QuizProgress';
import { QuizQuestion, Question } from '@/components/QuizQuestion';
import { QuizResults } from '@/components/QuizResults';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ClipboardCheck, Timer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample quiz data
const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'A projectile is launched with an initial speed of $20$ m/s at an angle of $30°$ above the horizontal from a flat surface. Assuming the acceleration due to gravity is $g = 10$ m/s$^2$ and neglecting air resistance, what is the horizontal range of the projectile?',
    answers: [
      { id: 'A', text: '$10\\sqrt{3}$ m', isCorrect: false },
      { id: 'B', text: '$30$ m', isCorrect: false },
      { 
        id: 'C', 
        text: '$20\\sqrt{3}$ m', 
        isCorrect: true,
        explanation: 'The horizontal range is calculated using the formula $R = \\frac{v_0^2 \\sin(2\\theta)}{g}$. Substituting the given values yields $R = \\frac{(20)^2 \\sin(60°)}{10} = 20\\sqrt{3}$ m.'
      },
      { id: 'D', text: '$40$ m', isCorrect: false },
    ],
    hint: 'Use the projectile range formula: $R = \\frac{v_0^2 \\sin(2\\theta)}{g}$. Remember that $\\sin(60°) = \\frac{\\sqrt{3}}{2}$.',
  },
  {
    id: '2',
    text: 'A rock is launched horizontally from the edge of a cliff of height $H = 45$ m with an initial speed of $v_0 = 20$ m/s. Neglecting air resistance and using the acceleration due to gravity as $g = 10$ m/s$^2$, what is the magnitude of the rock\'s velocity (in m/s) just before it strikes the ground?',
    answers: [
      { id: 'A', text: '$\\sqrt{400}$ m/s', isCorrect: false },
      { 
        id: 'B', 
        text: '$40$ m/s', 
        isCorrect: false,
        explanation: 'This value would be the sum of the magnitudes of the final horizontal and vertical velocities, which is not the correct way to find the magnitude of the resultant vector.'
      },
      { 
        id: 'C', 
        text: '$36.06$ m/s', 
        isCorrect: true,
        explanation: 'The time of flight is $3$ s, leading to a final vertical velocity of $30$ m/s. The magnitude is then $\\sqrt{(20)^2 + (30)^2} = \\sqrt{1300}$ m/s $\\approx 36.06$ m/s.'
      },
      { id: 'D', text: '$50$ m/s', isCorrect: false },
    ],
    hint: 'Remember that the horizontal and vertical motions are independent, and the final velocity is a vector sum of its horizontal and vertical components.',
  },
  {
    id: '3',
    text: 'What is the derivative of $f(x) = x^3 + 2x^2 - 5x + 3$?',
    answers: [
      { id: 'A', text: '$3x^2 + 4x - 5$', isCorrect: true, explanation: 'Using the power rule, the derivative is $3x^2 + 4x - 5$.' },
      { id: 'B', text: '$3x^2 + 2x - 5$', isCorrect: false },
      { id: 'C', text: '$x^3 + 4x - 5$', isCorrect: false },
      { id: 'D', text: '$3x^2 + 4x + 3$', isCorrect: false },
    ],
    hint: 'Apply the power rule: $\\frac{d}{dx}[x^n] = nx^{n-1}$. Don\'t forget that the derivative of a constant is zero.',
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  const isPracticeMode = mode === 'practice';

  // Countdown timer for exam mode
  useEffect(() => {
    if (!isPracticeMode && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            toast({
              title: "Time's up!",
              description: "Your exam has ended.",
              variant: "destructive",
            });
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPracticeMode, showResults, timeRemaining, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleModeToggle = () => {
    const newMode = isPracticeMode ? 'exam' : 'practice';
    setMode(newMode);
    
    // Reset feedback and timer when switching modes
    if (newMode === 'exam') {
      setShowFeedback(false);
      setTimeRemaining(1800); // Reset timer
    } else if (newMode === 'practice' && answers[currentQuestion]) {
      setShowFeedback(true);
    }
  };

  const handleAnswer = (answerId: string) => {
    setAnswers({ ...answers, [currentQuestion]: answerId });
    if (isPracticeMode) {
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(isPracticeMode && !!answers[currentQuestion + 1]);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(isPracticeMode && !!answers[currentQuestion - 1]);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    sampleQuestions.forEach((question, index) => {
      const selectedAnswer = answers[index];
      if (!selectedAnswer) {
        skipped++;
      } else {
        const answer = question.answers.find(a => a.id === selectedAnswer);
        if (answer?.isCorrect) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    return { correct, wrong, skipped };
  };

  const handleReview = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setShowFeedback(true);
  };

  const handleNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setShowFeedback(false);
  };

  if (showResults) {
    const { correct, wrong, skipped } = calculateResults();
    return (
      <div className="min-h-screen bg-background p-6 md:p-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <QuizResults
          score={correct}
          total={sampleQuestions.length}
          correctAnswers={correct}
          wrongAnswers={wrong}
          skippedAnswers={skipped}
          onReview={handleReview}
          onNewQuiz={handleNewQuiz}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center gap-3">
            {/* Countdown Timer (Exam Mode Only) */}
            {!isPracticeMode && (
              <Card className="flex items-center gap-2 px-4 py-2 bg-secondary/50 animate-fade-in">
                <Timer className={`w-4 h-4 ${timeRemaining < 300 ? 'text-destructive' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-mono font-medium ${timeRemaining < 300 ? 'text-destructive' : 'text-foreground'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </Card>
            )}
            
            {/* Single Mode Toggle Button */}
            <Button
              onClick={handleModeToggle}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {isPracticeMode ? (
                <>
                  <ClipboardCheck className="w-4 h-4" />
                  Exam
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  Practice
                </>
              )}
            </Button>
          </div>
        </div>

        <QuizProgress 
          current={currentQuestion + 1} 
          total={sampleQuestions.length} 
        />

        <QuizQuestion
          question={sampleQuestions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={sampleQuestions.length}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestion]}
          showFeedback={isPracticeMode && showFeedback}
          showHint={isPracticeMode}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={currentQuestion > 0}
          canGoNext={isPracticeMode ? true : !!answers[currentQuestion]}
          isLastQuestion={currentQuestion === sampleQuestions.length - 1}
        />
      </div>
    </div>
  );
};

export default Quiz;
