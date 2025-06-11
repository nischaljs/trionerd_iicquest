import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChalkBoxDashboard from "./components/dashboard/ChalkBoxDashboard";
import Dashboard from "./components/dashboard/Dashboard";
import LoginForm from "./components/form/LoginForm";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
   {
    path:"/login",
    element:<LoginForm />
   },
    {
      path: "/dashboard",
      element: <ChalkBoxDashboard />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
