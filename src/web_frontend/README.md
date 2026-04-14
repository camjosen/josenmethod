# Stack

- React + Vite
- tRPC React client
- TanStack Query (caching, server state — used under the hood by tRPC)
- Tailwind + shadcn/ui

## User Flows

- josenmethod.com/session/:session_id - This is the core UI to facilitate learning. It probably looks like a glorified chat interface, where the bot renders multiple choice and free response questions. The user can see their session history, start new sessions, and so on.
- josenmethod.com/guides/:guide_id - This is a simple interface for creating "guide" profiles.
- josenmethod.com/paths/:path_id - This is a dashboard view of a learning path. It tells you about the path and about the users who are taking it.
- josenmethod.com/paths/:path_id/edit - A file tree. For the selected file, a simple markdown editor is supplied.
- josenmethod.com/paths/:path_id/insights - This page shows you detailed insights about student progress and includes a chat interface where you can ask questions about student progress.
- josenmethod.com/user/:user_id - a profile and account editing page, with special capabilities for the user to describe the learning preferences in a markdown file

## Visual Aesthetic

Each component is associated with a different color:

- `evidence` is green
- `guides` are blue
- `sessions` are orange
- `paths` are yellow
- `user` is grey

Colors are somewhat earthy and desaturated. No "elementary school" vibes. Color are mostly used as accents. Mostly everything is greyscale.

Visuals are clean an simple. Nothing extraneous.
