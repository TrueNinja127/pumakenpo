// Transcribed from the official timetable (puma-kenpo-schedule-08-03-2026).
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof days)[number];

export type Session = { time: string; hour: number; name: string; slug?: string };

const slugFor: Record<string, string> = {
  Kenpo: "kenpo",
  "CKA Hapkido": "hapkido",
  Kickboxing: "kickboxing",
  Silat: "silat",
};

const s = (hour: number, name: string): Session => {
  const h12 = hour > 12 ? hour - 12 : hour;
  const time = `${String(h12).padStart(2, "0")}:00 ${hour >= 12 ? "PM" : "AM"}`;
  return { time, hour, name, slug: slugFor[name] };
};

const evening = (a: string, b: string) => [s(18, a), s(19, b), s(20, b), s(21, b)];

export const timetable: Record<Day, Session[]> = {
  Monday: [s(10, "Kickboxing"), ...evening("Ninja Cubs & Little Samurais", "Kenpo")],
  Tuesday: [s(10, "Kickboxing"), ...evening("Kickboxing", "CKA Hapkido")],
  Wednesday: [s(10, "Kickboxing"), ...evening("Ninja Cubs & Little Samurais", "Kenpo")],
  Thursday: [s(10, "Kickboxing"), ...evening("Kickboxing", "CKA Hapkido")],
  Friday: [s(10, "Kickboxing"), ...evening("Ninja Cubs & Little Samurais", "Silat")],
  Saturday: [],
  Sunday: [s(11, "Silat"), s(12, "Silat"), s(13, "Silat"), s(14, "Silat")],
};

export const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM → 9 PM

export function sessionsFor(name: string) {
  return days
    .map((day) => ({ day, times: timetable[day].filter((x) => x.name === name).map((x) => x.time) }))
    .filter((d) => d.times.length > 0);
}

export const announcements = [
  { name: "Kenpo", info: "Monday – Wednesday · 6 – 9 PM" },
  { name: "Ninja Cubs", info: "Monday – Wednesday · 6 – 9 PM" },
  { name: "Hapkido", info: "Tuesday – Thursday · 6 – 9 PM" },
  { name: "Little Samurai", info: "Monday – Wednesday · 6 – 9 PM" },
  { name: "Grappling", info: "Classes Forming Now! — Call or Message Today", highlight: true },
  { name: "Warrior-Scholar", info: "Open House Feb 21st · 1 PM", highlight: true },
  { name: "Kickboxing", info: "Monday – Wednesday · 6 – 9 PM" },
  { name: "Tactical Training", info: "Monday – Wednesday · 6 – 9 PM" },
];
