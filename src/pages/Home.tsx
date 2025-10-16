import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "@/components/ProfileDropdown";
import { LanguageThemeToggle } from "@/components/LanguageThemeToggle";
import { HeroSection } from "@/components/HeroSection";
import { SubjectCard } from "@/components/SubjectCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Brain, FlaskConical, Leaf, Scale, DollarSign, Languages, Globe, Clock, BookOpen, Atom } from "lucide-react";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const subjects = [
    { id: 'aptitude', title: t('aptitudeTest'), description: t('aptitudeTestDesc'), icon: Brain },
    { id: 'biology', title: t('biology'), description: t('biologyDesc'), icon: Leaf },
    { id: 'chemistry', title: t('chemistry'), description: t('chemistryDesc'), icon: FlaskConical },
    { id: 'civics', title: t('civicsEthics'), description: t('civicsEthicsDesc'), icon: Scale },
    { id: 'economics', title: t('economics'), description: t('economicsDesc'), icon: DollarSign },
    { id: 'english', title: t('english'), description: t('englishDesc'), icon: Languages },
    { id: 'geography', title: t('geography'), description: t('geographyDesc'), icon: Globe },
    { id: 'history', title: t('history'), description: t('historyDesc'), icon: Clock },
    { id: 'math-natural', title: t('mathNatural'), description: t('mathNaturalDesc'), icon: BookOpen },
    { id: 'math-social', title: t('mathSocial'), description: t('mathSocialDesc'), icon: BookOpen },
    { id: 'physics', title: t('physics'), description: t('physicsDesc'), icon: Atom },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">zeha.com</h1>
          <div className="flex items-center gap-6">
            <Button variant="ghost">{t('home')}</Button>
            <Button variant="ghost">{t('exam')}</Button>
            <div className="flex items-center gap-2">
              <LanguageThemeToggle />
              <Button variant="ghost">{t('logIn')}</Button>
              <Button>{t('signUp')}</Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Subjects Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">{t('universityEntranceExams')}</h2>
          <p className="text-muted-foreground">{t('selectSubject')}</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('searchSubjects')}
              className="pl-10"
            />
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              description={subject.description}
              icon={subject.icon}
              onClick={() => navigate(`/quiz?subject=${subject.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
