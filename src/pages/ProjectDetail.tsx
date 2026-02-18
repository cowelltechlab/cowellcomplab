import { useParams, Link } from "react-router-dom";
import { getProjectBySlug, getPublicationsBySlugs } from "../loadContent";
import { Markdown } from "../components/Markdown";
import { ScrollRevealContainer } from "../components/FadeInOnScroll";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getProjectBySlug(slug) : null;

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-body-muted">Project not found.</p>
        <Link
          to="/projects"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const { data, content } = item;
  const relatedPubs = data.publications?.length
    ? getPublicationsBySlugs(data.publications)
    : [];

  return (
    <ScrollRevealContainer className="mx-auto max-w-4xl px-4 py-12">
      <Link
        to="/projects"
        className="mb-6 inline-block text-primary hover:underline"
      >
        ← Back to Projects
      </Link>
      <img
        src={`..${data.image}`}
        alt={data.title}
        className="w-100 my-4 object-cover rounded-2xl mx-auto"
      />
      <h1 className="my-4 text-2xl md:text-3xl text-primary-dark">
        {data.title}
      </h1>
      <Markdown content={content} />
      {relatedPubs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <ul className="flex flex-col gap-6">
            {relatedPubs.map((pub) => (
              <div key={pub.slug} className="flex flex-col gap-2">
                <Link
                  to={`/publications/${pub.slug}`}
                  className="text-body hover:text-accent transition-all duration-300 ease-out"
                >
                  <h3 className="text-xl ">
                    <span className="font-medium">{pub.shortTitle}</span> (
                    {pub.year})
                  </h3>
                </Link>
                <p className="text-body-muted text-sm italic">{pub.authors}</p>
                <div className="flex sm:flex-row flex-col gap-4 mt-2">
                  {pub.abstract && (
                    <p className="text-body-muted text-sm">{pub.abstract}</p>
                  )}
                  <img
                    src={pub.image}
                    alt={pub.title}
                    className="sm:w-[220px] w-full sm:h-fit object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </ul>
        </section>
      )}
    </ScrollRevealContainer>
  );
}
