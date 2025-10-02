// src/components/UploadView.tsx
import { useState } from 'react';
import { analyzePhoto, generateStory } from '../lib/ai';
import { storyPrompts, personas } from '../lib/story';
import type { CreativeResult } from '../App';
import './Uploader.css';
import './StoryCreater.css';

interface UploadViewProps {
  setIsLoading: (loading: boolean) => void;
  setResult: (result: CreativeResult) => void;
  isLoading: boolean;
}

export const UploadView = ({ setIsLoading, setResult, isLoading }: UploadViewProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  const [promptChoices, setPromptChoices] = useState<Record<string, string>>({
    character: '',
    challenge: '',
    resolution: '',
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handlePromptChange = (id: string, value: string) => {
    setPromptChoices(prev => ({ ...prev, [id]: value }));
  };
  
  const canGenerate = uploadedImage && selectedPersona && Object.values(promptChoices).every(Boolean);

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setIsLoading(true);
    try {
      const themeResponse = await analyzePhoto(uploadedImage);
      const storyResponse = await generateStory(themeResponse, selectedPersona, promptChoices);
      setResult({
        sourceImage: uploadedImage,
        story: storyResponse,
      });
    } catch (error) {
      console.error("Failed to generate creative:", error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className="loadingSpinner"></div>
        <p>AI is writing your story...</p>
      </div>
    );
  }

  return (
    <>
      <input
        id="image-upload"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-upload" className="uploaderLabel">
        {uploadedImage ? 'Change Photo' : '1. Upload a Photo'}
      </label>

      {uploadedImage && (
        <div className="storyCreatorForm">
          <div className="formSection">
            <h4>2. Choose a Persona</h4>
            <div className="personaSelector">
              {personas.map(p => (
                <button
                  key={p.value}
                  className={`personaButton ${selectedPersona === p.value ? 'active' : ''}`}
                  onClick={() => setSelectedPersona(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="formSection">
            <h4>3. Build Your Story</h4>
            {storyPrompts.map(prompt => (
              <select
                key={prompt.id}
                className="promptSelector"
                value={promptChoices[prompt.id]}
                onChange={(e) => handlePromptChange(prompt.id, e.target.value)}
              >
                <option value="" disabled>{prompt.title}</option>
                {prompt.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            ))}
          </div>
          
          <button
            className="uploaderLabel"
            onClick={handleGenerate}
            disabled={!canGenerate}
            style={{ opacity: canGenerate ? 1 : 0.5, cursor: canGenerate ? 'pointer' : 'not-allowed' }}
          >
            Generate Story
          </button>
        </div>
      )}
    </>
  );
};