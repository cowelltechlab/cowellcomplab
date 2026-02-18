import { useParams, Link } from "react-router-dom";
import {
  getPublicationBySlug,
  getPeopleBySlugs,
  type PersonMeta,
} from "../loadContent";
import { Markdown } from "../components/Markdown";
import { ScrollRevealContainer } from "../components/FadeInOnScroll";
import {
  ArrowDownTrayIcon,
  LinkIcon,
  TrophyIcon,
} from "@heroicons/react/16/solid";

export function PublicationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getPublicationBySlug(slug) : null;

  const renderbackbutton = () => (
    <Link
      to="/publications"
      className="mb-8 inline-block text-primary hover:underline"
    >
      ← Back to Publications
    </Link>
  );
  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        {renderbackbutton()}
        <p className="text-body-muted">Publication not found.</p>
      </div>
    );
  }

  const { data, content } = item;

  const memberPeople: PersonMeta[] =
    data.people && data.people.length > 0 ? getPeopleBySlugs(data.people) : [];

  const renderVenue = () => (
    <div className="flex flex-wrap gap-x-2 gap-y-1 font-semibold text-primary-lighter">
      {data.venue && data.year && (
        <span>
          {data.venue} {data.year}
        </span>
      )}
      {data.award && (
        <span className="inline-flex items-center gap-1.5 bg-background-muted rounded-full px-2 py-0.5 text-sm text-primary font-semibold">
          <TrophyIcon className="w-4 h-4 inline-block" /> {data.award}
        </span>
      )}
    </div>
  );

  const renderTitle = () => (
    <h1 className="text-2xl sm:text-3xl font-medium text-body">{data.title}</h1>
  );

  const renderAuthors = () => (
    <p className="text-lg sm:text-xl text-primary-dark">{data.authors}</p>
  );

  const renderMemberCards = () =>
    memberPeople.length > 0 && (
      <section className="mt-2">
        <div className="flex flex-wrap gap-3">
          {memberPeople.map((person) => (
            <div className="flex flex-col items-center w-32">
              {person.image && (
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              )}
              <p className="text-body-muted text-sm text-center mt-2">
                {person.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    );

  const renderImage = () =>
    data.image && (
      <img
        src={data.image}
        alt={data.title}
        className="mx-auto max-h-100 object-cover"
      />
    );

  const renderDoi = () =>
    data.doi && (
      <a
        href={data.doi}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-primary px-4 py-1 text-sm font-medium text-primary 
        hover:bg-primary hover:text-white transition-all duration-300 ease-out"
      >
        <LinkIcon className="w-4 h-4 inline-block" /> DOI
      </a>
    );

  const renderPDF = () =>
    data.pdf && (
      <Link
        to={data.pdf ?? "#"}
        target="_blank"
        className="inline-flex items-center gap-1.5 rounded-full border border-primary px-4 py-1 text-sm font-medium text-primary 
        hover:bg-primary hover:text-white transition-all duration-300 ease-out"
      >
        <ArrowDownTrayIcon className="w-4 h-4 inline-block" /> PDF
      </Link>
    );

  const renderAbstract = () =>
    data.abstract && (
      <div className="flex flex-col gap-4 p-6 bg-background-muted rounded-xl">
        <h2 className="text-body-muted text-xl font-medium">Abstract</h2>
        <p className="text-body-muted text-sm ">{data.abstract}</p>
      </div>
    );

  return (
    <ScrollRevealContainer className="mx-auto max-w-6xl px-8 py-12">
      {renderbackbutton()}
      <article className="pb-8">
        <div className="flex flex-col gap-3">
          {renderVenue()}
          {renderTitle()}
          {renderAuthors()}
          {renderMemberCards()}
          <div className="mb-4 flex flex-wrap gap-4">
            {renderDoi()}
            {renderPDF()}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {renderImage()}
          {renderAbstract()}
          <Markdown content={content} />
        </div>
      </article>
    </ScrollRevealContainer>
  );
}
