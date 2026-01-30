import { Globe, Github, Settings, Info } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const Header = ({ onOpenSettings, modelInfo }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                Traductor Quechua
              </h1>
              <p className="text-sm text-gray-600">Runa Simi ↔ Español</p>
            </div>
          </div>

          {/* Model Status */}
          <div className="hidden md:flex items-center space-x-3">
            {modelInfo && (
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={modelInfo.hasRealModel ? "success" : "warning"}
                  size="sm"
                >
                  {modelInfo.hasRealModel ? "BERT Real" : "Simulación"}
                </Badge>
                <span className="text-xs text-gray-500">
                  {modelInfo.supportedLanguages?.length || 2} idiomas
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://github.com/tu-usuario/quechua-translator', '_blank')}
              title="Ver en GitHub"
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;