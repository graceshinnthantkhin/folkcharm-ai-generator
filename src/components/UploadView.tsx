// src/components/UploadView.tsx
import { analyzePhoto, generateCaption } from '../lib/ai';
import type { CreativeResult } from '../App';
import './Uploader.css';

interface UploadViewProps {
  setIsLoading: (loading: boolean) => void;
  setResult: (result: CreativeResult) => void;
  isLoading: boolean;
}

export const UploadView = ({ setIsLoading, setResult, isLoading }: UploadViewProps) => {

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const imageUrl = URL.createObjectURL(file);
      const themeResponse = await analyzePhoto(imageUrl);
      const captionResponse = await generateCaption(themeResponse);

      setResult({
        sourceImage: imageUrl,
        theme: themeResponse,
        caption: captionResponse,
      });

    } catch (error) {
      console.error("Failed to generate creative:", error);
      alert("Oops! Something went wrong. Please try another photo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className="loadingSpinner"></div>
        <p>AI is generating your embeddable content...</p>
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
        Click here to Upload a Photo
      </label>
    </>
  );
};