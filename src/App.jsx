import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import LanguageSelector from '@/components/features/translator/LanguageSelector';
import TranslationForm from '@/components/features/translator/TranslationForm';
import TranslationResult from '@/components/features/translator/TranslationResult';
import TranslationHistory from '@/components/features/translator/TranslationHistory';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { useTranslationStore } from '@/stores/translationStore';
import { useApi } from '@/hooks/useApi';
import { TranslationService } from '@/services/translationService';
import { AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

function App() {
  // State
  const [sourceText, setSourceText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('qu');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [showSettings, setShowSettings] = useState(false);

  // Hooks
  const { translate, isLoading, error, result, clearError } = useTranslation();
  const { addToHistory, addToFavorites, preferences } = useTranslationStore();
  
  // API Hooks
  const { 
    data: modelInfo, 
    loading: modelLoading, 
    error: modelError,
    refetch: refetchModelInfo 
  } = useApi(() => TranslationService.getModelInfo(), []);

  const {
    data: healthData,
    loading: healthLoading,
    refetch: refetchHealth
  } = useApi(() => TranslationService.healthCheck(), []);

  // Effects
  useEffect(() => {
    if (preferences.defaultSourceLanguage) {
      setSourceLanguage(preferences.defaultSourceLanguage);
    }
    if (preferences.defaultTargetLanguage) {
      setTargetLanguage(preferences.defaultTargetLanguage);
    }
  }, [preferences]);

  // Handlers
  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    clearError();
    const translationResult = await translate(sourceText, sourceLanguage, targetLanguage);
    
    if (translationResult && preferences.saveHistory) {
      addToHistory({
        originalText: sourceText,
        translatedText: translationResult.translatedText || translationResult.translation,
        sourceLanguage,
        targetLanguage,
        confidence: translationResult.confidence,
        method: translationResult.method
      });
    }
  };

  const handleSwapLanguages = () => {
    const newSource = targetLanguage;
    const newTarget = sourceLanguage;
    setSourceLanguage(newSource);
    setTargetLanguage(newTarget);
    
    // Si hay resultado, usar la traducción como nuevo texto fuente
    if (result) {
      setSourceText(result.translatedText || result.translation);
    }
  };

  const handleAddToFavorites = (translation) => {
    addToFavorites({
      originalText: sourceText,
      translatedText: translation.translatedText || translation.translation,
      sourceLanguage,
      targetLanguage,
      confidence: translation.confidence,
      method: translation.method
    });
  };

  const handleSelectFromHistory = (item) => {
    setSourceText(item.originalText);
    setSourceLanguage(item.sourceLanguage);
    setTargetLanguage(item.targetLanguage);
  };

  const handleRetry = () => {
    handleTranslate();
  };

  // Health Check Alert - ACTUALIZADO
  const HealthAlert = () => {
    if (healthLoading) return null;
    
    // Verificar si el servicio está saludable - adaptado al formato actual
    const isHealthy = healthData && (
      // Formato completo esperado
      (healthData?.success === true && (
        healthData?.status === 'healthy' || 
        healthData?.data?.status === 'UP' ||
        healthData?.message === 'Service is healthy'
      )) ||
      // Formato actual que está llegando (solo data)
      healthData?.status === 'UP'
    );

    if (!isHealthy) {
      return (
        <Card className="mb-6 border-red-200 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Servicio no disponible
                </h3>
                <p className="text-sm text-red-700">
                  {healthData?.error || 'No se puede conectar con el servidor de traducción'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refetchHealth}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      );
    }

    // Opcional: Mostrar estado saludable (puedes comentar esto si no quieres mostrarlo)
    return (
      <Card className="mb-6 border-green-200 bg-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="text-sm font-medium text-green-800">
                ✅ Servicio disponible
              </h3>
              <p className="text-sm text-green-700">
                Servidor activo - {healthData?.environment || 'development'}
              </p>
            </div>
          </div>
          <div className="text-xs text-green-600">
            Activo por {Math.floor(healthData?.uptime || 0)}s
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Layout 
      onOpenSettings={() => setShowSettings(true)} 
      modelInfo={modelInfo}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Health Check Alert */}
        <HealthAlert />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Translator Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Selector */}
            <LanguageSelector
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceChange={setSourceLanguage}
              onTargetChange={setTargetLanguage}
              onSwapLanguages={handleSwapLanguages}
            />

            {/* Translation Form */}
            <TranslationForm
              sourceText={sourceText}
              onSourceTextChange={setSourceText}
              onTranslate={handleTranslate}
              isLoading={isLoading}
              sourceLanguage={sourceLanguage}
            />

            {/* Translation Result */}
            <TranslationResult
              result={result}
              isLoading={isLoading}
              error={error}
              onRetry={handleRetry}
              onAddToFavorites={handleAddToFavorites}
              targetLanguage={targetLanguage}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Model Info Card */}
            {modelLoading ? (
              <Card className="text-center py-6">
                <LoadingSpinner size="sm" text="Cargando info del modelo..." />
              </Card>
            ) : modelInfo ? (
              <Card variant="compact">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Estado del Modelo
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">{modelInfo.modelName || modelInfo.name || 'BERT'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Método:</span>
                      <span className="font-medium">
                        {modelInfo.hasRealModel ? 'Neural' : 'Diccionario'}
                      </span>
                    </div>
                    {modelInfo.vocabularySize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vocabulario:</span>
                        <span className="font-medium">
                          {modelInfo.vocabularySize?.toLocaleString()} tokens
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Versión:</span>
                      <span className="font-medium">
                        {modelInfo.version || '1.0.0'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}

            {/* Translation History */}
            <TranslationHistory
              onSelectTranslation={handleSelectFromHistory}
            />
          </div>
        </div>

        {/* Welcome Message for First Time Users */}
        {!sourceText && !result && (
          <Card className="mt-8 text-center py-12 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <div className="space-y-4">
              <div className="text-6xl mb-4">🏔️</div>
              <h2 className="text-2xl font-bold text-gray-900">
                ¡Sumay kachun! Bienvenido
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Este traductor utiliza inteligencia artificial con BERT para traducir entre 
                Quechua (Runa Simi) y Español. Ayudamos a preservar y promover la lengua 
                ancestral de los Andes.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>90+ traducciones</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>BERT Neural Network</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Código abierto</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

export default App;