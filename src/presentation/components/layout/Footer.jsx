import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  FOOTER_COMPANY,
  FOOTER_SERVICES,
  SITE,
} from '../../../utils/constants.js';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '../shared/SocialIcons.jsx';

const social = [
  { label: 'X', href: SITE.social.x, icon: XIcon },
  { label: 'LinkedIn', href: SITE.social.linkedin, icon: LinkedInIcon },
  { label: 'Facebook', href: SITE.social.facebook, icon: FacebookIcon },
  { label: 'Instagram', href: SITE.social.instagram, icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="mb-4 flex items-center">
            <img src="/TATA.png" alt="TATATECH" className="h-12 w-auto" />
          </Link>
          <p className="mb-5 max-w-xs text-sm text-text-secondary">
            Full-service digital technology from Alexandria, Virginia — design, software, infrastructure, and growth.
          </p>
          <div className="flex gap-2">
            {social.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.08em] text-text-primary">
            Services
          </h3>
          <ul className="space-y-2.5">
            {FOOTER_SERVICES.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.08em] text-text-primary">
            Company
          </h3>
          <ul className="space-y-2.5">
            {FOOTER_COMPANY.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.08em] text-text-primary">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-primary" />
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-primary" />
              <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`} className="hover:text-primary">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-text-muted sm:px-6 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} TATATECH. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
