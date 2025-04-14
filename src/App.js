import React from 'react';
import "../src/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Features from './pages/Features';
import ProductList from './pages/ProductList';
import Brand from './pages/Brand';
import ProductCate from './pages/ProductCate';
import Contact from './pages/ContactUs';
import ProductPage from './pages/ProductPage';
import UserNew from './pages/UserNew';
import Navbar from './pages/Navbar';
import Register from './pages/Register';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const Home = () => {
  const [openProductPage, setOpenProductPage] = React.useState(null);

  return (
    <>
      <HomePage />
      <Brand />
      <Features />
      <ProductList onProductClick={setOpenProductPage} />
      {openProductPage && (
        <ProductPage
          product={openProductPage}
          onClose={() => setOpenProductPage(null)}
        />
      )}
      <ProductCate />
      <Contact />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <UserNew />
      },
      {
        path: '/createAnAccount',
        element: <Register />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
