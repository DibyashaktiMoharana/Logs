import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ isOn, onToggle }: SoundToggleProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/audios/background.mp3');
    audioRef.current.loop = true;

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeInterval.current) {
        clearInterval(fadeInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isOn) {
        fadeIn(audioRef.current);
      } else {
        fadeOut(audioRef.current);
      }
    }
  }, [isOn]);

  const fadeIn = (audio: HTMLAudioElement) => {
    clearFadeInterval();
    audio.volume = 0;
    audio.play();
    let volume = 0;
    fadeInterval.current = setInterval(() => {
      if (volume < 1) {
        volume = Math.min(volume + 0.1, 1);
        audio.volume = volume;
      } else {
        clearFadeInterval();
      }
    }, 100); // Fade in over 1 second
  };

  const fadeOut = (audio: HTMLAudioElement) => {
    clearFadeInterval();
    let volume = audio.volume;
    fadeInterval.current = setInterval(() => {
      if (volume > 0) {
        volume = Math.max(volume - 0.1, 0);
        audio.volume = volume;
      } else {
        audio.pause();
        clearFadeInterval();
      }
    }, 100); // Fade out over 1 second
  };

  const clearFadeInterval = () => {
    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
    }
  };

  return (
    <button
      onClick={onToggle}
      className={`fixed right-8 bottom-24 flex items-center gap-2 bg-black/30 backdrop-blur-sm 
                 border border-[3px] border-gray-800 rounded-full px-4 py-2 text-sm transition-all
                 hover:bg-black/50 hover:border-orange-600 ${isOn ? 'border-orange-500' : 'border-gray-400'}`}
    >
      {isOn ? (
        <Volume2 className="w-4 h-4 text-orange-500" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
      <span className={`font-medium ${isOn ? 'text-orange-500' : 'text-gray-400'}`}>
        SOUND {isOn ? 'ON.' : 'OFF'}
      </span>
    </button>
  );
};

export default SoundToggle;
