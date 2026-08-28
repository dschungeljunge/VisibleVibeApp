import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getVideoEmbed } from "@/lib/video";

function videoUrlFromChildren(children: ReactNode): string | undefined {
  const items = Children.toArray(children);
  if (items.length !== 1) return undefined;

  const only = items[0];
  if (typeof only === "string") {
    const url = only.trim();
    return getVideoEmbed(url) ? url : undefined;
  }

  if (isValidElement<{ href?: string }>(only) && typeof only.props.href === "string") {
    return getVideoEmbed(only.props.href) ? only.props.href : undefined;
  }

  return undefined;
}

export function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-headings:scroll-mt-8 prose-headings:font-semibold prose-headings:text-ink prose-a:text-ink prose-a:underline prose-a:underline-offset-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p({ children }) {
            const url = videoUrlFromChildren(children);
            if (url) {
              return (
                <div className="not-prose my-8">
                  <VideoEmbed url={url} />
                </div>
              );
            }
            return <p>{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
