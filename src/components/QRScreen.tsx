import React from 'react';
import { RotateCcw } from 'lucide-react';
import qrCodeImageOne from '../assets/qr-kod-bir.png';
import qrCodeImageTwo from '../assets/qr-kod-iki.png';
import InnerVoicePlayer from './InnerVoicePlayer';

interface QRScreenProps {
  onRestart: () => void;
}

const QRScreen: React.FC<QRScreenProps> = ({ onRestart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto animate-fadeIn">
        <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-6 lg:p-12 rounded-3xl shadow-2xl border-4 border-gray-600">
          
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

          <InnerVoicePlayer 
            src="/voice/edanur2.mp3" 
            title="Edanur'un İç Sesi" 
            className="mb-4" 
          />

          {/* Story Text */}
          <div className="prose prose-invert max-w-none mb-12">
            <div className="text-gray-200 leading-relaxed space-y-4 text-base lg:text-lg">
              <p></p>
              <p>
                İkinci kasayı incelerken, içinde seni bekleyen bir başka sırra rastladın. 
                Bu kez karşına bir QR kod çıktı. Sanki seni fiziksel dünyanın ötesinde, 
                dijital bir kapıya çağırıyordu.
              </p>
              <p>
                Telefonunun kamerasını kaldırıp kodu okuttuğunda, seni gizemli bir web sitesine 
                yönlendirdi. Siteyi dikkatle incelediğinde, küçük işaretler ve detaylar arasında 
                saklı bilgileri ayıklamaya başladın.
              </p>
              <p>
                Tüm ipuçlarını bir araya getirdiğinde, aklında netleşen bir düşünce belirdi:
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border-2 border-cyan-400/30 my-6">
                <p className="text-cyan-400 font-mono text-lg">
                  <strong>Kullanıcı adı:</strong> kuzeyyıldızı<br />
                  <strong>Şifre:</strong> 1425925
                </p>
              </div>
              <p>
                Artık önünde yeni bir kapı vardı. Tek yapman gereken bu bilgileri doğru yerde kullanmaktı.
              </p>
            </div>
          </div>

          {/* QR Code Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 bg-gray-800 border-4 border-gray-600 rounded-2xl flex items-center justify-center shadow-inner relative group hover:border-cyan-400/50 transition-all duration-300">
                <img
                  src={qrCodeImageOne}
                  alt="QR Kod 1"
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="text-gray-400 text-base font-medium text-center">
                Gizemli Web Sitesi
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 bg-gray-800 border-4 border-gray-600 rounded-2xl flex items-center justify-center shadow-inner relative group hover:border-cyan-400/50 transition-all duration-300">
                <img
                  src={qrCodeImageTwo}
                  alt="QR Kod 2"
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="text-gray-400 text-base font-medium text-center">
                Olay Mantık Zinciri
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScreen;