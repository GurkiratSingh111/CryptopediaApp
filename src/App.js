import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "coins/:id", element: <CoinPage /> }
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
