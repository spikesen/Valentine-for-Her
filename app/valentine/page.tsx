'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { CursorTrail } from '@/components/CursorTrail';

export default function ValentinePage() {
  const router = useRouter();
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonHidden, setNoButtonHidden] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleYesClick = () => {
    localStorage.setItem('valentineAccepted', 'true');
    router.push('/');
  };

  const handleNoHover = () => {
    if (noButtonHidden) return;

    const randomX = (Math.random() - 0.5) * 250;
    const randomY = (Math.random() - 0.5) * 250;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setAttemptCount(prev => {
      const newCount = prev + 1;
      
      // Increase yes button size
      setYesButtonScale(1 + newCount * 0.3);
      
      // Hide no button after 4 attempts
      if (newCount >= 4) {
        setNoButtonHidden(true);
      }
      
      return newCount;
    });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 text-rose-900 relative flex flex-col items-center justify-center py-4 px-4 overflow-hidden">
      <CursorTrail enabled={true} size={1} heartBurstOnClick />
      <FloatingHearts enabled={true} count={60} sizeMultiplier={1.2} speedMultiplier={0.8} />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-red-300/20 to-rose-300/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="z-10 text-center max-w-2xl relative"
      >
        {/* Animated heart pulse */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6 flex justify-center"
        >
          <Heart className="w-16 h-16 md:w-24 md:h-24 text-rose-600 fill-rose-600" />
        </motion.div>

        {/* Main question */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight">
            Will you be my
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 text-5xl md:text-7xl">
              Valentine?
            </span>
          </h1>
          
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-6"
          >
            <p className="text-lg md:text-2xl text-rose-700/80 font-light italic">
              Let's create more memories together 💕
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mt-8"
          />
        </motion.div>

        {/* Sparkles around text */}
        <div className="absolute top-10 left-5 md:left-20">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-gold" />
          </motion.div>
        </div>
        <div className="absolute top-20 right-5 md:right-20">
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-gold" />
          </motion.div>
        </div>

        {/* Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 relative w-full flex justify-center items-center gap-8 flex-wrap"
        >
          {/* No Button - Dodging */}
          <AnimatePresence>
            {!noButtonHidden && (
              <motion.button
                ref={noButtonRef}
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                  scale: Math.max(0.3, 1 - attemptCount * 0.15),
                  opacity: Math.max(0.1, 1 - attemptCount * 0.2),
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                onTouchStart={handleNoHover}
                className="px-6 md:px-8 py-3 md:py-4 bg-white/80 backdrop-blur-md border-2 border-rose-200 text-rose-600 rounded-full font-bold text-base md:text-lg hover:bg-white transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                No 😢
              </motion.button>
            )}
          </AnimatePresence>

          {/* Yes Button - Growing */}
          <motion.button
            onClick={handleYesClick}
            animate={{ scale: yesButtonScale }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ boxShadow: "0 0 40px rgba(220, 20, 60, 0.4)" }}
            className="relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-bold text-lg md:text-2xl shadow-xl hover:shadow-2xl flex items-center gap-3 overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <Heart className="w-6 h-6 md:w-8 md:h-8 fill-white animate-pulse relative z-10" />
            <span className="relative z-10">Yes! ❤️</span>
            <Heart className="w-6 h-6 md:w-8 md:h-8 fill-white animate-pulse relative z-10" />
          </motion.button>
        </motion.div>

        {/* Attempt counter message */}
        <AnimatePresence>
          {attemptCount > 0 && attemptCount < 4 && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-rose-500/60 text-sm md:text-base mt-8 italic"
            >
              You can't escape this... 😉 {4 - attemptCount} attempts left
            </motion.p>
          )}
          {noButtonHidden && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-rose-600 text-lg md:text-xl font-bold mt-8 animate-bounce"
            >
              I knew you'd say yes! 💕
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 flex gap-4 text-rose-300"
      >
        <Heart className="w-8 h-8 fill-current" />
        <Heart className="w-8 h-8 fill-current" />
        <Heart className="w-8 h-8 fill-current" />
      </motion.div>
    </main>
  );
}
