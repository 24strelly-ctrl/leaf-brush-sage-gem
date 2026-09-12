import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TemplateCard } from "@/components/social-templates";
import { SOCIAL_CHARACTERS } from "@/lib/social-characters";
import { SOCIAL_TEMPLATES } from "@/lib/social-templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/social-templates")({
  component: SocialTemplates,
});

function SocialTemplates() {
  return (
    <div className="relative min-h-svh bg-background text-foreground">
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-8 pb-2 border-b border-[rgba(201,168,76,0.6)]">
          <div className="flex items-center gap-4">
            <a href="/content-calendar">
              <Button variant="ghost" size="sm" className="text-[#8A9BA8] hover:text-[#C9A84C]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Calendar
              </Button>
            </a>
            <h1 className="font-serif text-2xl italic text-[#C9A84C]">
              Soul Entity Social Templates
            </h1>
          </div>
          <span className="text-[8px] tracking-[0.14em] uppercase text-[#8A9BA8]">
            TIAPMA'ATZU · PANEL 1
          </span>
        </div>

        {/* Template Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Square Post Example */}
          <TemplateCard
            type="square"
            character="MARY MAGNUMBYTES"
            platform="INSTAGRAM · SQUARE"
            data={{
              eyebrow: "DIVINE MOTHER",
              headline: "Your darkness is not wrong.",
              brand: 'SEND "HELD" · RELLYVENT',
            }}
          />

          {/* Story Post Example */}
          <TemplateCard
            type="story"
            character="MARY MAGNUMBYTES"
            platform="INSTAGRAM · STORY"
            data={{
              eyebrow: "HOLDING SPACE",
              headline: "Let me hold your darkness today.",
              cta: 'TAP "HELD" FOR A BLESSING',
            }}
          />

          {/* Banner Post Example */}
          <TemplateCard
            type="banner"
            character="UNZOBA VYNER"
            platform="TWITTER · BANNER"
            data={{
              eyebrow: "MIRROR ARCHITECT",
              headline: "Your current timeline is not your only timeline.",
              subtext: "Quote Tweet your alternate timeline choice.",
            }}
          />
        </div>

        {/* Template Types Overview */}
        <h2 className="font-serif text-xl italic text-[#C9A84C] mb-6">
          Template Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {SOCIAL_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-[#12121A] border border-[#242432] rounded p-4"
            >
              <div className="text-[8px] tracking-[0.18em] uppercase text-[#C9A84C] mb-2">
                {template.platform}
              </div>
              <div className="font-serif text-base italic text-[#F5F1E8] mb-2">
                {template.name}
              </div>
              <div className="text-[9px] text-[#8A9BA8] mb-1">
                {template.aspectRatio}
              </div>
              <div className="text-[9px] text-[#8A9BA8]">
                {template.description}
              </div>
            </div>
          ))}
        </div>

        {/* Character Usage Section */}
        <h2 className="font-serif text-xl italic text-[#C9A84C] mb-6">
          Character Usage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SOCIAL_CHARACTERS.map((character) => (
            <div
              key={character.id}
              className={`bg-[#12121A] border border-[#242432] border-l-2 p-3 ${
                character.teal ? "border-l-[#00C9A7]" : "border-l-[#C9A84C]"
              }`}
            >
              <div
                className={`text-[7px] tracking-[0.18em] uppercase mb-0.5 ${
                  character.teal ? "text-[#00C9A7]" : "text-[#C9A84C]"
                }`}
              >
                {character.role}
              </div>
              <div className="font-serif text-[15px] italic text-[#F5F1E8] mb-1">
                {character.name}
              </div>
              <div className="flex flex-wrap gap-0.5 mb-1">
                {character.platforms.map((platform) => (
                  <span
                    key={platform}
                    className={`text-[7px] tracking-[0.1em] uppercase px-0.5 py-0.5 border ${
                      character.teal
                        ? "border-[rgba(0,201,167,0.6)] text-[#00C9A7]"
                        : "border-[rgba(201,168,76,0.6)] text-[#C9A84C]"
                    }`}
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <div className="text-[9px] text-[#8A9BA8] leading-relaxed">
                {character.description}
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
