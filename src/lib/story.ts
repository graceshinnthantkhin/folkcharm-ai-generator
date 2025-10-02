// src/lib/story.ts

// Define the structure for our story prompts
export interface StoryPrompt {
  id: 'character' | 'challenge' | 'resolution';
  title: string;
  options: { value: string; label: string }[];
}

// Define the available personas
export const personas = [
  { value: 'idealist', label: 'The Idealist' },
  { value: 'premium', label: 'The Connoisseur' },
];

// Define the prompts and choices based on the Dan Harmon Story Circle
export const storyPrompts: StoryPrompt[] = [
  {
    id: 'character',
    title: '1. The Character',
    options: [
      { value: 'A timeless scarf', label: 'A timeless scarf, comfortable and familiar.' },
      { value: 'The confident wearer', label: 'A confident wearer, in her element.' },
      { value: 'An artisan piece', label: 'An artisan piece, waiting to be discovered.' },
    ],
  },
  {
    id: 'challenge',
    title: '2. The Challenge',
    options: [
      { value: 'seeks a moment of peace', label: '...seeks a moment of everyday peace.' },
      { value: 'wants to express her unique style', label: '...wants to express her unique style.' },
      { value: 'searches for an authentic connection', label: '...searches for an authentic connection to craft.' },
    ],
  },
  {
    id: 'resolution',
    title: '3. The Resolution',
    options: [
      { value: 'finds comfort in its soft embrace', label: '...and finds comfort in its soft, natural embrace.' },
      { value: 'receives compliments on her effortless look', label: '...and receives compliments on her effortless look.' },
      { value: 'feels connected to the hands that made it', label: '...and feels connected to the story of the hands that made it.' },
    ],
  },
];