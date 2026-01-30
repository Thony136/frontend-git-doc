import { useState } from 'react';
import { Send, Copy, Heart, Volume2, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import { MAX_TEXT_LENGTH, EXAMPLE_TEXTS } from '@/utils/constants';

const TranslationForm = ({ 
  sourceText, 
  onSourceTextChange, 
  onTranslate, 
  isLoading, 
  sourceLanguage 
}) => {
  const [charCount, setCharCount] = useState(sourceText?.length || 0);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_TEXT_LENGTH) {
      setCharCount(text.length);
      onSourceTextChange(text);
    }
  };

  const handleExampleClick = (example) => {
    onSourceTextChange(example);
    setCharCount(example.length);
  };

  const examples = EXAMPLE_TEXTS[sourceLanguage] || [];

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Texto a traducir
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${charCount > MAX_TEXT_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{MAX_TEXT_LENGTH}
          </span>
        </div>
      </div>

      <Textarea
        value={sourceText}
        onChange={handleTextChange}
        placeholder={`Escribe en ${sourceLanguage === 'qu' ? 'Quechua' : 'Español'}...`}
        rows={6}
        className="resize-none"
      />

      {/* Example Texts */}
      {examples.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-700">Ejemplos:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {examples.slice(0, 6).map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard.writeText(sourceText)}
            disabled={!sourceText}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={!sourceText}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={onTranslate}
          disabled={!sourceText?.trim() || isLoading}
          loading={isLoading}
          size="lg"
          className="min-w-[120px]"
        >
          <Send className="h-4 w-4 mr-2" />
          Traducir
        </Button>
      </div>
    </Card>
  );
};

export default TranslationForm;
