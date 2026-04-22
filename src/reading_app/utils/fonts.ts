import { z } from "zod/v4";

export const fontKeySchema = z.enum([
  "serif",
  "sans-serif",
  "monospace",
  "manuscript",
]);
export type FontKey = z.infer<typeof fontKeySchema>;

export const fontSchema = z.object({
  font: fontKeySchema,
});
export type Font = z.infer<typeof fontSchema>;

export const fontMetadata: Record<
  FontKey,
  {
    label: string;
    fontFamily: string;
    googleFamilyParam: string;
  }
> = {
  serif: {
    label: "Serif",
    fontFamily: '"Literata", serif',
    googleFamilyParam:
      "Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900",
  },
  "sans-serif": {
    label: "Sans-serif",
    fontFamily: '"Andika", sans-serif',
    googleFamilyParam: "Andika:ital,wght@0,400;0,700;1,400;1,700",
  },
  monospace: {
    label: "Monospace",
    fontFamily: '"Courier Prime", monospace',
    googleFamilyParam: "Courier+Prime:ital,wght@0,400;0,700;1,400;1,700",
  },
  manuscript: {
    label: "Manuscript",
    fontFamily: '"Patrick Hand", cursive',
    googleFamilyParam: "Patrick+Hand",
  },
};

// Google Fonts preconnect links (add to <head>):
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

// To build the Google Fonts stylesheet URL, join googleFamilyParam values with "&family=":
// https://fonts.googleapis.com/css2?family=<joined>&display=swap
