import { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    let frame = 0;
    let zOffset = 0;

    const drawGrid = (offset: number) => {
      const perspective = 800;
      const cellSize = 150; // Increased cell size for more spacing
      const gridSize = 15;

      for (let z = gridSize - 1; z >= 0; z--) {
        const depth = (z - offset + gridSize) % gridSize;
        const scale = perspective / (perspective + depth * cellSize);
        const alpha = Math.max(0, 1 - depth / gridSize);

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.15})`; // Reduced base opacity
        ctx.lineWidth = scale * 1.5; // Slightly thicker lines

        // Center point for perspective
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Calculate grid dimensions at current depth
        const gridWidth = canvas.width * 2 * scale; // Wider grid
        const gridHeight = canvas.height * 2 * scale; // Taller grid
        const startX = centerX - gridWidth / 2;
        const startY = centerY - gridHeight / 2;
        const step = cellSize * scale;

        ctx.beginPath();

        // Vertical lines
        for (let x = 0; x <= gridWidth; x += step) {
          ctx.moveTo(startX + x, startY);
          ctx.lineTo(startX + x, startY + gridHeight);
        }

        // Horizontal lines
        for (let y = 0; y <= gridHeight; y += step) {
          ctx.moveTo(startX, startY + y);
          ctx.lineTo(startX + gridWidth, startY + y);
        }

        ctx.stroke();
      }
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and loop the z-offset (reversed direction)
      zOffset = (zOffset - 0.01 + 1) % 1;
      drawGrid(zOffset);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-40"
      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))' }}
    />
  );
};

export default GridBackground;