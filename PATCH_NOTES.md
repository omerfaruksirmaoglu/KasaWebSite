
# Ses Entegrasyonu (Kasa Tuş ve Açma Sesi)

- **Tuş sesi**: Rakam tuşlarına basıldığında kısa bir ses çalar.
- **Kasa Aç**: 'Kasayı Aç' butonuna basıldığında farklı bir ses çalar.
- Tema/stil korunmuştur; yalnızca minimal import ve fonksiyon çağrıları eklendi.

## Dosya Değişiklikleri
- `src/utils/safeSounds.ts` **(yeni)**: Ses yöneticisi. `/public/sounds/key.mp3` ve `/public/sounds/open.mp3` varsa onları çalar, yoksa WebAudio ile bip üretir.
- `src/components/SafeOne.tsx` **(güncellendi)**:
  - `addDigit(...)` içine `playKeySound()` eklendi.
  - `handleSubmit(...)` içine `playOpenSound()` eklendi.
- `src/components/SafeTwo.tsx` **(güncellendi)**:
  - `handleSubmit(...)` içine `playOpenSound()` eklendi.
- `public/sounds/README.txt` **(yeni)**: Kendi ses dosyalarınızı nasıl ekleyeceğiniz açıklanır.

## Kendi Sesini Eklemek
1. `public/sounds/` içine `key.mp3` ve/veya `open.mp3` dosyalarını kopyalayın.
2. Gerekirse isimleri değiştirip `safeSounds.ts` içindeki yolları düzenleyebilirsiniz.

## Notlar
- Ses çalma, kullanıcı etkileşimi ile tetiklendiği için tarayıcı otomatik oynatma kısıtlarıyla uyumludur.
- Ses dosyaları yoksa kısa bir bip sesi fallback olarak devreye girer.


## 2. Güncelleme (Klavye & Ek Tuş Sesleri)
- **SafeOne**: 
  - Klavyeden rakam girildiğinde de `playKeySound()` çalışır.
  - `clearPassword()` ve `removeLastDigit()` tuşlarında da tuş sesi eklendi.
- **SafeTwo**:
  - Klavyeden yazılan her karakterde `playKeySound()` çalışır.
