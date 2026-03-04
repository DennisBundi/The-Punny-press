import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DEFAULT_META, SITE_URL } from '@/lib/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

function resolveImage(image: string): string {
  if (image.startsWith('http')) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

export default function SEOHead({ title, description, image, url, type = 'website', jsonLd }: SEOHeadProps) {
  const { pathname } = useLocation();
  const pageTitle = title ? `${title} | The Punny Press` : DEFAULT_META.title;
  const pageDescription = description ?? DEFAULT_META.description;
  const pageImage = resolveImage(image ?? DEFAULT_META.ogImage);
  const canonicalUrl = url ?? `${SITE_URL}${pathname}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="The Punny Press" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
