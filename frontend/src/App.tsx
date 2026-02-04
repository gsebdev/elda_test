
import './App.css';
import { Outlet } from 'react-router';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <main className='py-8 px-4 md:p-8'>
        <Outlet />
      </main>
    </>
  );
}

export default App;
