import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { promConfig } from '../config/promConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const weddingDate = new Date(promConfig.date.isoDate);

  const calculateTimeLeft = (): TimeLeft => {
    const difference = weddingDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: promConfig.countdown.labels.days },
    { value: timeLeft.hours, label: promConfig.countdown.labels.hours },
    { value: timeLeft.minutes, label: promConfig.countdown.labels.minutes },
    { value: timeLeft.seconds, label: promConfig.countdown.labels.seconds },
  ];

  return (
    <section id="countdown" className="py-20 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#181818] relative overflow-hidden">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-gold/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-body text-gold/80 font-bold drop-shadow-md tracking-[0.3em] uppercase text-sm">
            {promConfig.countdown.sectionLabel}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4 drop-shadow-lg">
            {promConfig.countdown.mainTitle}
          </h2>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6 shadow-sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-4 md:gap-8"
        >
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg shadow-xl flex items-center justify-center border border-gold/20 hover:scale-105 transition-transform duration-300">
                <span className="font-display text-2xl md:text-4xl text-gold/90 drop-shadow-sm">
                  {String(block.value).padStart(2, '0')}
                </span>
              </div>
              <span className="font-body text-xs md:text-sm text-white/60 mt-2 uppercase tracking-wider drop-shadow-sm">
                {block.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center font-display italic text-3xl md:text-4xl text-white/80 mt-12 drop-shadow-md"
        >
          {promConfig.countdown.dateDisplay}
        </motion.p>
      </div>
    </section>
  );
};

export default Countdown;
