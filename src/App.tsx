import React, { useState } from 'react';
import SafeOne from './components/SafeOne';
import SafeTwo from './components/SafeTwo';
import QRScreen from './components/QRScreen';

type Screen = 'safe1' | 'safe2' | 'qr';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('safe1');

  const handleSafeOneUnlock = () => {
    setCurrentScreen('safe2');
  };

  const handleSafeTwoUnlock = () => {
    setCurrentScreen('qr');
  };

  const handleRestart = () => {
    setCurrentScreen('safe1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {currentScreen === 'safe1' && (
        <SafeOne onUnlock={handleSafeOneUnlock} />
      )}
      {currentScreen === 'safe2' && (
        <SafeTwo onUnlock={handleSafeTwoUnlock} onRestart={handleRestart} />
      )}
      {currentScreen === 'qr' && (
        <QRScreen onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;