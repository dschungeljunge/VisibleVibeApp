import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-headings:scroll-mt-8 prose-headings:font-semibold prose-headings:text-ink prose-a:text-ink prose-a:underline prose-a:underline-offset-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
