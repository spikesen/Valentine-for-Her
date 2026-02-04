'use client';

import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

// Cloudinary image URLs directly
const ALBUM_IMAGES = [
  {
    thumbnail: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_150,h_150,c_thumb,q_auto,f_auto/1_f1ukvx',
    fullSize: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_400,h_600,c_fill,q_auto,f_auto/1_f1ukvx',
  },
  {
    thumbnail: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_150,h_150,c_thumb,q_auto,f_auto/2_sobgap',
    fullSize: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_400,h_600,c_fill,q_auto,f_auto/2_sobgap',
  },
  {
    thumbnail: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_150,h_150,c_thumb,q_auto,f_auto/3_puirvn',
    fullSize: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_400,h_600,c_fill,q_auto,f_auto/3_puirvn',
  },
  {
    thumbnail: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_150,h_150,c_thumb,q_auto,f_auto/4_va0zey',
    fullSize: 'https://res.cloudinary.com/dhxjv0wpk/image/upload/w_400,h_600,c_fill,q_auto,f_auto/4_va0zey',
  },
];

export const MiniAlbum = () => {
  return (
    <PhotoProvider>
      <div className="flex gap-2 md:gap-3 justify-center overflow-x-auto px-2 py-4">
        {ALBUM_IMAGES.map((image, i) => (
          <PhotoView key={i} src={image.fullSize}>
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
              className="w-14 h-20 md:w-24 md:h-32 bg-white p-1.5 rounded-md shadow-sm border border-rose-50 flex-shrink-0 cursor-zoom-in"
            >
              <div className="w-full h-full overflow-hidden rounded-sm bg-rose-50">
                <img 
                  src={image.thumbnail} 
                  alt="Memory" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};
