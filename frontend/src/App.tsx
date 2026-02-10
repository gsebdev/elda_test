import { Outlet } from 'react-router';
import Header from './components/header';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
  return (
    <>
      <Header />
      <TooltipProvider>
        <main className="py-8 px-4 md:p-8">
          <Outlet />
        </main>
      </TooltipProvider>
    </>
  );
}

export default App;
