import { getProjectsList } from "../loadContent";
import { PageTitle } from "../layout/PageTitle";
import ProjectItem from "../components/ProjectItem";

export function Projects() {
  const projects = getProjectsList();

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <PageTitle title="Our Projects" />
      {projects.map((p, index) => {
        const isEven = index % 2 === 0;
        return <ProjectItem key={p.slug} p={p} isEven={isEven} />;
      })}
    </div>
  );
}
