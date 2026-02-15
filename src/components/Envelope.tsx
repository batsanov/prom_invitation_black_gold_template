import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { promConfig } from '../config/promConfig';

interface EnvelopeProps {
  onOpen: () => void;
  onStart?: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen, onStart }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [videoSrc, setVideoSrc] = useState(promConfig.envelope.video.desktop);
  const [imageSrc, setImageSrc] = useState(promConfig.envelope.image.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVideoSrc(promConfig.envelope.video.mobile);
        setImageSrc(promConfig.envelope.image.mobile);
      } else {
        setVideoSrc(promConfig.envelope.video.desktop);
        setImageSrc(promConfig.envelope.image.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (isPlaying) return;
    setShowHint(false);
    onStart?.(); // Trigger preload of other assets
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
      <div
        className="relative w-full h-full cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          key={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          playsInline
          onEnded={onOpen}
          onPlaying={() => setIsVideoReady(true)}
        />

        {/* Cover Image - smoothens transition to video */}
        <motion.img
          src={imageSrc}
          alt="Envelope"
          className="absolute inset-0 w-full h-full object-cover z-20"
          animate={{ opacity: isVideoReady ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Elegant click-to-open hint overlay */}
        <AnimatePresence>
          {showHint && !isPlaying && (
            <motion.div
              className="absolute inset-0 z-30 flex items-end justify-center pb-16 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Ripple rings */}
                <div className="relative flex items-center justify-center w-16 h-16">
                  <motion.div
                    className="absolute w-16 h-16 rounded-full border border-white/40"
                    animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute w-16 h-16 rounded-full border border-white/30"
                    animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                  />

                  {/* Tap icon */}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-white drop-shadow-lg"
                    animate={{ scale: [1, 0.92, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12" />
                    <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0V12" />
                    <path d="M14 10.5a1.5 1.5 0 0 1 3 0V12" />
                    <path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2 .208a6 6 0 0 1-5.012-2.7L7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022 1.867 1.867 0 0 1 2.28.28L8 13" />
                  </motion.svg>
                </div>

                {/* Text */}
                <motion.p
                  className="text-lg md:text-xl font-serif tracking-[0.25em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {promConfig.envelope.hintText}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Envelope;
