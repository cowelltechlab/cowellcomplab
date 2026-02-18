/**
 * Content loader using Vite's import.meta.glob.
 * Uses relative path ./content/ from src/ so glob resolves correctly.
 * See: https://vitejs.dev/guide/features.html#glob-import
 */
import { parseMdx, slugFromPath } from "./lib/mdx";

const projectsGlob = import.meta.glob("./content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const newsGlob = import.meta.glob("./content/news/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const peopleGlob = import.meta.glob("./content/people/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const publicationsGlob = import.meta.glob("./content/publications/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function getRaw(entry: unknown): string {
  if (typeof entry === "string") return entry;
  if (
    entry &&
    typeof entry === "object" &&
    "default" in entry &&
    typeof (entry as { default: string }).default === "string"
  ) {
    return (entry as { default: string }).default;
  }
  return "";
}

function loadList(glob: Record<string, unknown>) {
  return Object.entries(glob).map(([path, raw]) => {
    try {
      const { data } = parseMdx(getRaw(raw));
      return { slug: slugFromPath(path), ...data };
    } catch {
      return { slug: slugFromPath(path) };
    }
  });
}

function loadBySlug(glob: Record<string, unknown>, slug: string) {
  const entry = Object.entries(glob).find(
    ([path]) => slugFromPath(path) === slug,
  );
  if (!entry) return null;
  return parseMdx(getRaw(entry[1]));
}

export type ProjectMeta = {
  slug: string;
  title?: string;
  image?: string;
  publications?: string[];
};
export type NewsMeta = {
  slug: string;
  title?: string;
  date?: string;
  category?: string;
  image?: string;
};
export type PersonMeta = {
  slug: string;
  name?: string;
  title?: string;
  degree?: string;
  program?: string;
  school?: string;
  isCurrent?: boolean;
  currentAffiliation?: string;
  dateEntered?: string;
  dateLeft?: string;
  image?: string;
  email?: string;
  website?: string;
  googleScholar?: string;
};
export type PublicationMeta = {
  slug: string;
  title?: string;
  authors?: string;
  year?: number;
  month?: number;
  venue?: string;
  type?: string;
  image?: string;
  doi?: string;
  pdf?: string;
  award?: string;
  abstract?: string;
  shortTitle?: string;
};

function normalizeProjectMeta(row: Record<string, unknown>): ProjectMeta {
  const { pubs, publications: pubsField, ...rest } = row;
  const publications = Array.isArray(pubsField)
    ? (pubsField as string[])
    : Array.isArray(pubs)
      ? (pubs as string[])
      : undefined;
  return { ...rest, publications } as ProjectMeta;
}

export function getProjectsList(): ProjectMeta[] {
  return loadList(projectsGlob).map(normalizeProjectMeta);
}

export function getProjectBySlug(
  slug: string,
): { data: ProjectMeta; content: string } | null {
  const result = loadBySlug(projectsGlob, slug);
  if (!result) return null;
  const data = normalizeProjectMeta({ slug, ...result.data });
  return { data, content: result.content };
}

export function getNewsList(): NewsMeta[] {
  const list = loadList(newsGlob) as NewsMeta[];
  return list.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getNewsBySlug(
  slug: string,
): { data: NewsMeta; content: string } | null {
  const result = loadBySlug(newsGlob, slug);
  return result
    ? { data: { slug, ...result.data } as NewsMeta, content: result.content }
    : null;
}

function getDegreeOrder(degree: string | undefined): number {
  if (!degree) return 0;
  switch (degree.toUpperCase()) {
    case "PHD":
      return 1;
    case "MS":
      return 2;
    case "BS":
      return 3;
    default:
      return 0;
  }
}

export function getPeopleList(): PersonMeta[] {
  const list = loadList(peopleGlob) as PersonMeta[];
  return list.sort((a, b) => {
    // 1. Primary: degree (no degree < PHD < MS < BS)
    const degreeCompare = getDegreeOrder(a.degree) - getDegreeOrder(b.degree);
    if (degreeCompare !== 0) return degreeCompare;
    // 2. Secondary: dateEntered (earlier = first)
    const timeA = a.dateEntered ? new Date(a.dateEntered).getTime() : Infinity;
    const timeB = b.dateEntered ? new Date(b.dateEntered).getTime() : Infinity;
    return timeA - timeB;
  });
}

export function getPersonBySlug(
  slug: string,
): { data: PersonMeta; content: string } | null {
  const result = loadBySlug(peopleGlob, slug);
  return result
    ? { data: { slug, ...result.data } as PersonMeta, content: result.content }
    : null;
}

export function getPublicationsList(): PublicationMeta[] {
  const list = loadList(publicationsGlob) as PublicationMeta[];
  return list
    .sort((a, b) => {
      if (a.year && b.year) {
        return b.year < a.year ? -1 : 1;
      }
      return 0;
    })
    .sort((a, b) => {
      if (a.month && b.month) {
        return a.month > b.month ? -1 : 1;
      }
      return 0;
    });
}

export function getPublicationBySlug(
  slug: string,
): { data: PublicationMeta; content: string } | null {
  const result = loadBySlug(publicationsGlob, slug);
  return result
    ? {
        data: { slug, ...result.data } as PublicationMeta,
        content: result.content,
      }
    : null;
}

/** Resolve publication slugs to full PublicationMeta (keeps order, skips missing). */
export function getPublicationsBySlugs(slugs: string[]): PublicationMeta[] {
  return slugs
    .map((s) => getPublicationBySlug(s))
    .filter((r): r is { data: PublicationMeta; content: string } => r != null)
    .map((r) => r.data)
    .sort((a, b) => {
      if (a.year && b.year) {
        return b.year < a.year ? -1 : 1;
      }
      return 0;
    });
}
