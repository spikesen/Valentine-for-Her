'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const PageTransition = ({
  children,
  delay = 0,
  className = '',
}: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface PageLayoutProps {
  children: ReactNode;
  staggerChildren?: boolean;
}

export const PageLayout = ({ children, staggerChildren = false }: PageLayoutProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? 0.1 : 0,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {staggerChildren
        ? Array.isArray(children)
          ? children.map((child, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                {child}
              </motion.div>
            ))
          : children
        : children}
    </motion.div>
  );
};
