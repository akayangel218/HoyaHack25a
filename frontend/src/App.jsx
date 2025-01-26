import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage'
import ApiClassifier from './pages/ApiPage/ApiClassifier'
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import Scanner from './pages/Scanner/Scanner'
import NavLayout from './layouts/NavLayout.jsx';
import ChengModel from './pages/ChengModel/ChengModel';

function App() {

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <SignInPage />,
    },
    {
      path: '/sign-up',
      element: <SignInPage />,
    },
    {
      path: '/',
      element: <NavLayout />,
      children: [
        { path: '/', element: <LandingPage /> ,
        },
        {
          path: '/classifier', element: <ApiClassifier />
        }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
