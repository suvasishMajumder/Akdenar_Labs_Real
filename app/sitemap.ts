import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.labs.akdenar.com";

  // Helper: recursively read app folder for route folders/files
  function getRoutes(dir: string, parentRoute = ""): string[] {
    const fullPath = path.join(process.cwd(), dir);

    if (!fs.existsSync(fullPath)) return [];

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    let routes: string[] = [];

    for (const entry of entries) {
      if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
      if (
        entry.name === "components" ||
        entry.name === "lib" ||
        entry.name === "context" ||
        entry.name === "styles" ||
        entry.name === "hooks" ||
        entry.name === "utils" ||
        entry.name === "models" ||
        entry.name === "validations" ||
        entry.name === "data" ||
        entry.name === "public"
      )
        continue;

      const entryPath = path.join(dir, entry.name);

      // Folder → may contain subroutes
      if (entry.isDirectory()) {
        const folderRoute =
          entry.name === "(routes)"
            ? ""
            : `/${entry.name === "app" ? "" : entry.name}`;

        routes.push(...getRoutes(entryPath, parentRoute + folderRoute));
      }

      // File → consider only page.tsx
      if (entry.isFile() && entry.name === "page.tsx") {
        const route = parentRoute === "" ? "/" : parentRoute;

        routes.push(route);
      }
    }

    // Remove duplicates
    return [...new Set(routes)];
  }

  const staticRoutes = getRoutes("app");

  const sitemapData: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  return sitemapData;
}
