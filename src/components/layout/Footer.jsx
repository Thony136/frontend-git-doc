import { Heart, Code, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left side */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span>Hecho</span>

              <span>para preservar el Quechua</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span>React + BERT</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>Neural Translation</span>
            </div>
            <span className="text-xs">© 2025 Traductor Quechua</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;