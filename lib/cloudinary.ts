/**
 * Utility to build Cloudinary image URLs
 * Cloud name: dhxjv0wpk
 */

interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  quality?: 'auto' | number;
  format?: 'auto' | 'jpg' | 'png' | 'webp';
  gravity?: string;
}

export const buildCloudinaryUrl = (
  publicId: string,
  options: CloudinaryOptions = {}
): string => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dhxjv0wpk';
  
  // Build transformation string
  const transforms: string[] = [];
  
  if (options.width || options.height) {
    const w = options.width ? `w_${options.width}` : '';
    const h = options.height ? `h_${options.height}` : '';
    const crop = options.crop || 'fill';
    transforms.push([w, h, `c_${crop}`].filter(Boolean).join(','));
  }
  
  if (options.quality) {
    const q = typeof options.quality === 'number' ? options.quality : options.quality;
    transforms.push(`q_${q}`);
  }
  
  if (options.format) {
    transforms.push(`f_${options.format}`);
  }
  
  if (options.gravity) {
    transforms.push(`g_${options.gravity}`);
  }
  
  const transformPath = transforms.length > 0 ? `/${transforms.join('/')}` : '';
  
  return `https://res.cloudinary.com/${cloudName}/image/upload${transformPath}/${publicId}`;
};

/**
 * Get album image from Cloudinary
 * Images should be stored in the 'valentine-album' folder
 */
export const getAlbumImage = (
  imageName: string,
  options: Partial<CloudinaryOptions> = {}
): string => {
  const defaultOptions: CloudinaryOptions = {
    width: 400,
    height: 600,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    gravity: 'face',
    ...options,
  };
  
  return buildCloudinaryUrl(`valentine-album/${imageName}`, defaultOptions);
};

/**
 * Get thumbnail version of album image
 */
export const getAlbumThumbnail = (imageName: string): string => {
  return buildCloudinaryUrl(`valentine-album/${imageName}`, {
    width: 150,
    height: 150,
    crop: 'thumb',
    quality: 'auto',
    format: 'auto',
  });
};
