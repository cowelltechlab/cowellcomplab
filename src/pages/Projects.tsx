import { Link } from "react-router-dom";
import { getProjectsList } from "../loadContent";
import { PageTitle } from "../layout/PageTitle";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export function Projects() {
  const projects = getProjectsList();

  const renderTitle = (title?: string) => {
    return <h2 className="text-2xl  text-primary-dark">{title}</h2>;
  };
  const renderDescription = (description?: string) => {
    return (
      <p className="mt-3 text-body-muted text-base leading-relaxed">
        {description}
      </p>
    );
  };
  const renderLink = (slug: string) => {
    return (
      <Link
        to={`/projects/${slug}`}
        className="mt-4 inline-flex items-center text-primary font-medium 
        group hover:text-primary-lighter transition-colors duration-300 ease-out"
      >
        See more
        <span className="ml-1 group-hover:translate-x-2 transition-all duration-300 ease-out">
          <ArrowRightIcon className="w-4 h-4 inline-block" />
        </span>
      </Link>
    );
  };

  const renderImage = (image?: string, title?: string) => {
    if (!image || !title) return null;
    return (
      <img
        src={image}
        alt={title}
        className="w-full h-64 md:h-72 object-cover rounded-2xl"
      />
    );
  };
  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <PageTitle title="Our Projects" />
      <div className="mt-10 space-y-12">
        {projects.map((p, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={p.slug}
              className={`flex flex-col items-center gap-6 md:gap-10 md:items-stretch ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex-1 flex flex-col justify-center">
                {renderTitle(p.title)}
                {renderDescription(p.description)}
                {renderLink(p.slug)}
              </div>
              <div className="flex-1 w-full max-w-md">
                {renderImage(p.image, p.title)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
