import { Link } from "react-router-dom";
import type { PersonMeta } from "../loadContent";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";
import { FadeInOnScroll } from "./FadeInOnScroll";

export function CurrentMemberItem({ person }: { person: PersonMeta }) {
  const renderButton = (
    icon: (c: string) => React.ReactNode,
    href: string,
    className?: string,
  ) => (
    <Link to={href} target="_blank">
      {icon(
        className
          ? className
          : `w-8 h-8 inline-block border border-primary rounded-full p-1 text-primary
            hover:bg-primary hover:text-white hover:translate-y-[-4px] transition-all duration-300 ease-out`,
      )}
    </Link>
  );

  const renderProfilePic = () => (
    <div className="group relative rounded-full border border-primary-light overflow-hidden">
      <img
        className="sm:w-36 sm:h-36 w-20 h-20 object-cover shrink-0 "
        src={person.image}
        alt={`A photo of ${person.name}`}
      />
      {person.keyword && (
        <div
          className="absolute top-0 left-0 text-white bg-black w-full h-full flex items-center
        transition-opacity duration-300 ease-out group-hover:opacity-60 opacity-0"
        >
          <span className="flex-col items-center p-4 text-center">
            # {person.keyword}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <FadeInOnScroll className="flex flex-col sm:items-center gap-4">
      {renderProfilePic()}
      <div className="flex flex-col sm:items-center gap-2">
        <Link
          to={`/people/${person.slug}`}
          className="text-body hover:text-primary transition-all duration-300 ease-out"
        >
          <h3 className="sm:text-xl text-lg">{person.name}</h3>
        </Link>
        <div className="flex flex-col sm:items-center sm:text-center text-body-muted font-light text-sm">
          <p>{person.title}</p>
          <p>{person.program}</p>
        </div>
        <div className="flex gap-2">
          {person.website &&
            renderButton((c) => <HomeIcon className={c} />, person.website)}
          {person.googleScholar &&
            renderButton(
              (c) => <AcademicCapIcon className={c} />,
              person.googleScholar,
            )}
          {person.email &&
            renderButton(
              (c) => <EnvelopeIcon className={c} />,
              `mailto:${person.email}`,
            )}
        </div>
      </div>
    </FadeInOnScroll>
  );
}
