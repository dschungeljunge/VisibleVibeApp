export function LearnArticleArtwork({ slug }: { slug: string }) {
  const idea = slug === "app-idee-fuenf-fragen";
  const toolbox = slug === "toolbox-zusammenstellen";
  return (
    <div className={`flex h-48 items-center justify-center overflow-hidden border-b border-ink/10 sm:h-56 ${idea ? "bg-[#f4edc9]" : toolbox ? "bg-[#dfe9f0]" : "bg-[#e3ebe0]"}`}>
      <svg aria-hidden="true" viewBox="0 0 480 220" className="h-full w-full" fill="none">
        <g stroke="#1e1e1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {idea ? (
            <>
              <path d="M174 39 302 48 292 185 164 176Z" fill="#fffdf4" />
              <path d="m193 66 74 5M190 82l48 4M184 133l80 6M182 150l58 4" opacity=".35" />
              <path d="M227 101c0-14 28-13 28 1 0 10-15 8-15 19" />
              <path d="m239 129 0 1" strokeWidth="5" />
              <circle cx="146" cy="70" r="23" fill="#fde70e" />
              <path d="m136 70 7 7 13-15M320 113l15-7M317 136l18 7M305 94l7-15" />
              <path d="m125 151 7-7 36 38-7 7Z" fill="#e8b7a2" />
              <path d="m161 189 12 4-5-11" fill="#fffdf4" />
            </>
          ) : toolbox ? (
            <>
              <rect x="151" y="88" width="179" height="85" rx="12" fill="#fffdf4" />
              <path d="M151 112h179M216 88V72c0-7 7-12 14-12h22c7 0 13 5 13 12v16" />
              <path d="m210 136-12 10 12 10M270 136l12 10-12 10M249 132l-12 28" />
              <path d="m171 88-8-35 17-4 10 39" fill="#fde70e" />
              <path d="m281 88 9-39 16 4-8 35" fill="#b8ceaf" />
              <path d="m174 62 7-2M178 74l7-2M292 60l8 2M289 73l8 2M124 131h-15M352 82l10-10M353 143l14 5" />
            </>
          ) : (
            <>
              <rect x="158" y="49" width="166" height="127" rx="12" fill="#fffdf4" />
              <path d="M158 77h166" />
              <circle cx="176" cy="63" r="2" fill="#1e1e1e" />
              <circle cx="187" cy="63" r="2" fill="#1e1e1e" />
              <path d="m240 96 29 10v23c0 19-29 32-29 32s-29-13-29-32v-23Z" fill="#c4d8b9" />
              <path d="m228 127 9 9 16-20M132 99l-12-6M132 131l-15 5M349 110l13-6M346 142l12 8" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
