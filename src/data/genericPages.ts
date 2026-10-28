// Short, honestly-scoped content for the long-tail navigation routes. Each
// entry describes the purpose of the section in neutral wording that reflects
// Marvelous Greatness Schools' stated values. No dates, fees, statistics,
// facilities or results are invented — where a detail is still to be confirmed
// the copy says so plainly.

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
      "Marvelous Greatness Schools is led by its school leadership team, which is responsible for academic standards, staff development, pastoral care and the day-to-day running of the school. Leadership works in close partnership with teachers and families so that decisions are made in the best interests of our pupils.",
    relatedLabel: "Related pages",
    related: [
      { label: "The MGGS Difference", to: "/about/the-mggs-difference" },
      { label: "Our Story", to: "/about/our-story" },
      { label: "Career Opportunities", to: "/about/career-opportunities" },
    ],
  },
  "/about/community-and-belonging": {
    trailLabel: "About",
    section: "About",
    title: "Community & Belonging",
    tone: "gold",
    summary:
      "Every child should feel known, safe and valued at school. At MGGS we build that sense of belonging through respectful relationships between teachers and pupils, close communication with families and a school culture in which every learner is encouraged to take part.",
    relatedLabel: "Related pages",
    related: [
      { label: "Parents & Families", to: "/community/parents-and-families" },
      { label: "Student Support", to: "/academics/student-support" },
      { label: "Our Values", to: "/about/our-values" },
    ],
  },
  "/about/career-opportunities": {
    trailLabel: "About",
    section: "About",
    title: "Career Opportunities",
    tone: "sky",
    summary:
      "MGGS looks for educators and school professionals who are disciplined, dedicated and committed to excellent performance in the classroom. Current vacancies will be listed here as they are confirmed by the school office.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our Educators", to: "/community/educators" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
  "/admissions/connect-with-admissions": {
    trailLabel: "Admissions",
    section: "Admissions",
    title: "Connect with Admissions",
    tone: "coral",
    summary:
      "Have a question about joining Marvelous Greatness Schools? Share a few details about your child and our school office will follow up with the information you need.",
    relatedLabel: "Related pages",
    related: [
      { label: "Start Here", to: "/admissions/start-here" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Visit Us", to: "/admissions/visit-us" },
    ],
  },
  "/academics/our-academic-approach": {
    trailLabel: "Academics",
    section: "Academics",
    title: "Our Academic Approach",
    tone: "green",
    summary:
      "Our academic approach combines a well-sequenced curriculum, careful teaching, regular assessment and constructive feedback. We want every pupil to build firm foundations in literacy, numeracy and reasoning, and to grow into a confident, curious lifelong learner.",
    relatedLabel: "Related pages",
    related: [
      { label: "How We Teach", to: "/academics/how-we-teach" },
      { label: "Moral Instruction & Character", to: "/academics/character-and-moral-instruction" },
      { label: "Preparing for the Future", to: "/academics/preparing-for-the-future" },
    ],
  },
  "/academics/how-we-teach": {
    trailLabel: "Academics",
    section: "Academics",
    title: "How We Teach",
    tone: "sky",
    summary:
      "Teachers at MGGS explain clearly, practise deliberately and check understanding often. Lessons balance direct teaching with discussion, group work and independent practice, so that pupils learn to think for themselves and to explain their reasoning with confidence.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our Academic Approach", to: "/academics/our-academic-approach" },
      { label: "Student Support", to: "/academics/student-support" },
    ],
  },
  "/academics/character-and-moral-instruction": {
    trailLabel: "Academics",
    section: "Academics",
    title: "Moral Instruction & Character",
    tone: "gold",
    summary:
      "Moral instruction and character formation are part of the school's purpose, not an extra. Through lessons, assemblies, guidance and the everyday example of our teachers, pupils learn honesty, responsibility, respect and self-control, and they are encouraged to practise those qualities at home as well as at school.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our Values", to: "/about/our-values" },
      { label: "How We Teach", to: "/academics/how-we-teach" },
      { label: "Parents & Families", to: "/community/parents-and-families" },
    ],
  },
  "/academics/co-curricular-activities": {
    trailLabel: "Academics",
    section: "Academics",
    title: "Co-Curricular Activities",
    tone: "coral",
    summary:
      "Co-curricular activities give pupils the chance to discover what they enjoy, work in a team, take responsibility and build confidence beyond the classroom. The activities offered each term will be published here once confirmed by the school.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/student-life" },
      { label: "Clubs & Societies", to: "/student-life/clubs" },
    ],
  },
  "/academics/student-support": {
    trailLabel: "Academics",
    section: "Academics",
    title: "Student Support",
    tone: "green",
    summary:
      "Some pupils need a little more time, a different explanation or extra encouragement. Our teachers identify that early, adapt their teaching and work with families so that every child is supported to make progress at their own pace.",
    relatedLabel: "Related pages",
    related: [
      { label: "Community & Belonging", to: "/about/community-and-belonging" },
      { label: "Parents & Families", to: "/community/parents-and-families" },
    ],
  },
  "/academics/preparing-for-the-future": {
    trailLabel: "Academics",
    section: "Academics",
    title: "Preparing for the Future",
    tone: "sky",
    summary:
      "A good education prepares pupils for more than the next examination. We help our pupils develop strong communication, thoughtful decision-making, digital confidence and the resilience to keep learning long after they leave MGGS.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our Academic Approach", to: "/academics/our-academic-approach" },
      { label: "Leadership & Service", to: "/student-life/leadership" },
    ],
  },
  "/student-life": {
    trailLabel: "Student Life",
    section: "Student Life",
    title: "Student Life",
    tone: "coral",
    summary:
      "School should stretch more than the memory. At MGGS, pupils are encouraged to join activities, take on responsibilities, serve others and discover strengths they did not know they had — all within a caring, well-ordered school community.",
    relatedLabel: "Explore student life",
    related: [
      { label: "Arts & Culture", to: "/student-life/arts" },
      { label: "Sports & Fitness", to: "/student-life/sports" },
      { label: "Clubs & Societies", to: "/student-life/clubs" },
      { label: "Leadership & Service", to: "/student-life/leadership" },
    ],
  },
  "/student-life/arts": {
    trailLabel: "Student Life",
    section: "Student Life",
    title: "Arts & Culture",
    tone: "gold",
    summary:
      "Creative work helps pupils observe closely, listen carefully and express themselves clearly. Music, drama, art and cultural activities give our pupils space to imagine, perform and take pride in what they make.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/student-life" },
      { label: "Clubs & Societies", to: "/student-life/clubs" },
    ],
  },
  "/student-life/sports": {
    trailLabel: "Student Life",
    section: "Student Life",
    title: "Sports & Fitness",
    tone: "sky",
    summary:
      "Sport teaches effort, self-discipline and good sportsmanship. Pupils at MGGS take part in physical activity and team games that build fitness, coordination, teamwork and the habit of an active, healthy life.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/student-life" },
      { label: "Our Values", to: "/about/our-values" },
    ],
  },
  "/student-life/clubs": {
    trailLabel: "Student Life",
    section: "Student Life",
    title: "Clubs & Societies",
    tone: "coral",
    summary:
      "Clubs and societies give pupils a shared interest to belong to — a place to debate, build, read, code, perform or serve alongside classmates. The club list is confirmed by the school at the start of each session.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/student-life" },
      { label: "Co-Curricular Activities", to: "/academics/co-curricular-activities" },
    ],
  },
  "/student-life/leadership": {
    trailLabel: "Student Life",
    section: "Student Life",
    title: "Leadership & Service",
    tone: "green",
    summary:
      "Leadership at MGGS is learned in practice: keeping a commitment, helping a younger pupil, taking responsibility for a class duty and speaking up for what is right. Service is part of our motto, Towards Greatness, and it begins close to home.",
    relatedLabel: "Related pages",
    related: [
      { label: "Student Life", to: "/student-life" },
      { label: "Moral Instruction & Character", to: "/academics/character-and-moral-instruction" },
    ],
  },
  "/community/parents-and-families": {
    trailLabel: "Community",
    section: "Community",
    title: "Parents & Families",
    tone: "gold",
    summary:
      "Parents and guardians are partners in everything we do. We keep families informed about their child's progress, invite them into the life of the school and work together when a pupil needs encouragement or support.",
    relatedLabel: "Related pages",
    related: [
      { label: "Parent Partnership", to: "/admissions/parent-partnership" },
      { label: "Community & Belonging", to: "/about/community-and-belonging" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
  "/community/stories": {
    trailLabel: "Community",
    section: "Community",
    title: "Student & Alumni Stories",
    tone: "coral",
    summary:
      "Stories of our pupils and former pupils show what a Marvelous Greatness Schools education looks like in real life — steady progress, good character and the confidence to aim higher. New stories will be added as the school shares them.",
    relatedLabel: "Related pages",
    related: [
      { label: "MGGS News", to: "/mggs-news" },
      { label: "Parents & Families", to: "/community/parents-and-families" },
    ],
  },
  "/community/educators": {
    trailLabel: "Community",
    section: "Community",
    title: "Our Educators",
    tone: "sky",
    summary:
      "Our teachers are the strength of the school. They are subject-confident, caring about each pupil's progress and consistently supported with training, shared planning and feedback on their practice.",
    relatedLabel: "Related pages",
    related: [
      { label: "How We Teach", to: "/academics/how-we-teach" },
      { label: "Career Opportunities", to: "/about/career-opportunities" },
    ],
  },
  "/campus/our-campus": {
    trailLabel: "Our Campus",
    section: "Our Campus",
    title: "Our Campus",
    tone: "green",
    summary:
      "Marvelous Greatness Schools is located in the Akobo–Ojurin area of Ibadan, Oyo State. Our school site is arranged to give pupils an orderly, safe environment for learning, with details of the campus added here as they are confirmed by the school.",
    relatedLabel: "Related pages",
    related: [
      { label: "Getting to School", to: "/campus/getting-to-school" },
      { label: "Campus Tours", to: "/campus/campus-tours" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
  "/campus/getting-to-school": {
    trailLabel: "Our Campus",
    section: "Our Campus",
    title: "Getting to School",
    tone: "sky",
    summary:
      "The school is situated in Akobo–Ojurin, Ibadan, within reach of families across the city. Directions, arrival and collection arrangements will be published here once confirmed by the school office.",
    relatedLabel: "Related pages",
    related: [
      { label: "Our Campus", to: "/campus/our-campus" },
      { label: "Contact Us", to: "/about/contact-us" },
    ],
  },
  "/campus/campus-tours": {
    trailLabel: "Our Campus",
    section: "Our Campus",
    title: "Campus Tours",
    tone: "gold",
    summary:
      "The best way to understand a school is to walk through it. Arrange a tour with the school office, meet our teachers and see the classrooms, resources and routines that shape a typical day at MGGS.",
    relatedLabel: "Related pages",
    related: [
      { label: "Visit Us", to: "/admissions/visit-us" },
      { label: "Our Campus", to: "/campus/our-campus" },
    ],
  },
  "/giving/donate-now": {
    trailLabel: "Giving",
    section: "Giving",
    title: "Donate Now",
    tone: "green",
    summary:
      "Support from friends of the school helps us keep improving what we offer our pupils. Please contact the school office to discuss a contribution; the form shown here is a demonstration and does not process payments.",
    relatedLabel: "Related pages",
    related: [
      { label: "Ways to Give", to: "/giving/ways-to-give" },
      { label: "Your Impact", to: "/giving/your-impact" },
    ],
  },
  "/giving/ways-to-give": {
    trailLabel: "Giving",
    section: "Giving",
    title: "Ways to Give",
    tone: "sky",
    summary:
      "Families, alumni and friends can support Marvelous Greatness Schools through financial contributions, books and learning materials, equipment or professional expertise. The school office will confirm current giving options.",
    relatedLabel: "Related pages",
    related: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Your Impact", to: "/giving/your-impact" },
    ],
  },
  "/giving/your-impact": {
    trailLabel: "Giving",
    section: "Giving",
    title: "Your Impact",
    tone: "gold",
    summary:
      "Gifts to the school support the things that make the greatest difference to pupils: teaching resources, learning materials and the upkeep of a safe, well-ordered school environment. Detailed impact reporting will be published here as it becomes available.",
    relatedLabel: "Related pages",
    related: [
      { label: "Donate Now", to: "/giving/donate-now" },
      { label: "Ways to Give", to: "/giving/ways-to-give" },
    ],
  },
};
