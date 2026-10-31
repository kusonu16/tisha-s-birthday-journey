import photo01 from "@/assets/photo-01.png.asset.json";
import photo02 from "@/assets/photo-02.png.asset.json";
import photo03 from "@/assets/photo-03.png.asset.json";
import photo04 from "@/assets/photo-04.png.asset.json";
import photo05 from "@/assets/photo-05.png.asset.json";
import photo06 from "@/assets/photo-06.png.asset.json";
import musicSrc from "@/assets/birthday-music.mp3.asset.json";

/**
 * ─────────────────────────────────────────────────────────────
 *  Central birthday configuration
 *  Change the name, messages, photos and captions here only.
 * ─────────────────────────────────────────────────────────────
 */

export type MessageIcon =
  | "sparkles"
  | "smile"
  | "heart"
  | "sun"
  | "flower"
  | "star"
  | "rainbow"
  | "gift";

export interface BirthdayMessage {
  text: string;
  icon: MessageIcon;
  tone: "rose" | "lilac" | "peach" | "plum";
}

export const birthdayConfig = {
  name: "Tisha",

  envelope: {
    heading: ["A Little Surprise", "for You, Tisha!"],
    heart: "💗",
    copy: "Someone has prepared a little something to make your day extra special.",
    button: "OPEN YOUR LETTER 💌",
    opening: "Opening your letter...",
    microCopy: "Best opened with a little curiosity",
  },

  invitation: {
    heading: "Hey Tisha!",
    emoji: "🎀",
    copy: "I have something special for you. Are you ready for a little surprise?",
    yes: "YES, LET'S GO! 💖",
    no: "NO, CANCEL! 😜",
    escaped: "Oops! You can't escape this surprise! 😂",
    note: "Psst... the pink button is definitely the right choice.",
  },

  messages: {
    heading: "A little journey of sweet notes",
    intro: "Eight little thoughts, one for every step of the way.",
    finishButton: "NOW FOR MY BIG SURPRISE 🎁",
    items: [
      {
        text: "Some people make the world brighter just by being themselves. You're one of those people, Tisha! ✨",
        icon: "sparkles",
        tone: "rose",
      },
      {
        text: "Your smile has a magical way of making ordinary moments special. 😊",
        icon: "smile",
        tone: "lilac",
      },
      {
        text: "Never change your beautiful spirit. The world needs more people like you! 💗",
        icon: "heart",
        tone: "peach",
      },
      {
        text: "May you always find reasons to laugh, dream big and enjoy every little moment.",
        icon: "sun",
        tone: "plum",
      },
      {
        text: "Life is more beautiful when surrounded by genuine people and happy memories.",
        icon: "flower",
        tone: "rose",
      },
      {
        text: "Keep shining, keep smiling and never stop believing in yourself! 🌸",
        icon: "star",
        tone: "lilac",
      },
      {
        text: "May your new year of life bring exciting adventures, lovely surprises and endless happiness.",
        icon: "rainbow",
        tone: "peach",
      },
      {
        text: "Okay, Tisha... enough sweet messages! Now it's time for your BIG SURPRISE! 🎁",
        icon: "gift",
        tone: "plum",
      },
    ] as BirthdayMessage[],
  },

  gallery: {
    heading: "A Few Smiles, A Thousand Memories",
    emoji: "🌷",
    intro: "Every picture holds a little moment worth remembering.",
    photos: [
      {
        src: photo01.url,
        alt: "Tisha glowing in an elegant olive green gown outdoors",
        title: "Elegance in olive",
        note: "Calm, graceful and simply stunning",
        sticker: "main character hour",
      },
      {
        src: photo02.url,
        alt: "Tisha in soft pink ethnic wear with a dreamy seaside glow",
        title: "Pretty in pink",
        note: "A soft glow and golden-hour charm",
        sticker: "ocean breeze vibes",
      },
      {
        src: photo03.url,
        alt: "Tisha laughing in a red sweater and sunglasses against a red wall",
        title: "That infectious laugh",
        note: "Pure joy, unfiltered and bright",
        sticker: "vibe check: sunny",
      },
      {
        src: photo04.url,
        alt: "Tisha exploring old stone steps in a green floral skirt",
        title: "Little adventures",
        note: "Streets, stories and wanderlust",
        sticker: "wanderer approved",
      },
      {
        src: photo05.url,
        alt: "Tisha looking effortlessly chic in the city at night",
        title: "City lights & her",
        note: "Cool, calm and effortlessly chic",
        sticker: "night-out energy",
      },
      {
        src: photo06.url,
        alt: "Tisha smiling brightly in a cream saree beside a forest stream",
        title: "Joy, pure and simple",
        note: "The smile that wins every time",
        sticker: "smile of the year",
      },
    ],
  },

  finale: {
    heading: "HAPPY BIRTHDAY TISHA!",
    subheading: "Today is YOUR special day! 💗",
    message: [
      "Dear Tisha,",
      "May your days be filled with laughter, your dreams filled with possibilities and your life filled with beautiful memories.",
      "May you achieve everything you work so hard for, meet wonderful people along the way and always have countless reasons to smile.",
      "Never stop being the amazing person you are.",
      "Wishing you a year full of happiness, success, adventures and unforgettable moments.",
      "Have the most wonderful birthday ever! ❤️",
    ],
    signature: "Lots of smiles and warm wishes, just for you! 🌸",
    celebrateAgain: "CELEBRATE AGAIN 🎉",
    viewMemories: "VIEW YOUR MEMORIES 📸",
    replay: "REPLAY THE SURPRISE 💌",
  },

  music: {
    src: musicSrc.url,
    label: "Birthday music",
    play: "Play gentle birthday music",
    pause: "Pause the birthday music",
  },
} as const;

export type BirthdayConfig = typeof birthdayConfig;
