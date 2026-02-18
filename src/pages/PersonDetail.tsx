import { useParams, Link } from "react-router-dom";
import { getPersonBySlug } from "../loadContent";
import { Markdown } from "../components/Markdown";
import { ScrollRevealContainer } from "../components/FadeInOnScroll";

export function PersonDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getPersonBySlug(slug) : null;

  // not designed yet

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-[var(--color-text-muted)]">Person not found.</p>
        <Link
          to="/people"
          className="mt-4 inline-block text-[var(--color-accent)] hover:underline"
        >
          Back to People
        </Link>
      </div>
    );
  }

  const { data, content } = item;
  return (
    <ScrollRevealContainer className="mx-auto max-w-2xl px-4 py-12">
      <Link
        to="/people"
        className="mb-6 inline-block text-[var(--color-accent)] hover:underline"
      >
        ← Back to People
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-[var(--color-text)]">
        {data.title}
      </h1>
      <Markdown content={content} />
    </ScrollRevealContainer>
  );
}
