import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Heart, Music2, Sparkles } from "lucide-react";
import {
  EnvelopeCelebration,
  EnvelopeStage,
  FinaleStage,
  GalleryStage,
  InvitationStage,
  MessageStage,
} from "@/components/birthday/stages";
import { birthdayConfig } from "@/data/birthdayConfig";

const SOFT_MUSIC_VOLUME = 0.42;

type SurpriseStage = 0 | 1 | 2 | 3 | 4;

const stageLabels = [
  "THE LETTER",
  "THE BIG QUESTION",
  "SWEET MESSAGES",
  "LITTLE MOMENTS",
  "MAKE A WISH",
];

export default function BirthdaySurprise() {
  const [stage, setStage] = useState<SurpriseStage>(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showOpeningCelebration, setShowOpeningCelebration] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const celebrationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
      if (celebrationTimeoutRef.current !== null) {
        window.clearTimeout(celebrationTimeoutRef.current);
      }
    };
  }, []);

  const goBack = () => {
    setStage((current) => Math.max(0, current - 1) as SurpriseStage);
  };

  const restart = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = SOFT_MUSIC_VOLUME;
      void audio.play().catch(() => setMusicPlaying(false));
    }

    if (celebrationTimeoutRef.current !== null) {
      window.clearTimeout(celebrationTimeoutRef.current);
      celebrationTimeoutRef.current = null;
    }

    setShowOpeningCelebration(false);
    setStage(0);
  };

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    audio.volume = SOFT_MUSIC_VOLUME;
    void audio.play().catch(() => setMusicPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      startMusic();
      return;
    }

    audio.pause();
  };

  const handleEnvelopeOpen = () => {
    startMusic();
    setShowOpeningCelebration(true);

    if (celebrationTimeoutRef.current !== null) {
      window.clearTimeout(celebrationTimeoutRef.current);
    }

    celebrationTimeoutRef.current = window.setTimeout(() => {
      setShowOpeningCelebration(false);
      celebrationTimeoutRef.current = null;
    }, 4600);
  };

  return (
    <div className="birthday-app">
      <div className="ambient-layer" aria-hidden="true">
        <span className="ambient-orb ambient-orb--pink" />
        <span className="ambient-orb ambient-orb--lavender" />
        <span className="ambient-orb ambient-orb--peach" />
        <Sparkles className="ambient-sparkle ambient-sparkle--one" />
        <Sparkles className="ambient-sparkle ambient-sparkle--two" />
        <Sparkles className="ambient-sparkle ambient-sparkle--three" />
        <Heart className="ambient-heart ambient-heart--one" />
        <Heart className="ambient-heart ambient-heart--two" />
      </div>

      {showOpeningCelebration ? <EnvelopeCelebration /> : null}

      <header className="birthday-header">
        <div className="header-brand-group">
          {stage > 0 ? (
            <button
              aria-label="Go back one step"
              className="header-back"
              onClick={goBack}
              type="button"
            >
              <ArrowLeft aria-hidden="true" />
            </button>
          ) : null}
          <a aria-label="A Little Surprise for Tisha" className="brand-lockup" href="/">
            <span aria-hidden="true" className="brand-heart">
              <Heart fill="currentColor" />
            </span>
            <span className="brand-title">A little surprise</span>
          </a>
        </div>

        <div
          aria-label={`Step ${stage + 1} of 5: ${stageLabels[stage]}`}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-valuenow={stage + 1}
          className="header-progress"
          role="progressbar"
        >
          <span className="progress-label">
            0{stage + 1}
            <i> / 05</i>
          </span>
          <span aria-hidden="true" className="progress-track">
            <span className="progress-fill" style={{ width: `${((stage + 1) / 5) * 100}%` }} />
          </span>
          <span className="progress-stage">{stageLabels[stage]}</span>
        </div>

        <div className="header-actions">
          <div className="header-recipient">
            <span>made for</span>
            <strong>{birthdayConfig.name}</strong>
          </div>
          <button
            aria-label={musicPlaying ? birthdayConfig.music.pause : birthdayConfig.music.play}
            aria-pressed={musicPlaying}
            className={`music-toggle${musicPlaying ? " is-playing" : ""}`}
            onClick={toggleMusic}
            title={birthdayConfig.music.label}
            type="button"
          >
            <Music2 aria-hidden="true" />
            <span aria-hidden="true" className="music-toggle__copy">
              <span className="music-toggle__eyebrow">SOFT MUSIC</span>
              <span className="music-toggle__title">{musicPlaying ? "ON" : "OFF"}</span>
            </span>
            <span aria-hidden="true" className="music-waves">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <main className="birthday-main">
        <div className="stage-view" key={stage}>
          {stage === 0 ? (
            <EnvelopeStage onContinue={() => setStage(1)} onOpen={handleEnvelopeOpen} />
          ) : null}
          {stage === 1 ? <InvitationStage onContinue={() => setStage(2)} /> : null}
          {stage === 2 ? <MessageStage onContinue={() => setStage(3)} /> : null}
          {stage === 3 ? <GalleryStage onContinue={() => setStage(4)} /> : null}
          {stage === 4 ? (
            <FinaleStage onRestart={restart} onViewMemories={() => setStage(3)} />
          ) : null}
        </div>
      </main>

      <footer className="birthday-footer">
        <span aria-hidden="true" className="footer-sparkle">
          <Sparkles />
        </span>
        <span>A tiny pocket of birthday magic</span>
        <span aria-hidden="true" className="footer-heart">
          <Heart fill="currentColor" />
        </span>
      </footer>

      <audio
        aria-hidden="true"
        hidden
        loop
        onError={() => setMusicPlaying(false)}
        onPause={() => setMusicPlaying(false)}
        onPlay={() => setMusicPlaying(true)}
        preload="none"
        ref={audioRef}
        src={birthdayConfig.music.src}
      />
    </div>
  );
}
