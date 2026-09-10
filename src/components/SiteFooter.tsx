import { footerLinks } from "@/data/site";
import { BrandMark } from "./BrandMark";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex min-h-[24px] items-center text-[14px] text-dark-soft transition-colors duration-150 ease-out hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark relative overflow-hidden bg-dark text-white">
      {/* Very low-contrast abstract brand geometry, clipped at the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px]" aria-hidden="true">
        <svg
          viewBox="0 0 1280 280"
          className="h-full w-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <g fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5">
            <circle cx="320" cy="300" r="230" />
            <circle cx="320" cy="300" r="160" />
            <rect x="700" y="150" width="300" height="300" rx="64" />
          </g>
          <path
            d="M980 340 L1160 160 L1160 400 Z"
            fill="rgba(255,255,255,0.025)"
          />
        </svg>
      </div>

      <div className="page-rail rail-dark relative">
        <div className="gutter grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandMark tone="dark" />
            <p className="mt-4 max-w-[38ch] text-[14px] leading-[22px] text-dark-soft">
              One account for currencies, equities, metals and yield — private by
              default, and open to inspect.
            </p>
          </div>

          <LinkColumn title="Product" links={footerLinks.product} />
          <LinkColumn title="Company" links={footerLinks.social} />
          <LinkColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="gutter border-t border-hairline-dark py-6">
          <p className="text-[13px] text-dark-soft">
            © {new Date().getFullYear()} Clearly. A demonstration interface — not a real
            financial service.
          </p>
        </div>
      </div>
    </footer>
  );
}
