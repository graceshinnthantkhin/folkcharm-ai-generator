import { useState } from 'react';
import './App.css';
import { UploadView } from './components/UploadView';
import { ResultView } from './components/ResultView';
import type { AIThemeResponse, GeneratedCaption } from './lib/ai';

export interface CreativeResult {
  sourceImage: string;
  theme: AIThemeResponse;
  caption: GeneratedCaption;
}

function App() {
  const [result, setResult] = useState<CreativeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (result) {
    return (
      <div className="appContainer">
        <header className="header">
          <h1>Your AI-Generated Content</h1>
          <p>You can now preview and copy the code to embed this on your website.</p>
        </header>
        <ResultView result={result} onReset={() => setResult(null)} />
      </div>
    );
  }

  return (
    <div className="appContainer">
      <header className="header">
        <h1>FolkCharm AI Content Generator</h1>
        <p>Upload a product photo to instantly generate an embeddable website template.</p>
      </header>
      <UploadView setIsLoading={setIsLoading} setResult={setResult} isLoading={isLoading} />
    </div>
  );
}

export default App;