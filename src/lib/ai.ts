// src/lib/ai.ts

export interface AIThemeResponse {
  theme: string;
}

export interface GeneratedStory {
  title: string;
  body: string;
  hashtags: string[];
}

// This function can remain simple as the story is now guided by prompts
export const analyzePhoto = async (imageUrl: string): Promise<AIThemeResponse> => {
  console.log('Simulating AI Photo Analysis...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { theme: 'Indigo Dreams' };
};

// This is our new story generator
export const generateStory = async (
  theme: AIThemeResponse,
  persona: string,
  promptChoices: Record<string, string>
): Promise<GeneratedStory> => {
  console.log('Simulating AI Story Generation with:', { persona, promptChoices });
  await new Promise(resolve => setTimeout(resolve, 800));

  // Combine the user's choices into a narrative
  const storyBody = `${promptChoices.character}, who ${promptChoices.challenge}, ultimately ${promptChoices.resolution}`;

  // Tailor the title based on the persona
  const storyTitle = persona === 'idealist' 
    ? `A Story of Comfort: ${theme.theme}`
    : `An Icon of Style: ${theme.theme}`;

  return {
    title: storyTitle,
    body: storyBody,
    hashtags: ['#FolkCharm', '#storytelling', '#handcrafted', '#slowfashion'],
  };
};