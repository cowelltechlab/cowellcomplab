import { Link } from "react-router-dom";
import type { ProjectMeta } from "../loadContent";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { FadeInOnScroll } from "./FadeInOnScroll";

export default function ProjectItem({
  p,
  isEven,
}: {
  p: ProjectMeta;
  isEven: boolean;
}) {
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
    <FadeInOnScroll>
      <div
        key={p.slug}
        className={`flex flex-col items-center gap-6 md:gap-10 md:items-stretch mb-12 ${
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
    </FadeInOnScroll>
  );
}
