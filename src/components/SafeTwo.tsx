import React, { useState } from 'react';
import { RotateCcw, Unlock, ZoomIn, ZoomOut, X } from 'lucide-react';
import { validateWordPassword } from '../utils/passwordValidation';
import { playOpenSound, playKeySound, playDeleteSound, playClearSound } from '../utils/safeSounds';
import myImage from '../assets/kasalar.png';

interface SafeTwoProps {
  onUnlock: () => void;
  onRestart: () => void;
}

const SafeTwo: React.FC<SafeTwoProps> = ({ onUnlock, onRestart }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [showImagePopup, setShowImagePopup] = useState(false);

  const handleZoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleSubmit = (e: React.FormEvent) => {
    
    try { playOpenSound(); } catch {}
e.preventDefault();
    
    if (validateWordPassword(password)) {
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setError('Kasa Şifresi yanlış… tekrar dene.');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Inside Safe Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      
      <div className={`relative z-10 max-w-4xl mx-auto transition-all duration-1500 ${isUnlocking ? 'scale-110 opacity-0' : ''}`}>
        <div className={`bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-6 lg:p-12 rounded-3xl shadow-2xl border-4 border-gray-600 transition-all duration-300 ${isShaking ? 'animate-shake border-red-500' : ''}`}>
          
          {/* Restart Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onRestart}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              aria-label="Başa dön"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Başa Dön</span>
            </button>
          </div>

          {/* Story Text */}
          <div className="prose prose-invert max-w-none mb-8">
            <div className="text-gray-200 leading-relaxed space-y-4 text-base lg:text-lg">
              <p>
                Kasayı açmayı başardığında, içinde seni bir sürpriz bekliyordu: başka bir kasa. 
                Sanki biri bilinçli olarak ardı ardına engeller koymuş gibiydi. Bu ikinci kasanın 
                şifresini çözmek için ipuçlarının ilk kasada gizlendiğini hissettin.
              </p>
              <p>
                Dikkatle baktığında, kasanın üst yüzeyine kazınmış, toz ve pasın ardına gizlenmiş 
                bazı sayıların olduğunu fark ettin. Parmaklarınla üzerindeki katmanı silince, 
                yavaş yavaş ortaya çıkmaya başladılar.
              </p>
              <p>
                Bu sayıların bir anlamı olmalıydı. İçinde güçlü bir his, bunların ikinci kasanın 
                şifresine giden yolu gösterdiğini söylüyordu. Şifre, büyük ihtimalle iki kelimeden 
                oluşuyordu…
              </p>
            </div>
          </div>

          {/* Zoomable Image Section */}
          <div className="mb-8 flex flex-col items-center space-y-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-600 shadow-lg bg-gray-800 max-w-md w-full">
              <img
                src={myImage}
                alt="Kasa içindeki gizemli görsel"
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out cursor-pointer"
                style={{ transform: `scale(${imageScale})` }}
                onClick={() => setShowImagePopup(true)}
              />
            </div>
            
            {/* Zoom Controls */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={imageScale <= 0.5}
                className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-700 disabled:to-gray-800 text-white px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                aria-label="Uzaklaştır"
              >
                <ZoomOut className="w-4 h-4" />
                <span className="text-sm">Uzaklaştır (-)</span>
              </button>
              
              <span className="text-gray-400 text-sm font-mono">
                {Math.round(imageScale * 100)}%
              </span>
              
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={imageScale >= 3}
                className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-700 disabled:to-gray-800 text-white px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                aria-label="Yakınlaştır"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="text-sm">Yakınlaştır (+)</span>
              </button>
            </div>
          </div>

          {/* Second Safe Interface */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Unlock className={`w-12 h-12 text-cyan-400 transition-all duration-500 ${isUnlocking ? 'rotate-12 scale-125' : ''}`} />
              <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-20 blur-lg"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  const key = (e.key || "");
                  if (key.length === 1 || key === " ") {
                    // Harf, sayı veya boşluk
                    try { playKeySound(); } catch {}
                  }
                  if (key === "Backspace") {
                    try { playDeleteSound(); } catch {}
                  }
                  if (key === "Delete" || key === "Escape") {
                    // Temizle kısayolu
                    e.preventDefault();
                    setPassword("");
                    try { playClearSound(); } catch {}
                  }
                }}
                placeholder="2. Kasanın Şifresini Giriniz"
                className="w-full px-6 py-4 text-xl text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-cyan-400 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                aria-label="İkinci kasa şifresi"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent rounded-xl pointer-events-none"></div>
            </div>

            <button
              type="submit"
              disabled={password.length === 0 || isUnlocking}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-xl"
              aria-label="Şifreyi onayla"
            >
              {isUnlocking ? 'Açılıyor...' : 'Kasayı Aç'}
            </button>

            {error && (
              <div className="text-red-400 text-center font-medium animate-pulse" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Image Popup Modal */}
      {showImagePopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImagePopup(false)}
        >
          <div 
            className="relative bg-gray-900 p-4 rounded-lg shadow-lg max-w-4xl max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-3xl font-bold p-2 z-10"
              onClick={() => setShowImagePopup(false)}
              aria-label="Kapat"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={myImage}
              alt="Büyütülmüş Kasa Görseli"
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
};

export default SafeTwo;