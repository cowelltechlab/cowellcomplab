import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

export function LinkButton({
  children,
  linkTo,
}: {
  children: React.ReactNode;
  linkTo: string;
}) {
  return (
    <Link
      to={linkTo}
      className="z-10 bg-primary text-white px-6 py-2 flex w-fit items-center gap-1.5 rounded-full 
      group transition-all duration-300 ease-out hover:bg-primary-lighter"
    >
      {children}
      <ArrowRightIcon className="w-4 h-4 inline-block group-hover:translate-x-2 transition-all duration-300 ease-out" />
    </Link>
  );
}
