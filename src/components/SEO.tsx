import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const SITE_NAME = "TudaSuda";

export default function SEO({ title, description, image, url }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const defaultDesc =
    "TudaSuda — онлайн-сервис поиска и бронирования билетов на поезд, самолёт и автобус. Маршруты, справочная информация и блог о путешествиях по России.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {image ? <meta property="og:image" content={image} /> : null}
      {url ? <meta property="og:url" content={url} /> : null}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      {image ? <meta name="twitter:image" content={image} /> : null}
    </Helmet>
  );
}
