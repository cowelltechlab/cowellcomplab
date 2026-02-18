// import { Link } from "react-router-dom";
import { getPeopleList } from "../loadContent";
import { PageTitle } from "../layout/PageTitle";
import { CurrentMemberItem } from "../components/CurrentMemberItem";
import AlumniMemberItem from "../components/AlumniMemberItem";

export function People() {
  const people = getPeopleList();

  const currentMembers = people.filter((person) => person.isCurrent);
  const alumni = people.filter((person) => !person.isCurrent);

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <PageTitle title="People" />
      <h2 className="mt-20 mb-8 text-2xl text-primary">Current Members</h2>
      <div className="grid gap-y-12 gap-x-8 sm:grid-cols-2">
        {currentMembers.map((person) => (
          <CurrentMemberItem key={person.slug} person={person} />
        ))}
      </div>
      <h2 className="mt-20 mb-8 text-2xl text-primary">Alumni</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {alumni.map((person) => (
          <AlumniMemberItem key={person.slug} person={person} />
        ))}
      </div>
    </div>
  );
}
