import { useEffect, useState } from 'react';

interface ModernLoaderProps {
    onLoadComplete?: () => void;
}

export const ModernLoader = ({ onLoadComplete }: ModernLoaderProps) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        let animationFrame: number;
        let startTime: number | null = null;
        const duration = 2000; // 2 seconds for smooth animation

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(() => {
                        onLoadComplete?.();
                    }, 800);
                }, 300);
            }
        };

        // Wait for DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                animationFrame = requestAnimationFrame(animate);
            });
        } else {
            // DOM already loaded
            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [onLoadComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-800 ${isExiting ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-black to-orange-950/10" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-75" />
            </div>

            {/* Logo/Brand */}
            <div className="relative z-10 mb-12">
                <div className="text-6xl font-bold tracking-tight">
                    l<span className="text-orange-500 animate-pulse">o</span>gs
                    <span className="text-orange-500">.</span>
                </div>
            </div>

            {/* Loading content */}
            <div className="relative z-10 w-full max-w-md px-8">
                {/* Progress bar container */}
                <div className="relative mb-6">
                    {/* Background track */}
                    <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                        {/* Progress fill */}
                        <div
                            className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 rounded-full transition-all duration-300 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                    </div>

                    {/* Progress glow */}
                    <div
                        className="absolute top-0 h-1.5 bg-orange-500/50 blur-md rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Progress percentage */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-medium">Loading Experience</span>
                    <span className="text-orange-500 font-bold tabular-nums">{Math.floor(progress)}%</span>
                </div>

                {/* Loading dots animation */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-8 text-xs text-gray-500">
                Modernizing the Blog Game
            </div>
        </div>
    );
};
