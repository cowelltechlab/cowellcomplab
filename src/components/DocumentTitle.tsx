import { Helmet } from "react-helmet-async";

type Props = { section?: string };

/** Sets document title: "Co-Well Lab" when section is empty, else "Co-Well Lab | {section}". */
export function DocumentTitle({ section }: Props) {
  const title = section ? `Co-Well Lab | ${section}` : "Co-Well Lab";
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
