// src/lib/ai.ts

export interface AIThemeResponse {
  theme: string;
}

export interface GeneratedStory {
  title: string;
  body: string;
  hashtags: string[];
}

/**
 * Simulates calling the POST /analyze-photo endpoint.
 */
export const analyzePhoto = async (_imageUrl: string): Promise<AIThemeResponse> => {
  console.log('Simulating AI Photo Analysis...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { theme: 'Indigo Dreams' };
};

/**
 * Simulates calling the POST /generate-story endpoint.
 */
export const generateStory = async (
  theme: AIThemeResponse,
  persona: string,
  promptChoices: Record<string, string>
): Promise<GeneratedStory> => {
  console.log('Simulating AI Story Generation with:', { persona, promptChoices });
  await new Promise(resolve => setTimeout(resolve, 800));

  const storyBody = `${promptChoices.character}, who ${promptChoices.challenge}, ultimately ${promptChoices.resolution}`;

  const storyTitle = persona === 'idealist' 
    ? `A Story of Comfort: ${theme.theme}`
    : `An Icon of Style: ${theme.theme}`;

  return {
    title: storyTitle,
    body: storyBody,
    hashtags: ['#FolkCharm', '#storytelling', '#handcrafted', '#slowfashion'],
  };
};