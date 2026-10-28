// Navigation for Marvelous Greatness Schools. The interaction model (grouped
// nav, sub-lists, footer columns) is unchanged from the existing design — only
// the section labels and destinations have been adapted for MGGS.

export interface NavLink {
  label: string;
  to: string;
}

export interface NavGroup {
  label: string;
  to: string;
  description?: string;
  links: NavLink[];
}

export const primaryNav: NavGroup[] = [
  {
    label: "Admissions",
    to: "/admissions/start-here",
    description: "Start your child's journey at MGGS.",
    links: [
      { label: "Start Here", to: "/admissions/start-here" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Visit Us", to: "/admissions/visit-us" },
      { label: "Fees & Financial Information", to: "/admissions/fees-and-financial-information" },
      { label: "Parent Partnership", to: "/admissions/parent-partnership" },
      { label: "Connect with Admissions", to: "/admissions/connect-with-admissions" },
    ],
  },
  {
    label: "Academics",
    to: "/academics/our-academic-approach",
    description: "Quality teaching, strong foundations, measurable progress.",
    links: [
      { label: "Our Academic Approach", to: "/academics/our-academic-approach" },
      { label: "How We Teach", to: "/academics/how-we-teach" },
      { label: "Moral Instruction & Character", to: "/academics/character-and-moral-instruction" },
      { label: "Co-Curricular Activities", to: "/academics/co-curricular-activities" },
      { label: "Student Support", to: "/academics/student-support" },
      { label: "Preparing for the Future", to: "/academics/preparing-for-the-future" },
    ],
  },
  {
    label: "Student Life",
    to: "/student-life",
    description: "Confidence, curiosity and life beyond the classroom.",
    links: [
      { label: "Student Life", to: "/student-life" },
      { label: "Arts & Culture", to: "/student-life/arts" },
      { label: "Sports & Fitness", to: "/student-life/sports" },
      { label: "Clubs & Societies", to: "/student-life/clubs" },
      { label: "Leadership & Service", to: "/student-life/leadership" },
    ],
  },
  {
    label: "Community",
    to: "/community/parents-and-families",
    description: "Families, educators and friends of the school.",
    links: [
      { label: "Parents & Families", to: "/community/parents-and-families" },
      { label: "Student & Alumni Stories", to: "/community/stories" },
      { label: "Our Educators", to: "/community/educators" },
    ],
  },
  {
    label: "Our Campus",
    to: "/campus/our-campus",
    description: "Our home in Akobo–Ojurin, Ibadan.",
    links: [
      { label: "Our Campus", to: "/campus/our-campus" },
      { label: "Getting to School", to: "/campus/getting-to-school" },
      { label: "Campus Tours", to: "/campus/campus-tours" },
    ],
  },
  {
    label: "Giving",
    to: "/giving/donate-now",
    description: "Support our pupils and our school.",
    links: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Ways to Give", to: "/giving/ways-to-give" },
      { label: "Your Impact", to: "/giving/your-impact" },
    ],
  },
  {
    label: "About",
    to: "/about/the-mggs-difference",
    description: "Our story, our values and our people.",
    links: [
      { label: "The MGGS Difference", to: "/about/the-mggs-difference" },
      { label: "Our Values", to: "/about/our-values" },
      { label: "Our Story", to: "/about/our-story" },
      { label: "Leadership & Governance", to: "/about/leadership-and-governance" },
      { label: "Community & Belonging", to: "/about/community-and-belonging" },
      { label: "Career Opportunities", to: "/about/career-opportunities" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
];

export const newsNavLink: NavLink = { label: "MGGS News", to: "/mggs-news" };

export const footerColumns: NavGroup[] = [
  {
    label: "Admissions",
    to: "/admissions/start-here",
    links: [
      { label: "Start Here", to: "/admissions/start-here" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Visit Us", to: "/admissions/visit-us" },
      { label: "Fees & Financial Information", to: "/admissions/fees-and-financial-information" },
    ],
  },
  {
    label: "Academics",
    to: "/academics/our-academic-approach",
    links: [
      { label: "Our Academic Approach", to: "/academics/our-academic-approach" },
      { label: "How We Teach", to: "/academics/how-we-teach" },
      { label: "Moral Instruction & Character", to: "/academics/character-and-moral-instruction" },
      { label: "Student Support", to: "/academics/student-support" },
    ],
  },
  {
    label: "Student Life",
    to: "/student-life",
    links: [
      { label: "Student Life", to: "/student-life" },
      { label: "Arts & Culture", to: "/student-life/arts" },
      { label: "Sports & Fitness", to: "/student-life/sports" },
      { label: "Clubs & Societies", to: "/student-life/clubs" },
    ],
  },
  {
    label: "Community",
    to: "/community/parents-and-families",
    links: [
      { label: "Parents & Families", to: "/community/parents-and-families" },
      { label: "Student & Alumni Stories", to: "/community/stories" },
      { label: "Our Educators", to: "/community/educators" },
    ],
  },
  {
    label: "Our Campus",
    to: "/campus/our-campus",
    links: [
      { label: "Our Campus", to: "/campus/our-campus" },
      { label: "Getting to School", to: "/campus/getting-to-school" },
      { label: "Campus Tours", to: "/campus/campus-tours" },
    ],
  },
  {
    label: "About MGGS",
    to: "/about/the-mggs-difference",
    links: [
      { label: "The MGGS Difference", to: "/about/the-mggs-difference" },
      { label: "Our Values", to: "/about/our-values" },
      { label: "Our Story", to: "/about/our-story" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
  {
    label: "Give",
    to: "/giving/donate-now",
    links: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Ways to Give", to: "/giving/ways-to-give" },
      { label: "Your Impact", to: "/giving/your-impact" },
      { label: "MGGS News", to: "/mggs-news" },
    ],
  },
];
