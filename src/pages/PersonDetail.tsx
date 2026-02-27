import { useParams, Link } from "react-router-dom";
import { getPersonBySlug } from "../loadContent";
import { Markdown } from "../components/Markdown";
import { ScrollRevealContainer } from "../components/FadeInOnScroll";
import { DocumentTitle } from "../components/DocumentTitle";
import BackButton from "../components/BackButton";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  HomeIcon,
  HashtagIcon,
} from "@heroicons/react/16/solid";

const InfoLayout: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h3 className="text-sm font-medium uppercase mb-3">{title}</h3>
    {children}
  </div>
);

export function PersonDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getPersonBySlug(slug) : null;

  // not designed yet

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-body-muted">Person not found.</p>
        <Link
          to="/people"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Back to People
        </Link>
      </div>
    );
  }

  const { data, content } = item;

  const renderEmail = () =>
    data.email && (
      <InfoLayout title="Email">
        <Link
          to={`mailto:${data.email}`}
          target="_blank"
          className="text-primary underline"
        >
          <EnvelopeIcon className="w-4 h-4 inline-block shrink-0" />{" "}
          {data.email}
        </Link>
      </InfoLayout>
    );

  const renderLinkItem = (
    icon: React.ReactNode,
    label: string,
    url: string,
  ) => (
    <Link to={url} target="_blank" className="text-primary underline">
      {icon} {label}
    </Link>
  );

  const renderLinks = () =>
    (data.website || data.googleScholar) && (
      <InfoLayout title="Links">
        <div className="flex flex-col gap-1">
          {data.website &&
            renderLinkItem(
              <HomeIcon className="w-4 h-4 inline-block shrink-0" />,
              "Website",
              data.website,
            )}
          {data.googleScholar &&
            renderLinkItem(
              <AcademicCapIcon className="w-4 h-4 inline-block shrink-0" />,
              "Google Scholar",
              data.googleScholar,
            )}
        </div>
      </InfoLayout>
    );

  const renderIntroduction = () =>
    content && (
      <InfoLayout title="Introduction">
        <Markdown content={content} className="text-body-muted font-light" />
      </InfoLayout>
    );

  const renderKeyword = () =>
    data.keyword && (
      <div className="w-60 bg-primary-lighter text-white rounded-full p-2 text-sm text-center">
        <HashtagIcon className="w-4 h-4 inline-block shrink-0" /> {data.keyword}
      </div>
    );

  return (
    <ScrollRevealContainer className="mx-auto max-w-2xl px-4 py-12">
      <DocumentTitle section="People" />
      <BackButton path="/people" to="People" />
      <h1 className="mb-2 sm:text-3xl text-2xl">{data.name}</h1>
      <p className="text-body-muted mb-6">
        {data.title} | {data.program} | {data.school}
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-2 shrink-0 sm:w-60 self-center sm:self-start">
          <img
            src={data.image}
            alt={data.name}
            className="w-60 h-60 object-cover rounded-2xl border border-primary-light"
          />
          {renderKeyword()}
        </div>
        <div className="flex flex-col gap-8">
          {renderEmail()}
          {renderLinks()}
          {renderIntroduction()}
        </div>
      </div>
    </ScrollRevealContainer>
  );
}
