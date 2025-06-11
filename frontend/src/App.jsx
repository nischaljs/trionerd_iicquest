import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChalkBoxDashboard from "./components/dashboard/ChalkBoxDashboard";
import Dashboard from "./components/dashboard/Dashboard";
import MyWorkshop from "./components/dashboard/workshop/MyWorkshop";
import JoinWorkshops from "./components/dashboard/workshop/JoinWorkshops";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      element: <ChalkBoxDashboard />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/my-workshops",
          element: <MyWorkshop />,
        },
        {
          path: "/dashboard/join-workshops",
          element: <JoinWorkshops />,
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
