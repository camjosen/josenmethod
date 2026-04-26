import type { ReactNode } from "react";
import type { FontKey } from "@reading_app/utils/fonts";
import { fontMetadata } from "@reading_app/utils/fonts";
import type { SoundDefinition } from "@reading_app/utils/sounds";
import type { Word as WordData } from "@reading_app/utils/words";
import type { StoryToolInput } from "@reading_app/tools/StoryTool/StoryTool";
import { Word } from "../components/Word";
import { Waveform } from "../reading_exercise/glyphs";
import type { ItemResult } from "../reading_exercise/state";
import type { SessionLessonActivity } from "./lessonAdapter";
import "./activity-preview.css";

export type PreviewSize = "lg" | "sm";

export interface PreviewProgress {
  currentItem: number;
  itemResults: Record<number, ItemResult>;
}

export interface ActivityPreviewProps {
  activity: SessionLessonActivity;
  progress?: PreviewProgress;
  size?: PreviewSize;
  font?: FontKey;
}

const FONT_SIZE: Record<PreviewSize, number> = { lg: 28, sm: 16 };

function soundToWord(sound: SoundDefinition): WordData {
  return { spelling: sound.characters, sounds: [sound] };
}

interface ItemSlotProps {
  children: ReactNode;
  progress?: PreviewProgress;
  idx: number;
}

function ItemSlot({ children, progress, idx }: ItemSlotProps) {
  if (!progress) return <span className="jm-preview-item">{children}</span>;
  const result = progress.itemResults[idx];
  const isCurrent = idx === progress.currentItem && result === undefined;
  const isDone = !isCurrent && (result !== undefined || idx < progress.currentItem);
  const cls = ["jm-preview-item"];
  if (isCurrent) cls.push("current");
  else if (!isDone) cls.push("pending");
  return <span className={cls.join(" ")}>{children}</span>;
}

function storyHeadline(input: StoryToolInput): string {
  type Slot = StoryToolInput["content"]["paragraphs"][number]["sentences"][number]["words"][number];
  const text = (slots: Slot[], maxWords?: number) => {
    const out: string[] = [];
    let count = 0;
    for (const slot of slots) {
      if (typeof slot === "string") {
        if (out.length > 0) out[out.length - 1] += slot;
      } else {
        out.push(slot.spelling);
        count++;
        if (maxWords != null && count >= maxWords) break;
      }
    }
    return out.join(" ");
  };

  if (input.content.title?.words?.length) return text(input.content.title.words);
  const first = input.content.paragraphs[0]?.sentences[0]?.words;
  if (!first) return "(empty story)";
  return `${text(first, 6)}…`;
}

export function ActivityPreview({ activity, progress, size = "lg", font }: ActivityPreviewProps) {
  const fontSize = FONT_SIZE[size];
  const cls = `jm-preview jm-preview-${size}`;
  const textFontFamily =
    font && font !== "custom" ? fontMetadata[font].fontFamily : "var(--re-font-display)";

  switch (activity.toolName) {
    case "SoundIntroduction":
      return (
        <div className={cls}>
          <ItemSlot progress={progress} idx={0}>
            <Word
              word={soundToWord(activity.input.sound)}
              font={font}
              fontSize={fontSize}
              showLongVowel
              showDigraph
            />
          </ItemSlot>
        </div>
      );

    case "ReadSounds":
      return (
        <div className={cls}>
          {activity.input.items.map((sound, i) => (
            <ItemSlot key={i} progress={progress} idx={i}>
              <Word
                word={soundToWord(sound)}
                font={font}
                fontSize={fontSize}
                showLongVowel
                showDigraph
              />
            </ItemSlot>
          ))}
        </div>
      );

    case "ReadWords":
      return (
        <div className={cls}>
          {activity.input.items.map((word, i) => (
            <ItemSlot key={i} progress={progress} idx={i}>
              <Word
                word={word}
                font={font}
                fontSize={fontSize}
                showLongVowel={false}
                showDigraph={false}
                showSilent={false}
              />
            </ItemSlot>
          ))}
        </div>
      );

    case "Writing":
      return (
        <div className={`${cls} jm-preview-writing`}>
          {activity.input.items.map((task, i) => {
            const word: WordData = "spelling" in task ? task : soundToWord(task);
            return (
              <ItemSlot key={i} progress={progress} idx={i}>
                <Word
                  word={word}
                  font={font}
                  fontSize={fontSize}
                  showLongVowel={false}
                  showDigraph={false}
                  showSilent={false}
                />
              </ItemSlot>
            );
          })}
        </div>
      );

    case "Rhyming":
      return (
        <div className={cls}>
          {activity.input.items.map((rhyme, i) => (
            <ItemSlot key={i} progress={progress} idx={i}>
              <span
                className="jm-preview-rhyme"
                style={{ fontSize, fontFamily: textFontFamily }}
              >
                {rhyme.startingSound.characters}__
              </span>
            </ItemSlot>
          ))}
        </div>
      );

    case "VerbalBlending": {
      const wave = size === "lg" ? 22 : 14;
      return (
        <div className={cls}>
          {activity.input.items.map((_, i) => (
            <ItemSlot key={i} progress={progress} idx={i}>
              <span
                className="jm-preview-waveform"
                style={{ width: wave * 2, height: wave, display: "inline-block" }}
              >
                <Waveform />
              </span>
            </ItemSlot>
          ))}
        </div>
      );
    }

    case "Story":
      return (
        <div className={`${cls} jm-preview-story`}>
          <ItemSlot progress={progress} idx={0}>
            <span style={{ fontSize, fontFamily: textFontFamily }}>
              {storyHeadline(activity.input)}
            </span>
          </ItemSlot>
        </div>
      );
  }
}
