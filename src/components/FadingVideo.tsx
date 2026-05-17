import { useEffect, useRef, useState } from 'react';

const VIDEO_SOURCES = [
  'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2611820/2611820-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/3048993/3048993-uhd_2560_1440_25fps.mp4',
];

interface FadingVideoProps {
  className?: string;
  overlayOpacity?: number;
}

export default function FadingVideo({ className = '', overlayOpacity = 0.55 }: FadingVideoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fading, setFading] = useState(false);
  const activeRef = useRef<HTMLVideoElement>(null);
  const nextRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startCrossfade = () => {
    setFading(true);
    timerRef.current = setTimeout(() => {
      setActiveIndex(nextIndex);
      setNextIndex((prev) => (prev + 1) % VIDEO_SOURCES.length);
      setFading(false);
    }, 1200);
  };

  useEffect(() => {
    const video = activeRef.current;
    if (!video) return;
    const onEnded = () => startCrossfade();
    video.addEventListener('ended', onEnded);
    return () => video.removeEventListener('ended', onEnded);
  }, [activeIndex, nextIndex]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={activeRef}
        key={`active-${activeIndex}`}
        src={VIDEO_SOURCES[activeIndex]}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: fading ? 0 : 1 }}
      />
      <video
        ref={nextRef}
        key={`next-${nextIndex}`}
        src={VIDEO_SOURCES[nextIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: fading ? 1 : 0 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />
    </div>
  );
}
