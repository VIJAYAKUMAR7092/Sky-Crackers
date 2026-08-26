"use client"
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Save, Play } from "lucide-react";
import { saveYouTubeVideo } from "./actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function YouTubeSectionClient({ initialVideo }: { initialVideo: any }) {
  const [url, setUrl] = useState(initialVideo?.youtubeUrl || "");
  const [title, setTitle] = useState(initialVideo?.title || "Experience The Magic of Sivakasi");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    
    const ytId = getYouTubeId(url);
    const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "/images/home/sky-crackers-tv.jpg";

    const res = await saveYouTubeVideo({
      id: initialVideo?.id,
      youtubeUrl: url || "https://youtube.com/@skycrackersofficial",
      title: title,
      thumbnail: thumbnail
    });
    
    if (!res.success) {
      alert("Error: " + res.error);
    } else {
      alert("YouTube section updated successfully!");
      router.refresh();
    }
    setIsSaving(false);
  };

  const currentId = getYouTubeId(url);
  const currentThumb = currentId ? `https://img.youtube.com/vi/${currentId}/maxresdefault.jpg` : initialVideo?.thumbnail || "/images/home/sky-crackers-tv.jpg";

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Update the main YouTube video shown on the homepage.</p>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
      
      <div className="border rounded-md p-6 space-y-4 bg-card">
        <div>
          <label className="block text-sm font-medium mb-1">YouTube Video URL</label>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground mt-2">Paste the full YouTube link here. The thumbnail will be automatically generated.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Preview Thumbnail</label>
          <div className="w-full max-w-md aspect-video relative rounded-md overflow-hidden bg-muted border">
            {currentThumb ? (
              <Image src={currentThumb} alt="Thumbnail Preview" fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <Play className="w-12 h-12 opacity-50" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
