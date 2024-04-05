import { Outlet, createBrowserRouter } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Payment from "./pages/payment/Payment";
import AdminLogin from "./pages/Admin/Login/AdminLogin";

function Layout() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

// function WithoutLayout() {
//   return (
//     <>
//       <Outlet />
//       {/* <Footer /> */}
//     </>
//   );
// }

const router = createBrowserRouter([
  {
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/login",
        element:<Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      }
      ,{
        path: "/payment",
        element: <Payment/>,
      },
      {
        path: "/admin/login",
        element: <AdminLogin/>,
      }
    ],
  },
  // {
  //   element: <WithoutLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: < />,
  //     },
  //   ],
  // },
]);

export default router;
