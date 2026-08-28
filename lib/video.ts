export type VideoEmbed = {
  src: string;
  title: string;
  aspectClass: string;
};

function loomIdFromPath(pathname: string): string | null {
  const match = pathname.match(/\/(?:share|embed)\/([a-zA-Z0-9-]+)/);
  return match?.[1] ?? null;
}

export function getVideoEmbed(url: string): VideoEmbed | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("loom.com")) {
      const id = loomIdFromPath(parsed.pathname);
      if (!id) return null;

      const src = new URL(`https://www.loom.com/embed/${id}`);
      src.searchParams.set("hide_owner", "true");
      src.searchParams.set("hide_share", "true");
      src.searchParams.set("hide_title", "true");
      src.searchParams.set("hideEmbedTopBar", "true");

      return {
        src: src.toString(),
        title: "Loom-Aufnahme",
        // Loom-Embeds kommen mit padding-bottom: 62.5% (8:5), nicht 16:9.
        aspectClass: "aspect-[8/5]",
      };
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (!id) return null;
      return {
        src: `https://www.youtube.com/embed/${id}`,
        title: "Video",
        aspectClass: "aspect-video",
      };
    }

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (!id) return null;
      return {
        src: `https://www.youtube.com/embed/${id}`,
        title: "Video",
        aspectClass: "aspect-video",
      };
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (!id || !/^\d+$/.test(id)) return null;
      return {
        src: `https://player.vimeo.com/video/${id}`,
        title: "Video",
        aspectClass: "aspect-video",
      };
    }
  } catch {
    return null;
  }

  return null;
}
