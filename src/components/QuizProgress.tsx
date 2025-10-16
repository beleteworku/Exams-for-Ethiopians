interface QuizProgressProps {
  current: number;
  total: number;
}

export const QuizProgress = ({ current, total }: QuizProgressProps) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="ml-4 text-sm font-medium text-foreground">
          {current}/{total}
        </span>
      </div>
    </div>
  );
};
