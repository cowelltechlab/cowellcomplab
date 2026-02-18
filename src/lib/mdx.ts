import matter from "gray-matter";

export type Frontmatter = Record<string, unknown>;

export function parseMdx(raw: string): { data: Frontmatter; content: string } {
  const { data, content } = matter(raw);
  return { data: data as Frontmatter, content };
}

export function slugFromPath(path: string): string {
  const name = path.split("/").pop() ?? "";
  return name.replace(/\.mdx?$/, "");
}
