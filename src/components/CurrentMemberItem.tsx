import { Link } from "react-router-dom";
import type { PersonMeta } from "../loadContent";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";

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

  return (
    <div className="flex gap-4">
      <img
        className="sm:w-[140px] sm:h-[140px] w-[100px] h-[100px] rounded-full object-cover shrink-0"
        src={person.image}
        alt={`A photo of ${person.name}`}
      />
      <div className="flex flex-col gap-2">
        <h3 className="sm:text-xl text-lg">{person.name}</h3>
        <div className="flex flex-col text-body-muted font-light text-sm">
          <p>{person.title}</p>
          <p>{person.program}</p>
          <p>{person.school}</p>
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
    </div>
  );
}
