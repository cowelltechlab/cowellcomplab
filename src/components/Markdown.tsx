import ReactMarkdown from "react-markdown";

type Props = { content: string; className?: string };

export function Markdown({ content, className = "" }: Props) {
  return (
    <div
      className={`max-w-none [&_h2]:mt-6 [&_h2]:text-xl [&_p]:mb-4 [&_ul]:list-inside [&_ul]:list-disc [&_a]:text-[var(--color-accent)] [&_a]:underline ${className}`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
