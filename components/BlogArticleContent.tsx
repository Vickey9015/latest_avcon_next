import { parseBlogTags } from "@/lib/blog-types";

type BlogArticleContentProps = {
  content: string;
  tags?: string;
};

function looksLikeHtml(content: string) {
  return /<[a-z][\s\S]*>/i.test(content.trim());
}

export default function BlogArticleContent({ content, tags }: BlogArticleContentProps) {
  const trimmed = content.trim();
  const tagList = parseBlogTags(tags ?? "");

  const paragraphs = trimmed
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="space-y-8">
      {trimmed ? (
        looksLikeHtml(trimmed) ? (
          <div
            className="blog-article-prose"
            dangerouslySetInnerHTML={{ __html: trimmed }}
          />
        ) : (
          <div className="space-y-5 text-base leading-8 text-gray-700">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )
      ) : (
        <p className="text-base leading-8 text-gray-600">Full article content will be available soon.</p>
      )}

      {tagList.length > 0 ? (
        <div className="border-t border-orange-100 pt-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#f37021]">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-[#f37021] ring-1 ring-orange-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
