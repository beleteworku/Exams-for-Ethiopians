import { useTranslation } from "react-i18next";
import { CheckCircle2, BookOpen, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <Badge variant="secondary" className="w-fit">
              <CheckCircle2 className="h-3 w-3 mr-2" />
              {t('trustedBy')}
            </Badge>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {t('heroTitle')} <br />
                {t('heroTitleExam')} <span className="text-primary">{t('heroTitleWith')}</span><br />
                <span className="text-primary">{t('heroTitleConfidence')}</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t('heroDescription')}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border rounded-lg p-4 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{t('questionBank')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('questionBankDesc')}
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <h3 className="font-semibold">{t('performanceAnalytics')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('performanceAnalyticsDesc')}
                </p>
              </div>

              <div className="bg-card border rounded-lg p-4 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold">{t('expertCourses')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('expertCoursesDesc')}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                {t('exploreExams')}
              </Button>
              <Button size="lg" variant="outline">
                {t('getStartedFree')}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t('freeToStart')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t('noCreditCard')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t('cancelAnytime')}
              </div>
            </div>
          </div>

          {/* Right Content - Image/Stats */}
          <div className="flex-1 relative">
            <div className="relative rounded-2xl overflow-hidden bg-card border shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-primary/10 mb-4">
                    <BookOpen className="h-16 w-16 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">{t('passRate')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-card border rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-success">50K+</div>
                <div className="text-sm text-muted-foreground">{t('questions')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
