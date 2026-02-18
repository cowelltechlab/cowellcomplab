import { Link } from "react-router-dom";
import { getProjectsList } from "../loadContent";
import { PageTitle } from "../layout/PageTitle";

export function Projects() {
  const projects = getProjectsList();

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <PageTitle title="Our Projects" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="block rounded-lg border border-gray-200 p-6 transition hover:border-[var(--color-accent)] hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-body">{p.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
