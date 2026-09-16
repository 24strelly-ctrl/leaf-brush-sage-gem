import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TemplateCard } from "@/components/social-templates";
import { SOCIAL_CHARACTERS } from "@/lib/social-characters";
import { SOCIAL_TEMPLATES, type TemplateData, type TemplateType, TEMPLATE_LABELS } from "@/lib/social-templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, Save, X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/social-templates")({
  component: SocialTemplates,
});

interface SavedTemplate {
  id: string;
  type: TemplateType;
  character: string;
  platform: string;
  data: TemplateData;
}

const STORAGE_KEY = "social-templates-custom";

function SocialTemplates() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [customTemplates, setCustomTemplates] = useState<SavedTemplate[]>([]);
  const [editForm, setEditForm] = useState<{
    type: TemplateType;
    character: string;
    platform: string;
    data: TemplateData;
  }>({
    type: "square",
    character: "MARY MAGNUMBYTES",
    platform: "INSTAGRAM · SQUARE",
    data: {
      eyebrow: "DIVINE MOTHER",
      headline: "Your darkness is not wrong.",
      brand: 'SEND "HELD" · RELLYVENT',
    },
  });

  // Load custom templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCustomTemplates(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load custom templates:", e);
      }
    }
  }, []);

  // Save custom templates to localStorage
  useEffect(() => {
    if (customTemplates.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTemplates));
    }
  }, [customTemplates]);

  const startEdit = (index: number, template: SavedTemplate) => {
    setEditingIndex(index);
    setEditForm({
      type: template.type,
      character: template.character,
      platform: template.platform,
      data: { ...template.data },
    });
    setIsEditing(true);
  };

  const startNew = () => {
    setEditingIndex(null);
    setEditForm({
      type: "square",
      character: "MARY MAGNUMBYTES",
      platform: "INSTAGRAM · SQUARE",
      data: {
        eyebrow: "",
        headline: "",
        brand: "",
        cta: "",
        subtext: "",
      },
    });
    setIsEditing(true);
  };

  const saveTemplate = () => {
    const newTemplate: SavedTemplate = {
      id: editingIndex !== null ? customTemplates[editingIndex].id : Date.now().toString(),
      type: editForm.type,
      character: editForm.character,
      platform: editForm.platform,
      data: editForm.data,
    };

    if (editingIndex !== null) {
      const updated = [...customTemplates];
      updated[editingIndex] = newTemplate;
      setCustomTemplates(updated);
    } else {
      setCustomTemplates([...customTemplates, newTemplate]);
    }

    setIsEditing(false);
    setEditingIndex(null);
  };

  const deleteTemplate = (index: number) => {
    const updated = customTemplates.filter((_, i) => i !== index);
    setCustomTemplates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

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
          <div className="flex items-center gap-3">
            <Button
              onClick={startNew}
              size="sm"
              className="bg-[#C9A84C] text-[#0A0A0F] hover:bg-[#C9A84C]/80"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
            <span className="text-[8px] tracking-[0.14em] uppercase text-[#8A9BA8]">
              TIAPMA'ATZU · PANEL 1
            </span>
          </div>
        </div>

        {/* Editor Panel */}
        {isEditing && (
          <Card className="mb-8 bg-[#12121A] border-[#242432]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-[#C9A84C]">
                  {editingIndex !== null ? "Edit Template" : "Create New Template"}
                </CardTitle>
                <div className="flex gap-2">
                  <Button onClick={saveTemplate} size="sm" className="bg-[#00C9A7] text-[#0A0A0F] hover:bg-[#00C9A7]/80">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={cancelEdit} size="sm" variant="outline" className="border-[#242432] text-[#8A9BA8] hover:text-[#F5F1E8]">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
              <CardDescription className="text-[#8A9BA8]">
                Customize your social media template content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">Template Type</Label>
                  <Select
                    value={editForm.type}
                    onValueChange={(value: TemplateType) => setEditForm({ ...editForm, type: value })}
                  >
                    <SelectTrigger className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#12121A] border-[#242432]">
                      {Object.entries(TEMPLATE_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">Character</Label>
                  <Select
                    value={editForm.character}
                    onValueChange={(value) => setEditForm({ ...editForm, character: value })}
                  >
                    <SelectTrigger className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#12121A] border-[#242432] max-h-60">
                      {SOCIAL_CHARACTERS.map((char) => (
                        <SelectItem key={char.id} value={char.name}>
                          {char.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">Platform</Label>
                  <Input
                    value={editForm.platform}
                    onChange={(e) => setEditForm({ ...editForm, platform: e.target.value })}
                    className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]"
                    placeholder="e.g., INSTAGRAM · SQUARE"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">Eyebrow (Small top text)</Label>
                  <Input
                    value={editForm.data.eyebrow || ""}
                    onChange={(e) => setEditForm({ ...editForm, data: { ...editForm.data, eyebrow: e.target.value } })}
                    className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]"
                    placeholder="e.g., DIVINE MOTHER"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">Headline (Main text)</Label>
                  <Input
                    value={editForm.data.headline || ""}
                    onChange={(e) => setEditForm({ ...editForm, data: { ...editForm.data, headline: e.target.value } })}
                    className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]"
                    placeholder="e.g., Your darkness is not wrong."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">Brand / Footer</Label>
                  <Input
                    value={editForm.data.brand || ""}
                    onChange={(e) => setEditForm({ ...editForm, data: { ...editForm.data, brand: e.target.value } })}
                    className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]"
                    placeholder="e.g., SEND 'HELD' · RELLYVENT"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">CTA (Call to Action)</Label>
                  <Input
                    value={editForm.data.cta || ""}
                    onChange={(e) => setEditForm({ ...editForm, data: { ...editForm.data, cta: e.target.value } })}
                    className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]"
                    placeholder="e.g., TAP 'HELD' FOR A BLESSING"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#C9A84C] text-xs">Subtext (Secondary text)</Label>
                  <Input
                    value={editForm.data.subtext || ""}
                    onChange={(e) => setEditForm({ ...editForm, data: { ...editForm.data, subtext: e.target.value } })}
                    className="bg-[#0A0A0F] border-[#242432] text-[#F5F1E8]"
                    placeholder="e.g., Quote Tweet your choice"
                  />
                </div>
              </div>

              {/* Live Preview */}
              <div className="pt-4 border-t border-[#242432]">
                <Label className="text-[#C9A84C] text-xs mb-3 block">Live Preview</Label>
                <div className="max-w-sm">
                  <TemplateCard
                    type={editForm.type}
                    character={editForm.character}
                    platform={editForm.platform}
                    data={editForm.data}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Custom Templates */}
        {customTemplates.length > 0 && (
          <>
            <h2 className="font-serif text-xl italic text-[#C9A84C] mb-6">
              Your Custom Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {customTemplates.map((template, index) => (
                <div key={template.id} className="relative group">
                  <TemplateCard
                    type={template.type}
                    character={template.character}
                    platform={template.platform}
                    data={template.data}
                  />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => startEdit(index, template)}
                      size="sm"
                      variant="outline"
                      className="bg-[#12121A] border-[#242432] text-[#8A9BA8] hover:text-[#C9A84C] p-1"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => deleteTemplate(index)}
                      size="sm"
                      variant="outline"
                      className="bg-[#12121A] border-[#242432] text-[#8A9BA8] hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Template Examples Grid */}
        <h2 className="font-serif text-xl italic text-[#C9A84C] mb-6">
          Example Templates
        </h2>
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

          {/* YouTube Thumbnail Example */}
          <TemplateCard
            type="thumbnail"
            character="UNZOBA VYNER"
            platform="YOUTUBE · THUMBNAIL"
            data={{
              eyebrow: "MIRROR ARCHITECT",
              headline: "3 Timelines You Didn't Know Existed",
              subtext: "Watch Now",
            }}
          />

          {/* YouTube Shorts Example */}
          <TemplateCard
            type="vertical"
            character="NERA SOL"
            platform="YOUTUBE SHORTS"
            data={{
              eyebrow: "DREAM SIGNALER",
              headline: "What your dreams are trying to tell you",
              subtext: "Swipe up for the full breakdown",
              cta: "WATCH FULL VIDEO",
              brand: "NERA SOL · DREAM SIGNALER",
            }}
          />

          {/* TikTok Example */}
          <TemplateCard
            type="vertical"
            character="NERA SOL"
            platform="TIKTOK"
            data={{
              eyebrow: "DREAM SIGNALER",
              headline: "This dream interpretation will change everything",
              subtext: "Save this for later",
              cta: "FOLLOW FOR MORE",
              brand: "@NERASOL",
            }}
          />

          {/* LinkedIn Example */}
          <TemplateCard
            type="landscape"
            character="ENDUS BOVERORD"
            platform="LINKEDIN"
            data={{
              eyebrow: "MACHINE SPIRIT",
              headline: "The hidden cost of burnout in automated systems",
              subtext: "A framework for humane technology",
              brand: "ENDUS BOVERORD",
            }}
          />

          {/* Facebook Example */}
          <TemplateCard
            type="square"
            character="MARY MAGNUMBYTES"
            platform="FACEBOOK"
            data={{
              eyebrow: "SANCTUARY ANCHOR",
              headline: "Creating safe spaces for emotional processing",
              brand: "RELLYVENT MEDIA GROUP",
            }}
          />

          {/* Pinterest Example */}
          <TemplateCard
            type="vertical"
            character="SELA NAMI"
            platform="PINTEREST"
            data={{
              eyebrow: "TIDE LISTENER",
              headline: "7 emotional recovery practices for sensitive souls",
              subtext: "Save to your wellness board",
              cta: "SAVE PIN",
              brand: "SELA NAMI",
            }}
          />

          {/* Threads Example */}
          <TemplateCard
            type="square"
            character="ILYRA QUELL"
            platform="THREADS"
            data={{
              eyebrow: "CHOICE ENGINE",
              headline: "When you can't decide, flip a coin—but listen to how it lands",
              brand: "ILYRA QUELL",
            }}
          />

          {/* Telegram Example */}
          <TemplateCard
            type="landscape"
            character="ENDUS BOVERORD"
            platform="TELEGRAM"
            data={{
              eyebrow: "MACHINE SPIRIT",
              headline: "Making systems legible without losing humanity",
              subtext: "Join the channel for weekly insights",
              brand: "ENDUS BOVERORD · SYSTEMS",
            }}
          />

          {/* WhatsApp Status Example */}
          <TemplateCard
            type="story"
            character="MARY MAGNUMBYTES"
            platform="WHATSAPP STATUS"
            data={{
              eyebrow: "SANCTUARY ANCHOR",
              headline: "You don't have to carry everything at once",
              cta: "REPLY IF YOU NEED SPACE",
            }}
          />

          {/* Linktree Example */}
          <TemplateCard
            type="link-preview"
            character="MARY MAGNUMBYTES"
            platform="LINKTREE"
            data={{
              eyebrow: "SANCTUARY ANCHOR",
              headline: "Explore Our Resources",
              cta: "TAP TO EXPLORE",
            }}
          />

          {/* Delta Drill Example */}
          <TemplateCard
            type="square"
            character="DELTA DRILL"
            platform="DISCORD"
            data={{
              eyebrow: "CONSTRUCTIVE FORGE",
              headline: "If it exists, it can be rebuilt.",
              brand: "DELTA DRILL · MAKING",
            }}
          />

          {/* Mr. Turner Example */}
          <TemplateCard
            type="banner"
            character="MR. TURNER"
            platform="MEDIUM"
            data={{
              eyebrow: "STORYTELLER",
              headline: "Weather is not an excuse.",
              subtext: "Storm light and a whipping standard. The commander as brand symbol — primal authority.",
              character: "MR. TURNER",
              platform: "MEDIUM · PODCAST",
            }}
          />

          {/* Cracoria Masters Example */}
          <TemplateCard
            type="landscape"
            character="CRACORIA MASTERS"
            platform="LINKEDIN"
            data={{
              eyebrow: "TEMPORAL ARCHITECT",
              headline: "Time is a material.",
              subtext: "Hourglass, nebula, and gold cloth — serene wisdom positioned as cosmic authority.",
              brand: "CRACORIA MASTERS",
            }}
          />
        </div>

        {/* Template Types Overview */}
        <h2 className="font-serif text-xl italic text-[#C9A84C] mb-6">
          Template Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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
