export type ToolName =
  | "ReadSounds"
  | "SoundIntroduction"
  | "ReadWords"
  | "Rhyming"
  | "VerbalBlending"
  | "Writing"
  | "Story";

interface FlowCopy {
  label: string;
  teacher: string;
}

const FLOW_COPY: Record<ToolName, Record<string, FlowCopy>> = {
  ReadSounds: {
    reintroduction: { label: "Reintroduce", teacher: "Reintroduce the sound without the full intro." },
    say_it_slowly: { label: "Slowly", teacher: "Student says the sound slowly (hold it)." },
    say_it_fast: { label: "Fast", teacher: "Student says the sound the normal way." },
  },
  SoundIntroduction: {
    // No flow steps — the whole activity is a single introduction.
  },
  ReadWords: {
    recall_sounds: { label: "Recall sounds", teacher: "Student recalls each sound in turn." },
    teacher_blends: { label: "Teacher blends", teacher: "You say the word slowly, blending sounds." },
    guided_sound_it_out: { label: "Guided sound-out", teacher: "Prompt each sound, then the student blends." },
    sound_it_out: { label: "Sound it out", teacher: "Student sounds the word out on their own." },
    blend: { label: "Blend", teacher: "Student says the word slowly, without stopping." },
    say_it_fast: { label: "Fast", teacher: "Student says the word the normal (fast) way." },
  },
  Rhyming: {
    read_start: { label: "Read start", teacher: "Student says the starting sound." },
    hear_ending: { label: "Hear ending", teacher: "You say the ending aloud." },
    blend: { label: "Blend", teacher: "Student blends the rhyme slowly." },
    say_it_fast: { label: "Fast", teacher: "Student says the rhyme quickly." },
  },
  VerbalBlending: {
    guided_blending: { label: "Guided blend", teacher: "You blend the sounds together with the student." },
    blend: { label: "Blend", teacher: "Student says the sounds slowly without stopping." },
    say_it_fast: { label: "Fast", teacher: "Student says the word the fast way." },
  },
  Writing: {
    // No formal flow steps; each item is a single "practice" task.
  },
  Story: {
    title_reading: { label: "Title", teacher: "Student reads the story title." },
    guided_sound_it_out: { label: "Guided sound-out", teacher: "Guide the student word by word." },
    sound_it_out: { label: "Sound it out", teacher: "Student sounds out each word on their own." },
    sound_it_out_with_questions: { label: "Sound out + Qs", teacher: "Student sounds it out; ask the questions along the way." },
    teacher_models_say_it_fast: { label: "Teacher models", teacher: "You model reading at a normal pace." },
    guided_say_it_fast: { label: "Guided fluency", teacher: "Student reads sentences at a fluent pace." },
    say_it_fast: { label: "Fluent", teacher: "Student reads at a normal, fluent pace." },
    say_it_fast_with_questions: { label: "Fluent + Qs", teacher: "Student reads fluently; ask the questions." },
    word_finding: { label: "Word finding", teacher: "Ask the student to find the focus word(s)." },
  },
};

export function flowCopyFor(tool: ToolName, step: string): FlowCopy {
  return FLOW_COPY[tool]?.[step] ?? { label: step, teacher: "" };
}

interface ModificationCopy {
  short: string;
  teacher: string;
}

const MOD_COPY: Record<string, ModificationCopy> = {
  require_touch: { short: "Touch", teacher: "Require the student to touch each sound as they say it." },
  repeat_until_firm: { short: "Repeat", teacher: "Repeat until all items are fluent." },
  teach_silent_letters: { short: "Silent letters", teacher: "Explain silent letters — small and skipped." },
  teach_funny_words: { short: "Funny words", teacher: "Introduce this as a funny word — sounds don't match." },
  teacher_models: { short: "Model first", teacher: "Demonstrate before the student tries." },
};

export function modificationCopy(mod: string): ModificationCopy {
  return MOD_COPY[mod] ?? { short: mod, teacher: "" };
}
