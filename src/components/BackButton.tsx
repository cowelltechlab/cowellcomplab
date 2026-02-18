import ArrowLeftIcon from "@heroicons/react/24/solid/esm/ArrowLeftIcon";
import { Link } from "react-router-dom";

export default function BackButton({ path, to }: { path: string; to: string }) {
  return (
    <Link
      to={path}
      className="mb-6 text-primary hover:text-primary-lighter flex items-center gap-1 group"
    >
      <ArrowLeftIcon className="w-4 h-4 inline-block group-hover:-translate-x-1 transition-all duration-300 ease-out" />{" "}
      Back to {to}
    </Link>
  );
}
