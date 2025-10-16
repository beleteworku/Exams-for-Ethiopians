import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  total: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  onReview: () => void;
  onNewQuiz: () => void;
}

export const QuizResults = ({
  score,
  total,
  correctAnswers,
  wrongAnswers,
  skippedAnswers,
  onReview,
  onNewQuiz
}: QuizResultsProps) => {
  const accuracy = total > 0 ? Math.round((correctAnswers / total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        You did it! Quiz complete.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Score</div>
          <div className="text-4xl font-bold text-foreground">
            {score}/{total}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Accuracy</div>
          <div className="text-4xl font-bold text-foreground">
            {accuracy}%
          </div>
        </Card>

        <Card className="p-6 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Right</span>
            <span className="font-semibold text-foreground">{correctAnswers}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Wrong</span>
            <span className="font-semibold text-foreground">{wrongAnswers}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Skipped</span>
            <span className="font-semibold text-foreground">{skippedAnswers}</span>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">
              Strengths and growth areas
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get a summary of your key strengths and discover areas where you can focus your studies.
            </p>
            <Button onClick={onReview}>
              Analyse my performance
            </Button>
          </div>
        </div>
      </Card>

      <div className="pt-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Keep learning</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Flashcards</h3>
                <p className="text-sm text-muted-foreground">
                  Create a complete set of flashcards from all your quiz material. Good for quick review and mastering key concepts.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Study guide</h3>
                <p className="text-sm text-muted-foreground">
                  Generate a comprehensive study guide based on the materials that you are studying. Good for in-depth review.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onReview}>
            Review quiz
          </Button>
          <Button onClick={onNewQuiz}>
            More questions
          </Button>
        </div>
      </div>
    </div>
  );
};
