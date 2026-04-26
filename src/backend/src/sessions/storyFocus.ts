import { lessons } from "../../../reading_app/static_curriculum/lessons.ts";
import type { StoryToolInput } from "../../../reading_app/tools/StoryTool/StoryTool.ts";
import type { StoryFocus } from "./types.ts";

export type Granularity = "word" | "sentence" | "paragraph";

type Sentence = StoryToolInput["content"]["paragraphs"][number]["sentences"][number];

function getActivity(
  lessonIdx: number,
  activityIdx: number,
): readonly [string, unknown] | null {
  const lesson = lessons[lessonIdx];
  if (!lesson) return null;
  const a = lesson.activities[activityIdx];
  return a ?? null;
}

export function getStoryGranularity(
  lessonIdx: number,
  activityIdx: number,
): { input: StoryToolInput; granularity: Granularity } | null {
  const activity = getActivity(lessonIdx, activityIdx);
  if (!activity) return null;
  const [name, rawInput] = activity;
  if (name !== "Story") return null;
  const input = rawInput as StoryToolInput;
  const dsa =
    input.firstReading.scaffolding?.directStudentAttention ??
    input.secondReading?.scaffolding?.directStudentAttention;
  if (!dsa) return null;
  const granularity: Granularity =
    dsa === "each_word" ? "word" : dsa === "each_sentence" ? "sentence" : "paragraph";
  return { input, granularity };
}

function isPunct(slot: Sentence["words"][number]): boolean {
  return typeof slot === "string";
}

function firstWordIdxIn(sent: Sentence): number {
  for (let i = 0; i < sent.words.length; i++) {
    if (!isPunct(sent.words[i]!)) return i;
  }
  return -1;
}

function lastWordIdxIn(sent: Sentence): number {
  for (let i = sent.words.length - 1; i >= 0; i--) {
    if (!isPunct(sent.words[i]!)) return i;
  }
  return -1;
}

export function firstFocus(
  input: StoryToolInput,
  granularity: Granularity,
): StoryFocus | null {
  const paragraphs = input.content.paragraphs;
  if (paragraphs.length === 0) return null;
  if (granularity === "paragraph") return { paragraphIdx: 0 };
  if (granularity === "sentence") {
    for (let pi = 0; pi < paragraphs.length; pi++) {
      if (paragraphs[pi]!.sentences.length > 0) {
        return { paragraphIdx: pi, sentenceIdx: 0 };
      }
    }
    return null;
  }
  for (let pi = 0; pi < paragraphs.length; pi++) {
    const sentences = paragraphs[pi]!.sentences;
    for (let si = 0; si < sentences.length; si++) {
      const wi = firstWordIdxIn(sentences[si]!);
      if (wi >= 0) return { paragraphIdx: pi, sentenceIdx: si, wordIdx: wi };
    }
  }
  return null;
}

export function nextFocus(
  input: StoryToolInput,
  granularity: Granularity,
  current: StoryFocus,
): StoryFocus | null {
  const paragraphs = input.content.paragraphs;

  if (granularity === "paragraph") {
    const next = current.paragraphIdx + 1;
    return next < paragraphs.length ? { paragraphIdx: next } : null;
  }

  if (granularity === "sentence") {
    const para = paragraphs[current.paragraphIdx];
    if (!para) return null;
    const nextSentence = (current.sentenceIdx ?? 0) + 1;
    if (nextSentence < para.sentences.length) {
      return { paragraphIdx: current.paragraphIdx, sentenceIdx: nextSentence };
    }
    for (let pi = current.paragraphIdx + 1; pi < paragraphs.length; pi++) {
      if (paragraphs[pi]!.sentences.length > 0) {
        return { paragraphIdx: pi, sentenceIdx: 0 };
      }
    }
    return null;
  }

  // word
  const para = paragraphs[current.paragraphIdx];
  if (!para) return null;
  const sentIdx = current.sentenceIdx ?? 0;
  const sent = para.sentences[sentIdx];
  if (!sent) return null;

  for (let wi = (current.wordIdx ?? 0) + 1; wi < sent.words.length; wi++) {
    if (!isPunct(sent.words[wi]!)) {
      return { paragraphIdx: current.paragraphIdx, sentenceIdx: sentIdx, wordIdx: wi };
    }
  }
  for (let si = sentIdx + 1; si < para.sentences.length; si++) {
    const wi = firstWordIdxIn(para.sentences[si]!);
    if (wi >= 0) {
      return { paragraphIdx: current.paragraphIdx, sentenceIdx: si, wordIdx: wi };
    }
  }
  for (let pi = current.paragraphIdx + 1; pi < paragraphs.length; pi++) {
    const sentences = paragraphs[pi]!.sentences;
    for (let si = 0; si < sentences.length; si++) {
      const wi = firstWordIdxIn(sentences[si]!);
      if (wi >= 0) return { paragraphIdx: pi, sentenceIdx: si, wordIdx: wi };
    }
  }
  return null;
}

export function prevFocus(
  input: StoryToolInput,
  granularity: Granularity,
  current: StoryFocus,
): StoryFocus | null {
  const paragraphs = input.content.paragraphs;

  if (granularity === "paragraph") {
    const prev = current.paragraphIdx - 1;
    return prev >= 0 ? { paragraphIdx: prev } : null;
  }

  if (granularity === "sentence") {
    const sentIdx = current.sentenceIdx ?? 0;
    if (sentIdx > 0) {
      return { paragraphIdx: current.paragraphIdx, sentenceIdx: sentIdx - 1 };
    }
    for (let pi = current.paragraphIdx - 1; pi >= 0; pi--) {
      const sentences = paragraphs[pi]!.sentences;
      if (sentences.length > 0) {
        return { paragraphIdx: pi, sentenceIdx: sentences.length - 1 };
      }
    }
    return null;
  }

  // word
  const para = paragraphs[current.paragraphIdx];
  if (!para) return null;
  const sentIdx = current.sentenceIdx ?? 0;
  const sent = para.sentences[sentIdx];
  if (!sent) return null;

  for (let wi = (current.wordIdx ?? 0) - 1; wi >= 0; wi--) {
    if (!isPunct(sent.words[wi]!)) {
      return { paragraphIdx: current.paragraphIdx, sentenceIdx: sentIdx, wordIdx: wi };
    }
  }
  for (let si = sentIdx - 1; si >= 0; si--) {
    const wi = lastWordIdxIn(para.sentences[si]!);
    if (wi >= 0) {
      return { paragraphIdx: current.paragraphIdx, sentenceIdx: si, wordIdx: wi };
    }
  }
  for (let pi = current.paragraphIdx - 1; pi >= 0; pi--) {
    const sentences = paragraphs[pi]!.sentences;
    for (let si = sentences.length - 1; si >= 0; si--) {
      const wi = lastWordIdxIn(sentences[si]!);
      if (wi >= 0) return { paragraphIdx: pi, sentenceIdx: si, wordIdx: wi };
    }
  }
  return null;
}
