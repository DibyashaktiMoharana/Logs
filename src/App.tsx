import { useState, useEffect } from 'react';
import { GamepadIcon, RocketIcon, WalletIcon, UsersIcon, StarIcon, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VideoBackground } from '@/components/VideoBackground';
import { ModernLoader } from '@/components/ModernLoader';
import SoundToggle from '@/components/SoundToggle';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Wait for both video and minimum loading time
    if (videoLoaded) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);
  const navItems = [
    { icon: GamepadIcon, label: 'Gaming' },
    { icon: RocketIcon, label: 'Launch' },
    { icon: WalletIcon, label: 'Wallet' },
    { icon: UsersIcon, label: 'Community' },
    { icon: StarIcon, label: 'Rewards' },
  ];

  return (
    <>
      {isLoading && <ModernLoader onLoadComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen bg-black text-white relative overflow-hidden transition-opacity duration-500 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Optimized Video Background with filters */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0.3,
            filter: 'sepia(0.5) hue-rotate(-20deg) saturate(1.2)',
          }}
        >
          <VideoBackground onVideoLoaded={() => setVideoLoaded(true)} />
        </div>

      {/* Navigation */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col gap-3 bg-black/30 backdrop-blur-sm rounded-full py-1 px-1 border-[3px] border-orange-600">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={cn(
                "group relative flex items-center justify-center w-14 h-14",
                activeSection === index && "text-white"
              )}
            >
              <div className={cn(
                "absolute inset-0 m-1.5 rounded-full flex items-center justify-center transition-all duration-300",
                activeSection === index ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="absolute left-20 px-3 py-1 rounded-full bg-black/80 opacity-0 group-hover:opacity-100 
                             transition-opacity duration-200 whitespace-nowrap text-sm">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Header */}
      <header className="fixed top-0 w-full flex justify-between items-center p-8 z-10">
        <div className="text-4xl font-bold">
          l<span className="text-orange-500">o</span>gs.
        </div>
        <div className="flex items-center gap-4">
          <button className="group px-6 py-2 rounded-full border-[3px] border-orange-600 text-orange-500 
                           hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm font-medium
                           flex items-center gap-2">
            LET'S TALK
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button className="group px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                           transition-all duration-300 text-sm font-medium flex items-center gap-2">
            GET IN
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <div className="max-w-4xl bg-slate-900/10  backdrop-blur-sm rounded-full">
          <h2 className="text-lg font-medium mb-4 tracking-wider pt-24 text-orange-500">CHAPTER 01: THE IDEA</h2>
          <h1 className="text-7xl font-bold mb-8 tracking-tight px-6">
            Modernize the<br />Blog Game
          </h1>
          <p className="text-xl text-gray-300 mb-12 pb-24">
            Reimagine boring blogs with a Gen-Z twist.<br />fusing creativity with fearless style.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full flex justify-between items-center p-8 text-sm text-gray-400 z-10">
        <div>All rights reserved. © 2024 Dcodez</div>
        <div className="flex gap-4">
          <button className="hover:text-white transition-colors">Privacy Policy</button>
          <button className="hover:text-white transition-colors">Terms of Use</button>
          <button className="hover:text-white transition-colors">Legal Notice</button>
          <button className="hover:text-white transition-colors">support@dcodez.com</button>
        </div>
      </footer>

      <SoundToggle isOn={isSoundOn} onToggle={() => setIsSoundOn(!isSoundOn)} />
      </div>
    </>
  );
}

export default App;