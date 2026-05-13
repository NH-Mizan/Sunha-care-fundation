import type { AppLocale } from "@/constants/site";
import type { Messages } from "@/lib/i18n";

type BlogMessagePost = Messages["blog"]["posts"][number];

export type BlogPost = BlogMessagePost & {
  image: string;
  gallery: string[];
};

const blogMedia = [
  {
    image:
      "https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524492449090-1abe1e6d1d53?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1469571486292-b53601020f60?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1593113598332-cd59a93e9c98?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-b53601020f60?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

export function getBlogPosts(locale: AppLocale, messages: Messages): BlogPost[] {
  const localizedPosts = messages.blog.posts;

  return localizedPosts.map((post, index) => ({
    ...post,
    image: blogMedia[index]?.image ?? blogMedia[0].image,
    gallery: blogMedia[index]?.gallery ?? blogMedia[0].gallery,
  }));
}

export function getBlogPostBySlug(
  locale: AppLocale,
  messages: Messages,
  slug: string
) {
  return getBlogPosts(locale, messages).find((post) => post.slug === slug);
}

export function getBlogCategories(posts: BlogPost[]) {
  return Array.from(new Set(posts.map((post) => post.category)));
}

