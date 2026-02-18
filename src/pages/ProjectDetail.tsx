import { useParams } from "react-router-dom";
import { getProjectBySlug, getPublicationsBySlugs } from "../loadContent";
import { Markdown } from "../components/Markdown";
import BackButton from "../components/BackButton";
import RelatedPubItem from "../components/RelatedPubItem";
import { DocumentTitle } from "../components/DocumentTitle";
import { ScrollRevealContainer } from "../components/FadeInOnScroll";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getProjectBySlug(slug) : null;

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-body-muted">Project not found.</p>
        <BackButton path="/projects" to="Projects" />
      </div>
    );
  }

  const { data, content } = item;
  const relatedPubs = data.publications?.length
    ? getPublicationsBySlugs(data.publications)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <DocumentTitle section="Projects" />
      <BackButton path="/projects" to="Projects" />
      <ScrollRevealContainer className="flex flex-col gap-2">
        <img
          src={data.image}
          alt={data.title}
          className="w-100 object-cover rounded-2xl mx-auto"
        />
        <h1 className="my-4 text-2xl md:text-3xl text-primary-dark">
          {data.title}
        </h1>
        <Markdown content={content} />
        {relatedPubs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <ul className="flex flex-col gap-6">
              {relatedPubs.map((pub) => (
                <RelatedPubItem key={pub.slug} pub={pub} />
              ))}
            </ul>
          </section>
        )}
      </ScrollRevealContainer>
    </div>
  );
}
