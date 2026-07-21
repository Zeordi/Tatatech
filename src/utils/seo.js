export function buildPageMeta({
  title,
  description,
  path = '/',
  image = '/og-default.svg',
}) {
  const siteName = 'TATATECH';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const url = `https://tatatech.net${path}`;

  return {
    title: fullTitle,
    description,
    url,
    image,
    siteName,
  };
}
