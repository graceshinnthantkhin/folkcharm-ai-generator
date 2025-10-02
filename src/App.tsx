// src/App.tsx
import { useState } from 'react';
import './App.css';
import { UploadView } from './components/UploadView';
import { ResultView } from './components/ResultView';
import type { AIThemeResponse, GeneratedStory } from './lib/ai';

export interface CreativeResult {
  sourceImage: string;
  story: GeneratedStory;
}

function App() {
  const [result, setResult] = useState<CreativeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (result) {
    return (
      <div className="appContainer">
        <header className="header">
          <h1>Your AI-Generated Story</h1>
          <p>You can now preview the content and copy the story or embeddable code.</p>
        </header>
        <ResultView result={result} onReset={() => setResult(null)} />
      </div>
    );
  }

  return (
    <div className="appContainer">
      <header className="header">
        <h1>FolkCharm AI Story Generator</h1>
        <p>Turn a product photo into a compelling story for your website.</p>
      </header>
      <UploadView setIsLoading={setIsLoading} setResult={setResult} isLoading={isLoading} />
    </div>
  );
}

export default App;