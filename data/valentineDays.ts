export interface ValentineDay {
  id: number;
  slug: string;
  date: string; // ISO format YYYY-MM-DD
  name: string;
  emoji: string;
  hint: string;
  type: 'romantic' | 'funny';
  message: string;
  quote: {
    text: string;
    author: string;
  };
  activity: {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    time: string;
  };
}

export const VALENTINE_DAYS: ValentineDay[] = [
  { 
    id: 1, 
    slug: 'rose-day-x7k9m', 
    date: '2026-02-07', 
    name: 'Rose Day', 
    emoji: '🌹', 
    hint: 'Something fragrant and beautiful awaits...', 
    type: 'romantic',
    message: "My love, just like a rose, you brought color and fragrance into my world. Every petal of our journey represents a beautiful memory we've shared. Today, I give you this virtual rose as a symbol of my growing affection for you.",
    quote: { text: "A single rose can be my garden... a single friend, my world.", author: "Leo Buscaglia" },
    activity: { title: "Virtual Rose Garden", description: "Click to make roses bloom and reveal reasons why I love you.", difficulty: "easy", time: "5 mins" }
  },
  { 
    id: 2, 
    slug: 'propose-day-q4r8n', 
    date: '2026-02-08', 
    name: 'Propose Day', 
    emoji: '💍', 
    hint: 'A question that comes from the heart...', 
    type: 'romantic',
    message: "I don't need a fancy ring to tell you that I want to spend all my tomorrows with you. Every day with you is a 'yes' to a lifetime of happiness. Will you continue to be my partner in this beautiful adventure?",
    quote: { text: "I would rather spend one lifetime with you, than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
    activity: { title: "The Big Question", description: "Customize a virtual ring and record a special promise to each other.", difficulty: "medium", time: "10 mins" }
  },
  { 
    id: 3, 
    slug: 'chocolate-day-p2v5f', 
    date: '2026-02-09', 
    name: 'Chocolate Day', 
    emoji: '🍫', 
    hint: 'A sweet treat for a sweet soul...', 
    type: 'romantic',
    message: "Life is like a box of chocolates, but with you, I always know I'm getting the sweetest part. You're the extra caramel in my life—sweet, smooth, and absolutely addictive.",
    quote: { text: "All you need is love. But a little chocolate now and then doesn't hurt.", author: "Charles M. Schulz" },
    activity: { title: "Sweet Memory Box", description: "Pick a chocolate to reveal a sweet memory from our past.", difficulty: "easy", time: "5 mins" }
  },
  { 
    id: 4, 
    slug: 'teddy-day-j6w3t', 
    date: '2026-02-10', 
    name: 'Teddy Day', 
    emoji: '🧸', 
    hint: 'A soft companion for your dreams...', 
    type: 'romantic',
    message: "Whenever I'm not there to hold you, I hope this virtual teddy reminds you of my warm hugs. You're my favorite person to cuddle with, and I promise to always be your soft place to land.",
    quote: { text: "A bear remains a bear - even when most of him has fallen off or worn away.", author: "Charlotte Gray" },
    activity: { title: "Build-A-Love-Bear", description: "Give your virtual teddy a name and a special outfit.", difficulty: "easy", time: "5 mins" }
  },
  { 
    id: 5, 
    slug: 'promise-day-b8h1d', 
    date: '2026-02-11', 
    name: 'Promise Day', 
    emoji: '🤝', 
    hint: 'Words that bind us forever...', 
    type: 'romantic',
    message: "I promise to be your biggest fan, your toughest protector, and your most loyal friend. I promise to choose you every single day, even when things get hard. My heart is yours, always.",
    quote: { text: "Promises are the uniquely human way of ordering the future.", author: "Hannah Arendt" },
    activity: { title: "The Promise Jar", description: "Write down three promises for our future and seal them in the digital jar.", difficulty: "medium", time: "10 mins" }
  },
  { 
    id: 6, 
    slug: 'hug-day-l9c4s', 
    date: '2026-02-12', 
    name: 'Hug Day', 
    emoji: '🫂', 
    hint: 'The warmth of being held close...', 
    type: 'romantic',
    message: "There's no place in the world I'd rather be than wrapped in your arms. A hug from you can fix the worst of days. Sending you a giant, warm, virtual squeeze right now!",
    quote: { text: "A hug is like a bandage for a hurting mind.", author: "Unknown" },
    activity: { title: "Warmth Meter", description: "Hold the 'Hug' button to fill the warmth meter and unlock a certificate.", difficulty: "easy", time: "3 mins" }
  },
  { 
    id: 7, 
    slug: 'kiss-day-z3m7e', 
    date: '2026-02-13', 
    name: 'Kiss Day', 
    emoji: '💋', 
    hint: 'A gentle touch of affection...', 
    type: 'romantic',
    message: "A kiss is a lovely trick designed by nature to stop speech when words become superfluous. Every kiss we share tells a story of a thousand emotions. Can't wait for the next real one!",
    quote: { text: "The soul that can speak through the eyes can also kiss with a gaze.", author: "Gustavo Adolfo Bécquer" },
    activity: { title: "Kiss Counter", description: "Tap the screen to leave lipstick marks and reveal hidden compliments.", difficulty: "easy", time: "5 mins" }
  },
  { 
    id: 8, 
    slug: 'valentines-day-n5r2g', 
    date: '2026-02-14', 
    name: "Valentine's Day", 
    emoji: '💝', 
    hint: 'The grand finale of our love story...', 
    type: 'romantic',
    message: "Happy Valentine's Day, my everything. These past 14 days have been a small reflection of the love I feel for you every day. You are my heart, my soul, and my greatest blessing. I love you more than words can ever express.",
    quote: { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou" },
    activity: { title: "Our Love Timeline", description: "A grand finale video and a trip down memory lane of our journey.", difficulty: "hard", time: "20 mins" }
  },
  { 
    id: 9, 
    slug: 'slap-day-k1y9p', 
    date: '2026-02-15', 
    name: 'Slap Day', 
    emoji: '✋', 
    hint: 'A playful sting of affection...', 
    type: 'funny',
    message: "Time to slap away all the bad vibes and annoying habits (mostly mine)! Today is for playful teasing and remembering that even when we're 'annoying', we're annoying together.",
    quote: { text: "I love you even when I want to slap you.", author: "Every Couple Ever" },
    activity: { title: "Vibe Slapper", description: "Slap away the 'Bad Vibes' icons to reveal funny memes about us.", difficulty: "easy", time: "5 mins" }
  },
  { 
    id: 10, 
    slug: 'kick-day-a8w6b', 
    date: '2026-02-16', 
    name: 'Kick Day', 
    emoji: '🦶', 
    hint: 'Kicking away the bad vibes...', 
    type: 'funny',
    message: "Let's kick out the stress and the worries. Today is about being silly and energetic. If life gives you lemons, kick them back! (But don't actually kick me, please).",
    quote: { text: "Sometimes you just need to kick back and relax.", author: "Wise Person" },
    activity: { title: "Pillow Fight", description: "A rapid-click game to win a virtual pillow fight championship.", difficulty: "medium", time: "5 mins" }
  },
  { 
    id: 11, 
    slug: 'perfume-day-f4d7o', 
    date: '2026-02-17', 
    name: 'Perfume Day', 
    emoji: '💨', 
    hint: 'A scent that lingers in the air...', 
    type: 'romantic',
    message: "Your scent is my favorite perfume. It's the smell of home, of comfort, and of love. Even when you're not here, the memory of your fragrance lingers in my heart.",
    quote: { text: "Perfume is the indispensable complement to the personality of women, the finishing touch on a dress.", author: "Christian Dior" },
    activity: { title: "Scent Personality", description: "Take a quiz to find out which scent matches your personality today.", difficulty: "easy", time: "5 mins" }
  },
  { 
    id: 12, 
    slug: 'flirting-day-u2i8x', 
    date: '2026-02-18', 
    name: 'Flirting Day', 
    emoji: '😏', 
    hint: 'A playful wink and a smile...', 
    type: 'romantic',
    message: "Who says we have to stop flirting just because we're together? Today is all about those butterflies and cheesy pickup lines. Get ready to be wooed all over again!",
    quote: { text: "Flirting is the gentle art of making a man feel pleased with himself.", author: "Helen Rowland" },
    activity: { title: "Pickup Line Roulette", description: "Spin the wheel for a personalized (and probably cheesy) pickup line.", difficulty: "easy", time: "5 mins" }
  },
  { 
    id: 13, 
    slug: 'confession-day-e6t3c', 
    date: '2026-02-19', 
    name: 'Confession Day', 
    emoji: '🗣️', 
    hint: 'Secrets shared in the moonlight...', 
    type: 'romantic',
    message: "I have a confession: I fall in love with you a little bit more every time you laugh. Today is for sharing those little things I've never told you before.",
    quote: { text: "Confession is always weakness. The grave soul keeps its own secrets.", author: "Dorothea Dix" },
    activity: { title: "Truth or Truth", description: "Reveal a hidden confession or share one of your own.", difficulty: "medium", time: "10 mins" }
  },
  { 
    id: 14, 
    slug: 'missing-day-h5n1s', 
    date: '2026-02-20', 
    name: 'Missing Day', 
    emoji: '🥺', 
    hint: 'Counting the moments until we meet...', 
    type: 'romantic',
    message: "Even when we're apart for just an hour, I miss you. This journey might be ending, but our story is just beginning. I'm already counting down the seconds until I see you again.",
    quote: { text: "In case you ever foolishly forget: I am never not thinking of you.", author: "Virginia Woolf" },
    activity: { title: "Distance Calculator", description: "See how many heartbeats we've shared even while apart.", difficulty: "easy", time: "5 mins" }
  },
];
