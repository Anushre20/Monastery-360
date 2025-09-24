import { useState } from "react";
import { Upload, Archive, Filter, Search, Eye, Calendar, User, Tag, Download, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: "manuscript" | "archaeological" | "mural" | "sculpture" | "document";
  dateFound: string;
  contributor: string;
  imageUrl: string;
  location: string;
  era: string;
  views: number;
}

interface DigitalArchivesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalArchives({ isOpen, onClose }: DigitalArchivesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const archiveItems: ArchiveItem[] = [
    {
      id: "1",
      title: "Illuminated Gospel Manuscript",
      description: "A beautifully preserved 12th-century illuminated manuscript featuring intricate gold leaf decorations and biblical texts.",
      category: "manuscript",
      dateFound: "2024-08-15",
      contributor: "Dr. Sarah Mitchell",
      imageUrl: "https://images.unsplash.com/photo-1616405160919-c209d0062a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbWFudXNjcmlwdCUyMGlsbHVtaW5hdGVkJTIwbWVkaWV2YWx8ZW58MXx8fHwxNzU4NjE4NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Ancient Scriptorium",
      era: "12th Century",
      views: 247
    },
    {
      id: "2", 
      title: "Ceramic Prayer Vessels",
      description: "Collection of medieval ceramic vessels used in religious ceremonies, discovered during recent excavations.",
      category: "archaeological",
      dateFound: "2024-09-02",
      contributor: "Monastery Archaeological Team",
      imageUrl: "https://images.unsplash.com/photo-1644176041496-393d63975fba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoYWVvbG9naWNhbCUyMGFydGlmYWN0cyUyMGFuY2llbnQlMjBwb3R0ZXJ5fGVufDF8fHx8MTc1ODYxODcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Monastery Courtyard",
      era: "13th Century",
      views: 189
    },
    {
      id: "3",
      title: "Chapel Ceiling Fresco",
      description: "Restored medieval fresco depicting scenes from the life of Saint Benedict, recently uncovered during restoration work.",
      category: "mural",
      dateFound: "2024-07-20",
      contributor: "Conservation Team",
      imageUrl: "https://images.unsplash.com/photo-1716450984543-b3ab2765d99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBtdXJhbCUyMGZyZXNjbyUyMG1lZGlldmFsJTIwYXJ0fGVufDF8fHx8MTc1ODYxODcxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Main Chapel",
      era: "14th Century",
      views: 312
    },
    {
      id: "4",
      title: "Stone Relief Carving",
      description: "Intricate stone carving depicting religious iconography, found embedded in the monastery's foundation walls.",
      category: "sculpture",
      dateFound: "2024-06-10",
      contributor: "Brother Thomas",
      imageUrl: "https://images.unsplash.com/photo-1758203509331-fa5488828543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwc3RvbmUlMjBjYXJ2aW5nJTIwcmVsaWdpb3VzJTIwc2N1bHB0dXJlfGVufDF8fHx8MTc1ODYxODcxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Bell Tower Foundation",
      era: "11th Century",
      views: 156
    },
    {
      id: "5",
      title: "Medieval Hymnal Pages",
      description: "Fragmented pages from a medieval hymnal with ornate calligraphy and musical notations in ancient script.",
      category: "document",
      dateFound: "2024-09-18",
      contributor: "Library Research Team",
      imageUrl: "https://images.unsplash.com/photo-1720700955854-9b531294d025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGJvb2slMjBwYWdlcyUyMGNhbGxpZ3JhcGh5fGVufDF8fHx8MTc1ODYxODcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Monastery Library",
      era: "13th Century", 
      views: 203
    }
  ];

  const categories = [
    { id: "all", name: "All Items", icon: Archive },
    { id: "manuscript", name: "Manuscripts", icon: Archive },
    { id: "archaeological", name: "Archaeological", icon: Archive },
    { id: "mural", name: "Murals & Frescoes", icon: Archive },
    { id: "sculpture", name: "Sculptures", icon: Archive },
    { id: "document", name: "Documents", icon: Archive }
  ];

  const filteredItems = archiveItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      {/* Modal Content */}
      <div className="bg-white w-full h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <Archive className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-medium">Digital Archives</h2>
              <p className="text-muted-foreground text-sm">
                Discover and contribute to our collection of monastery artifacts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Find
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">

            {/* Search and Filters */}
            <div className="space-y-6 mb-8">
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search artifacts, manuscripts, findings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-base"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-accent'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Archive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] relative">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.category === 'manuscript' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'archaeological' ? 'bg-green-100 text-green-800' :
                        item.category === 'mural' ? 'bg-purple-100 text-purple-800' :
                        item.category === 'sculpture' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.era}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {item.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.contributor}
                        </div>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Upload New Finding</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Artifact Title</label>
                <input
                  type="text"
                  placeholder="Name your discovery..."
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Category</label>
                <select className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="manuscript">Manuscript</option>
                  <option value="archaeological">Archaeological Find</option>
                  <option value="mural">Mural/Fresco</option>
                  <option value="sculpture">Sculpture/Carving</option>
                  <option value="document">Historical Document</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  placeholder="Describe your finding..."
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Upload Finding
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}