import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChalkBoxDashboard from "./components/dashboard/ChalkBoxDashboard";
import Dashboard from "./components/dashboard/Dashboard";
import MyWorkshop from "./components/dashboard/workshop/MyWorkshop";
import JoinWorkshops from "./components/dashboard/workshop/JoinWorkshops";
import LoginForm from "./components/form/LoginForm";
import StudentProfile from "./components/dashboard/profile/StudentProfile";
import OpenSourceProjectsFeed from "./components/dashboard/forum/OpenSourceProjectsFeed";
import FreelanceProjectFeed from "./components/dashboard/freelance/FreelanceProjectFeed";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginForm />,
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
        {
          path: "/dashboard/profile",
          element: <StudentProfile />,
        },
        {
          path: "/dashboard/collaborate",
          element: <OpenSourceProjectsFeed />,
        },
        {
          path: "/dashboard/freelance-feed",
          element: <FreelanceProjectFeed />,
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
