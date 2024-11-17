import { useEffect, useRef } from 'react';
// import backgroundVideo from '@/assets/videos/background.mp4';

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-[130%] h-[130%] left-1/2 top-1/2 object-cover scale-110
                   transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000
                   sm:w-[120%] sm:h-[120%] md:w-[110%] md:h-[110%]"
        style={{
          willChange: 'transform',
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />

      </video>
    </div>
  );
};