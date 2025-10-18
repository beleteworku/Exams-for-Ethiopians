import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { SubjectCard } from "@/components/SubjectCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Brain, FlaskConical, Leaf, Scale, DollarSign, Languages, Globe, Clock, BookOpen, Atom, Home } from "lucide-react";
import { LanguageThemeToggle } from "@/components/LanguageThemeToggle";
import ProfileDropdown from "@/components/ProfileDropdown";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ExamType = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { examType } = useParams<{ examType: string }>();

  // Define subjects for each exam type
  const allSubjects = {
    entrance: [
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
    ],
    exit: [
      { id: 'biology', title: t('biology'), description: t('biologyDesc'), icon: Leaf },
      { id: 'chemistry', title: t('chemistry'), description: t('chemistryDesc'), icon: FlaskConical },
      { id: 'civics', title: t('civicsEthics'), description: t('civicsEthicsDesc'), icon: Scale },
      { id: 'economics', title: t('economics'), description: t('economicsDesc'), icon: DollarSign },
      { id: 'english', title: t('english'), description: t('englishDesc'), icon: Languages },
      { id: 'geography', title: t('geography'), description: t('geographyDesc'), icon: Globe },
      { id: 'history', title: t('history'), description: t('historyDesc'), icon: Clock },
      { id: 'math-natural', title: t('mathNatural'), description: t('mathNaturalDesc'), icon: BookOpen },
      { id: 'physics', title: t('physics'), description: t('physicsDesc'), icon: Atom },
    ],
    ngat: [
      { id: 'aptitude', title: t('aptitudeTest'), description: t('aptitudeTestDesc'), icon: Brain },
      { id: 'english', title: t('english'), description: t('englishDesc'), icon: Languages },
      { id: 'math-natural', title: t('mathNatural'), description: t('mathNaturalDesc'), icon: BookOpen },
    ],
    'work-exam': [
      { id: 'aptitude', title: t('aptitudeTest'), description: t('aptitudeTestDesc'), icon: Brain },
      { id: 'civics', title: t('civicsEthics'), description: t('civicsEthicsDesc'), icon: Scale },
      { id: 'english', title: t('english'), description: t('englishDesc'), icon: Languages },
    ],
    'grade-6': [
      { id: 'english', title: t('english'), description: t('englishDesc'), icon: Languages },
      { id: 'math-natural', title: t('mathNatural'), description: t('mathNaturalDesc'), icon: BookOpen },
      { id: 'civics', title: t('civicsEthics'), description: t('civicsEthicsDesc'), icon: Scale },
      { id: 'history', title: t('history'), description: t('historyDesc'), icon: Clock },
      { id: 'geography', title: t('geography'), description: t('geographyDesc'), icon: Globe },
    ],
    'grade-8': [
      { id: 'biology', title: t('biology'), description: t('biologyDesc'), icon: Leaf },
      { id: 'chemistry', title: t('chemistry'), description: t('chemistryDesc'), icon: FlaskConical },
      { id: 'english', title: t('english'), description: t('englishDesc'), icon: Languages },
      { id: 'math-natural', title: t('mathNatural'), description: t('mathNaturalDesc'), icon: BookOpen },
      { id: 'physics', title: t('physics'), description: t('physicsDesc'), icon: Atom },
      { id: 'civics', title: t('civicsEthics'), description: t('civicsEthicsDesc'), icon: Scale },
      { id: 'history', title: t('history'), description: t('historyDesc'), icon: Clock },
      { id: 'geography', title: t('geography'), description: t('geographyDesc'), icon: Globe },
    ],
  };

  const examTypeKey = examType as keyof typeof allSubjects;
  const subjects = allSubjects[examTypeKey] || allSubjects.entrance;

  const examTitles: Record<string, string> = {
    entrance: t('universityEntranceExams'),
    exit: t('exitExam'),
    ngat: t('ngat'),
    'work-exam': t('workExam'),
    'grade-6': t('grade6'),
    'grade-8': t('grade8'),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>zeha.com</h1>
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate('/')}>{t('home')}</Button>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 bg-transparent hover:bg-accent">
                    {t('exam')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/exam/entrance">
                            {t('entrance')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/exam/exit">
                            {t('exit')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/exam/ngat">
                            {t('ngat')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/exam/work-exam">
                            {t('workExam')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/exam/grade-6">
                            {t('grade6')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/exam/grade-8">
                            {t('grade8')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-2">
              <LanguageThemeToggle />
              <Button variant="ghost" onClick={() => navigate('/auth')}>{t('logIn')}</Button>
              <Button onClick={() => navigate('/auth')}>{t('signUp')}</Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4" />
          <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => navigate('/')}>
            {t('home')}
          </Button>
          <span>/</span>
          <span className="text-foreground font-medium">{examTitles[examTypeKey]}</span>
        </div>
      </div>

      {/* Exam Subjects Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">{examTitles[examTypeKey]}</h1>
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
              onClick={() => navigate(`/quiz?subject=${subject.id}&exam=${examType}`)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExamType;
