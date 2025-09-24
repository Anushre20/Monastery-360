import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="px-4 py-3 bg-background">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for manuscripts, landmarks, exhibits..."
          className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground"
        />
      </div>
    </div>
  );
}