// Lightweight, honestly-scoped content for long-tail nav routes that don't
// have a bespoke template in this pass (see docs/route-inventory.md "🟡"
// rows). Labels and cross-links are real (drawn from the verified nav/link
// graph); the descriptive copy is a short, neutral summary of the section's
// purpose rather than invented statistics, testimonials or dates.

export interface GenericPageContent {
  trailLabel: string;
  section: string;
  title: string;
  tone: "green" | "coral" | "sky" | "gold";
  summary: string;
  relatedLabel: string;
  related: { label: string; to: string }[];
}

export const genericPages: Record<string, GenericPageContent> = {
  "/about/leadership-and-governance": {
    trailLabel: "About",
    section: "About",
    title: "Leadership & Governance",
    tone: "green",
    summary:
      "Branksome Hall is guided by its Principal, Senior Leadership Team and an independent Board of Governors responsible for the school's strategic direction, financial oversight and long-term vision.",
    relatedLabel: "Related pages",
    related: [
      { label: "The Branksome Difference", to: "/about/the-branksome-difference" },
      { label: "Meet Our Principal", to: "/about/meet-our-principal" },
      { label: "Our History", to: "/about/our-history" },
    ],
  },
  "/about/meet-our-principal": {
    trailLabel: "About",
    section: "About",
    title: "Meet Our Principal",
    tone: "coral",
    summary:
      "Branksome Hall's Principal leads the school's academic vision and community culture, and co-hosts PrincipalED, a podcast and video series featuring conversations with students, alums and educators.",
    relatedLabel: "Related pages",
    related: [
      { label: "Leadership & Governance", to: "/about/leadership-and-governance" },
      { label: "Branksome News", to: "/branksome-news" },
    ],
  },
  "/about/career-opportunities": {
    trailLabel: "About",
    section: "About",
    title: "Career Opportunities",
    tone: "sky",
    summary:
      "Branksome Hall employs a diverse community of educators and professionals across teaching, student support, innovation, athletics, arts and operations roles.",
    relatedLabel: "Related pages",
    related: [
      { label: "The Branksome Difference", to: "/about/the-branksome-difference" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
  "/about/community-inclusion-belonging": {
    trailLabel: "About",
    section: "About",
    title: "Community, Inclusion & Belonging",
    tone: "gold",
    summary:
      "Branksome Hall embraces community, inclusion and belonging as core values, working to create a welcoming environment where every individual feels valued, respected and empowered.",
    relatedLabel: "Related pages",
    related: [
      { label: "The Branksome Difference", to: "/about/the-branksome-difference" },
      { label: "Student Support", to: "/learning/student-support" },
    ],
  },
  "/admissions/connect-with-admissions": {
    trailLabel: "Admissions",
    section: "Admissions",
    title: "Connect with Admissions",
    tone: "coral",
    summary:
      "Have questions about applying to Branksome Hall? Our Admissions team is ready to help with everything from entry points and tuition to financial assistance and Boarding.",
    relatedLabel: "Related pages",
    related: [
      { label: "Start Here", to: "/admissions/start-here" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Visit Us", to: "/admissions/visit-us" },
    ],
  },
  "/admissions/tuition-and-financial-support/financial-assistance": {
    trailLabel: "Tuition & Financial Support",
    section: "Admissions",
    title: "Financial Assistance",
    tone: "sky",
    summary:
      "Branksome Hall offers financial support (bursaries) to students in the Senior & Middle School through its Financial Assistance Program, partnering with families to finance a Branksome education from Grades 7 to 12.",
    relatedLabel: "Related pages",
    related: [
      { label: "Tuition & Other Costs", to: "/admissions/tuition-and-financial-support" },
      { label: "Scholarships", to: "/admissions/tuition-and-financial-support/scholarships" },
    ],
  },
  "/admissions/tuition-and-financial-support/scholarships": {
    trailLabel: "Tuition & Financial Support",
    section: "Admissions",
    title: "Scholarships",
    tone: "gold",
    summary:
      "Branksome offers a variety of entrance merit scholarships for new day or Boarding students in Grades 7–11.",
    relatedLabel: "Related pages",
    related: [
      { label: "Financial Assistance", to: "/admissions/tuition-and-financial-support/financial-assistance" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
    ],
  },
  "/learning/student-life/arts": {
    trailLabel: "Student Life",
    section: "Learning",
    title: "Arts",
    tone: "gold",
    summary:
      "At Branksome, the arts come alive through music, film, theatre and student-led productions — from Dance and Drama to Visual Arts including fashion, textiles, animation, photography and architecture.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/learning/student-life" },
      { label: "Athletics", to: "/learning/student-life/athletics" },
    ],
  },
  "/learning/student-life/athletics": {
    trailLabel: "Student Life",
    section: "Learning",
    title: "Athletics",
    tone: "sky",
    summary:
      "The Athletics program provides diverse opportunities to develop physical fitness, sport-specific skills, teamwork, commitment, resilience and an appreciation for lifelong active living.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/learning/student-life" },
      { label: "Clubs & Co-Curriculars", to: "/learning/student-life/clubs-and-co-curriculars" },
    ],
  },
  "/learning/student-life/clubs-and-co-curriculars": {
    trailLabel: "Student Life",
    section: "Learning",
    title: "Clubs & Co-Curriculars",
    tone: "coral",
    summary:
      "Clubs are student-led groups formed around a shared interest, hobby or cause, with regular meetings and activities aimed at fostering community, skill development and personal growth.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/learning/student-life" },
      { label: "Arts", to: "/learning/student-life/arts" },
    ],
  },
  "/learning/student-support": {
    trailLabel: "Learning",
    section: "Learning",
    title: "Student Support",
    tone: "green",
    summary:
      "Branksome's Student Support Team is a diverse group of educators and professionals — School Counsellors, Social Workers, School Nurses, Learning Strategies Teachers, University Counsellors, and the Community, Inclusion & Belonging and Boarding teams.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/learning/student-life" },
      { label: "The Branksome Difference", to: "/about/the-branksome-difference" },
    ],
  },
  "/learning/how-we-teach": {
    trailLabel: "Learning",
    section: "Learning",
    title: "How We Teach",
    tone: "sky",
    summary:
      "Branksome's teaching approach centres on inquiry-based learning, regular assessment and feedback, and a globally-minded IB curriculum delivered from Junior Kindergarten through Grade 12.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our IB Advantage", to: "/learning/our-ib-advantage" },
      { label: "Meet Our Students", to: "/learning/our-ib-advantage" },
    ],
  },
  "/learning/heading-to-university": {
    trailLabel: "Learning",
    section: "Learning",
    title: "Heading to University",
    tone: "gold",
    summary:
      "With today's exponential pace of change, Branksome Hall prepares students who will not only meet the complexities of tomorrow but are already shaping that future, through robust university counselling and an IB foundation recognized worldwide.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our IB Advantage", to: "/learning/our-ib-advantage" },
      { label: "Diploma or IB Select 11–12", to: "/learning/our-ib-advantage/ib-pathways-in-grades-11-12" },
    ],
  },
  "/innovation/innovation-spaces": {
    trailLabel: "Innovation",
    section: "Innovation",
    title: "Innovation Spaces",
    tone: "gold",
    summary:
      "Community members are empowered to bring their boldest ideas to life with expert training and workshops held in state-of-the-art spaces across campus.",
    relatedLabel: "Related pages",
    related: [
      { label: "iCAST", to: "/innovation/icast" },
      { label: "Slingshot Innovation Academy", to: "/innovation/slingshot-innovation-academy" },
    ],
  },
  "/innovation/slingshot-innovation-academy": {
    trailLabel: "Innovation",
    section: "Innovation",
    title: "Slingshot Innovation Academy",
    tone: "coral",
    summary:
      "Branksome's entrepreneurship and innovation academy brings together app development, pitch and persuasion training, and venture-lab style programming for students building real ideas.",
    relatedLabel: "Related pages",
    related: [
      { label: "iCAST", to: "/innovation/icast" },
      { label: "Centre for Strategic Leadership", to: "/innovation/centre-for-strategic-leadership" },
    ],
  },
  "/innovation/centre-for-strategic-leadership": {
    trailLabel: "Innovation",
    section: "Innovation",
    title: "Centre for Strategic Leadership",
    tone: "sky",
    summary:
      "The first of its kind in a Canadian JK–Grade 12 school, the CSL empowers employees to develop leadership skills through a strength-based, values-driven approach aligned with the school's mission.",
    relatedLabel: "Related pages",
    related: [
      { label: "iCAST", to: "/innovation/icast" },
      { label: "Chandaria Research Centre", to: "/innovation/chandaria-research-centre" },
    ],
  },
  "/innovation/chandaria-research-centre": {
    trailLabel: "Innovation",
    section: "Innovation",
    title: "Chandaria Research Centre",
    tone: "green",
    summary:
      "Opened in 2016, the Chandaria Research Centre is one of the few school-based research centres in Canada and internationally, focused on enhancing teaching, well-being and global perspectives.",
    relatedLabel: "Related pages",
    related: [
      { label: "iCAST", to: "/innovation/icast" },
      { label: "Our IB Advantage", to: "/learning/our-ib-advantage" },
    ],
  },
  "/the-campus/virtual-tours": {
    trailLabel: "The Campus",
    section: "The Campus",
    title: "Virtual Tours",
    tone: "sky",
    summary:
      "Explore Branksome Hall's 13-acre campus — a mix of heritage mansions and modern structures connected by a ravine woodlot and outdoor classroom — from wherever you are.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our Campus", to: "/the-campus/our-campus" },
      { label: "Visit Us", to: "/admissions/visit-us" },
    ],
  },
  "/the-campus/branksome-camps": {
    trailLabel: "The Campus",
    section: "The Campus",
    title: "Branksome Camps",
    tone: "gold",
    summary:
      "Branksome Camps bring the school's campus and spirit to life outside the school year, offering day camp programming across sport, arts and enrichment.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our Campus", to: "/the-campus/our-campus" },
      { label: "Venue Rentals", to: "/the-campus/venue-rentals" },
    ],
  },
  "/the-campus/venue-rentals": {
    trailLabel: "The Campus",
    section: "The Campus",
    title: "Venue Rentals",
    tone: "coral",
    summary:
      "Branksome Hall's heritage and modern spaces are available for rent for community, corporate and private events. Contact the school for fees and availability.",
    relatedLabel: "Related pages",
    related: [
      { label: "Contact Us", to: "/about/contact-us" },
      { label: "Our Campus", to: "/the-campus/our-campus" },
    ],
  },
  "/community/alums/alum-stories": {
    trailLabel: "Community",
    section: "Community",
    title: "Alum Stories",
    tone: "gold",
    summary:
      "Snapshots of inspiring Branksome graduates — a generation of trailblazers, change-makers and leaders who are ready to face the world, in their own words.",
    relatedLabel: "Related pages",
    related: [
      { label: "Alums", to: "/community/alums" },
      { label: "Branksome News", to: "/branksome-news" },
    ],
  },
  "/community/educators": {
    trailLabel: "Community",
    section: "Community",
    title: "Educators",
    tone: "sky",
    summary:
      "Branksome Hall partners with educators beyond its own community through professional learning opportunities, including IB Summer Workshops hosted on campus.",
    relatedLabel: "Related pages",
    related: [
      { label: "IB Summer Workshops", to: "/community/educators" },
      { label: "Chandaria Research Centre", to: "/innovation/chandaria-research-centre" },
    ],
  },
  "/community/visiting-speakers": {
    trailLabel: "Community",
    section: "Community",
    title: "Visiting Speakers",
    tone: "coral",
    summary:
      "Branksome Hall regularly welcomes visiting speakers — authors, researchers, entrepreneurs and alums — to engage directly with students across grades.",
    relatedLabel: "Related pages",
    related: [
      { label: "Branksome News", to: "/branksome-news" },
      { label: "Alums", to: "/community/alums" },
    ],
  },
  "/giving/how-to-give": {
    trailLabel: "Giving",
    section: "Giving",
    title: "How to Give",
    tone: "sky",
    summary:
      "There are many ways to support Branksome Hall, from one-time and monthly gifts to legacy giving and naming opportunities.",
    relatedLabel: "Related pages",
    related: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Giving Opportunities", to: "/giving/giving-opportunities" },
    ],
  },
  "/giving/your-impact": {
    trailLabel: "Giving",
    section: "Giving",
    title: "Your Impact",
    tone: "gold",
    summary:
      "Gifts to Branksome Hall support financial assistance, scholarships, innovation spaces like iCAST, and the day-to-day programming that shapes a Branksome education.",
    relatedLabel: "Related pages",
    related: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Make Way Campaign", to: "/giving/make-way-campaign" },
    ],
  },
  "/giving/make-way-campaign": {
    trailLabel: "Giving",
    section: "Giving",
    title: "Make Way Campaign",
    tone: "coral",
    summary:
      "The Make Way Campaign is Branksome Hall's fundraising initiative supporting major capital and program priorities, including iCAST — the Karen L. Jurjevich Innovation Centre and Studio Theatre.",
    relatedLabel: "Related pages",
    related: [
      { label: "iCAST", to: "/innovation/icast" },
      { label: "Donate Now", to: "/giving/donate-now" },
    ],
  },
};
