import { Link } from "react-router-dom";
import { getProjectsList, getNewsList } from "../loadContent";
import { DocumentTitle } from "../components/DocumentTitle";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { LinkButton } from "../components/LinkButton";
import { NewsItem } from "../components/NewsItem";
import { ScrollRevealContainer } from "../components/FadeInOnScroll";

export function Home() {
  const projects = getProjectsList().slice(0, 3);
  const news = getNewsList().slice(0, 4);

  const renderTitle = (title: string) => {
    return (
      <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-body-muted border-b border-b-body-muted/10 pb-2">
        {title}
      </h2>
    );
  };

  const renderValue = (title: string, description: string) => {
    return (
      <div className="group rounded-xl bg-background-muted p-6 cursor-default h-fit hover:shadow-xl transition-all duration-300 ease-out">
        <h3 className="text-lg font-medium text-primary flex items-center justify-between">
          {title}{" "}
          <ChevronDownIcon className="w-6 h-6 text-primary-light inline-block" />
        </h3>
        <p className="max-h-32 overflow-hidden pt-2 text-body-muted text-sm opacity-100 transition-all duration-300 ease-out md:max-h-0 md:pt-0 md:opacity-0 md:group-hover:max-h-32 md:group-hover:pt-2 md:group-hover:opacity-100">
          {description}
        </p>
      </div>
    );
  };

  return (
    <>
      <DocumentTitle />
      <ScrollRevealContainer>
      {/* About Us */}
      <section className="bg-background-muted">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-4 md:items-stretch">
          <div className="md:w-2/3 flex flex-col gap-4 px-8 py-4 md:py-8 justify-center">
            <h3 className="text-2xl md:text-3xl text-accent font-light leading-snug pt-8">
              Welcome to <br />
              <span className="font-medium">Co</span>llaborative{" "}
              <span className="font-medium">Well</span>ness <br />
              <span className="font-medium">Comp</span>uting Lab!
            </h3>
            <p className="text-body-muted text-sm md:pb-6">
              We are a team of researchers who are part of the Georgia Tech
              School of Interactive Computing. Our research focuses on the
              intersection of technology and society, with a particular emphasis
              on the impact of technology on human wellbeing and social equity.
            </p>
          </div>
          <div className="md:w-1/3 w-full">
            <div className="h-32 md:h-full">
              <img
                src="img/groupPhoto/112225_thanksgiving.jpg"
                alt="Collaborative Wellness Computing Lab group"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-8">
          {renderTitle("About Us")}
          <p className="my-6 text-body-muted">
            We blend{" "}
            <b>human-centered AI, collaborative design, and social science</b>{" "}
            <br />
            to create technologies that advance equity, wellbeing, and agency to
            social good.
          </p>
          <div className="grid gap-4 md:grid-cols-3 md:h-[72px]">
            {renderValue(
              "# Human-Centered AI",
              "We explore how artificial intelligence can support real people through explainable, ethical, and accessible design.",
            )}
            {renderValue(
              "# Collaborative Design",
              "We co-create tools alongside communities, educators, and healthcare professionals to ensure impact beyond the lab.",
            )}
            {renderValue(
              "# Social Impact",
              "Our projects turns research into real-world solutions that empower individuals and promote inclusion.",
            )}
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-8 flex flex-col gap-4">
          {renderTitle("Our Projects")}
          <h2 className="text-2xl font-light text-body">
            Collaborative AI for Real-World Impact
          </h2>
          <div className="flex justify-end">
            <LinkButton linkTo="/projects">View All Projects</LinkButton>
          </div>
          <div className="grid gap-8 md:grid-cols-3 items-end">
            {projects.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="group">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full object-cover rounded-4xl group-hover:scale-110 transition-all duration-300 ease-out"
                />
                <h3
                  className="text-lg w-7/8 mx-auto translate-y-[-16px] bg-primary text-white px-6 py-6 rounded-2xl
                 group-hover:bg-primary-lighter transition-all duration-300 ease-out"
                >
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News preview */}
      <section className="py-16">
        <div className="flex flex-col gap-6 mx-auto max-w-6xl px-8">
          {renderTitle("News")}
          <h2 className=" text-2xl font-light text-body">
            Check the latest news
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {news.map((n) => (
              <NewsItem key={n.slug} n={n} />
            ))}
          </div>
          <LinkButton linkTo="/news">View All News</LinkButton>
        </div>
      </section>
    </ScrollRevealContainer>
    </>
  );
}
