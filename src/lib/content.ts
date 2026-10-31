export type Instructor = {
  slug: string;
  name: string;
  title: string;
  image: string;
  ranks: string[];
  styles: string[];
  bio: string[];
};

export const instructors: Instructor[] = [
  {
    slug: "sifu-joe",
    name: "Sifu Joe",
    title: "Co-founder of PUMA · Certified IKCA Instructor",
    image: "/images/instructors/sifu-joe.jpg",
    ranks: ["Certified IKCA Instructor", "Co-developer of PUMA"],
    styles: ["Practical Kenpo", "Shotokan", "American Kenpo", "Chinese Kenpo"],
    bio: [
      "Sifu Joe is a seasoned martial artist and longtime instructor. His foundation is a practical Kenpo style based on Greg Payne's blend of Shotokan, American, and Chinese Kenpo.",
      "He is a certified IKCA instructor, and was invited by Grandmasters Vic LeRoux and Chuck Sullivan to contribute to a summit on the art's future.",
      "Alongside his brother Joshua, he co-developed PUMA (Practical Unified Martial Arts). Sifu Joe's teaching emphasizes solid fundamentals, an open approach to applying motion, and spontaneity.",
    ],
  },
  {
    slug: "greg-payne",
    name: "Greg Payne",
    title: "8th-Degree Black Belt · Chinese Kenpo Karate",
    image: "/images/instructors/greg-payne.jpg",
    ranks: ["8th-Degree Black Belt, Chinese Kenpo Karate", "U.S. Navy Veteran"],
    styles: ["Kodokan Judo", "Goju-Ryu USA", "Shotokan Karate", "Chinese Kenpo Karate"],
    bio: [
      "Sifu Greg Payne traces his roots from St. Thomas, U.S. Virgin Islands to New York City.",
      "His martial arts foundation spans Kodokan Judo, Goju-Ryu USA under Peter Urban, Shotokan Karate under Philip McCrae (4th Dan), and Chinese Kenpo Karate, in which he holds an 8th-degree black belt.",
      "A U.S. Navy veteran and holder of a B.S. in Agronomical Studies from Northwest Missouri State University, he currently works as a Corporate Executive Chef in the Federal Government. His lifelong dedication to the martial arts brings a deep, multi-disciplinary perspective to PUMA.",
    ],
  },
  {
    slug: "master-zarate",
    name: "Master Zarate",
    title: "5th Dan Hapkido · Master Instructor of Hapkido",
    image: "/images/instructors/master-zarate.png",
    ranks: ["5th Dan, Hapkido", "Founder, Cheong Kyum Hapkido Association"],
    styles: ["Hapkido"],
    bio: [
      "Master Gabriel Zarate began his martial arts journey with Hapkido in 1970, and has accumulated over four decades on the martial path.",
      "A Mechanical Engineer and certified Project Manager, he has served as a self-defense instructor for the Armed Forces in Cali, Colombia, and has trained the Army and National Police of Ecuador.",
      "He is the founder of the Cheong Kyum Hapkido Association, with chapters across Colombia and multiple U.S. cities, and holds the rank of 5th Dan in Hapkido. Master Zarate currently serves as Master Instructor of Hapkido within PUMA, bringing a lifetime of martial discipline and international experience.",
    ],
  },
];

export const getInstructor = (slug: string) => instructors.find((i) => i.slug === slug)!;

export const gallery = [
  { src: "/images/gallery/gallery-1.jpg", w: 490, h: 742, alt: "Students sparring on the mat" },
  { src: "/images/home/why.jpg", w: 960, h: 640, alt: "Puma Academy instructors together" },
  { src: "/images/gallery/gallery-2.jpg", w: 1600, h: 1200, alt: "Instructors at the academy" },
  { src: "/images/gallery/gallery-3.jpg", w: 826, h: 1241, alt: "Partner drills in black uniforms" },
  { src: "/images/instructors/greg-payne.jpg", w: 1240, h: 804, alt: "Greg Payne demonstrating a strike" },
  { src: "/images/gallery/gallery-4.jpg", w: 720, h: 960, alt: "Ground defense technique" },
  { src: "/images/gallery/gallery-5.jpg", w: 542, h: 776, alt: "Student in stance with white belt" },
  { src: "/images/gallery/gallery-6.jpg", w: 1066, h: 1600, alt: "Knee strike drill" },
  { src: "/images/home/hero-1.jpg", w: 1080, h: 720, alt: "High kick during class" },
  { src: "/images/home/about.jpg", w: 682, h: 834, alt: "Heavy bag training" },
  { src: "/images/home/hero-2.jpg", w: 915, h: 608, alt: "Hapkido throw" },
  { src: "/images/home/hero-3.jpg", w: 960, h: 640, alt: "Group Kenpo class" },
  { src: "/images/home/faq.jpg", w: 960, h: 640, alt: "Kickboxing on the heavy bag" },
  { src: "/images/classes/warrior-scholar.jpg", w: 1600, h: 1200, alt: "Self-defense practice" },
];

export const testimonial = {
  quote: [
    "PumaKenpo has transformed my life!",
    "The instructors are incredibly knowledgeable and supportive, making every class enjoyable.",
    "I’ve gained confidence, improved my fitness, and learned valuable self-defense skills.",
    "Highly recommend this academy to anyone looking to enhance their martial arts journey!",
  ],
  name: "Courtney Davis",
  role: "PumaKenpo Academy",
  avatar: "/images/home/testimonial-avatar.jpg",
};

export const faqs = [
  {
    q: "Do I need prior martial arts experience?",
    a: "No. Every program — Kenpo, Hapkido, Silat, Kickboxing and Warrior Scholar — welcomes complete beginners as well as experienced practitioners.",
  },
  {
    q: "What should I wear and bring to class?",
    a: "Wear comfortable training or athletic clothes and bring a water bottle. For Kickboxing, bring boxing gloves if you have them; Warrior Scholar students may bring a notebook to record concepts.",
  },
  {
    q: "Do you have programs for kids?",
    a: "Yes. Ninja Cubs & Little Samurais train on Monday, Wednesday and Friday evenings, and Warrior Scholar is our after-school program focused on leadership, discipline and character.",
  },
  {
    q: "How much does membership cost?",
    a: "Please contact the academy for current pricing — we'll help you find the right program and schedule.",
  },
  {
    q: "Where are you located?",
    a: "19725 Germantown Road, Suite G, Germantown, MD 20874. Office hours are Mon – Fri 10:00 am — 9:00 pm, Sat 9:00 am — 5:00 pm and Sun 11:00 am — 2:00 pm.",
  },
  {
    q: "How do I sign up?",
    a: "Complete the Participation Form online, or call (301) 569-1335 / email contact@pumakenpo.com and we'll get you on the mat.",
  },
];
