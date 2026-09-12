export type TemplateType = "square" | "story" | "banner";

export interface SocialTemplate {
  id: string;
  type: TemplateType;
  name: string;
  platform: string;
  aspectRatio: string;
  description: string;
}

export const TEMPLATE_TYPES: TemplateType[] = ["square", "story", "banner"];

export const SOCIAL_TEMPLATES: SocialTemplate[] = [
  {
    id: "instagram-square",
    type: "square",
    name: "Instagram Square",
    platform: "Instagram",
    aspectRatio: "1:1",
    description: "Standard square post format for Instagram feed posts",
  },
  {
    id: "instagram-story",
    type: "story",
    name: "Instagram Story",
    platform: "Instagram",
    aspectRatio: "9:16",
    description: "Full-screen vertical story format with progress bars",
  },
  {
    id: "twitter-banner",
    type: "banner",
    name: "Twitter/X Banner",
    platform: "Twitter/X",
    aspectRatio: "16:9",
    description: "Horizontal banner format for profile headers",
  },
];

export interface TemplateData {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  brand?: string;
  cta?: string;
  character?: string;
  platform?: string;
}

export const TEMPLATE_LABELS: Record<TemplateType, string> = {
  square: "Square Post",
  story: "Story/Reel",
  banner: "Banner",
};
