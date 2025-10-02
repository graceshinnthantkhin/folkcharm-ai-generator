// src/lib/codeGenerator.ts
import type { CreativeResult } from '../App';

export const generateEmbedCode = (result: CreativeResult): string => {
  const { sourceImage, story } = result;
  
  const hashtagsHTML = story.hashtags.map(tag => `<span>${tag}</span>`).join('\n      ');

  return `
<!-- FolkCharm AI Generated Story Block -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@600;700&display=swap');
  .fc-widget {
    font-family: 'Inter', sans-serif;
    border: 1px solid #DCD0C0;
    border-radius: 12px;
    overflow: hidden;
    max-width: 550px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    background-color: #FDF6E3;
    margin: 1em auto;
  }
  .fc-widget img {
    width: 100%;
    height: auto;
    display: block;
  }
  .fc-widget-content {
    padding: 24px 32px;
  }
  .fc-widget-story-title {
    font-family: 'Lora', serif;
    font-size: 26px;
    font-weight: 600;
    color: #3D2B1F;
    margin: 0 0 12px 0;
  }
  .fc-widget-story-body {
    font-size: 16px;
    line-height: 1.6;
    color: #5A4D41;
    margin: 0 0 20px 0;
  }
  .fc-widget-hashtags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .fc-widget-hashtags span {
    background-color: #F5EFE1;
    color: #8B4513;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
  }
</style>
<div class="fc-widget">
  <img src="${sourceImage}" alt="${story.title}">
  <div class="fc-widget-content">
    <h3 class="fc-widget-story-title">${story.title}</h3>
    <p class="fc-widget-story-body">${story.body}</p>
    <div class="fc-widget-hashtags">
      ${hashtagsHTML}
    </div>
  </div>
</div>
<!-- End FolkCharm Story Block -->
  `;
};