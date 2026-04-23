import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { site } from "@/lib/site";

type Props = {
  title: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_URL = "https://dsctravelstours.com";

const Seo = ({
  title,
  description = "Premium flight booking, visa processing, hotel reservations and curated tour packages from Lagos, Nigeria.",
  image = `${SITE_URL}/og-image.jpg`,
  type = "website",
  jsonLd,
}: Props) => {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = title.includes(site.shortName) ? title : `${title} — ${site.name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={site.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
