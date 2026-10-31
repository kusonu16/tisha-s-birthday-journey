/**
 * ─────────────────────────────────────────────────────────────
 *  Central birthday configuration
 *  Change the name, messages, photos and captions here only.
 * ─────────────────────────────────────────────────────────────
 */

export type MessageIcon =
  "sparkles" | "smile" | "heart" | "sun" | "flower" | "star" | "rainbow" | "gift";

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
    microCopy: "A little letter, a little melody, all for you.",
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
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01-LyTPtlhcWRuIcdxqQovueeOh3K4bv8.png",
        alt: "Tisha in an olive-green dress on a city sidewalk",
        title: "Elegance in olive",
        note: "Calm, graceful and simply stunning",
        sticker: "main character hour",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02-qYn2SHfEi3VxUFN67UV7xOsTNpSDgQ.png",
        alt: "Tisha in a pink embellished outfit with silver jewelry in a soft-lit portrait",
        title: "Pretty in pink",
        note: "A soft glow and golden-hour charm",
        sticker: "ocean breeze vibes",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-wG8TN9EwEVUMv8HpDbmu3MfRVQokPK.png",
        alt: "Tisha laughing in sunglasses and a red sweater against a bright red shutter",
        title: "That infectious laugh",
        note: "Pure joy, unfiltered and bright",
        sticker: "vibe check: sunny",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04-fv5QudmliTIWt4sZOgS4FDOrjjijb7.png",
        alt: "Tisha in a teal patterned skirt beside an old stone building",
        title: "Little adventures",
        note: "Streets, stories and wanderlust",
        sticker: "wanderer approved",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05-Og3FDVNawR9U92tQev55zCCrSMBeCF.png",
        alt: "Tisha in a black top and sunglasses in an evening portrait",
        title: "City lights & her",
        note: "Cool, calm and effortlessly chic",
        sticker: "night-out energy",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06-XNLXUQibWgXq8mRsSUg0FFMCvW7qLP.png",
        alt: "Tisha smiling in a cream sari beside a forest stream",
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
    src: "/tisha-soft-birthday.mp3",
    label: "Soft birthday music",
    play: "Turn soft birthday music on",
    pause: "Turn soft birthday music off",
  },
} as const;

export type BirthdayConfig = typeof birthdayConfig;
