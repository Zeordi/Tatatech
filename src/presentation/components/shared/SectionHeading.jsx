import { Link } from 'react-router-dom';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-4 md:mb-12 ${
        align === 'center'
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow ? (
          <p className="label-caps mb-3 text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="text-text-primary">{title}</h2>
        {subtitle ? (
          <p className="mt-3 text-text-secondary">{subtitle}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="shrink-0 text-sm font-semibold text-primary hover:underline"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
