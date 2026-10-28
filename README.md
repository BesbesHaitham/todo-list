# Todo List

A React Kanban board with To Do, In Progress, and Done columns, task editing, drag and drop, search, filters, and light/dark themes. Written in JavaScript and JSX with CSS Modules.

## Run the app

```sh
npm install
npm run dev
```

## Run WireMock

WireMock runs directly through npm, following the setup in the reference project. Java must be installed and available on your PATH.

In a separate terminal:

```sh
npm run start:mock
```

The mock API runs at `http://localhost:8080`. Vite proxies `/api` requests to it. No environment file is required; `.env.example` documents the optional API settings.

Mappings live in `wiremock/mappings/` and initial task data lives in `wiremock/__files/tasks.json`.

| Method | Endpoint         | Response                 |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/tasks`     | Initial task fixture     |
| POST   | `/api/tasks`     | Creation acknowledgement |
| PATCH  | `/api/tasks/:id` | Update acknowledgement   |
| DELETE | `/api/tasks/:id` | Deletion acknowledgement |

PATCH and DELETE also accept `/api/tasks`. These are static mock responses: they do not update the fixture. Task changes and ordering are saved in localStorage. Saved tasks take precedence on refresh, and the same fixture provides initial data when WireMock is unavailable.

## Project structure

- `src/components/atoms/`: reusable buttons, inputs, badges, and checkboxes.
- `src/components/molecules/`: task cards, forms, column headers, dialogs, and empty states.
- `src/components/organisms/`: board, columns, sorting, and toolbar.
- `src/components/templates/`: shared workspace layout.
- `src/pages/` and `src/routes/`: Todo page and application routes.
- `src/store/`: task state, persistence, filtering, and theme hooks.
- `src/services/`: API requests, kept separate from UI components.
- `src/styles/` and `src/assets/`: theme tokens and shared artwork.
- `src/stories/`: Storybook stories for the app's atoms, molecules, organisms, and layout.

Each UI component has its own JSX file and CSS Module. Shared colors, spacing, typography, and theme values are defined in `src/styles/tokens.css`.

The atoms support five sizes, optional corner radii, custom classes, native attributes, events, accessibility props, and refs. Additional options include button loading states and icons, input validation and select options, mixed-state checkboxes, removable badges, and toggle icon buttons. See **Atoms → Props reference** in Storybook for defaults and examples. The Todo app continues to use the original defaults.

## Storybook

```sh
npm run storybook
```

Open `http://localhost:6006` to browse component examples. The configuration in `.storybook/` follows the reference project's React/Vite setup, with Docs, Accessibility, MCP, and Chromatic addons. Automatic accessibility scans are off; no tests run when you start Storybook. Test-runner packages are omitted to keep the earlier no-tests setup.

Stories use controls, action callbacks, and isolated example data. Switch light/dark mode from the toolbar. The interactive board story supports dragging, completion, and deletion without writing to localStorage or calling WireMock. Component examples live in Storybook; the extra in-app component gallery has been removed.

Build a static Storybook with `npm run build-storybook`. Its generated `storybook-static/` directory is ignored by Git.

## Commands

| Command                   | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| `npm run dev`             | Start the Todo app                         |
| `npm run start:mock`      | Start the local WireMock API               |
| `npm run build`           | Build the Todo app                         |
| `npm run preview`         | Preview the app build                      |
| `npm run lint`            | Check JavaScript and Storybook conventions |
| `npm run format`          | Format project files with Prettier         |
| `npm run format:check`    | Check formatting without changing files    |
| `npm run storybook`       | Start Storybook on port 6006               |
| `npm run build-storybook` | Build static Storybook documentation       |

Prettier settings match the reference project, and ESLint includes the Storybook and Prettier configurations. The app's existing task store and runtime dependencies remain in place.

Storybook reference: [React with Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite).
