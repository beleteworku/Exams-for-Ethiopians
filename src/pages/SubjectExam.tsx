import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, Calendar } from "lucide-react";
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
import { useState } from "react";

const SubjectExam = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { examType } = useParams<{ examType: string }>();
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject');
  const subjectName = searchParams.get('name');
  
  const [searchQuery, setSearchQuery] = useState("");

  // Generate years from 2014 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2013 }, (_, i) => 2014 + i).reverse();

  // Filter years based on search
  const filteredYears = years.filter(year => 
    year.toString().includes(searchQuery)
  );

  const examTitles: Record<string, string> = {
    entrance: t('entrance'),
    exit: t('exit'),
    ngat: t('ngat'),
    'work-exam': t('workExam'),
    'grade-6': t('grade6'),
    'grade-8': t('grade8'),
  };

  const examTypeKey = examType as keyof typeof examTitles;
  const examTitle = examTitles[examTypeKey] || t('entrance');

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
          <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => navigate(`/exam/${examType}`)}>
            {examTitle}
          </Button>
          <span>/</span>
          <span className="text-foreground font-medium">{subjectName} {examTitle}</span>
        </div>
      </div>

      {/* Years Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">{subjectName}</span> {examTitle}
          </h1>
          <p className="text-muted-foreground">{t('selectYear')}</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('searchYears')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Year Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredYears.length > 0 ? (
            filteredYears.map((year) => (
              <Card 
                key={year}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
                onClick={() => navigate(`/quiz?subject=${subject}&exam=${examType}&year=${year}`)}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{year}</h3>
                  <p className="text-muted-foreground">{examTitle}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">{t('noYearsFound')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SubjectExam;
