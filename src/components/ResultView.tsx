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

  useEffect(() => {
    const code = generateEmbedCode(result);
    setEmbedCode(code);
  }, [result]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode)
      .then(() => alert("Embed code copied to clipboard!"))
      .catch(err => console.error('Failed to copy code:', err));
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
        <h3>Embeddable Code</h3>
        <p>Copy this code and paste it into the HTML of your website.</p>
        <textarea className="codeTextarea" readOnly value={embedCode} />
      </div>

      <div className="actionButtons">
        <button className="actionButton primary" onClick={handleCopyCode}>
          Copy Code
        </button>
        <button className="actionButton tertiary" onClick={onReset}>
          Generate Another
        </button>
      </div>
    </div>
  );
};