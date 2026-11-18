/**
 * High-performance Image Preloader
 * 1. Appends <link rel="preload" as="image"> to document <head> for high network priority.
 * 2. Instantiates new Image() and invokes decode() to preload and decode directly into GPU memory.
 */

export function preloadImage(src) {
  if (!src || typeof window === 'undefined') return;

  try {
    const existing = document.querySelector(`link[rel="preload"][href="${src}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.type = 'image/webp';
      link.href = src;
      document.head.appendChild(link);
    }
  } catch (e) {
    // Ignore DOM errors if any
  }

  try {
    const img = new Image();
    img.src = src;
    if (img.decode) {
      img.decode().catch(() => {});
    }
  } catch (e) {
    // Ignore decode errors
  }
}

export function preloadImages(srcArray) {
  if (!Array.isArray(srcArray)) return;
  srcArray.forEach(preloadImage);
}
