import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import photo1Grade from '../assets/photo_1_grade.png';
import photo12Grade from '../assets/photo_12_grade.png';

const ThenVsNow = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations for 1st Grade (The "Then" photo)
  // It starts visible, then shrinks and fades as we scroll
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blur1 = useTransform(scrollYProgress, [0, 0.5], ["0px", "10px"]);

  // Animations for 12th Grade (The "Now" photo)
  // It starts invisible/scaled up, then comes into focus
  const scale2 = useTransform(scrollYProgress, [0.5, 1], [1.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const blur2 = useTransform(scrollYProgress, [0.5, 1], ["10px", "0px"]);

  // Text animations
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY1 = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  const textOpacity2 = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const textY2 = useTransform(scrollYProgress, [0.6, 1], [50, 0]);

  return (
    <div ref={containerRef} className="h-[250vh] relative bg-[#1a1a1a]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5 pointer-events-none" />

        {/* Header - Always visible */}
        <motion.div
          className="absolute top-24 md:top-32 z-30 text-center"
        >
          <span className="font-body text-gold/80 font-bold drop-shadow-md tracking-[0.3em] uppercase text-xs md:text-sm">
            Пътуване във времето
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white mt-2 drop-shadow-lg">
            Тогава и сега
          </h2>
        </motion.div>

        {/* 1st Grade Photo Container */}
        <motion.div
          style={{ scale: scale1, opacity: opacity1, filter: `blur(${blur1})` }}
          className="absolute w-full h-full flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-72 h-[400px] md:w-96 md:h-[500px]">
            {/* Photo Frame */}
            <div className="absolute inset-0 border-8 border-white bg-white shadow-2xl transform -rotate-2">
              <img
                src={photo1Grade}
                alt="1st Grade"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Label */}
            <motion.div
              style={{ opacity: textOpacity1, y: textY1 }}
              className="absolute -bottom-16 left-0 right-0 text-center"
            >
              <span className="font-display text-4xl text-white italic drop-shadow-lg opacity-90">
                1-ви клас
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* 12th Grade Photo Container */}
        <motion.div
          style={{ scale: scale2, opacity: opacity2, filter: `blur(${blur2})` }}
          className="absolute w-full h-full flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-72 h-[400px] md:w-96 md:h-[500px]">
            {/* Photo Frame */}
            <div className="absolute inset-0 border-8 border-white bg-white shadow-2xl transform rotate-2">
              <img
                src={photo12Grade}
                alt="12th Grade"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Label */}
            <motion.div
              style={{ opacity: textOpacity2, y: textY2 }}
              className="absolute -bottom-16 left-0 right-0 text-center"
            >
              <span className="font-display text-4xl text-gold italic drop-shadow-lg opacity-90">
                12-ти клас
              </span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ThenVsNow;
