import { useEffect } from "react";
import { fontKeySchema, fontMetadata } from "@reading_app/utils/fonts";

const stylesheetHref = `https://fonts.googleapis.com/css2?family=${fontKeySchema.options
  .map((k) => fontMetadata[k].googleFamilyParam)
  .filter(Boolean)
  .join("&family=")}&display=swap`;

export function useCurriculumFonts() {
  useEffect(() => {
    if (document.querySelector("link[data-curriculum-fonts]")) return;
    const links = (
      [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: stylesheetHref },
      ] as const
    ).map(({ rel, href, crossOrigin }) => {
      const el = document.createElement("link");
      el.rel = rel;
      el.href = href;
      if (crossOrigin) el.crossOrigin = crossOrigin;
      el.setAttribute("data-curriculum-fonts", "");
      return el;
    });
    document.head.append(...links);
  }, []);
}
