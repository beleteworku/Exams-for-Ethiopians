import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ClipboardCheck, TrendingUp, Timer, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Home = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [fullName, setFullName] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        // @ts-ignore - Type will be auto-generated
        const { data, error } = await supabase.from('profiles')
          .select('full_name')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          // @ts-ignore - Type will be auto-generated
          setFullName(data.full_name || '');
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header with Settings and Sign Out */}
        <div className="flex justify-end gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/settings')}
            className="gap-2"
          >
            <SettingsIcon className="w-4 h-4" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={signOut}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Welcome Message */}
        {fullName && (
          <div className="text-center mb-8 animate-fade-in">
            <div className="bg-card p-6 rounded-xl shadow-md border border-border">
              <p className="text-lg text-foreground font-semibold">
                Account created successfully!
              </p>
              <p className="text-xl text-foreground mt-2">
                Welcome to the platform, <span className="text-primary font-bold">{fullName}</span>!
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Interactive Learning Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Start learning with practice mode and switch to exam mode anytime
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Practice Mode Card */}
          <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-scale-in">
            <div className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Practice Mode (Default)
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Learn at your own pace with instant feedback, hints, and detailed explanations for every question.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <span className="text-sm text-foreground">Instant feedback on answers</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <span className="text-sm text-foreground">Helpful hints available</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <span className="text-sm text-foreground">Detailed explanations</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <span className="text-sm text-foreground">Navigate back and forth</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/quiz')}
              >
                Start Learning
                <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Exam Mode Card */}
          <Card className="group hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 animate-scale-in">
            <div className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ClipboardCheck className="w-8 h-8 text-accent" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Exam Mode
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Test your knowledge in a real exam environment. Switch to this mode anytime using the toggle button.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-sm text-foreground">Realistic exam conditions</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-sm text-foreground">No hints during quiz</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-sm text-foreground">Feedback at the end</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-sm text-foreground">Performance analytics</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/quiz')}
              >
                Start Learning
                <Timer className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-secondary/50">
            <p className="text-sm text-muted-foreground max-w-2xl">
              💡 <span className="font-semibold text-foreground">Tip:</span> The quiz starts in Practice Mode by default. 
              Use the toggle button at the top to switch between Practice and Exam modes anytime during your learning session.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
