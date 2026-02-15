import { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Location from './Location';
import SurvivalGuide from './SurvivalGuide';
import PanicButton from './PanicButton';
import Countdown from './Countdown';
import ThenVsNow from './ThenVsNow';
import RSVPForm from './RSVPForm';
import Footer from './Footer';
import Envelope from './Envelope';
import { AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { promConfig } from '../config/promConfig';

function Home() {
  const [isEnvelopeOpen, setEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Start background music when the envelope is opened
  useEffect(() => {
    if (!isEnvelopeOpen) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;

    // Try to auto-play if the user gesture (opening envelope) allows it
    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch (e) {
        console.log("Autoplay prevented", e);
        setIsMusicPlaying(false);
      }
    };

    attemptPlay();
  }, [isEnvelopeOpen]);

  // Handle tab switching & window focus logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => {
      // Always pause if the system signals we are inactive
      if (!audio.paused) {
        audio.muted = true; // Ensure silence even if pause is delayed
        audio.pause();
      }
    };

    const handleResume = () => {
      // Only resume if the user INTENDS for music to be playing
      if (isMusicPlaying && !document.hidden) {
        audio.muted = false;
        if (audio.paused) {
          audio.play().catch(e => console.debug("Audio resume failed", e));
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePause();
      } else {
        handleResume();
      }
    };

    // Direct event mapping for reliability on mobile
    window.addEventListener('blur', handlePause);
    window.addEventListener('focus', handleResume);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pagehide is often more reliable than blur on iOS for tab switching
    window.addEventListener('pagehide', handlePause);

    return () => {
      window.removeEventListener('blur', handlePause);
      window.removeEventListener('focus', handleResume);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePause);
    };
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio.play()
        .then(() => setIsMusicPlaying(true))
        .catch((e) => console.error("Play failed", e));
    }
  };

  // Preload music when user starts interacting (clicks envelope)
  const handleEnvelopeStart = () => {
    if (audioRef.current) {
      audioRef.current.load(); // Start buffering
    }
  };

  return (
    <div className={`min-h-screen bg-ivory ${!isEnvelopeOpen ? 'overflow-hidden max-h-screen' : ''}`}>
      {/* Background Music - preload none to save initial bandwidth */}
      <audio
        ref={audioRef}
        loop
        preload="none"
      >
        <source src={promConfig.meta.music} type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      {isEnvelopeOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 bg-ivory/90 hover:bg-white text-deep-rose border border-fuchsia/20 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label={isMusicPlaying ? 'Mute music' : 'Play music'}
        >
          {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      )}

      <AnimatePresence>
        {!isEnvelopeOpen && (
          <Envelope
            onOpen={() => setEnvelopeOpen(true)}
            onStart={handleEnvelopeStart}
          />
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Navbar />
        {/* Lazy render heavy components to prevent asset downloading until needed */}
        {isEnvelopeOpen && (
          <>
            <Hero />
            <Countdown />
            <ThenVsNow />
            <Location />
            <SurvivalGuide />
            <PanicButton />
            <RSVPForm />
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
