export function LogoStrip({ logos, label = 'Trusted across industries' }) {
  return (
    <div className="py-10">
      <p className="label-caps mb-6 text-center text-text-muted">{label}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-heading text-lg font-bold tracking-tight text-text-muted opacity-60 grayscale transition hover:opacity-100"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
