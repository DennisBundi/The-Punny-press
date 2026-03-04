import { Helmet } from 'react-helmet-async';
import { DEFAULT_META } from '@/lib/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({ title, description, image, url }: SEOHeadProps) {
  const pageTitle = title ? `${title} | The Punny Press` : DEFAULT_META.title;
  const pageDescription = description ?? DEFAULT_META.description;
  const pageImage = image ?? DEFAULT_META.ogImage;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
    </Helmet>
  );
}
