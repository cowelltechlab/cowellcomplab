import { useParams } from "react-router-dom";
import { getNewsBySlug } from "../loadContent";
import { Markdown } from "../components/Markdown";
import { dateToShortString } from "../lib/dateFormat";
import BackButton from "../components/BackButton";
import { DocumentTitle } from "../components/DocumentTitle";

export function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getNewsBySlug(slug) : null;

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-body-muted">News not found.</p>
        <BackButton path="/news" to="News" />
      </div>
    );
  }

  const { data, content } = item;
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <DocumentTitle section="News" />
      <BackButton path="/news" to="News" />

      <div className="flex items-center gap-2 my-4">
        <span className="block text-body-muted">
          {dateToShortString(data.date ?? "")}
        </span>
        <span className="bg-background-muted rounded-full px-2 py-0.5 text-sm uppercase tracking-widest text-primary font-semibold">
          {data.category}
        </span>
      </div>
      <h1 className="mb-12 text-3xl">{data.title}</h1>
      <Markdown content={content} />
    </div>
  );
}
