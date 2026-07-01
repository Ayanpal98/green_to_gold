import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: "website" | "article" | "product" | "software";
  ogImage?: string;
  schemaData?: object | object[];
}

export function SEO({
  title,
  description,
  keywords = "Green-to-Gold, BioSense DSS, ATSFY Technologies, sustainable manufacturing, Tripura, climate tech, circular economy, bio-composite boards, biodegradable tableware, pineapple leaf fiber, bamboo manufacturing, industrial AI",
  canonicalPath,
  ogType = "website",
  ogImage = "https://picsum.photos/seed/greentogold/1200/630",
  schemaData,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = `${title} | Green-to-Gold by ATSFY Technologies`;
    document.title = fullTitle;

    // 2. Helper to set/create meta tags
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Set standard meta tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // Set Open Graph tags
    const siteUrl = window.location.origin;
    const currentUrl = `${siteUrl}${canonicalPath || window.location.pathname}`;

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", "Green-to-Gold");
    setMetaTag("property", "og:locale", "en_US");

    // Set Twitter tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);
    setMetaTag("name", "twitter:site", "@atsfy_tech");

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector(`link[rel="canonical"]`);
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // 4. Update Schema JSON-LD
    const schemaId = "greentogold-seo-jsonld";
    let schemaScript = document.getElementById(schemaId);
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schemaData) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.setAttribute("id", schemaId);
      schemaScript.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Keep static defaults clean, but generally let component manage it
    };
  }, [title, description, keywords, canonicalPath, ogType, ogImage, schemaData]);

  return null;
}
