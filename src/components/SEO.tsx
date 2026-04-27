// Component SEO reutilitzable — emet meta tags, canonical, OG, Twitter Card i JSON-LD via Helmet.
// Ús: <SEO title="..." description="..." path="/ruta" schemas={[...]} />

import { Helmet } from "react-helmet-async";
import { SITE, absoluteUrl } from "@/lib/seo/config";

interface SEOProps {
  /** Títol de la pàgina. Si no acaba amb "| Hostly", s'hi afegeix. */
  title: string;
  /** Meta description (150-160 caràcters òptim). */
  description: string;
  /** Path canonical relatiu (ex: "/funciones/check-in"). */
  path: string;
  /** Imatge OG específica de la pàgina (fallback: og-image.png del site). */
  image?: string;
  /** type d'Open Graph (default: "website", articles usen "article"). */
  ogType?: "website" | "article" | "product";
  /** Schemas JSON-LD addicionals a emetre. */
  schemas?: Array<Record<string, unknown>>;
  /** Si true, afegeix robots noindex (per pàgines privades). */
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  path,
  image,
  ogType = "website",
  schemas = [],
  noindex = false,
}: SEOProps) {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl(SITE.defaultOgImage);
  const finalTitle = title.includes("Hostly") ? title : `${title} | ${SITE.name}`;

  return (
    <Helmet>
      {/* SEO bàsic */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={SITE.locale} />
      {SITE.alternateLocales.map((l) => (
        <meta key={l} property="og:locale:alternate" content={l} />
      ))}
      <meta property="og:site_name" content={SITE.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD schemas */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
