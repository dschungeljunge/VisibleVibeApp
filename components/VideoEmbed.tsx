import { getVideoEmbed } from "@/lib/video";

export function VideoEmbed({ url }: { url: string }) {
  const embed = getVideoEmbed(url);
  if (!embed) return null;

  return (
    <div className="vv-box overflow-hidden">
      <div className="relative aspect-video bg-paper">
        <iframe
          src={embed.src}
          title={embed.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
