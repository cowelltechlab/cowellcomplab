import { Link } from "react-router-dom";
import type { PublicationMeta } from "../loadContent";
import {
  ArrowDownTrayIcon,
  LinkIcon,
  TrophyIcon,
} from "@heroicons/react/16/solid";

export function PubItem({ pub }: { pub: PublicationMeta }) {
  const renderTitle = () => (
    <Link to={`/publications/${pub.slug}`}>
      <h3 className="text-lg font-medium text-body transition-all duration-300 ease-out hover:text-primary">
        {pub.title}
      </h3>
    </Link>
  );
  const renderAuthors = () => (
    <p className="text-sm text-body-muted">{pub.authors}</p>
  );

  const renderVenue = () =>
    (pub.venue || pub.year) && (
      <span className="text-sm text-primary-lighter font-medium">
        {[pub.venue, pub.year].filter(Boolean).join(" ")}
      </span>
    );
  const renderDOI = () => (
    <Link
      className="text-sm font-semibold flex items-center text-primary
     transition-all duration-300 ease-out hover:text-primary-light"
      to={pub.doi ?? "#"}
      target="_blank"
    >
      {pub.doi ? (
        <>
          <LinkIcon className="w-4 h-4 inline-block" /> DOI
        </>
      ) : (
        "Upcoming"
      )}
    </Link>
  );

  const renderPDF = () =>
    pub.pdf && (
      <Link
        className="text-sm font-semibold flex items-center gap-0.5 text-primary
     transition-all duration-300 ease-out hover:text-primary-light"
        to={pub.pdf ?? "#"}
        target="_blank"
      >
        <ArrowDownTrayIcon className="w-4 h-4 inline-block" /> PDF
      </Link>
    );
  const renderAward = () =>
    pub.award && (
      <span
        className="text-sm flex items-center gap-1 text-accent bg-background-muted 
    px-2.5 py-0.5 rounded-full"
      >
        <TrophyIcon className="w-4 h-4 inline-block" /> {pub.award}
      </span>
    );

  return (
    <li key={pub.slug} className="flex gap-6 sm:flex-row flex-col">
      <img
        src={pub.image ?? "vite.svg"}
        alt={pub.title}
        className="sm:w-[160px] sm:h-[120px] w-full h-[100px] shrink-0 object-cover rounded-xl border border-primary-light"
      />
      <div className="flex flex-col gap-2">
        {renderTitle()}
        {renderAuthors()}
        <div className="flex items-center gap-3">
          {renderVenue()}
          {renderDOI()}
          {renderAward()}
          {renderPDF()}
        </div>
      </div>
    </li>
  );
}
