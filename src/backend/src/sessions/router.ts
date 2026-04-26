import { Hono } from "hono";
import { normalizeCode } from "./codes.ts";
import { getLessonDetail, listLessons } from "./lessonShape.ts";
import { createSession, getSessionState } from "./store.ts";

export const sessionsRouter = new Hono()
  .get("/lessons", (c) => {
    return c.json({ lessons: listLessons() });
  })
  .get("/lessons/:idx", (c) => {
    const idx = Number(c.req.param("idx"));
    if (!Number.isInteger(idx) || idx < 0) {
      return c.json({ error: "invalid idx" }, 400);
    }
    const detail = getLessonDetail(idx);
    if (!detail) return c.json({ error: "not found" }, 404);
    return c.json({ lesson: detail });
  })
  .post("/", (c) => {
    const state = createSession();
    if (!state) return c.json({ error: "could not create session" }, 500);
    return c.json({ code: state.code, session: state });
  })
  .get("/:code", (c) => {
    const code = normalizeCode(c.req.param("code"));
    const state = getSessionState(code);
    if (!state) return c.json({ exists: false }, 404);
    return c.json({ exists: true, session: state });
  });
