import { getVideoEmbed } from "@/lib/video";

export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const embed = getVideoEmbed(url);
  if (!embed) return null;

  return (
    <figure className="m-0">
      {title ? <figcaption className="mb-3 font-hand text-base">{title}</figcaption> : null}
      <div className="vv-box overflow-hidden">
        <div className={`relative bg-paper ${embed.aspectClass}`}>
          <iframe
            src={embed.src}
            title={title ?? embed.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </figure>
  );
}

export function ImpulseVideos({
  videos,
  embedded = false,
}: {
  videos: { url?: string; title?: string }[];
  embedded?: boolean;
}) {
  const frame = embedded
    ? "overflow-hidden rounded-2xl border-2 border-ink"
    : "vv-box overflow-hidden";

  if (videos.length === 0) return null;

  return (
    <div className="mt-6 flex flex-col gap-8">
      {videos.map((video, index) =>
        video.url ? (
          <figure key={video.url} className="m-0">
            {video.title ? <figcaption className="mb-3 font-hand text-base">{video.title}</figcaption> : null}
            <div className={frame}>
              <VideoFrame url={video.url} title={video.title} />
            </div>
          </figure>
        ) : (
          <div key={video.title ?? `pending-${index}`}>
            {video.title ? <p className="mb-3 font-hand text-base">{video.title}</p> : null}
            <div className={frame}>
              <div className="flex aspect-video items-center justify-center bg-paper">
                <p className="text-muted">Aufnahme folgt</p>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function VideoFrame({ url, title }: { url: string; title?: string }) {
  const embed = getVideoEmbed(url);
  if (!embed) return null;

  return (
    <div className={`relative bg-paper ${embed.aspectClass}`}>
      <iframe
        src={embed.src}
        title={title ?? embed.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
