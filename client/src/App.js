import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const router = createBrowserRouter([
    { path: '/', element: <Join />},
    { path: '/Chat', element: <Chat />},
])

function App() {
    return <RouterProvider router= {router} />;
  }
  
export default App;