import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      exam: 'Exam',
      logIn: 'Log In',
      signUp: 'Sign Up',
      entrance: 'Entrance Exam',
      exit: 'Exit Exam',
      grade6: 'Grade 6 Exam',
      grade8: 'Grade 8 Exam',
      
      // Hero Section
      trustedBy: 'Trusted by 10,000+ Students Nationwide',
      heroTitle: 'Ace Your Next',
      heroTitleExam: 'Exam',
      heroTitleWith: 'with',
      heroTitleConfidence: 'Confidence',
      heroDescription: 'Your all-in-one platform for Entrance, Exit, and Professional exam preparation. Get AI-powered feedback, track your progress, and succeed.',
      
      // Features
      questionBank: 'Vast Question Bank',
      questionBankDesc: 'Access thousands of practice questions for every exam type',
      performanceAnalytics: 'Performance Analytics',
      performanceAnalyticsDesc: 'Track your progress with detailed, real-time feedback',
      expertCourses: 'Expert-Led Courses',
      expertCoursesDesc: 'Learn from top instructors and comprehensive study materials',
      
      // Stats
      passRate: 'Pass Rate',
      questions: 'Questions',
      
      // CTA
      exploreExams: 'Explore Exams',
      getStartedFree: 'Get Started for Free',
      
      // Features List
      freeToStart: 'Free to start',
      noCreditCard: 'No credit card required',
      cancelAnytime: 'Cancel anytime',
      
      // Exam Categories
      universityEntranceExams: 'University Entrance Exams',
      selectSubject: 'Select your subject to start practicing',
      searchSubjects: 'Search subjects...',
      
      // Subjects
      aptitudeTest: 'Aptitude Test',
      aptitudeTestDesc: 'Enhance your logical reasoning, problem-solving, and analytical thinking abilities.',
      biology: 'Biology',
      biologyDesc: 'Study life sciences including cell biology, genetics, ecology, and human anatomy.',
      chemistry: 'Chemistry',
      chemistryDesc: 'Explore chemical reactions, atomic theory, and organic/inorganic chemistry.',
      civicsEthics: 'Civics & Ethical Education',
      civicsEthicsDesc: 'Learn about citizenship, democracy, ethics, and civic responsibilities.',
      economics: 'Economics',
      economicsDesc: 'Study micro and macroeconomics, market systems, and economic policies.',
      english: 'English',
      englishDesc: 'Practice English language entrance exam questions covering grammar, vocabulary, and comprehension.',
      geography: 'Geography',
      geographyDesc: 'Learn about physical geography, human geography, and environmental studies.',
      history: 'History',
      historyDesc: 'Explore Ethiopian and world history, civilizations, and historical events.',
      mathNatural: 'Mathematics for Natural Sciences',
      mathNaturalDesc: 'Test your skills in algebra, geometry, calculus, and other mathematical concepts.',
      mathSocial: 'Mathematics for Social Sciences',
      mathSocialDesc: 'Practice math questions for social sciences, including statistics, probability, and data analysis.',
      physics: 'Physics',
      physicsDesc: 'Master mechanics, electromagnetism, optics, and modern physics concepts.',
      
      // Exam Selection
      selectYear: 'Select a year to start your exam practice',
      entranceExam: 'Entrance Exam',
      
      // Footer
      tagline: 'Empowering students and professionals to achieve their goals through comprehensive exam preparation.',
      quickLinks: 'Quick Links',
      exams: 'Exams',
      supportContact: 'Support & Contact',
      helpCenter: 'Help Center / FAQ',
      contactUs: 'Contact Us',
      about: 'About',
      courses: 'Courses',
      subscription: 'Subscription',
      exitExam: 'Exit Exam',
      workExam: 'Work Exam',
      ngat: 'NGAT',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      allRightsReserved: 'All Rights Reserved.',
      
      // Modal
      startYourExam: 'Start Your Exam',
      beginExam: 'Begin your {{subject}} {{year}} entrance exam',
      startNow: 'Start Now',
      features: 'Features:',
      practiceMode: 'Practice mode with detailed explanations',
      aiHints: 'AI-powered hints and assistance',
      trackProgress: 'Track your progress and performance',
      switchModes: 'You can switch between practice and exam modes anytime',
      cancel: 'Cancel',
      startExam: 'Start Exam',
      
      // Settings
      settings: 'Settings',
      myProfile: 'My Profile',
      logOut: 'Log Out',
    },
  },
  am: {
    translation: {
      // Navigation
      home: 'ዋና ገጽ',
      exam: 'ፈተና',
      logIn: 'ግባ',
      signUp: 'ይመዝገቡ',
      entrance: 'መግቢያ ፈተና',
      exit: 'መውጫ ፈተና',
      grade6: 'የ6ኛ ክፍል ፈተና',
      grade8: 'የ8ኛ ክፍል ፈተና',
      
      // Hero Section
      trustedBy: 'በ10,000+ ተማሪዎች በሀገር ውስጥ የታመነ',
      heroTitle: 'ቀጣይዎን',
      heroTitleExam: 'ፈተና',
      heroTitleWith: 'በ',
      heroTitleConfidence: 'በራስ መተማመን ያሸንፉ',
      heroDescription: 'የእርስዎ ሁሉን በአንድ መድረክ ለመግቢያ፣ መውጫ እና ሙያዊ ፈተና ዝግጅት። AI-ተኮር ግብረመልስ ያግኙ፣ እድገትዎን ይከታተሉ እና ይሳካሉ።',
      
      // Features
      questionBank: 'ሰፊ የጥያቄ ባንክ',
      questionBankDesc: 'ለእያንዳንዱ የፈተና አይነት በሺዎች የሚቆጠሩ የልምምድ ጥያቄዎችን ይድረሱ',
      performanceAnalytics: 'የአፈጻጸም ትንተና',
      performanceAnalyticsDesc: 'እድገትዎን በዝርዝር፣ በእውነተኛ ጊዜ ግብረመልስ ይከታተሉ',
      expertCourses: 'በባለሙያ የሚመራ ኮርስ',
      expertCoursesDesc: 'ከአስተማሪዎች እና አጠቃላይ የጥናት ቁሳቁሶች ይማሩ',
      
      // Stats
      passRate: 'የማለፍ መጠን',
      questions: 'ጥያቄዎች',
      
      // CTA
      exploreExams: 'ፈተናዎችን ይመልከቱ',
      getStartedFree: 'ነጻ ይጀምሩ',
      
      // Features List
      freeToStart: 'ነጻ ለመጀመር',
      noCreditCard: 'የክሬዲት ካርድ አይፈለግም',
      cancelAnytime: 'በማንኛውም ጊዜ ይሰርዙ',
      
      // Exam Categories
      universityEntranceExams: 'የዩኒቨርሲቲ መግቢያ ፈተናዎች',
      selectSubject: 'ለመለማመድ ጥናትዎን ይምረጡ',
      searchSubjects: 'ጥናቶችን ይፈልጉ...',
      
      // Subjects
      aptitudeTest: 'የብቃት ፈተና',
      aptitudeTestDesc: 'የእርስዎን አመክንዮአዊ አስተሳሰብ፣ ችግር መፍታት እና ትንታኔ አስተሳሰብ ችሎታዎች ያሳድጉ።',
      biology: 'ባዮሎጂ',
      biologyDesc: 'የህይወት ሳይንስ ጥናቶችን ጨምሮ የሴል ባዮሎጂ፣ ጄኔቲክስ፣ ስነ-ምህዳር እና የሰው አካል አካል ያጠና።',
      chemistry: 'ኬሚስትሪ',
      chemistryDesc: 'የኬሚካል ምላሾችን፣ የአቶሚክ ቲዎሪ እና ኦርጋኒክ/ኢኦርጋኒክ ኬሚስትሪን ያስሱ።',
      civicsEthics: 'ዜግነት እና ስነምግባር ትምህርት',
      civicsEthicsDesc: 'ስለ ዜግነት፣ ዲሞክራሲ፣ ሥነ ምግባር እና የዜጎች ኃላፊነቶች ይማሩ።',
      economics: 'ኢኮኖሚክስ',
      economicsDesc: 'ማይክሮ እና ማክሮ ኢኮኖሚክስ፣ የገበያ ስርዓቶች እና ኢኮኖሚያዊ ፖሊሲዎችን ያጠና።',
      english: 'እንግሊዝኛ',
      englishDesc: 'ሰዋስው፣ ቃላትና መረዳትን የሚሸፍኑ የእንግሊዝኛ ቋንቋ መግቢያ ፈተና ጥያቄዎችን ይለማመዱ።',
      geography: 'ጂኦግራፊ',
      geographyDesc: 'ስለ አካላዊ ጂኦግራፊ፣ የሰው ጂኦግራፊ እና የአካባቢ ጥናቶች ይማሩ።',
      history: 'ታሪክ',
      historyDesc: 'የኢትዮጵያ እና የአለም ታሪክ፣ ስልጣኔዎች እና ታሪካዊ ክስተቶችን ያስሱ።',
      mathNatural: 'ለተፈጥሮ ሳይንስ ሂሳብ',
      mathNaturalDesc: 'በአልጀብራ፣ ጂኦሜትሪ፣ ካልኩለስ እና ሌሎች የሂሳብ ፅንሰ-ሀሳቦች ችሎታዎን ይፈትሹ።',
      mathSocial: 'ለማህበራዊ ሳይንስ ሂሳብ',
      mathSocialDesc: 'ለማህበራዊ ሳይንስ የሂሳብ ጥያቄዎችን ይለማመዱ፣ ስታቲስቲክስ፣ ፕሮባቢሊቲ እና የመረጃ ትንተና ጨምሮ።',
      physics: 'ፊዚክስ',
      physicsDesc: 'ሜካኒክስ፣ ኤሌክትሮማግኔቲዝም፣ ኦፕቲክስ እና ዘመናዊ የፊዚክስ ፅንሰ-ሀሳቦችን ይማሩ።',
      
      // Exam Selection
      selectYear: 'የፈተና ልምምድዎን ለመጀመር ዓመት ይምረጡ',
      entranceExam: 'መግቢያ ፈተና',
      
      // Footer
      tagline: 'ተማሪዎችን እና ባለሙያዎችን አላማዎቻቸውን በአጠቃላይ የፈተና ዝግጅት እንዲያሳኩ ማብቃት።',
      quickLinks: 'ፈጣን አገናኞች',
      exams: 'ፈተናዎች',
      supportContact: 'ድጋፍ እና ግንኙነት',
      helpCenter: 'የእገዛ ማዕከል / ጥያቄዎች',
      contactUs: 'ያግኙን',
      about: 'ስለ እኛ',
      courses: 'ኮርሶች',
      subscription: 'ምዝገባ',
      exitExam: 'መውጫ ፈተና',
      workExam: 'የስራ ፈተና',
      ngat: 'NGAT',
      privacyPolicy: 'የግላዊነት ፖሊሲ',
      termsOfService: 'የአገልግሎት ውል',
      allRightsReserved: 'ሁሉም መብቶች የተጠበቁ ናቸው።',
      
      // Modal
      startYourExam: 'ፈተናዎን ይጀምሩ',
      beginExam: 'የእርስዎን {{subject}} {{year}} መግቢያ ፈተና ይጀምሩ',
      startNow: 'አሁን ይጀምሩ',
      features: 'ባህሪዎች:',
      practiceMode: 'በዝርዝር ማብራሪያዎች ልምምድ ሁነታ',
      aiHints: 'AI-ተኮር ፍንጮች እና እገዛ',
      trackProgress: 'እድገትዎን እና አፈጻጸምዎን ይከታተሉ',
      switchModes: 'በማንኛውም ጊዜ በልምምድ እና በፈተና ሁነታዎች መካከል መቀየር ይችላሉ',
      cancel: 'ሰርዝ',
      startExam: 'ፈተና ጀምር',
      
      // Settings
      settings: 'ቅንብሮች',
      myProfile: 'የኔ መገለጫ',
      logOut: 'ውጣ',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
