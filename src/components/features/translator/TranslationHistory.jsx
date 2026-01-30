import { useState } from 'react';
import { History, Search, Trash2, Heart, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useTranslationStore } from '@/stores/translationStore';
import { LANGUAGES } from '@/utils/constants';

const TranslationHistory = ({ onSelectTranslation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    history, 
    favorites, 
    removeFromHistory, 
    clearHistory, 
    searchHistory 
  } = useTranslationStore();

  const [activeTab, setActiveTab] = useState('history');

  const filteredHistory = searchQuery 
    ? searchHistory(searchQuery) 
    : history;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleItemClick = (item) => {
    onSelectTranslation(item);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <History className="h-5 w-5" />
            Historial
          </h3>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="h-4 w-4 inline mr-2" />
            Recientes
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'favorites'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            Favoritos
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar traducciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-2">
        {activeTab === 'history' && (
          <>
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No hay traducciones en el historial</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="primary" size="sm">
                          {LANGUAGES[item.sourceLanguage]?.flag} → {LANGUAGES[item.targetLanguage]?.flag}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.originalText}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {item.translatedText}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'favorites' && (
          <>
            {favorites.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No hay traducciones favoritas</p>
              </div>
            ) : (
              favorites.map((item) => (
                <div
                  key={item.favoriteId}
                  onClick={() => handleItemClick(item)}
                  className="p-3 bg-red-50 rounded-lg hover:bg-red-100 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="primary" size="sm">
                          {LANGUAGES[item.sourceLanguage]?.flag} → {LANGUAGES[item.targetLanguage]?.flag}
                        </Badge>
                        <Heart className="h-3 w-3 text-red-500 fill-current" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.originalText}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {item.translatedText}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default TranslationHistory;