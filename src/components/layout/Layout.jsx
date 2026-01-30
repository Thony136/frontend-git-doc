import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, onOpenSettings, modelInfo }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onOpenSettings={onOpenSettings} modelInfo={modelInfo} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;