import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Headphones } from "lucide-react";

/**
 * InnerVoicePlayer v2 — cyan/teal glow theme
 * - Matches the page's lock glow: bg-cyan-400 rounded-full opacity-20 blur-lg
 * - No breaking changes: drop-in replacement for the previous <InnerVoicePlayer />
 * - You can still pass a custom src; defaults to "/voice/edanur.mp3"
 */

interface InnerVoicePlayerProps {
  src?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
}

const fmt = (sec: number) => {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function InnerVoicePlayer({
  src = "/voice/edanur.mp3",
  title = "Dinlemek İçin Play Tuşuna Bas",
  className = "",
  autoPlay = true,
}: InnerVoicePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [vol, setVol] = useState(0.9);
  const [muted, setMuted] = useState(false);

  // expose memoized percent for bars + progress
  const pct = useMemo(() => (duration ? (current / duration) * 100 : 0), [current, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : vol;
  }, [vol, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrent(audio.currentTime || 0);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [autoPlay, src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch {}
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const t = (v / 100) * duration;
    audio.currentTime = t;
    setCurrent(t);
  };

  const onWheelVolume: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setVol((v) => Math.max(0, Math.min(1, v + delta)));
  };

  // Animated equalizer bars (pure CSS + current percentage influence)
  const bars = Array.from({ length: 14 });

  return (
    <div
      className={`relative isolate w-full ${className}`}
      onWheel={onWheelVolume}
      aria-label="Edanur'un İç Sesi oynatıcı"
    >
      {/* Soft cyan glow behind (matches the lock shape style) */}
      <div className="pointer-events-none absolute -inset-x-2 -top-4 h-24">
        <div className="absolute inset-0 bg-cyan-400/25 blur-2xl rounded-full" />
      </div>

      {/* Outer card */}
      <div className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.4)]">
        {/* header */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0">
            {/* cyan ring */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-300 via-teal-300 to-white/40 opacity-80" />
            <div className="absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm" />
            <div className="relative grid h-full w-full place-items-center">
              <Headphones className="h-5 w-5 text-cyan-200" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-sm/5 uppercase tracking-wide text-cyan-200/90">EDANUR'UN İÇ SESİ</div>
            <div className="text-white/80 line-clamp-1 text-[15px] font-medium">{title}</div>
          </div>
          <button
            onClick={toggle}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-cyan-300/20 to-teal-400/10 text-white shadow-inner hover:from-cyan-300/30 hover:to-teal-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50"
            aria-label={isPlaying ? "Durdur" : "Oynat"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
        </div>

        {/* equalizer + progress */}
        <div className="relative">
          {/* Equalizer bars backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-end gap-[6px] overflow-hidden rounded-xl p-2">
            {bars.map((_, i) => (
              <span
                key={i}
                className="relative w-2 grow rounded-full bg-gradient-to-t from-cyan-400/20 via-cyan-300/25 to-white/10"
                style={{
                  height: `${10 + ((i * 13) % 35) + (isPlaying ? (pct % 20) : 0)}%`,
                  animation: isPlaying ? `pulse${(i % 5) + 1} 1.2s ease-in-out ${(i * 0.05).toFixed(2)}s infinite` : "none",
                }}
              />
            ))}
          </div>

          {/* Progress slider */}
          <div className="flex items-center gap-3">
            <span className="w-10 shrink-0 tabular-nums text-xs text-white/70">{fmt(current)}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={pct}
              onChange={onSeek}
              className="range-thumb [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(34,211,238,0.5)] h-2 w-full appearance-none rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-400/70 outline-none"
              aria-label="Çalma konumu"
            />
            <span className="w-10 shrink-0 tabular-nums text-xs text-white/70">{fmt(duration)}</span>
          </div>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMuted((m) => !m)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50"
            aria-label={muted ? "Sesi aç" : "Sesi kapat"}
          >
            {muted || vol === 0 ? <VolumeX className="h-4 w-4 text-white/80" /> : <Volume2 className="h-4 w-4 text-white/80" />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round((muted ? 0 : vol) * 100)}
            onChange={(e) => {
              const v = Number(e.target.value) / 100;
              setVol(v);
              if (v > 0 && muted) setMuted(false);
            }}
            className="h-2 w-40 max-w-[50vw] appearance-none rounded-full bg-gradient-to-r from-teal-200 via-cyan-300 to-cyan-400/80 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(20,184,166,0.45)]"
            aria-label="Ses düzeyi"
          />
        </div>

        <audio ref={audioRef} src={src} preload="metadata" />
      </div>

      {/* animations */}
      <style>{`
        @keyframes pulse1 { 0%,100%{transform:scaleY(.75)} 50%{transform:scaleY(1.35)} }
        @keyframes pulse2 { 0%,100%{transform:scaleY(.6)} 50%{transform:scaleY(1.2)} }
        @keyframes pulse3 { 0%,100%{transform:scaleY(.7)} 50%{transform:scaleY(1.25)} }
        @keyframes pulse4 { 0%,100%{transform:scaleY(.8)} 50%{transform:scaleY(1.15)} }
        @keyframes pulse5 { 0%,100%{transform:scaleY(.65)} 50%{transform:scaleY(1.22)} }
        .range-thumb::-moz-range-thumb{height:1rem;width:1rem;border-radius:9999px;background:#fff;box-shadow:0 0 0 3px rgba(34,211,238,.5);border:0}
      `}</style>
    </div>
  );
}
