import Image from "next/image";
import { useState } from "react";
import { Play} from "lucide-react";

import { Testimonial } from "@/lib/types";

// --- Video Card Component (Universal & Optimized) ---
const VideoCard = ({ data, index }: { data: Testimonial, index:number }) => {
  // --- Utilities ---
  const isYouTubeVideo = (url: string) => {
    return /^[a-zA-Z0-9_-]{11}$/.test(url);
  };

  const getYouTubeThumbnail = (id: string) => {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };
  const [isPlaying, setIsPlaying] = useState(false);

  const isYouTube = isYouTubeVideo(data.videoUrl);
  const posterSrc = isYouTube ? getYouTubeThumbnail(data.videoUrl) : null;

  return (
    <div className="group bg-white rounded-md border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Video / Poster Area - Increased height to aspect-[4/5] for modern vertical feel */}
      <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden border-2 ">
        {data.type === "image" ? (
          <Image
            src={`https://res.cloudinary.com/dkno1wygy/image/upload/f_auto,q_auto/${data.videoUrl}`}
            alt={`Testimonial by ${data.name}`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105 bg-white "
            priority={index<3}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : !isPlaying ? (
          <>
            {posterSrc ? (
              <Image
                src={posterSrc}
                alt={`Testimonial by ${data.name}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                priority={index<3}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              // Fallback for direct video without poster: loads ONLY the first frame
              <video
                src={data.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                preload="metadata"
                muted
                playsInline
              />
            )}

            {/* Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group/play cursor-pointer"
              aria-label={`Play video testimonial from ${data.name}`}
            >
              <div className="w-14 h-14  bg-white/70 group-hover:bg-white/90 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover/play:scale-110">
                <Play
                  className="w-5 h-5 text-red-600 ml-1"
                  fill="currentColor"
                />
              </div>
            </button>
          </>
        ) : // Render actual video player based on type
        isYouTube ? (
          <iframe
            src={`https://www.youtube.com/embed/${data.videoUrl}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
            title={`Testimonial by ${data.name}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={data.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            controls
            playsInline
          />
        )}
      </div>
    </div>
  );
};

export default VideoCard;
