import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useState } from "react";

// const SNS_LINKS = [
//   { href: "https://linkedin.com/", label: "LinkedIn" },
//   { href: "https://www.instagram.com/", label: "Instagram" },
//   { href: "https://www.facebook.com/", label: "Facebook" },
//   { href: "https://twitter.com/", label: "Twitter" },
// ] as const;

const EMAIL = "jennifer.kim@cc.gatech.edu";
const ADDRESS =
  "CODA 1578B, Georgia Institute of Technology, 756 W Peachtree St NW, Atlanta, GA 30308, USA";

export function Footer() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage("Copied to clipboard");
      setTimeout(() => setToastMessage(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setToastMessage("Failed to copy");
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const renderContactInfo = (
    copyText: string,
    displayText: React.ReactNode,
    icon: (className: string) => React.ReactNode,
  ) => {
    return (
      <button
        onClick={() => copyToClipboard(copyText)}
        className="sm:text-sm text-xs text-gray-400 hover:text-primary transition-colors duration-200 cursor-pointer text-left flex items-start gap-1 group"
      >
        {icon(
          "w-4 h-4 inline-block mt-0.5 shrink-0 group-hover:text-primary transition-colors duration-200",
        )}
        {displayText}
      </button>
    );
  };

  const renderToastMessage = () =>
    toastMessage && (
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-[fadeInUp_0.3s_ease-out] pointer-events-none">
        <div className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toastMessage}
        </div>
      </div>
    );

  return (
    <>
      {/* Toast Message */}
      {renderToastMessage()}
      <footer className="border-t border-gray-200 py-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <img src="./img/logo.svg" alt="Co-Well Lab" className="w-12 h-12" />
            <h3 className="text-primary-lighter mt-1">
              Collaborative Wellness Computing Lab
            </h3>
            {renderContactInfo(
              EMAIL,
              <span>jennifer.kim [at] cc.gatech.edu</span>,
              (className) => (
                <EnvelopeIcon className={className} />
              ),
            )}
            {renderContactInfo(
              ADDRESS,
              <span>
                CODA 1578B, Georgia Institute of Technology,
                <br /> 756 W Peachtree St NW, Atlanta, GA 30308, USA
              </span>,
              (className) => (
                <MapPinIcon className={className} />
              ),
            )}
            {/* <div className="mb-6 flex gap-4">
          {SNS_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {label}
            </a>
          ))}
        </div> */}
            <p className="text-xs text-body-muted mt-4">
              © 2026. Co-Well Lab. All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-row gap-2 sm:flex-col sm:gap-4">
            <Link to="https://ic.gatech.edu/" className="w-1/2 sm:w-full">
              <img
                src="./img/ic-logo.png"
                alt="Logo of School of Interactive Computing"
                className="sm:w-72"
              />
            </Link>
            <Link to="https://www.gatech.edu/about" className="w-1/2 sm:w-full">
              <img
                src="./img/gt-logo.png"
                alt="Logo of Georgia Institute of Technology"
                className="sm:w-60"
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
