import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.labs.akdenar.com";

  function getRoutes(dir: string, parent = ""): string[] {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) return [];

    const items = fs.readdirSync(fullPath, { withFileTypes: true });

    const routes: string[] = [];

    for (const item of items) {
      const name = item.name;

      // ❌ Skip hidden, underscore, or dot folders
      if (name.startsWith("_") || name.startsWith(".")) continue;

      // ❌ Skip unwanted folders inside app
      if (
        ["admin", "api"].includes(name) // skip admin + api
      ) {
        continue;
      }

      // ❌ Skip dynamic folders: [slug], [id], [anything]
      if (name.startsWith("[") && name.endsWith("]")) continue;

      const itemPath = path.join(dir, name);

      // 📁 If it's a folder inside app, treat as a route
      if (item.isDirectory()) {
        const route = parent + "/" + name;
        routes.push(route); // add parent route

        // Recursively check inside folder
        routes.push(...getRoutes(itemPath, route));
      }

      // 📄 If file is page.tsx → add the current folder as a route
      if (item.isFile() && name === "page.tsx") {
        const route = parent === "" ? "/" : parent;
        routes.push(route);
      }
    }

    return [...new Set(routes)];
  }

  // ⭐ ONLY scan inside the app folder
  const pages = getRoutes("app", "");

  // ❌ Remove capabilities & industries as you said earlier
  const filtered = pages.filter(
    (r) => !r.startsWith("/capabilities") && !r.startsWith("/industries")
  );

  return filtered.map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
