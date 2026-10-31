import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import {
  ArrowRight,
  Cake,
  Camera,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Gift,
  Heart,
  Mail,
  Music2,
  PartyPopper,
  Rainbow,
  Smile,
  Sparkles,
  Star,
  Sun,
  X,
} from "lucide-react";
import { birthdayConfig, type MessageIcon } from "@/data/birthdayConfig";

interface StageProps {
  onContinue: () => void;
}

/* ──────────────────────────────────────────────── */
/* STAGE 1 · MAGICAL ENVELOPE OPENING               */
/* ──────────────────────────────────────────────── */

export function EnvelopeStage({ onContinue }: StageProps) {
  const [isOpening, setIsOpening] = useState(false);
  const { envelope } = birthdayConfig;

  const openLetter = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(onContinue, 760);
  };

  return (
    <section aria-labelledby="welcome-heading" className="envelope-stage">
      <div className="stage-intro">
        <p className="eyebrow">
          <span className="eyebrow-dot" /> A little note, just for you
        </p>
        <h1 className="stage-heading" id="welcome-heading">
          {envelope.heading[0]}
          <br />
          {envelope.heading[1]} <span className="heading-heart">{envelope.heart}</span>
        </h1>
        <p className="stage-copy">{envelope.copy}</p>
      </div>

      <div className={`envelope-art${isOpening ? " is-opening" : ""}`}>
        <span aria-hidden="true" className="envelope-charm envelope-charm--music">
          <Music2 />
        </span>
        <span aria-hidden="true" className="envelope-charm envelope-charm--sparkle">
          <Sparkles />
        </span>
        <button
          aria-label="Open the birthday letter"
          className="envelope-button"
          disabled={isOpening}
          onClick={openLetter}
          type="button"
        >
          <span className="envelope-shadow" />
          <span className="envelope-back" />
          <span className="envelope-letter" aria-hidden="true">
            <span className="letter-sparkle">
              <Sparkles />
            </span>
            <span className="letter-to">A note for</span>
            <span className="letter-name">{birthdayConfig.name}</span>
            <Heart className="letter-heart" fill="currentColor" />
          </span>
          <span className="envelope-flap" />
          <span className="envelope-pocket" />
          <span className="envelope-seal" aria-hidden="true">
            <Heart fill="currentColor" />
          </span>
        </button>
      </div>

      <button
        className="birthday-cta birthday-cta--open"
        disabled={isOpening}
        onClick={openLetter}
        type="button"
      >
        {isOpening ? envelope.opening : envelope.button}
        <Mail aria-hidden="true" />
      </button>
      <p className="micro-copy">
        <Music2 aria-hidden="true" />
        {envelope.microCopy}
      </p>
    </section>
  );
}

/* ──────────────────────────────────────────────── */
/* STAGE 2 · THE RUNAWAY CANCEL BUTTON              */
/* ──────────────────────────────────────────────── */

export function InvitationStage({ onContinue }: StageProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const { invitation } = birthdayConfig;

  const moveCancelButton = () => {
    const track = trackRef.current;
    const button = cancelButtonRef.current;
    if (!track || !button) return;

    const safeInset = 4;
    const maxX = Math.max(0, track.clientWidth - button.offsetWidth - safeInset * 2);
    const maxY = Math.max(0, track.clientHeight - button.offsetHeight - safeInset * 2);

    setPosition({
      x: safeInset + Math.round(Math.random() * maxX),
      y: safeInset + Math.round(Math.random() * maxY),
    });
    setHasMoved(true);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") moveCancelButton();
  };

  return (
    <section aria-labelledby="invite-heading" className="invite-card">
      <span className="invite-halo invite-halo--one" aria-hidden="true" />
      <span className="invite-halo invite-halo--two" aria-hidden="true" />
      <div className="invite-badge" aria-hidden="true">
        <Heart fill="currentColor" />
        <span className="badge-sparkle">
          <Sparkles />
        </span>
      </div>
      <p className="eyebrow">
        <span className="eyebrow-dot" /> birthday guest of honor
      </p>
      <h1 className="stage-heading" id="invite-heading">
        {invitation.heading} <span>{invitation.emoji}</span>
      </h1>
      <p className="invite-copy">{invitation.copy}</p>

      <div className="choice-actions">
        <button className="birthday-cta birthday-cta--wide" onClick={onContinue} type="button">
          {invitation.yes}
          <ArrowRight aria-hidden="true" />
        </button>
        <div className="cancel-track" ref={trackRef}>
          <button
            aria-describedby="cancel-whimsy"
            aria-label="No, cancel the birthday surprise"
            className={`runner-button${position ? " is-escaping" : ""}`}
            onClick={moveCancelButton}
            onPointerEnter={handlePointerEnter}
            ref={cancelButtonRef}
            style={position ? { left: position.x, top: position.y } : undefined}
            type="button"
          >
            {invitation.no}
          </button>
        </div>
      </div>
      <p
        aria-live="polite"
        className={`cancel-whimsy${hasMoved ? " is-visible" : ""}`}
        id="cancel-whimsy"
      >
        {hasMoved ? invitation.escaped : " "}
      </p>
      <p className="invite-note">{invitation.note}</p>
    </section>
  );
}

/* ──────────────────────────────────────────────── */
/* STAGE 3 · EIGHT MESSAGE JOURNEY CARDS            */
/* ──────────────────────────────────────────────── */

const iconMap: Record<MessageIcon, typeof Sparkles> = {
  sparkles: Sparkles,
  smile: Smile,
  heart: Heart,
  sun: Sun,
  flower: Flower2,
  star: Star,
  rainbow: Rainbow,
  gift: Gift,
};

export function MessageStage({ onContinue }: StageProps) {
  const { messages } = birthdayConfig;
  const total = messages.items.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const goTo = (next: number) => {
    if (next < 0 || next >= total || next === index) return;
    setDirection(next > index ? "forward" : "back");
    setIndex(next);
  };

  const message = messages.items[index];
  const Icon = iconMap[message.icon];
  const isLast = index === total - 1;

  return (
    <section aria-labelledby="message-heading" className="journey-stage">
      <p className="eyebrow">
        <span className="eyebrow-dot" /> a note for every step
      </p>
      <h1 className="stage-heading" id="message-heading">
        {messages.heading}
      </h1>
      <p className="journey-intro">{messages.intro}</p>

      <div
        aria-label={`Message ${index + 1} of ${total}`}
        aria-live="polite"
        className={`journey-card journey-card--${message.tone} journey-card--${direction}`}
        key={index}
        role="group"
      >
        <span className="journey-illustration" aria-hidden="true" data-icon={message.icon}>
          <Icon />
        </span>
        <p className="journey-text">{message.text}</p>
      </div>

      <div aria-hidden="true" className="journey-progress">
        <span className="journey-count">
          {index + 1} <i>/ {String(total).padStart(2, "0")}</i>
        </span>
        <span className="journey-dots">
          {messages.items.map((_, dotIndex) => (
            <span
              className={`journey-dot${dotIndex === index ? " is-active" : ""}${
                dotIndex < index ? " is-done" : ""
              }`}
              key={dotIndex}
            />
          ))}
        </span>
        <span className="journey-bar">
          <span className="journey-bar-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </span>
      </div>

      <div className="journey-actions">
        <button
          className="journey-back"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" /> BACK
        </button>
        {isLast ? (
          <button className="birthday-cta" onClick={onContinue} type="button">
            {messages.finishButton}
            <Gift aria-hidden="true" />
          </button>
        ) : (
          <button className="birthday-cta" onClick={() => goTo(index + 1)} type="button">
            NEXT <ArrowRight aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────── */
/* STAGE 4 · POLAROID PHOTO MEMORIES GALLERY        */
/* ──────────────────────────────────────────────── */

export function GalleryStage({ onContinue }: StageProps) {
  const { gallery } = birthdayConfig;
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handlePhotoTilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--tilt-x", `${(-vertical * 9).toFixed(1)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(horizontal * 9).toFixed(1)}deg`);
  };

  const resetPhotoTilt = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section aria-labelledby="gallery-heading" className="gallery-stage">
      <div className="gallery-heading-wrap">
        <p className="eyebrow">
          <span className="eyebrow-dot" /> six little things to celebrate
        </p>
        <h1 className="gallery-heading" id="gallery-heading">
          {gallery.heading} <span>{gallery.emoji}</span>
        </h1>
        <p className="gallery-intro">{gallery.intro}</p>
      </div>

      <div className="photo-grid">
        {gallery.photos.map((photo, index) => (
          <button
            aria-label={`Open photo: ${photo.title}`}
            className="photo-card"
            key={photo.src}
            onClick={() => setSelectedPhoto(index)}
            onPointerLeave={resetPhotoTilt}
            onPointerMove={handlePhotoTilt}
            style={
              {
                "--photo-rot": `${(index % 2 === 0 ? -1 : 1) * (2 + index)}deg`,
                "--float-delay": `${(index % 3) * 0.9}s`,
                "--float-dur": `${6 + (index % 3)}s`,
              } as CSSProperties
            }
            type="button"
          >
            <span className="photo-frame">
              <img alt={photo.alt} className="photo-image" loading="lazy" src={photo.src} />
              <span aria-hidden="true" className="photo-tape" />
              <span className="photo-number">0{index + 1}</span>
              <span aria-hidden="true" className="photo-sticker">
                {photo.sticker}
              </span>
              <span className="photo-open">
                <Camera aria-hidden="true" />
              </span>
            </span>
            <span className="photo-caption">
              <strong>{photo.title}</strong>
              <span>{photo.note}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="gallery-bottom">
        <span className="gallery-count">
          <Camera aria-hidden="true" /> Six little snapshots, just for the mood.
        </span>
        <button className="birthday-cta" onClick={onContinue} type="button">
          ON TO THE BEST PART
          <ArrowRight aria-hidden="true" />
        </button>
      </div>

      {selectedPhoto !== null ? (
        <PhotoLightbox
          activeIndex={selectedPhoto}
          onChange={setSelectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          photos={gallery.photos}
        />
      ) : null}
    </section>
  );
}

interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
  note: string;
}

interface PhotoLightboxProps {
  activeIndex: number;
  photos: readonly GalleryPhoto[];
  onChange: (index: number | null) => void;
  onClose: () => void;
}

function PhotoLightbox({ activeIndex, photos, onChange, onClose }: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  const onChangeRef = useRef(onChange);
  const onCloseRef = useRef(onClose);
  const photo = photos[activeIndex];
  const total = photos.length;

  activeIndexRef.current = activeIndex;
  onChangeRef.current = onChange;
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowRight") {
        onChangeRef.current((activeIndexRef.current + 1) % total);
      }
      if (event.key === "ArrowLeft") {
        onChangeRef.current((activeIndexRef.current - 1 + total) % total);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="lightbox-backdrop" onClick={handleBackdropClick} role="presentation">
      <div
        aria-labelledby="lightbox-title"
        aria-modal="true"
        className="lightbox-panel"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="lightbox-toolbar">
          <span className="lightbox-index">
            0{activeIndex + 1} <i>/ {String(total).padStart(2, "0")}</i>
          </span>
          <button
            aria-label="Close photo"
            className="lightbox-close"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="lightbox-image-wrap">
          <img alt={photo.alt} className="lightbox-image" src={photo.src} />
          <button
            aria-label="Previous photo"
            className="lightbox-nav lightbox-nav--previous"
            onClick={() => onChange((activeIndex - 1 + total) % total)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            aria-label="Next photo"
            className="lightbox-nav lightbox-nav--next"
            onClick={() => onChange((activeIndex + 1) % total)}
            type="button"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="lightbox-caption">
          <div>
            <h2 id="lightbox-title">{photo.title}</h2>
            <p>{photo.note}</p>
          </div>
          <span className="lightbox-heart" aria-hidden="true">
            <Heart fill="currentColor" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/* STAGE 5 · GRAND BIRTHDAY FINALE                  */
/* ──────────────────────────────────────────────── */

interface FinaleStageProps {
  onRestart: () => void;
  onViewMemories: () => void;
}

const fallingConfetti = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 9) * 0.42}s`,
  duration: `${4.6 + ((index * 13) % 30) / 10}s`,
  rotation: `${index * 53}deg`,
  color: ["#eaa1b7", "#b9a1d2", "#f3c18b", "#d8b6cb", "#f7d6e0"][index % 5],
  shape: index % 3,
}));

const balloons = Array.from({ length: 6 }, (_, index) => ({
  left: `${8 + index * 16}%`,
  delay: `${index * 1.4}s`,
  duration: `${13 + (index % 3) * 3}s`,
  color: ["#f3b6c8", "#cbb6e8", "#f7d3ab", "#b9d9c6", "#f3b6c8", "#d9c2ee"][index],
  drift: index % 2 === 0 ? 1 : -1,
}));

export function FinaleStage({ onRestart, onViewMemories }: FinaleStageProps) {
  const { finale } = birthdayConfig;
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    setBurstKey(1);
  }, []);

  const celebrate = () => setBurstKey((key) => key + 1);

  return (
    <section aria-labelledby="finale-heading" className="finale-stage">
      {/* ambient celebration layer */}
      <div aria-hidden="true" className="finale-celebration">
        <div className="confetti-rain">
          {fallingConfetti.map((bit, index) => (
            <span
              key={index}
              data-shape={bit.shape}
              style={
                {
                  left: bit.left,
                  "--confetti-delay": bit.delay,
                  "--confetti-dur": bit.duration,
                  "--confetti-rot": bit.rotation,
                  "--confetti-color": bit.color,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="balloon-field">
          {balloons.map((balloon, index) => (
            <span
              key={index}
              className="balloon"
              style={
                {
                  left: balloon.left,
                  "--balloon-delay": balloon.delay,
                  "--balloon-dur": balloon.duration,
                  "--balloon-color": balloon.color,
                  "--balloon-drift": `${balloon.drift * 26}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <span className="party-popper party-popper--left">
          <PartyPopper />
          <span className="popper-sparks" />
        </span>
        <span className="party-popper party-popper--right">
          <PartyPopper />
          <span className="popper-sparks" />
        </span>
      </div>

      {/* wish burst, retriggered by CELEBRATE AGAIN */}
      {burstKey > 0 ? (
        <div aria-hidden="true" className="confetti-burst" key={burstKey}>
          {burstConfetti.map((bit, index) => (
            <span
              key={index}
              style={
                {
                  "--confetti-x": bit.x,
                  "--confetti-y": bit.y,
                  "--confetti-delay": bit.delay,
                  "--confetti-rotation": bit.rotation,
                  "--confetti-color": bit.color,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}

      <div className="finale-art" aria-hidden="true">
        <span className="finale-orbit finale-orbit--one">
          <Sparkles />
        </span>
        <span className="finale-orbit finale-orbit--two">
          <Heart fill="currentColor" />
        </span>
      </div>

      <p className="eyebrow">
        <span className="eyebrow-dot" /> the grand finale
      </p>
      <h1 className="finale-heading" id="finale-heading">
        {finale.heading.replace("TISHA!", "")}{" "}
        <span className="finale-heading-cake">
          <Cake />
        </span>
        <br />
        <span className="finale-heading-name">TISHA!</span>
      </h1>
      <p className="finale-subheading">{finale.subheading}</p>

      <BirthdayCake />

      <div className="finale-letter">
        {finale.message.map((paragraph, index) => (
          <p className={index === 0 ? "finale-dear" : undefined} key={index}>
            {paragraph}
          </p>
        ))}
        <p className="finale-signature">{finale.signature}</p>
      </div>

      <FinaleCollage />

      <div className="finale-actions">
        <button className="birthday-cta" onClick={celebrate} type="button">
          {finale.celebrateAgain}
          <PartyPopper aria-hidden="true" />
        </button>
        <button
          className="birthday-cta birthday-cta--outline"
          onClick={onViewMemories}
          type="button"
        >
          {finale.viewMemories}
          <Camera aria-hidden="true" />
        </button>
        <button className="birthday-cta birthday-cta--outline" onClick={onRestart} type="button">
          {finale.replay}
          <Mail aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

const burstConfetti = Array.from({ length: 18 }, (_, index) => ({
  x: `${((index * 71) % 340) - 170}px`,
  y: `${-100 - ((index * 37) % 190)}px`,
  delay: `${(index % 7) * 0.035}s`,
  rotation: `${index * 57}deg`,
  color: ["#eaa1b7", "#b9a1d2", "#f3c18b", "#d8b6cb"][index % 4],
}));

function BirthdayCake() {
  return (
    <div aria-hidden="true" className="birthday-cake">
      <span className="cake-plate" />
      <span className="cake-layer cake-layer--bottom" />
      <span className="cake-layer cake-layer--top">
        <span className="cake-drip" />
        {["12%", "34%", "56%", "78%"].map((left) => (
          <span className="cake-candle" key={left} style={{ left }}>
            <span className="cake-flame" />
          </span>
        ))}
      </span>
      <span className="cake-sprinkle cake-sprinkle--one" />
      <span className="cake-sprinkle cake-sprinkle--two" />
      <span className="cake-sprinkle cake-sprinkle--three" />
    </div>
  );
}

function FinaleCollage() {
  const { photos } = birthdayConfig.gallery;
  const rotations = [-6, 4, -3, 5, -5, 3];

  return (
    <div aria-hidden="true" className="finale-collage">
      {photos.map((photo, index) => (
        <span
          className="collage-polaroid"
          key={photo.src}
          style={
            {
              "--collage-rot": `${rotations[index]}deg`,
              "--collage-delay": `${index * 0.16}s`,
            } as CSSProperties
          }
        >
          <img alt="" loading="lazy" src={photo.src} />
        </span>
      ))}
    </div>
  );
}
