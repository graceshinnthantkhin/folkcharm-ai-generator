// src/components/ResultView.tsx
import { useState, useEffect } from 'react';
import type { CreativeResult } from '../App';
import { generateEmbedCode } from '../lib/codeGenerator';
import './ResultView.css';

interface ResultViewProps {
  result: CreativeResult;
  onReset: () => void;
}

export const ResultView = ({ result, onReset }: ResultViewProps) => {
  const [embedCode, setEmbedCode] = useState('');
  const fullStory = `${result.story.title}\n\n${result.story.body}\n\n${result.story.hashtags.join(' ')}`;

  useEffect(() => {
    const code = generateEmbedCode(result);
    setEmbedCode(code);
  }, [result]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode)
      .then(() => alert("Embed code copied to clipboard!"))
      .catch(err => console.error('Failed to copy code:', err));
  };
  
  const handleCopyStory = () => {
    navigator.clipboard.writeText(fullStory)
      .then(() => alert("Story copied to clipboard!"))
      .catch(err => console.error('Failed to copy story:', err));
  };

  return (
    <div className="resultContainer">
      <h3>Live Preview</h3>
      <p>This is how the widget will look on another website.</p>
      <iframe
        className="previewFrame"
        srcDoc={embedCode}
        title="Live Preview of Embeddable Widget"
      />

      <div className="codeContainer">
        <h3>Generated Story & Code</h3>
        <p>Copy the story for social media, or embed the code on your website.</p>
        <textarea className="codeTextarea" readOnly value={fullStory} />
        <textarea className="codeTextarea" readOnly value={embedCode} style={{marginTop: '16px'}}/>
      </div>

      <div className="actionButtons">
        <button className="actionButton primary" onClick={handleCopyCode}>Copy Embed Code</button>
        <button className="actionButton primary" onClick={handleCopyStory} style={{backgroundColor: '#5A4D41'}}>Copy Story Text</button>
        <button className="actionButton tertiary" onClick={onReset}>Generate Another</button>
      </div>
    </div>
  );
};