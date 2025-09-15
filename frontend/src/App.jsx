import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import HomeScreen from './screens/HomeScreen.jsx';
import ProductsScreen from './screens/ProductsScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Error from './components/Error.jsx';
import {Provider} from "react-redux";
import { useEffect,useState } from 'react';
import technestStore from '../utils/technestStore.js';
import apiRequest from '../utils/apiRequest.js';
import { useDispatch } from 'react-redux';
import { setUser } from "../utils/slices/userSlice";
import ProductItem from './screens/ProductItem.jsx';
import PasswordReset from './components/PasswordReset.jsx';
import Checkout from './screens/Checkout.jsx';
import UserProfileScreen from './screens/UserProfileScreen.jsx';
import OrdersScreen from "./screens/OrdersScreen.jsx"


const AppLayout = ()=>{
  const [error, setError] = useState(null);
  const dispatch = useDispatch();  

// Get user details for every refresh
  useEffect(()=>{
    updateMe();
  },[]);

  
  const updateMe = async()=>{
    try{
      const res = await apiRequest({
        url: "/api/users/me",
        method: "GET",
      });
      const { _id, email: userEmail, name, role } = res.data.data; 
      dispatch(setUser({ _id, email: userEmail, name, role }));
    }
    catch(err){
      setError(err);
    }   
  }

  return (
  <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="bg-[url('/images/background.jpg')] bg-cover flex-1 flex justify-center">
        {
          <Outlet/>
        }
      </main>
      <Footer/>
  </div>
);
}


const appRouter = createBrowserRouter([{
  path:"/",
  element:<AppLayout/>,
  children: 
        [{
            path: "/",
            element: <HomeScreen />,
        },
        {
          path:"/products",
          element:<ProductsScreen/>
        },
        {
          path:"/product/:id",
          element:<ProductItem/>
        },
        {
          path:"/product/:id",
          element:<ProductItem/>
        },
        {
          path:"/resetPassword/:token",
          element:<PasswordReset/>
        },
        {
          path:"/cart",
          element:<CartScreen/>
        },
        {
          path:"/checkout",
          element:<Checkout/>
        },
        {
          path:"/userProfile",
          element: <UserProfileScreen/>
        },
        {
          path:"/orders",
          element:<OrdersScreen/>
        }
      ],
  errorElement: <Error />
}]) 

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
        <Provider store={technestStore}>
          <RouterProvider router={appRouter}/>
        </Provider>
  </StrictMode>
)
