// Headlines, categories, topics, read-times and excerpts reproduced verbatim
// from https://branksome.on.ca/branksome-news/ (fetched Phase 2). Full body
// copy for the detail view is a short, honestly-labelled summary expansion
// of the public excerpt — not an invented narrative — since full article
// bodies were not scraped.

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
    slug: "nytimes-journalist-elizabeth-dias04-returns-to-branksome",
    title: "NYTimes Journalist Elizabeth DIAS'04 Returns to Branksome for PrincipalED Season 3 Premiere",
    category: "News",
    topic: "Community Engagement",
    readTime: "2 min read",
    excerpt:
      "In the Season 3 premiere of PrincipalED, Principal Grace McCallum sits down with Elizabeth DIAS'04 — national religion correspondent for The New York Times and co-author of The Fall of Roe: The Rise of a New America.",
    image: "/images/news-generic-2.jpg",
  },
  {
    slug: "branksome-hall-hosts-200-women-canadian-premiere",
    title: "Branksome Hall Hosts '200 Women' Canadian Premiere",
    category: "News",
    topic: "Arts",
    readTime: "2 min read",
    excerpt:
      "This fall, Branksome Hall proudly hosts the Canadian premiere of 200 Women: Who Will Change the Way You See the World, celebrating the global portrait exhibition's 10th anniversary.",
    image: "/images/news-generic-1.jpg",
  },
  {
    slug: "noodle-program-evolves",
    title: "Branksome's Noodle Program Evolves: From Selling Fast to Solving Problems",
    category: "News",
    topic: "Clubs",
    readTime: "4 min read",
    excerpt:
      "Now anchored in its new headquarters in iCAST, Noodle is introducing some of its most significant changes yet, moving participants from high-volume product sales to developing true entrepreneurial and design thinking.",
    image: "/images/innovation-studio.jpg",
  },
  {
    slug: "2026-installation-speech",
    title: "2026 Installation Speech",
    category: "News",
    readTime: "6 min read",
    excerpt:
      "Today, we do something important. We formally recognize those who have chosen to step forward and lead, and remember someone who understood deeply what it means to use your voice.",
    image: "/images/students-collaborating.jpg",
  },
  {
    slug: "mirvish-production-13-going-on-30",
    title: "Branksome Arts Students Cast in Mirvish Production of 13 Going on 30: The Musical",
    category: "News",
    topic: "Arts",
    readTime: "3 min read",
    excerpt:
      "Two Branksome Hall students are stepping into the spotlight on a major professional stage, cast in the upcoming Mirvish production running December 2026 to January 2027.",
    image: "/images/news-generic-1.jpg",
  },
  {
    slug: "k-12-centre-for-girls-in-stem",
    title: "Branksome Hall Opens Canada's First K–12 Centre for Girls in STEM, Innovation, Entrepreneurship and the Arts",
    category: "News",
    topic: "Arts",
    readTime: "5 min read",
    excerpt:
      "What if a student could learn physics by working backstage in a theatre, develop a business idea down the hall, or move from coding a robot to producing a podcast, all in the same school day?",
    image: "/images/innovation-studio.jpg",
  },
  {
    slug: "welcoming-kathryn-barnes-deputy-principal",
    title: "A Branksome Homecoming: Welcoming Kathryn Barnes, Deputy Principal",
    category: "News",
    readTime: "3 min read",
    excerpt:
      "Kathryn Barnes has officially started her role as Branksome's new Deputy Principal, marking a meaningful return for an educator whose roots run deep within the school's community.",
    image: "/images/students-collaborating.jpg",
  },
  {
    slug: "remembering-aija-zommers",
    title: "Remembering Aija Zommers, History Teacher and Head Debate Coach",
    category: "News",
    readTime: "2 min read",
    excerpt:
      "Branksome Hall remembers former educator and debate coach Aija Zommers, celebrating her decades of dedication to public speaking, critical thought and student mentorship.",
    image: "/images/classroom-science.jpg",
  },
  {
    slug: "principaled-wins-case-award",
    title: "PrincipalED Podcast Wins Silver 2026 CASE Circle of Excellence Award",
    category: "Awards",
    topic: "Innovation",
    readTime: "2 min read",
    excerpt:
      "Branksome Hall has won a Silver 2026 Circle of Excellence Award from The Council for Advancement and Support of Education (CASE) for the PrincipalED podcast.",
    image: "/images/news-generic-2.jpg",
  },
  {
    slug: "kristin-mckinnon05-fifa-world-cup",
    title: "Kristin McKINNON'05 is Shaping Toronto's World Cup",
    category: "News",
    readTime: "3 min read",
    excerpt:
      "Kristin McKINNON'05 is part of the communications team behind the City of Toronto's FIFA World Cup events.",
    image: "/images/campus-courtyard.jpg",
  },
  {
    slug: "a-new-middle-school-experience",
    title: "A New Middle School Experience",
    category: "News",
    topic: "IB/Academics",
    readTime: "3 min read",
    excerpt:
      "The Middle School model is distinctly designed for the unique social, cognitive and well-being needs of Grades 7 and 8 students, bridging Junior School and Senior School with confidence.",
    image: "/images/classroom-science.jpg",
  },
  {
    slug: "scrubbing-in-medical-leaders",
    title: "Scrubbing In: Innovative New Program Empowers Next Generation of Female Medical Leaders",
    category: "News",
    topic: "IB/Academics",
    readTime: "5 min read",
    excerpt:
      "Twenty-two Branksome Hall students traded their kilts for surgical scrubs at St. Michael's Hospital, exploring a bold new pipeline for future medical leaders.",
    image: "/images/classroom-science.jpg",
  },
];

export const newsTypes = ["News", "Awards"];
export const newsTopics = ["Community Engagement", "Arts", "Clubs", "Innovation", "IB/Academics"];
