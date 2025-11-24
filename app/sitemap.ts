import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.labs.akdenar.com";

  function getRoutes(dir: string, parentRoute = ""): string[] {
    const fullPath = path.join(process.cwd(), dir);

    if (!fs.existsSync(fullPath)) return [];

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    // eslint-disable-next-line prefer-const
    let routes: string[] = [];

    for (const entry of entries) {
      if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

      // Skip folders that are NOT route folders
      if (
        [
          "components",
          "lib",
          "context",
          "styles",
          "hooks",
          "utils",
          "models",
          "validations",
          "data",
          "public",
        ].includes(entry.name)
      ) {
        continue;
      }

      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const folderRoute =
          entry.name === "(routes)"
            ? ""
            : `/${entry.name === "app" ? "" : entry.name}`;

        routes.push(...getRoutes(entryPath, parentRoute + folderRoute));
      }

      if (entry.isFile() && entry.name === "page.tsx") {
        const route = parentRoute === "" ? "/" : parentRoute;
        routes.push(route);
      }
    }

    return [...new Set(routes)];
  }

  const staticRoutes = getRoutes("app");

  /* ⭐ Remove Capabilities & Industries from sitemap */
  const filteredRoutes = staticRoutes.filter(
    (route) =>
      !route.startsWith("/capabilities") && !route.startsWith("/industries")
  );

  const sitemapData: MetadataRoute.Sitemap = filteredRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  return sitemapData;
}
