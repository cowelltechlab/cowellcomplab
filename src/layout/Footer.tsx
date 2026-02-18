/* TODO: 나중에 public/ 경로로 교체 – SNS 아이콘 이미지 */
const SNS_LINKS = [
  { href: "https://linkedin.com/", label: "LinkedIn" },
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.facebook.com/", label: "Facebook" },
  { href: "https://twitter.com/", label: "Twitter" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex gap-4">
          {SNS_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs text-body-muted">
          © 2026. Co-Wellness Computing Lab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
