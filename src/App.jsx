import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import StudentRoute from "./components/core/auth/StudentRoute";
import AddCourse from "./components/core/Dashboard/AddCourse.jsx";
import InstructorRoute from "./components/core/auth/InstructorRoute.jsx";

// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const NavBar = lazy(() => import("./components/common/NavBar"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const OpenRoute = lazy(() => import("./components/core/auth/OpenRoute"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyProfile = lazy(() => import("./components/core/Dashboard/MyProfile"));
const PrivateRoute = lazy(() => import("./components/core/auth/PrivateRoute"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Settings = lazy(() =>
  import("./components/core/Dashboard/Settings/index")
);
const Sidebar = lazy(() => import("./components/core/Dashboard/Sidebar"));
const Error = lazy(() => import("./pages/Error"));
const EnrolledCourses = lazy(() =>
  import("./components/core/Dashboard/EnrolledCourses")
);
const Cart = lazy(() => import("./components/core/Dashboard/Cart/index"));

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Suspense fallback={<LoadingPage />}>
        <NavBar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
          <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />
            <Route
              path="dashboard/enrolled-courses"
              element={
                <StudentRoute>
                  <EnrolledCourses />
                </StudentRoute>
              }
            />
            <Route
              path="dashboard/cart"
              element={
                <StudentRoute>
                  <Cart />
                </StudentRoute>
              }
            />
            {/* todo */}

            {/* instructor routes */}
            <Route
              path="dashboard/add-course"
              element={
                <InstructorRoute>
                  <AddCourse />
                </InstructorRoute>
              }
            />

            
          </Route>
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
