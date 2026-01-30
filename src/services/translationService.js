import api from './api';

export class TranslationService {
  /**
   * Translate text
   */
  static async translate(text, sourceLanguage = 'qu', targetLanguage = 'es') {
    try {
      const response = await api.post('/translate', {
        text: text.trim(),
        sourceLanguage,
        targetLanguage,
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        throw new Error(response.data.message || 'Translation failed');
      }
    } catch (error) {
      return {
        success: false,
        error: error.userMessage || error.message,
        details: error.response?.data,
      };
    }
  }

  /**
   * Batch translate multiple texts
   */
  static async batchTranslate(texts, sourceLanguage = 'qu', targetLanguage = 'es') {
    try {
      const response = await api.post('/translate/batch', {
        texts: texts.map(text => text.trim()),
        sourceLanguage,
        targetLanguage,
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        throw new Error(response.data.message || 'Batch translation failed');
      }
    } catch (error) {
      return {
        success: false,
        error: error.userMessage || error.message,
        details: error.response?.data,
      };
    }
  }

  /**
   * Get supported languages
   */
  static async getSupportedLanguages() {
    try {
      const response = await api.get('/languages');
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        throw new Error('Failed to get languages');
      }
    } catch (error) {
      return {
        success: false,
        error: error.userMessage || error.message,
      };
    }
  }

  /**
   * Get model information
   */
  static async getModelInfo() {
    try {
      const response = await api.get('/model-info');
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        throw new Error('Failed to get model info');
      }
    } catch (error) {
      return {
        success: false,
        error: error.userMessage || error.message,
      };
    }
  }

  /**
   * Health check
   */
  static async healthCheck() {
    try {
      const response = await api.get('/health');
      
      return {
        success: response.data.success,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.userMessage || error.message,
      };
    }
  }
}