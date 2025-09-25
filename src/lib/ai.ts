// This file simulates AI backend services.

// Represents the "Theme JSON" response from the Vision Analyzer
export interface AIThemeResponse {
  materials: string[];
  colors: string[];
  mood: string;
  theme: string;
}

// Represents the response from the Caption Generator
export interface GeneratedCaption {
  caption_text: string;
  hashtags: string[];
}

/**
 * Simulates calling the POST /analyze-photo endpoint.
 */
export const analyzePhoto = async (_imageUrl: string): Promise<AIThemeResponse> => {
  console.log('Simulating AI Photo Analysis...');
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    materials: ['Hand-spun Cotton', 'Natural Indigo Dye'],
    colors: ['indigo', 'cream'],
    mood: 'minimal',
    theme: 'Indigo Dreams',
  };
};

/**
 * Simulates calling the POST /generate-caption endpoint.
 */
export const generateCaption = async (theme: AIThemeResponse): Promise<GeneratedCaption> => {
  console.log('Simulating AI Caption Generation...');
  await new Promise(resolve => setTimeout(resolve, 800));

  const hashtags = ['#FolkCharm', '#handwoven', '#naturaldye', `#${theme.mood}`];
  const caption_text = `Discover the serene, ${theme.mood} beauty of our new collection. Crafted from ${theme.materials.join(' and ')}, each piece tells a story of tradition and artistry.`;
  
  return { caption_text, hashtags };
};