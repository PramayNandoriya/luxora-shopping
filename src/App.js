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
import AllProduct from './pages/AllProduct';
import Cart from './pages/Cart';
import Promotions from './pages/Promotions';
import Top5Products from './pages/Top5Products';
import ThreeModelsAd from './pages/ThreeModelsAd';
import ProductDetailPage from './pages/ProductDetailPage';

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
      <Promotions/>
      <Top5Products/>
      <ThreeModelsAd/>
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
      },
      {
        path: '/AllProduct',
        element: <AllProduct />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/contactUs',
        element: <Contact />
      },
      {
        path: '/promtions',
        element: <Promotions />
      },
      {
        path: '/product-details',
        element: <ProductDetailPage />
      },
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
