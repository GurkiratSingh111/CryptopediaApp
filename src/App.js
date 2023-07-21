import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
import Home from './Pages/Home';
import Crypto from './Pages/Crypto';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: ":crypto", element: <Crypto /> }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
