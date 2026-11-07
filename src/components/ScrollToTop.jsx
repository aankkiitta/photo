import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // URL ka pathname nikalte hain (jaise /stories ya /contact)
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi pathname change hoga, window (0,0) yani top par scroll ho jayegi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ye screen par kuch nahi dikhata, bas kaam karta hai
};

export default ScrollToTop;