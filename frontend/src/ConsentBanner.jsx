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
      <p style={styles.text}>
        🍪 We use cookies to enhance your experience and analyze traffic. Do you accept?
      </p>
      <div style={styles.buttons}>
        <button style={styles.buttonAccept} onClick={() => handleConsent('granted')}>
          Accept
        </button>
        <button style={styles.buttonReject} onClick={() => handleConsent('denied')}>
          Reject
        </button>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#f9f9f9',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    zIndex: 9999,
  },
  text: {
    fontSize: '16px',
    marginBottom: '0.75rem',
    color: '#333',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  buttonAccept: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonReject: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default ConsentBanner;
