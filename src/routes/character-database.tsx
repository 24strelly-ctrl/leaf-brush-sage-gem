import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Plus,
  ChevronDown,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard
} from "lucide-react";

export const Route = createFileRoute("/character-database")({
  component: CharacterDatabase,
});

// Sample character data - in production this would come from the CSV/API
const SAMPLE_CHARACTERS = [
  {
    id: 1,
    name: "Mary Magnumbytes",
    archetype: "Digital Storyteller",
    rarity: "Legendary",
    status: "Active",
    budget: "$150,000.00",
    portraitGenerated: true,
    posterGenerated: true,
    avatarGenerated: true,
    assetLastUpdated: "2024-09-11",
    entityName: "(AGENT) Primary Character",
    gender: "Female",
    keyToolCategory: "Content Creation, Technology, Visual Arts"
  },
  {
    id: 2,
    name: "Mac Nazarene",
    archetype: "Shadow Work Specialist/Master Craftsman",
    rarity: "Legendary",
    status: "Active",
    budget: "$120,000.00",
    portraitGenerated: true,
    posterGenerated: true,
    avatarGenerated: true,
    assetLastUpdated: "2024-09-11",
    entityName: "(AGENT) Primary Character",
    gender: "Male",
    keyToolCategory: "Community Building, Performance, Wisdom"
  },
  {
    id: 3,
    name: "Dikinya Myles",
    archetype: "Operations & Logistics",
    rarity: "Legendary",
    status: "Active",
    budget: "$110,000.00",
    portraitGenerated: true,
    posterGenerated: true,
    avatarGenerated: true,
    assetLastUpdated: "2024-09-11",
    entityName: "(AGENT) Primary Character",
    gender: "Male",
    keyToolCategory: "Operations, Strategy"
  },
  {
    id: 4,
    name: "Dixon Uhbuts",
    archetype: "High Priest",
    rarity: "Rare",
    status: "Active",
    budget: "$145,000.00",
    portraitGenerated: false,
    posterGenerated: false,
    avatarGenerated: false,
    assetLastUpdated: "",
    entityName: "Common Entity",
    gender: "Male",
    keyToolCategory: "Community Building, Performance, Wisdom"
  },
  {
    id: 5,
    name: "Airiol Uhbuts",
    archetype: "Seduction Artist",
    rarity: "Rare",
    status: "Active",
    budget: "$135,000.00",
    portraitGenerated: false,
    posterGenerated: false,
    avatarGenerated: false,
    assetLastUpdated: "",
    entityName: "Common Entity",
    gender: "Female",
    keyToolCategory: "Community Building, Performance, Wisdom"
  }
];

function CharacterDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAssetStatus, setSelectedAssetStatus] = useState("all");
  const [selectedCharacter, setSelectedCharacter] = useState<typeof SAMPLE_CHARACTERS[0] | null>(null);

  // Filter characters based on search and filters
  const filteredCharacters = useMemo(() => {
    return SAMPLE_CHARACTERS.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          character.archetype.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRarity = selectedRarity === "all" || character.rarity === selectedRarity;
      const matchesStatus = selectedStatus === "all" || character.status === selectedStatus;
      
      let matchesAssetStatus = true;
      if (selectedAssetStatus === "complete") {
        matchesAssetStatus = character.portraitGenerated && character.posterGenerated && character.avatarGenerated;
      } else if (selectedAssetStatus === "partial") {
        matchesAssetStatus = (character.portraitGenerated || character.posterGenerated || character.avatarGenerated) &&
                          !(character.portraitGenerated && character.posterGenerated && character.avatarGenerated);
      } else if (selectedAssetStatus === "none") {
        matchesAssetStatus = !character.portraitGenerated && !character.posterGenerated && !character.avatarGenerated;
      }
      
      return matchesSearch && matchesRarity && matchesStatus && matchesAssetStatus;
    });
  }, [searchTerm, selectedRarity, selectedStatus, selectedAssetStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = SAMPLE_CHARACTERS.length;
    const completeAssets = SAMPLE_CHARACTERS.filter(c => 
      c.portraitGenerated && c.posterGenerated && c.avatarGenerated
    ).length;
    const partialAssets = SAMPLE_CHARACTERS.filter(c => 
      (c.portraitGenerated || c.posterGenerated || c.avatarGenerated) &&
      !(c.portraitGenerated && c.posterGenerated && c.avatarGenerated)
    ).length;
    const noAssets = SAMPLE_CHARACTERS.filter(c => 
      !c.portraitGenerated && !c.posterGenerated && !c.avatarGenerated
    ).length;
    
    return { total, completeAssets, partialAssets, noAssets };
  }, []);

  const getAssetStatusIcon = (character: typeof SAMPLE_CHARACTERS[0]) => {
    if (character.portraitGenerated && character.posterGenerated && character.avatarGenerated) {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    } else if (character.portraitGenerated || character.posterGenerated || character.avatarGenerated) {
      return <Clock className="w-5 h-5 text-yellow-400" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "text-amber-400";
      case "Rare": return "text-purple-400";
      case "Common": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="relative min-h-svh bg-background text-foreground">
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <ImageIcon className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Character Database</h1>
                <p className="text-slate-400 mt-1">Manage and track character assets</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/pricing">
                <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Purchase Access
                </Button>
              </Link>
              <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50">
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Character
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-medium">Total Characters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-medium">Complete Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-green-400">{stats.completeAssets}</div>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-medium">Partial Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-yellow-400">{stats.partialAssets}</div>
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-medium">No Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-red-400">{stats.noAssets}</div>
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search characters by name or archetype..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              
              <div className="flex gap-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Rarities</option>
                    <option value="Legendary">Legendary</option>
                    <option value="Rare">Rare</option>
                    <option value="Common">Common</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    value={selectedAssetStatus}
                    onChange={(e) => setSelectedAssetStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Asset Status</option>
                    <option value="complete">Complete Assets</option>
                    <option value="partial">Partial Assets</option>
                    <option value="none">No Assets</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Character List */}
        <div className="space-y-4">
          {filteredCharacters.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-12 text-center">
                <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No characters found</h3>
                <p className="text-slate-400">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredCharacters.map((character) => (
              <Card key={character.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-purple-500/10 rounded-lg">
                        {getAssetStatusIcon(character)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{character.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(character.rarity)} bg-slate-900/50`}>
                            {character.rarity}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                            {character.status}
                          </span>
                        </div>
                        <p className="text-slate-400 mb-3">{character.archetype}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <span>Budget: {character.budget}</span>
                          <span>•</span>
                          <span>{character.entityName}</span>
                          <span>•</span>
                          <span>{character.gender}</span>
                          <span>•</span>
                          <span>{character.keyToolCategory}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="text-right">
                        <div className="text-sm text-slate-400 mb-1">Asset Status</div>
                        <div className="flex gap-2">
                          <span className={`text-xs ${character.portraitGenerated ? 'text-green-400' : 'text-red-400'}`}>
                            Portrait
                          </span>
                          <span className={`text-xs ${character.posterGenerated ? 'text-green-400' : 'text-red-400'}`}>
                            Poster
                          </span>
                          <span className={`text-xs ${character.avatarGenerated ? 'text-green-400' : 'text-red-400'}`}>
                            Avatar
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                        onClick={() => setSelectedCharacter(character)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Results count */}
        <div className="mt-6 text-center text-slate-400">
          Showing {filteredCharacters.length} of {SAMPLE_CHARACTERS.length} characters
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}