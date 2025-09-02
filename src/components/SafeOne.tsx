import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { validateNumericPassword } from '../utils/passwordValidation';
import { playKeySound, playOpenSound, playDeleteSound, playClearSound } from '../utils/safeSounds';

interface SafeOneProps {
  onUnlock: () => void;
}

const SafeOne: React.FC<SafeOneProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    
    try { playOpenSound(); } catch {}
e.preventDefault();
    
    if (validateNumericPassword(password)) {
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setError('Şifre hatalı.');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError('');
      }, 2000);
    }
  };

  const addDigit = (digit: string) => {
    
    try { playKeySound(); } catch {}
if (password.length < 10) {
      setPassword(password + digit);
    }
  };

  const clearPassword = () => {
    
    
    try { playClearSound(); } catch {}
try { playKeySound(); } catch {}
setPassword('');
    setError('');
  };

  const removeLastDigit = () => {
    
    
    try { playDeleteSound(); } catch {}
try { playKeySound(); } catch {}
setPassword(password.slice(0, -1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Safe Door Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-transparent to-transparent"></div>
      
      <div className={`relative z-10 transition-all duration-1500 ${isUnlocking ? 'scale-110 opacity-0' : ''} ${isShaking ? 'animate-pulse' : ''}`}>
        <div className={`bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 lg:p-12 rounded-3xl shadow-2xl border-4 border-gray-600 transition-all duration-300 ${isShaking ? 'animate-shake border-red-500' : ''}`}>
          {/* Safe Door Handle */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Lock className={`w-16 h-16 text-cyan-400 transition-all duration-500 ${isUnlocking ? 'rotate-12 scale-125' : ''}`} />
              <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-20 blur-lg"></div>
            </div>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-center text-gray-100 mb-8">
            Kasanın Şifresini Girin
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Display */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); try { playKeySound(); } catch {} }}
                className="w-full px-6 py-4 text-2xl text-center bg-gray-900 border-2 border-gray-600 rounded-xl text-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                placeholder="••••••••"
                maxLength={10}
                aria-label="Kasa şifresi"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent rounded-xl pointer-events-none"></div>
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => addDigit(digit.toString())}
                  className="bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border border-gray-500"
                  aria-label={`Rakam ${digit}`}
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={clearPassword}
                className="bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                aria-label="Temizle"
              >
                C
              </button>
              <button
                type="button"
                onClick={() => addDigit('0')}
                className="bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border border-gray-500"
                aria-label="Rakam 0"
              >
                0
              </button>
              <button
                type="button"
                onClick={removeLastDigit}
                className="bg-gradient-to-br from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                aria-label="Geri"
              >
                ←
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={password.length === 0 || isUnlocking}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-xl"
              aria-label="Kasayı aç"
            >
              {isUnlocking ? 'Açılıyor...' : 'Kasayı Aç'}
            </button>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-center font-medium animate-pulse" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SafeOne;