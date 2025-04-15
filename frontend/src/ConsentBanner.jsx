// components/ConsentBanner.jsx
import React, { useEffect, useState } from 'react';

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('google_consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      initializeConsent(consent);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem('google_consent', choice);
    initializeConsent(choice);
    setShowBanner(false);
  };

  const initializeConsent = (choice) => {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: choice === 'granted' ? 'granted' : 'denied',
        analytics_storage: choice === 'granted' ? 'granted' : 'denied',
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      <p>We use cookies for analytics and personalized content. Do you accept?</p>
      <div style={styles.buttons}>
        <button onClick={() => handleConsent('granted')}>Accept</button>
        <button onClick={() => handleConsent('denied')}>Reject</button>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#fff',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    zIndex: 9999,
  },
  buttons: {
    marginTop: '0.5rem',
  }
};

export default ConsentBanner;
