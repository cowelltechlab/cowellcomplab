import type { PersonMeta } from "../loadContent";
import { FadeInOnScroll } from "./FadeInOnScroll";

export function MemberCard({ person }: { person: PersonMeta }) {
  return (
    <FadeInOnScroll className="flex flex-col items-center w-32">
      {person.image && (
        <img
          src={person.image}
          alt={person.name}
          className="h-20 w-20 rounded-full object-cover"
        />
      )}
      <p className="text-body-muted text-sm text-center mt-2">{person.name}</p>
    </FadeInOnScroll>
  );
}
