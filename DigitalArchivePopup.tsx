import { useState } from "react";
import { motion } from "motion/react";
import { X, Upload, FileImage, Calendar, Eye, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";

interface ArchiveItem {
  id: string;
  title: string;
  type: 'manuscript' | 'mural' | 'archaeological';
  image: string;
  uploadDate: string;
  description: string;
  uploader: string;
}

interface DigitalArchivePopupProps {
  onClose: () => void;
}

export function DigitalArchivePopup({ onClose }: DigitalArchivePopupProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'browse' | 'upload'>('browse');
  const [dragActive, setDragActive] = useState(false);

  const archiveItems: ArchiveItem[] = [
    {
      id: '1',
      title: 'Illuminated Gospel Manuscript',
      type: 'manuscript',
      image: 'https://images.unsplash.com/photo-1616405160919-c209d0062a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbWFudXNjcmlwdCUyMGlsbHVtaW5hdGVkJTIwbWVkaWV2YWx8ZW58MXx8fHwxNzU4NjE4NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      uploadDate: '2024-01-15',
      description: '12th century illuminated manuscript with intricate gold leaf decorations',
      uploader: 'Dr. Sarah Chen'
    },
    {
      id: '2',
      title: 'Byzantine Chapel Fresco',
      type: 'mural',
      image: 'https://images.unsplash.com/photo-1725836152179-803aef145307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hc3RlcnklMjBtdXJhbCUyMGZyZXNjbyUyMHJlbGlnaW91cyUyMGFydHxlbnwxfHx8fDE3NTg3MDIwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      uploadDate: '2024-01-12',
      description: 'Restored Byzantine-era fresco depicting religious scenes',
      uploader: 'Prof. Michael Rodriguez'
    },
    {
      id: '3',
      title: 'Ancient Pottery Fragments',
      type: 'archaeological',
      image: 'https://images.unsplash.com/photo-1570916209250-d6a3ed07edb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoYWVvbG9naWNhbCUyMGFydGlmYWN0cyUyMGFuY2llbnQlMjBwb3R0ZXJ5JTIwc3RvbmV8ZW58MXx8fHwxNzU4NzAyMTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      uploadDate: '2024-01-10',
      description: 'Pottery shards discovered during recent excavations, dating to 8th century',
      uploader: 'Archaeological Team'
    },
    {
      id: '4',
      title: 'Medieval Script Collection',
      type: 'manuscript',
      image: 'https://images.unsplash.com/photo-1616405160919-c209d0062a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbWFudXNjcmlwdCUyMGlsbHVtaW5hdGVkJTIwbWVkaWV2YWx8ZW58MXx8fHwxNzU4NjE4NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      uploadDate: '2024-01-08',
      description: 'Collection of medieval monastic scripts and prayers',
      uploader: 'Brother Thomas'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manuscript': return 'bg-blue-100 text-blue-800';
      case 'mural': return 'bg-purple-100 text-purple-800';
      case 'archaeological': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload logic here
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload logic here
      console.log('Files selected:', e.target.files);
    }
  };

  const groupedItems = {
    manuscript: archiveItems.filter(item => item.type === 'manuscript'),
    mural: archiveItems.filter(item => item.type === 'mural'),
    archaeological: archiveItems.filter(item => item.type === 'archaeological')
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-card rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-medium text-foreground">{t('digital_archive')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'browse' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('browse_archive')}
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'upload' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('upload_archive')}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'browse' ? (
            <div className="space-y-8">
              {/* Recent Manuscripts */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-primary" />
                  {t('recent_manuscripts')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedItems.manuscript.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -2 }}
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            Manuscript
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.uploadDate}
                          </div>
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-accent rounded">
                              <Eye className="w-3 h-3" />
                            </button>
                            <button className="p-1 hover:bg-accent rounded">
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Murals */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-primary" />
                  {t('recent_murals')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedItems.mural.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -2 }}
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            Mural
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.uploadDate}
                          </div>
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-accent rounded">
                              <Eye className="w-3 h-3" />
                            </button>
                            <button className="p-1 hover:bg-accent rounded">
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Archaeological Finds */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-primary" />
                  {t('archaeological_finds')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedItems.archaeological.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -2 }}
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            Archaeological
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.uploadDate}
                          </div>
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-accent rounded">
                              <Eye className="w-3 h-3" />
                            </button>
                            <button className="p-1 hover:bg-accent rounded">
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Upload Section */
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">{t('upload_photo')}</h3>
              
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted-foreground/50 hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      {t('drag_drop_files')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('supported_formats')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('max_file_size')}
                    </p>
                  </div>
                </label>
              </div>

              {/* Upload Form */}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-foreground mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter title for your upload"
                  />
                </div>
                
                <div>
                  <label className="block font-medium text-foreground mb-2">
                    Type
                  </label>
                  <select className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="manuscript">Manuscript</option>
                    <option value="mural">Mural</option>
                    <option value="archaeological">Archaeological Find</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                    placeholder="Describe your upload..."
                  />
                </div>
                
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Upload to Archive
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}