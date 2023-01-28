import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import route from './Routes/Routes';

function App() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <RouterProvider router= {route} > </RouterProvider>
      <Toaster/>

    </div>
  );
}

export default App;
