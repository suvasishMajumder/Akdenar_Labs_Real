// server side page
import ClientBlogPage from "./ClientBlogPage";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Blog Not Found | Akdenar Labs",
      description: "The blog you are looking for does not exist."
    };
  }

  const { data: blog } = await res.json();

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.shortDescription,
    keywords: blog?.keywords || [],
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.shortDescription,
      url: blog.canonicalUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
      images: [
        blog.ogImage || blog.bannerImage
      ],
      type: "article",
      publishedTime: blog.publishedAt,
      authors: blog.author?.name,
    },
    alternates: {
      canonical: blog.canonicalUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-10 text-red-500">Blog not found</div>;
  }

  const { data: blog } = await res.json();

  return <ClientBlogPage blog={blog} />;
}
