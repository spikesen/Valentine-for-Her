'use client';

import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const ALBUM_IMAGES = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516589174184-c685266e430c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=800&auto=format&fit=crop"
];

export const MiniAlbum = () => {
  return (
    <PhotoProvider>
      <div className="flex gap-3 justify-center my-6 px-4">
        {ALBUM_IMAGES.map((src, i) => (
          <PhotoView key={i} src={src}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -3 : 3 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 10,
                boxShadow: "0 15px 20px -5px rgba(220, 20, 60, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-24 md:w-24 md:h-32 bg-white p-1.5 rounded-md shadow-sm border border-rose-50 flex-shrink-0 cursor-zoom-in"
            >
              <div className="w-full h-full overflow-hidden rounded-sm bg-rose-50">
                <img src={src} alt="Memory" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};
