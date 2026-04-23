import type { Word } from "@reading_app/utils/words";
import { words } from "@reading_app/utils/words";

export type ActivityType = "read" | "listen" | "speak" | "star";

export interface Activity {
  id: string;
  type: ActivityType;
  items: Word[];
}

export interface Lesson {
  id: string;
  activities: Activity[];
}

const w = (spelling: keyof typeof words): Word => words[spelling];

export const SAMPLE_LESSON: Lesson = {
  id: "lesson-1",
  activities: [
    { id: "a1", type: "read", items: [w("cat"), w("dog"), w("pig")] },
    { id: "a2", type: "listen", items: [w("sun"), w("hat"), w("bed")] },
    { id: "a3", type: "read", items: [w("run"), w("fun"), w("hit"), w("red")] },
    { id: "a4", type: "speak", items: [w("fit"), w("mud")] },
    { id: "a5", type: "star", items: [w("top"), w("log"), w("hop")] },
  ],
};
