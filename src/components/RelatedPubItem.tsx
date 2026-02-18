import { Link } from "react-router-dom";
import type { PublicationMeta } from "../loadContent";
import { FadeInOnScroll } from "./FadeInOnScroll";

export default function RelatedPubItem({ pub }: { pub: PublicationMeta }) {
  return (
    <FadeInOnScroll key={pub.slug} className="flex flex-col gap-2">
      <Link
        to={`/publications/${pub.slug}`}
        className="text-body hover:text-accent transition-all duration-300 ease-out"
      >
        <h3 className="text-xl ">
          <span className="font-medium">{pub.shortTitle}</span> ({pub.year})
        </h3>
      </Link>
      <p className="text-body-muted text-sm italic">{pub.authors}</p>
      <div className="flex sm:flex-row flex-col gap-4 mt-1">
        {pub.abstract && (
          <p className="text-body-muted text-sm">{pub.abstract}</p>
        )}
        <img
          src={pub.image}
          alt={pub.title}
          className="sm:w-[220px] w-full sm:h-fit object-cover rounded-lg"
        />
      </div>
    </FadeInOnScroll>
  );
}
