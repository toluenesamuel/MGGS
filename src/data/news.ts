// News and announcement examples for Marvelous Greatness Schools.
// These are illustrative, evergreen notices that reflect the school's stated
// values and purpose. No dates, results, fees or statistics are stated as fact;
// the school can replace each entry with its own confirmed news.

export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  topic?: string;
  readTime: string;
  excerpt: string;
  image: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "welcome-to-the-new-school-year",
    title: "Welcome Back: A New Year Towards Greatness",
    category: "Announcements",
    topic: "Community",
    readTime: "2 min read",
    excerpt:
      "A warm welcome to every returning family and every new family joining Marvelous Greatness Schools this term. Our staff have been preparing classrooms, lesson plans and activities so that learning begins the moment our pupils arrive.",
    image: "/images/students-collaborating.jpg",
  },
  {
    slug: "motto-in-focus-towards-greatness",
    title: "Motto in Focus: What 'Towards Greatness' Means to Us",
    category: "News",
    topic: "Character & Values",
    readTime: "3 min read",
    excerpt:
      "Our motto is not a promise of instant success. It describes a direction — the daily choice to improve, to behave with integrity and to take one more step forward than yesterday.",
    image: "/images/news-generic-1.jpg",
  },
  {
    slug: "discipline-is-a-habit-not-a-punishment",
    title: "Discipline Is a Habit, Not a Punishment",
    category: "News",
    topic: "Character & Values",
    readTime: "3 min read",
    excerpt:
      "Punctuality, neatness, courtesy and focused effort are learned habits. Here is how our teachers build those habits gently and consistently across the school day.",
    image: "/images/classroom-science.jpg",
  },
  {
    slug: "reading-culture-at-home-and-school",
    title: "Building a Reading Culture at Home and at School",
    category: "News",
    topic: "Academics",
    readTime: "4 min read",
    excerpt:
      "Reading is the foundation of every subject. Simple routines — a short reading time each evening, asking questions about the story, and letting children choose their own books — make a lasting difference.",
    image: "/images/news-generic-2.jpg",
  },
  {
    slug: "how-we-use-feedback-to-improve-learning",
    title: "How We Use Feedback to Improve Learning",
    category: "News",
    topic: "Academics",
    readTime: "3 min read",
    excerpt:
      "Assessment is only useful when it changes what happens next. Our teachers use short checks, marked work and conversation to decide which pupils need support and which are ready for a greater challenge.",
    image: "/images/classroom-science.jpg",
  },
  {
    slug: "co-curricular-activities-return",
    title: "Co-Curricular Activities: Learning Beyond the Classroom",
    category: "Announcements",
    topic: "Student Life",
    readTime: "2 min read",
    excerpt:
      "Clubs, sports, creative activities and service opportunities give pupils a chance to discover what they enjoy, practise teamwork and grow in confidence outside the classroom.",
    image: "/images/student-life-sports.jpg",
  },
  {
    slug: "parents-as-partners-in-learning",
    title: "Parents as Partners in Learning",
    category: "News",
    topic: "Community",
    readTime: "3 min read",
    excerpt:
      "Home and school achieve more together. We share practical ways families can support the routines, reading habits and good conduct that are encouraged at MGGS.",
    image: "/images/giving-community.jpg",
  },
  {
    slug: "preparing-pupils-for-a-changing-world",
    title: "Preparing Pupils for a Changing World",
    category: "News",
    topic: "Academics",
    readTime: "4 min read",
    excerpt:
      "Strong literacy, numeracy and reasoning remain essential — but so do curiosity, communication and the confidence to solve unfamiliar problems. Our approach works on both at once.",
    image: "/images/innovation-studio.jpg",
  },
  {
    slug: "celebrating-effort-and-good-conduct",
    title: "Celebrating Effort and Good Conduct",
    category: "Announcements",
    topic: "Character & Values",
    readTime: "2 min read",
    excerpt:
      "Some of the most important achievements in school are quiet ones: steady improvement, kindness towards a classmate, honesty when it is difficult. We make a point of noticing and celebrating them.",
    image: "/images/news-generic-1.jpg",
  },
  {
    slug: "open-day-invitation",
    title: "You Are Invited: Visit MGGS",
    category: "Announcements",
    topic: "Admissions",
    readTime: "2 min read",
    excerpt:
      "Choosing a school is a big decision, and the best way to decide is to see the school for yourself. Prospective families are welcome to book a visit and meet our teachers.",
    image: "/images/admissions-student.png",
  },
  {
    slug: "supporting-pupils-wellbeing",
    title: "Supporting Every Pupil's Wellbeing",
    category: "News",
    topic: "Student Life",
    readTime: "3 min read",
    excerpt:
      "Children learn best when they feel safe, known and valued. Our teachers and pastoral staff work closely with families so that concerns are noticed early and addressed with care.",
    image: "/images/campus-courtyard.jpg",
  },
  {
    slug: "teachers-who-keep-learning",
    title: "Teachers Who Keep Learning",
    category: "News",
    topic: "Academics",
    readTime: "3 min read",
    excerpt:
      "Dedicated educators are at the heart of a good school. Regular training, shared planning and honest review of what is working help our teachers keep improving their practice.",
    image: "/images/students-collaborating.jpg",
  },
];

export const newsTypes = ["News", "Announcements"];
export const newsTopics = [
  "Academics",
  "Character & Values",
  "Student Life",
  "Community",
  "Admissions",
];
