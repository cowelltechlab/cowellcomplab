import { Link } from "react-router-dom";
import type { PersonMeta } from "../loadContent";
import { dateToShortString } from "../lib/dateFormat";

export default function AlumniMemberItem({ person }: { person: PersonMeta }) {
  return (
    <div>
      <h3 className="text-lg mb-2">{person.name}</h3>
      <div className="flex flex-col text-sm text-body-muted font-light gap-0.5">
        <p>
          <span className="font-medium">
            {person.degree} of {person.program}{" "}
          </span>
          ({dateToShortString(person.dateEntered ?? "")} -{" "}
          {dateToShortString(person.dateLeft ?? "")})
        </p>
        {person.currentAffiliation && (
          <p>
            Now <span className="font-medium">{person.currentAffiliation}</span>
          </p>
        )}

        <div className="flex gap-1 text-primary hover:underline text-sm">
          {person.website && (
            <Link to={person.website} target="_blank">
              [Website]
            </Link>
          )}
          {person.email && (
            <Link to={`mailto:${person.email}`} target="_blank">
              [Email]
            </Link>
          )}
          {person.googleScholar && (
            <Link to={person.googleScholar} target="_blank">
              [Google Scholar]
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
