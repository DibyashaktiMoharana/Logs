import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  onVideoLoaded?: () => void;
}

export const VideoBackground = ({ onVideoLoaded }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set playback rate for smoother motion
    video.playbackRate = 0.75;

    // Optimize video loading - use loadeddata for faster response
    const handleLoadedData = () => {
      setIsLoaded(true);
      onVideoLoaded?.();
    };

    // Use loadeddata instead of canplaythrough for faster loading feedback
    video.addEventListener('loadeddata', handleLoadedData, { once: true });

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onVideoLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          willChange: 'opacity',
          transform: 'translate(-50%, -50%) translate3d(0, 0, 0)', // Center and hardware accelerate
          backfaceVisibility: 'hidden', // Optimize rendering
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
};