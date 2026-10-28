// Nav structure reconstructed from the verified link graph extracted from
// https://branksome.on.ca/ (see docs/route-inventory.md). Labels are taken
// from the reference site's own footer/nav link text where observed.

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
    description: "Start your journey to Branksome Hall.",
    links: [
      { label: "Start Here", to: "/admissions/start-here" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Visit Us", to: "/admissions/visit-us" },
      { label: "Tuition & Financial Support", to: "/admissions/tuition-and-financial-support" },
      { label: "Boarding Program", to: "/admissions/boarding-program" },
      { label: "Connect with Admissions", to: "/admissions/connect-with-admissions" },
    ],
  },
  {
    label: "Learning",
    to: "/learning/our-ib-advantage",
    description: "Our IB curriculum, JK to Grade 12.",
    links: [
      { label: "Our IB Advantage", to: "/learning/our-ib-advantage" },
      { label: "Primary Years Programme JK–6", to: "/learning/our-ib-advantage/primary-years-programme" },
      { label: "Middle Years Programme 7–10", to: "/learning/our-ib-advantage/middle-years-programme" },
      { label: "Diploma / IB Select 11–12", to: "/learning/our-ib-advantage/ib-pathways-in-grades-11-12" },
      { label: "Student Life", to: "/learning/student-life" },
      { label: "Student Support", to: "/learning/student-support" },
      { label: "How We Teach", to: "/learning/how-we-teach" },
      { label: "Heading to University", to: "/learning/heading-to-university" },
    ],
  },
  {
    label: "Innovation",
    to: "/innovation/icast",
    description: "Where ideas come to life.",
    links: [
      { label: "iCAST", to: "/innovation/icast" },
      { label: "Innovation Spaces", to: "/innovation/innovation-spaces" },
      { label: "Slingshot Innovation Academy", to: "/innovation/slingshot-innovation-academy" },
      { label: "Centre for Strategic Leadership", to: "/innovation/centre-for-strategic-leadership" },
      { label: "Chandaria Research Centre", to: "/innovation/chandaria-research-centre" },
    ],
  },
  {
    label: "Community",
    to: "/community/alums",
    description: "Alums, educators and partners.",
    links: [
      { label: "Alums", to: "/community/alums" },
      { label: "Alum Stories", to: "/community/alums/alum-stories" },
      { label: "Educators", to: "/community/educators" },
      { label: "Visiting Speakers", to: "/community/visiting-speakers" },
    ],
  },
  {
    label: "The Campus",
    to: "/the-campus/our-campus",
    description: "13 acres in the heart of Toronto.",
    links: [
      { label: "Our Campus", to: "/the-campus/our-campus" },
      { label: "Virtual Tours", to: "/the-campus/virtual-tours" },
      { label: "Branksome Camps", to: "/the-campus/branksome-camps" },
      { label: "Venue Rentals", to: "/the-campus/venue-rentals" },
    ],
  },
  {
    label: "Giving",
    to: "/giving/donate-now",
    description: "Invest in the next generation.",
    links: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Giving Opportunities", to: "/giving/giving-opportunities" },
      { label: "How to Give", to: "/giving/how-to-give" },
      { label: "Your Impact", to: "/giving/your-impact" },
      { label: "Make Way Campaign", to: "/giving/make-way-campaign" },
    ],
  },
  {
    label: "About",
    to: "/about/the-branksome-difference",
    description: "Our history, leadership and values.",
    links: [
      { label: "The Branksome Difference", to: "/about/the-branksome-difference" },
      { label: "Our History", to: "/about/our-history" },
      { label: "Leadership & Governance", to: "/about/leadership-and-governance" },
      { label: "Meet Our Principal", to: "/about/meet-our-principal" },
      { label: "Community, Inclusion & Belonging", to: "/about/community-inclusion-belonging" },
      { label: "Career Opportunities", to: "/about/career-opportunities" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
];

export const newsNavLink: NavLink = { label: "Branksome News", to: "/branksome-news" };

export const footerColumns: NavGroup[] = [
  {
    label: "Admissions",
    to: "/admissions/start-here",
    links: [
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Boarding Program", to: "/admissions/boarding-program" },
      { label: "Tuition & Financial Support", to: "/admissions/tuition-and-financial-support" },
      { label: "Visit Us", to: "/admissions/visit-us" },
    ],
  },
  {
    label: "Learning",
    to: "/learning/our-ib-advantage",
    links: [
      { label: "Our IB Advantage", to: "/learning/our-ib-advantage" },
      { label: "Student Support", to: "/learning/student-support" },
      { label: "How We Teach", to: "/learning/how-we-teach" },
      { label: "Heading to University", to: "/learning/heading-to-university" },
    ],
  },
  {
    label: "Innovation",
    to: "/innovation/icast",
    links: [
      { label: "iCAST", to: "/innovation/icast" },
      { label: "Innovation Spaces", to: "/innovation/innovation-spaces" },
      { label: "Slingshot Innovation Academy", to: "/innovation/slingshot-innovation-academy" },
    ],
  },
  {
    label: "Community",
    to: "/community/alums",
    links: [
      { label: "Alums", to: "/community/alums" },
      { label: "Educators", to: "/community/educators" },
      { label: "Visiting Speakers", to: "/community/visiting-speakers" },
    ],
  },
  {
    label: "Give",
    to: "/giving/donate-now",
    links: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Giving Opportunities", to: "/giving/giving-opportunities" },
      { label: "Your Impact", to: "/giving/your-impact" },
    ],
  },
  {
    label: "About Branksome",
    to: "/about/the-branksome-difference",
    links: [
      { label: "The Branksome Difference", to: "/about/the-branksome-difference" },
      { label: "Our History", to: "/about/our-history" },
      { label: "Contact Us", to: "/about/contact-us" },
      { label: "Career Opportunities", to: "/about/career-opportunities" },
    ],
  },
  {
    label: "The Campus",
    to: "/the-campus/our-campus",
    links: [
      { label: "Our Campus", to: "/the-campus/our-campus" },
      { label: "Virtual Tours", to: "/the-campus/virtual-tours" },
      { label: "Venue Rentals", to: "/the-campus/venue-rentals" },
    ],
  },
];
