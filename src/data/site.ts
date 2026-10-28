// School identity and shared content for Marvellous Greatness Group of Schools (MGGS).
// Only details supplied by the school are stated as fact. Anything the school
// still needs to confirm (street address, telephone, email, fee schedule,
// social accounts) is kept as a clearly identifiable placeholder so it can be
// filled in without touching layout or components.

export const siteInfo = {
  name: "Marvellous Greatness Group of Schools",
  shortName: "MGGS",
  monogram: "MGGS",
  motto: "Towards Greatness.",
  tagline: "Quality education, strong character, a brighter future.",
  location: {
    area: "Akobo–Ojurin",
    city: "Ibadan",
    state: "Oyo State",
    country: "Nigeria",
  },
  address: {
    line1: "Akobo–Ojurin",
    line2: "Ibadan, Oyo State",
    country: "Nigeria",
    // PLACEHOLDER: the school should supply its street address.
    streetPlaceholder: "Street address to be confirmed",
  },
  // PLACEHOLDER: the school should supply its telephone number and email.
  contact: {
    phonePlaceholder: "Telephone number to be confirmed",
    emailPlaceholder: "Email address to be confirmed",
    hoursPlaceholder: "Office hours to be confirmed",
  },
  // PLACEHOLDER: official social accounts can be added here once confirmed.
  socials: [] as { label: string; href: string }[],
};

export interface SchoolValue {
  icon: string;
  title: string;
  description: string;
}

export const schoolValues: SchoolValue[] = [
  {
    icon: "🧭",
    title: "Discipline",
    description:
      "Order, punctuality and respect for self and others shape a calm, purposeful school day.",
  },
  {
    icon: "🤝",
    title: "Dedication",
    description:
      "Pupils, teachers and families give their best to the work of learning — every single day.",
  },
  {
    icon: "⭐",
    title: "Excellent Performance",
    description:
      "We set high expectations, track steady progress and celebrate genuine achievement.",
  },
  {
    icon: "🌟",
    title: "Towards Greatness",
    description:
      "Our motto is a daily commitment: small, consistent steps that lead to lasting greatness.",
  },
];

// Admissions is described as a sequence of steps rather than a calendar, so no
// dates are published until the school confirms its own timeline.
export const admissionsSteps = [
  {
    title: "1. Get in touch",
    detail:
      "Call or visit the school office to tell us about your child and the class you are considering. We will explain what happens next.",
  },
  {
    title: "2. Visit MGGS",
    detail:
      "Tour the school, meet our teachers and see a typical school day. You are welcome to ask us anything.",
  },
  {
    title: "3. Complete the application",
    detail:
      "Submit the school's application form together with the documents the office requests. Diagnostic assessments may be arranged where needed.",
  },
  {
    title: "4. Receive your offer",
    detail:
      "The school reviews each application and confirms placements. Once you accept, we welcome your family into the MGGS community.",
  },
];
