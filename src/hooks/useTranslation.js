import { useState, useCallback } from 'react';
import { TranslationService } from '@/services/translationService';

export const useTranslation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const translate = useCallback(async (text, sourceLanguage, targetLanguage) => {
    if (!text?.trim()) {
      setError('El texto no puede estar vacío');
      return null;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await TranslationService.translate(text, sourceLanguage, targetLanguage);
      
      if (response.success) {
        setResult(response.data);
        return response.data;
      } else {
        setError(response.error);
        return null;
      }
    } catch (err) {
      const errorMessage = err.message || 'Error inesperado en la traducción';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const batchTranslate = useCallback(async (texts, sourceLanguage, targetLanguage) => {
    if (!texts?.length) {
      setError('No hay textos para traducir');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await TranslationService.batchTranslate(texts, sourceLanguage, targetLanguage);
      
      if (response.success) {
        setResult(response.data);
        return response.data;
      } else {
        setError(response.error);
        return null;
      }
    } catch (err) {
      const errorMessage = err.message || 'Error en la traducción por lotes';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    translate,
    batchTranslate,
    isLoading,
    error,
    result,
    clearError,
    clearResult,
  };
};