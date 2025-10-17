import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';

export const useAndroidBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = App.addListener('backButton', () => {
      // Define home routes where back button should exit app
      const homeRoutes = ['/', '/home', '/onboarding', '/splash'];
      
      if (homeRoutes.includes(location.pathname)) {
        App.exitApp();
      } else {
        // Navigate back in history
        navigate(-1);
      }
    });

    return () => {
      handleBackButton.then(listener => listener.remove());
    };
  }, [navigate, location.pathname]);
};
