export type VideoEmbed = {
  src: string;
  title: string;
};

export function getVideoEmbed(url: string): VideoEmbed | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("loom.com")) {
      const match = parsed.pathname.match(/\/share\/([a-zA-Z0-9]+)/);
      if (!match) return null;
      return {
        src: `https://www.loom.com/embed/${match[1]}`,
        title: "Video",
      };
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (!id) return null;
      return {
        src: `https://www.youtube.com/embed/${id}`,
        title: "Video",
      };
    }

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (!id) return null;
      return {
        src: `https://www.youtube.com/embed/${id}`,
        title: "Video",
      };
    }
  } catch {
    return null;
  }

  return null;
}
