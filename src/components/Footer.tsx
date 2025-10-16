import { useTranslation } from "react-i18next";
import { GraduationCap, Facebook, Linkedin, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">E-Exam</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('tagline')}
            </p>
            <div className="flex gap-2">
              <a href="#" className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-accent transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">{t('home')}</a></li>
              <li><a href="/about" className="hover:text-foreground transition-colors">{t('about')}</a></li>
              <li><a href="/courses" className="hover:text-foreground transition-colors">{t('courses')}</a></li>
              <li><a href="/subscription" className="hover:text-foreground transition-colors">{t('subscription')}</a></li>
            </ul>
          </div>

          {/* Exams */}
          <div>
            <h3 className="font-semibold mb-4">{t('exams')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/exams/entrance" className="hover:text-foreground transition-colors">{t('entranceExam')}</a></li>
              <li><a href="/exams/exit" className="hover:text-foreground transition-colors">{t('exitExam')}</a></li>
              <li><a href="/exams/work" className="hover:text-foreground transition-colors">{t('workExam')}</a></li>
              <li><a href="/exams/ngat" className="hover:text-foreground transition-colors">{t('ngat')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">{t('supportContact')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/help" className="hover:text-foreground transition-colors">{t('helpCenter')}</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">{t('contactUs')}</a></li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@e-exam.com
              </li>
              <li>+251-XXX-XXXX</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} E-Exam. {t('allRightsReserved')}</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">{t('privacyPolicy')}</a>
            <a href="/terms" className="hover:text-foreground transition-colors">{t('termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
