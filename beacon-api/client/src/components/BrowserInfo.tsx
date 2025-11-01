import { useEffect, useState } from 'react';

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  
  if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
  } else if (userAgent.includes('Edg') || userAgent.includes('Edge')) {
    browserName = 'Edge';
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Chromium')) {
    browserName = 'Chrome';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari';
  } else if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
    browserName = 'Opera';
  }
  
  return {
    name: browserName,
    version: (userAgent.match(/(?:Firefox|Edg|Chrome|Safari|Version|OPR)[\/\s]?([\d.]+)/i) || [])[1] || 'Unknown',
    userAgent: userAgent
  };
};

export const BrowserInfo = () => {
  const [browser, setBrowser] = useState<{name: string, version: string} | null>(null);

  useEffect(() => {
    setBrowser(getBrowserInfo());
  }, []);

  if (!browser) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      left: '100px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '25px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }}>
      <span>Browser:</span>
      <span style={{ fontWeight: 'bold' }}>{browser.name}</span>
    </div>
  );
};
