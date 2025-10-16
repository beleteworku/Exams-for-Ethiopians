import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MathRenderer } from './MathRenderer';
import { ChevronDown, ChevronUp, Lightbulb, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  hint?: string;
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerId: string) => void;
  selectedAnswer?: string;
  showFeedback?: boolean;
  showHint?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  isLastQuestion?: boolean;
}

export const QuizQuestion = ({ 
  question,
  questionNumber,
  totalQuestions,
  onAnswer, 
  selectedAnswer,
  showFeedback = false,
  showHint = true,
  onNext,
  onBack,
  canGoBack = false,
  canGoNext = false,
  isLastQuestion = false
}: QuizQuestionProps) => {
  const [hintExpanded, setHintExpanded] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [deepExplanation, setDeepExplanation] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [deepLoading, setDeepLoading] = useState(false);
  const { toast } = useToast();

  const getAnswerState = (answerId: string) => {
    if (!showFeedback || !selectedAnswer) return 'default';
    const answer = question.answers.find(a => a.id === answerId);
    if (answerId === selectedAnswer) {
      return answer?.isCorrect ? 'correct' : 'incorrect';
    }
    return 'default';
  };

  const handleAiExplanation = async () => {
    if (!selectedAnswer || !showFeedback) return;
    
    setAiLoading(true);
    try {
      const selectedAnswerData = question.answers.find(a => a.id === selectedAnswer);
      const correctAnswerData = question.answers.find(a => a.isCorrect);
      
      const { data, error } = await supabase.functions.invoke('generate-explanation', {
        body: {
          question: question.text,
          userAnswer: selectedAnswerData?.text,
          correctAnswer: correctAnswerData?.text,
          isCorrect: selectedAnswerData?.isCorrect,
          depth: 'short',
        },
      });

      if (error) throw error;
      
      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setAiExplanation(data.explanation);
    } catch (error) {
      console.error('Error getting AI explanation:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleDeepExplanation = async () => {
    if (!selectedAnswer || !showFeedback) return;
    
    setDeepLoading(true);
    try {
      const selectedAnswerData = question.answers.find(a => a.id === selectedAnswer);
      const correctAnswerData = question.answers.find(a => a.isCorrect);
      
      const { data, error } = await supabase.functions.invoke('generate-explanation', {
        body: {
          question: question.text,
          userAnswer: selectedAnswerData?.text,
          correctAnswer: correctAnswerData?.text,
          isCorrect: selectedAnswerData?.isCorrect,
          depth: 'deep',
        },
      });

      if (error) throw error;
      
      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setDeepExplanation(data.explanation);
    } catch (error) {
      console.error('Error getting deep explanation:', error);
      toast({
        title: "Error",
        description: "Failed to generate deep explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeepLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-lg leading-relaxed text-foreground">
        <MathRenderer content={question.text} />
      </div>

      <div className="space-y-3">
        {question.answers.map((answer) => {
          const state = getAnswerState(answer.id);
          const isSelected = selectedAnswer === answer.id;
          
          return (
            <Card
              key={answer.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-300 hover-scale",
                "hover:shadow-lg hover:shadow-primary/10",
                state === 'default' && "hover:border-primary/50",
                state === 'correct' && "border-success border-2 bg-gradient-to-br from-success/10 to-success/5 shadow-lg shadow-success/10 animate-scale-in",
                state === 'incorrect' && "border-destructive border-2 bg-gradient-to-br from-destructive/10 to-destructive/5 shadow-lg shadow-destructive/10 animate-scale-in",
                isSelected && state === 'default' && "border-primary border-2 bg-primary/5"
              )}
              onClick={() => !showFeedback && onAnswer(answer.id)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm transition-colors duration-300",
                  state === 'correct' && "bg-success/20 text-success",
                  state === 'incorrect' && "bg-destructive/20 text-destructive",
                  state === 'default' && isSelected && "bg-primary/20 text-primary",
                  state === 'default' && !isSelected && "bg-muted text-muted-foreground"
                )}>
                  {state === 'correct' ? '✓' : state === 'incorrect' ? '✗' : answer.id}
                </div>
                <div className="flex-1">
                  <div className="text-foreground">
                    <MathRenderer content={answer.text} inline />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {showHint && question.hint && (
        <div className="mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHintExpanded(!hintExpanded)}
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Show hint
            {hintExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </Button>
          
          {hintExpanded && (
            <Card className="mt-3 p-4 bg-gradient-to-br from-secondary/80 to-secondary/40 border-muted animate-fade-in backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-foreground">
                    <MathRenderer content={question.hint} />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setHintExpanded(false)}
                  className="h-6 w-6 p-0 hover:bg-destructive/20 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {showFeedback && selectedAnswer && (
        <div className="mt-6 space-y-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAiExplanation}
            disabled={aiLoading}
            className="text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {aiLoading ? 'Generating...' : 'Get AI explanation'}
          </Button>
          
          {aiExplanation && (
            <Card className="p-5 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 animate-fade-in shadow-lg shadow-primary/5">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="font-semibold text-sm bg-gradient-to-r from-success to-success/80 bg-clip-text text-transparent">
                        ✓ Correct Answer: {question.answers.find(a => a.isCorrect)?.id}
                      </div>
                      <div className="text-base font-medium text-foreground/90">
                        <MathRenderer content={question.answers.find(a => a.isCorrect)?.text || ''} />
                      </div>
                      <div className="text-sm text-foreground/80 leading-relaxed">
                        <MathRenderer content={aiExplanation} />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAiExplanation(null);
                      setDeepExplanation(null);
                    }}
                    className="h-6 w-6 p-0 hover:bg-destructive/20 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                {!deepExplanation && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeepExplanation}
                    disabled={deepLoading}
                    className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    {deepLoading ? 'Generating detailed explanation...' : 'Explain in depth'}
                  </Button>
                )}
                
                {deepExplanation && (
                  <div className="mt-4 pt-4 border-t border-primary/20 animate-fade-in">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                      <div className="text-sm font-semibold text-primary">Detailed Explanation</div>
                    </div>
                    <div className="text-sm text-foreground/80 leading-relaxed pl-3">
                      <MathRenderer content={deepExplanation} />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={!canGoBack}
          className={cn(!canGoBack && "invisible")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canGoNext}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
          {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};
