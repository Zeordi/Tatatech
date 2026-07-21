import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';
import { PageContainer } from '../layout/PageContainer.jsx';

export function CTABanner({
  title,
  subtitle,
  primary,
  secondary,
  className = '',
}) {
  return (
    <PageContainer className={className}>
      <div className="rounded-3xl bg-cta-gradient px-6 py-14 text-center text-white sm:px-10 md:py-16">
        <h2 className="text-white">{title}</h2>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-xl text-white/85">{subtitle}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primary ? (
            <Button as={Link} to={primary.to} variant="white">
              {primary.label}
            </Button>
          ) : null}
          {secondary ? (
            <Button as={Link} to={secondary.to} variant="white-outline">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </PageContainer>
  );
}
