import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { promConfig } from '../config/promConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const weddingDate = new Date(promConfig.date.isoDate);
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

const Countdown = () => {
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
    <section id="countdown" className="py-24 bg-ivory relative overflow-hidden">
      {/* Soft, luxurious background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blush/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dusty-rose/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-dusty-rose tracking-[0.3em] uppercase text-sm font-semibold">
            {promConfig.countdown.sectionLabel}
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-deep-rose mt-4 mb-6">
            {promConfig.countdown.mainTitle}
          </h2>
          <div className="w-24 h-px bg-fuchsia/30 mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center group"
            >
              <div className="relative">
                <span className="font-display text-6xl md:text-8xl text-fuchsia font-normal tabular-nums drop-shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  {String(block.value).padStart(2, '0')}
                </span>
                {/* Decorative underline on hover */}
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-dusty-rose/0 group-hover:bg-dusty-rose/40 transition-all duration-500 w-0 group-hover:w-full mx-auto" />
              </div>
              <span className="font-body text-xs md:text-sm text-muted-rose mt-4 uppercase tracking-[0.2em]">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center font-display italic text-2xl md:text-3xl text-dusty-rose/80 mt-16"
        >
          {promConfig.countdown.dateDisplay}
        </motion.p>
      </div>
    </section>
  );
};

export default Countdown;
