import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const staticPages = ['/about', '/privacy', '/terms', '/contact', '/compare', '/barcode-generator', '/scan-qr'];
    const isStatic = (path) => staticPages.some(page => path.includes(page));
    
    // Tools are root (/) or dynamic paths not in staticPages
    const prevIsTool = !isStatic(prevPathname.current);
    const currentIsTool = !isStatic(pathname);

    // If both the previous route and current route are Tools, DO NOT SCROLL.
    // They are just switching tabs, the form handles transitions smoothly now.
    if (!(prevIsTool && currentIsTool)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
