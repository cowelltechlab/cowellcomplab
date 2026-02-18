import { Link } from "react-router-dom";
import { getNewsList } from "../loadContent";
import { dateToShortString } from "../lib/dateFormat";
import { PageTitle } from "../layout/PageTitle";
import { DocumentTitle } from "../components/DocumentTitle";

export function News() {
  const news = getNewsList();

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <DocumentTitle section="News" />
      <PageTitle title="News" />
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
        {news.map((n) => (
          <Link
            key={n.slug}
            to={`/news/${n.slug}`}
            className="block rounded-2xl border-2 h-fit border-gray-100 p-6 transition hover:border-primary-light"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm font-medium text-primary">
                {dateToShortString(n.date ?? "")}
              </span>
              <span className="bg-background-muted rounded-full px-2 py-0.5 text-sm uppercase tracking-widest text-primary font-semibold">
                {n.category}
              </span>
            </div>
            <span className="w-full font-medium text-body md:w-auto">
              {n.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
