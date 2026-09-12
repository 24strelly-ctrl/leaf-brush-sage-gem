import React from "react";
import type { TemplateData } from "@/lib/social-templates";

interface SquarePostProps {
  data: TemplateData;
}

export function SquarePost({ data }: SquarePostProps) {
  return (
    <div className="relative w-full aspect-square bg-[#0A0A0F] overflow-hidden flex items-end">
      {/* Background lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_18px,rgba(201,168,76,0.04)_18px,rgba(201,168,76,0.04)_19px)]" />
      
      {/* Glow effect */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[80%] h-[60px] bg-[radial-gradient(ellipse,rgba(0,201,167,0.18)_0%,transparent_70%)] rounded-full" />
      
      {/* Content */}
      <div className="relative z-1 p-3.5 w-full">
        {data.eyebrow && (
          <div className="text-[7px] tracking-[0.2em] uppercase text-[#00C9A7] mb-1.5">
            {data.eyebrow}
          </div>
        )}
        <div className="font-serif text-[17px] italic text-[#F5F1E8] leading-tight mb-1.5">
          {data.headline}
        </div>
        <div className="h-px bg-[linear-gradient(90deg,#C9A84C,transparent)] mb-1.5" />
        {data.brand && (
          <div className="text-[7px] tracking-[0.18em] uppercase text-[#C9A84C]">
            {data.brand}
          </div>
        )}
      </div>
      
      {/* Logo mark placeholder */}
      <div className="absolute top-3.5 right-3.5 z-2 w-7 h-5 bg-[#C9A84C]" />
    </div>
  );
}

interface StoryPostProps {
  data: TemplateData;
  currentSlide?: number;
  totalSlides?: number;
}

export function StoryPost({ data, currentSlide = 1, totalSlides = 4 }: StoryPostProps) {
  const progressBars = Array.from({ length: totalSlides }, (_, i) => i < currentSlide);

  return (
    <div className="relative w-full aspect-[9/16] bg-[#0A0A0F] overflow-hidden flex flex-col justify-between p-3.5">
      {/* Swoosh gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,201,167,0.06)_0%,transparent_50%,rgba(201,168,76,0.08)_100%)] z-0" />
      
      {/* Top section */}
      <div className="relative z-1 flex items-center justify-between">
        <div className="flex gap-0.5 flex-1 mr-2">
          {progressBars.map((filled, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full flex-1 ${filled ? "bg-[#C9A84C]" : "bg-white/20"}`}
            />
          ))}
        </div>
        <div className="w-[22px] h-[22px] rounded-full border border-[#C9A84C] bg-[#1A1A24] flex items-center justify-center text-[8px] font-serif italic text-[#C9A84C]">
          {data.character?.[0] || "S"}
        </div>
      </div>
      
      {/* Middle section */}
      <div className="relative z-1 text-center">
        {data.eyebrow && (
          <div className="text-[7px] tracking-[0.2em] uppercase text-[#00C9A7] mb-2">
            SLIDE {currentSlide} · {data.eyebrow}
          </div>
        )}
        <div className="font-serif text-[20px] italic text-[#F5F1E8] leading-tight">
          {data.headline}
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="relative z-1">
        {data.cta && (
          <div className="bg-[rgba(201,168,76,0.15)] border border-[#C9A84C] py-1.5 text-center text-[8px] tracking-[0.14em] uppercase text-[#C9A84C]">
            {data.cta}
          </div>
        )}
      </div>
    </div>
  );
}

interface BannerPostProps {
  data: TemplateData;
}

export function BannerPost({ data }: BannerPostProps) {
  return (
    <div className="relative w-full aspect-[16/9] bg-[#0A0A0F] overflow-hidden flex items-center px-5 gap-3.5">
      {/* Vertical rule */}
      <div className="w-0.5 h-1/2 bg-[linear-gradient(180deg,#00C9A7,#C9A84C)] rounded-[1px] flex-shrink-0" />
      
      {/* Text content */}
      <div className="flex-1">
        {data.eyebrow && (
          <div className="text-[7px] tracking-[0.2em] uppercase text-[#00C9A7] mb-0.5">
            {data.eyebrow}
          </div>
        )}
        <div className="font-serif text-[14px] italic text-[#F5F1E8] leading-[1.25]">
          {data.headline}
        </div>
        {data.subtext && (
          <div className="text-[8px] text-[#8A9BA8] mt-0.5 tracking-[0.05em]">
            {data.subtext}
          </div>
        )}
      </div>
      
      {/* Logo area */}
      <div className="text-right">
        <div className="font-serif text-[11px] italic text-[#C9A84C]">
          {data.character || "Revelation"}
        </div>
        {data.platform && (
          <div className="text-[7px] tracking-[0.14em] uppercase text-[#8A9BA8] mt-0.5">
            {data.platform}
          </div>
        )}
      </div>
    </div>
  );
}

interface TemplateCardProps {
  type: "square" | "story" | "banner";
  character?: string;
  platform?: string;
  data: TemplateData;
}

export function TemplateCard({ type, character, platform, data }: TemplateCardProps) {
  return (
    <div className="bg-[#12121A] border border-[#242432] rounded overflow-hidden">
      <div className="px-2 py-1 border-b border-[#242432] flex items-center justify-between">
        <span className="text-[8px] tracking-[0.16em] uppercase text-[#8A9BA8]">
          {character || "CHARACTER"}
        </span>
        <span className="text-[8px] tracking-[0.16em] uppercase text-[rgba(201,168,76,0.6)]">
          {platform || "PLATFORM"}
        </span>
      </div>
      {type === "square" && <SquarePost data={data} />}
      {type === "story" && <StoryPost data={data} />}
      {type === "banner" && <BannerPost data={data} />}
    </div>
  );
}
