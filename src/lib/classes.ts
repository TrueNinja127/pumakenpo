export type ClassCategory = "martial-arts" | "fitness" | "youth" | "seminars";

export type TrainingClass = {
  slug: string;
  name: string;
  short: string;
  category: ClassCategory;
  image: string;
  instructor: string; // instructor slug
  intro: string[];
  highlights: string[];
  bring: string;
  /** Label of this class in the weekly timetable, used to derive days/times. */
  scheduleKey?: string;
  /** For one-off events (seminars). */
  event?: { date: string; time: string; note: string };
  scheduleNote?: string;
};

export const categories: { id: ClassCategory | "all"; label: string }[] = [
  { id: "all", label: "All Programs" },
  { id: "martial-arts", label: "Martial Arts" },
  { id: "fitness", label: "Fitness" },
  { id: "youth", label: "Youth" },
  { id: "seminars", label: "Seminars" },
];

export const classes: TrainingClass[] = [
  {
    slug: "kenpo",
    name: "Kenpo",
    short: "Practical self-defense blending traditional technique with modern application.",
    category: "martial-arts",
    image: "/images/home/hero-3.jpg",
    instructor: "sifu-joe",
    intro: [
      "Kenpo is a practical self-defense martial art that combines traditional techniques with modern applications.",
      "Students develop striking skills, defensive movement, coordination, confidence and physical fitness. Suitable for beginners as well as experienced practitioners.",
    ],
    highlights: ["Striking skills", "Defensive movement", "Coordination", "Confidence & fitness"],
    bring: "No prior experience is required. Wear comfortable training clothes and bring a water bottle.",
    scheduleKey: "Kenpo",
  },
  {
    slug: "hapkido",
    name: "Hapkido",
    short: "Korean art of joint locks, throws, strikes and defensive technique.",
    category: "martial-arts",
    image: "/images/home/hero-2.jpg",
    instructor: "master-zarate",
    intro: [
      "Hapkido is a Korean martial art focused on self-defense through joint locks, throws, strikes and defensive techniques.",
      "Training develops balance, flexibility and confidence, and classes are open to students of all experience levels. Our Hapkido is taught in the Cheong Kyum Hapkido (CKA) tradition.",
    ],
    highlights: ["Joint locks", "Throws", "Strikes", "Balance & flexibility"],
    bring: "No prior martial arts experience is required. Wear comfortable training clothing and bring a water bottle to each session.",
    scheduleKey: "CKA Hapkido",
  },
  {
    slug: "warrior-scholar",
    name: "Warrior Scholar",
    short: "Our after-school program — martial arts, leadership and character.",
    category: "youth",
    image: "/images/classes/warrior-scholar.jpg",
    instructor: "sifu-joe",
    intro: [
      "Warrior Scholar blends martial arts principles with personal growth, leadership, discipline and strategic thinking.",
      "Training builds physical and mental skills, confidence and character. Getting ready for school? How about after school? Check in with us about the program.",
    ],
    highlights: ["Leadership", "Discipline", "Strategic thinking", "Character"],
    bring: "No prior experience is required. Students may bring a notebook to record concepts.",
    scheduleNote: "After-school program — contact the academy for current days and times.",
  },
  {
    slug: "silat",
    name: "Silat",
    short: "Traditional Southeast Asian art built for close-range, real-world defense.",
    category: "martial-arts",
    image: "/images/classes/silat.jpg",
    instructor: "sifu-joe",
    intro: [
      "Silat is a traditional Southeast Asian martial art centered on practical self-defense, close-range technique, movement and real-world application.",
      "Students build coordination, agility, confidence and defensive awareness. Suitable for beginners and experienced martial artists.",
    ],
    highlights: ["Close-range technique", "Movement", "Agility", "Defensive awareness"],
    bring: "No prior experience is required. Wear comfortable athletic clothing.",
    scheduleKey: "Silat",
  },
  {
    slug: "kickboxing",
    name: "Kickboxing",
    short: "Striking, conditioning and cardio for strength, stamina and confidence.",
    category: "fitness",
    image: "/images/home/faq.jpg",
    instructor: "sifu-joe",
    intro: [
      "Kickboxing blends striking, conditioning and cardio work to build strength, stamina, coordination and confidence.",
      "The class suits total beginners and experienced students who want better fitness and sharper striking skills.",
    ],
    highlights: ["Striking", "Conditioning", "Cardio", "Stamina"],
    bring: "No prior experience is required. Wear comfortable workout clothes and bring boxing gloves if you have them.",
    scheduleKey: "Kickboxing",
  },
  {
    slug: "featured-seminar",
    name: "Featured Seminar",
    short: "Special training events with advanced instruction and guest instructors.",
    category: "seminars",
    image: "/images/classes/featured-seminar.jpg",
    instructor: "sifu-joe",
    intro: [
      "Our featured seminar is a special training event that may offer advanced instruction, guest instructors or a focused martial arts topic.",
      "Details, requirements and schedules are updated when each new event is announced.",
    ],
    highlights: ["Advanced instruction", "Guest instructors", "Focused topics", "All members welcome"],
    bring: "Seminar requirements will be announced with each event.",
    event: { date: "July 1, 2026", time: "5:00 pm – 7:00 pm", note: "Featured Seminar" },
  },
  {
    slug: "upcoming-seminars",
    name: "Upcoming Seminars",
    short: "Future special training events hosted by Puma Academy.",
    category: "seminars",
    image: "/images/classes/upcoming-seminars.jpg",
    instructor: "sifu-joe",
    intro: [
      "Upcoming seminars are special training events hosted by Puma Academy.",
      "Requirements differ by seminar, so please review each seminar announcement before registering.",
    ],
    highlights: ["Special events", "Guest masters", "Workshops", "Community"],
    bring: "Requirements differ by seminar — review each announcement before registering.",
    event: { date: "August 6, 2026", time: "5:00 pm – 8:00 pm", note: "Special Event" },
  },
];

export const getClass = (slug: string) => classes.find((c) => c.slug === slug);
