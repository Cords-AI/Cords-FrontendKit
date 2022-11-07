export default function getLocale(): string {
  const components = window.location.pathname.split('/');
  return components[1] === 'fr' ? 'fr' : 'en';
}
