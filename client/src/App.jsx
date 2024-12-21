import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Layout from "./Layout.jsx";

// Import pages
import {
  Home,
  Login,
  Register,
  Pagenotfound,
  Post,
  EditPost,
  AllPosts,
  AddPost,
} from "./pages";

// Import components
import { AuthLayout } from "./components";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/register",
          element: (
            <AuthLayout authentication={false}>
              <Register />
            </AuthLayout>
          ),
        },
        {
          path: "/all-posts",
          element: (
            <AuthLayout authentication>
              {" "}
              <AllPosts />
            </AuthLayout>
          ),
        },
        {
          path: "/add-post",
          element: (
            <AuthLayout authentication>
              {" "}
              <AddPost />
            </AuthLayout>
          ),
        },
        {
          path: "/edit-post/:slug",
          element: (
            <AuthLayout authentication>
              {" "}
              <EditPost />
            </AuthLayout>
          ),
        },
        {
          path: "/post/:slug",
          element: <Post />,
        },

        { path: "*", element: <Pagenotfound /> },
      ],
    },
  ]);
  return (
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </HelmetProvider>
  );
}

export default App;
