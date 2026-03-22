import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const news = await getCollection("news");
  const blog = await getCollection("blog");

  const allPosts = [...news, ...blog].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Omniversify News",
    description: "Latest news and updates from Omniversify - Moroccan game development studio",
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.collection === "news" 
        ? `/news/${post.id}/` 
        : `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
