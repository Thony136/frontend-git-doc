import { Copy, Heart, Volume2, RotateCcw, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { CONFIDENCE_LEVELS } from '@/utils/constants';

const TranslationResult = ({ 
  result, 
  isLoading, 
  error, 
  onRetry, 
  onAddToFavorites,
  targetLanguage 
}) => {
  if (isLoading) {
    return (
      <Card className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" text="Traduciendo con BERT..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="text-center py-8 border-red-200 bg-red-50">
        <div className="space-y-3">
          <div className="text-red-600">
            <svg className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-900">Error en la traducción</h3>
          <p className="text-red-700">{error}</p>
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Intentar de nuevo
          </Button>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="text-center py-12 border-dashed border-2 border-gray-300">
        <div className="text-gray-500">
          <svg className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Traducción lista
          </h3>
          <p className="text-gray-600">
            Escribe un texto y presiona "Traducir" para ver el resultado aquí
          </p>
        </div>
      </Card>
    );
  }

  const getConfidenceBadge = (confidence) => {
    if (confidence >= CONFIDENCE_LEVELS.HIGH) {
      return <Badge variant="success">Alta confianza ({Math.round(confidence * 100)}%)</Badge>;
    } else if (confidence >= CONFIDENCE_LEVELS.MEDIUM) {
      return <Badge variant="warning">Confianza media ({Math.round(confidence * 100)}%)</Badge>;
    } else {
      return <Badge variant="danger">Baja confianza ({Math.round(confidence * 100)}%)</Badge>;
    }
  };

  return (
    <Card className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Traducción
        </h3>
        <div className="flex items-center gap-2">
          {getConfidenceBadge(result.confidence)}
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
      </div>

      {/* Translation Text */}
      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500">
        <p className="text-lg text-gray-900 leading-relaxed">
          {result.translatedText || result.translation}
        </p>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-4">
          <span>Método: {result.method || 'BERT'}</span>
          {result.processingTime && (
            <span>Tiempo: {result.processingTime}ms</span>
          )}
          {result.tokenCount && (
            <span>Tokens: {result.tokenCount}</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard.writeText(result.translatedText || result.translation)}
          >
            <Copy className="h-4 w-4" />
            Copiar
          </Button>
          <Button
            variant="ghost"
            size="sm"
          >
            <Volume2 className="h-4 w-4" />
            Escuchar
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddToFavorites(result)}
        >
          <Heart className="h-4 w-4 mr-2" />
          Favorito
        </Button>
      </div>
    </Card>
  );
};

export default TranslationResult;