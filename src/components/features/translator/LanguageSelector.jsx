import { ArrowRightLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { LANGUAGES } from '@/utils/constants';

const LanguageSelector = ({ 
  sourceLanguage, 
  targetLanguage, 
  onSourceChange, 
  onTargetChange, 
  onSwapLanguages 
}) => {
  return (
    <div className="flex items-center gap-4">
      {/* Source Language */}
      <div className="flex-1">
        <Select
          label="Idioma origen"
          value={sourceLanguage}
          onChange={(e) => onSourceChange(e.target.value)}
        >
          {Object.entries(LANGUAGES).map(([code, lang]) => (
            <option key={code} value={code}>
              {lang.flag} {lang.name} ({lang.nativeName})
            </option>
          ))}
        </Select>
      </div>

      {/* Swap Button */}
      <div className="flex items-end pb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSwapLanguages}
          className="rounded-full p-2 hover:bg-primary-50"
          title="Intercambiar idiomas"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Target Language */}
      <div className="flex-1">
        <Select
          label="Idioma destino"
          value={targetLanguage}
          onChange={(e) => onTargetChange(e.target.value)}
        >
          {Object.entries(LANGUAGES).map(([code, lang]) => (
            <option key={code} value={code}>
              {lang.flag} {lang.name} ({lang.nativeName})
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;