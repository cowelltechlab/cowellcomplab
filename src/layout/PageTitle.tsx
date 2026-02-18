export function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="mb-12 border-b border-b-body-muted/10 pb-2 uppercase tracking-wide text-body-muted">
      {title}
    </h1>
  );
}
