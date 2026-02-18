import { getPublicationsList } from "../loadContent";
import { PubItem } from "../components/PubItem";
import { PageTitle } from "../layout/PageTitle";

export function Publications() {
  const publications = getPublicationsList();

  const yearSections = publications
    .map((p) => p.year)
    .filter((year, index, self) => self.indexOf(year) === index)
    .sort((a, b) => (b ?? 0) - (a ?? 0));
  // get unique years

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <PageTitle title="Publications" />
      <div className="space-y-25">
        {yearSections.map((year) => {
          const items = publications.filter((p) => p.year === year);
          return (
            <section key={year}>
              <h2 className="mb-4 md:text-3xl text-xl text-primary">{year}</h2>
              <ul className="space-y-6 pt-4">
                {items.map((pub) => (
                  <PubItem key={pub.slug} pub={pub} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
