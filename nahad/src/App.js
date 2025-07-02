import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";
import WaiterDashboard from "./pages/WaiterDashboard";
import KitchenManager from "./pages/KitchenManager";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  const { user } = useAuthContext();
  const restaurantId = user?.RID; // ✅ safer with optional chaining

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                !user ? <Login /> : <Navigate to={`/${restaurantId}`} replace />
              }
            />
            <Route
              path="/signup"
              element={
                !user ? (
                  <Signup />
                ) : (
                  <Navigate to={`/${restaurantId}`} replace />
                )
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes with role-based access */}
            <Route
              path="/:restaurantId"
              element={
                <ProtectedRoute allowedRoles={["admin", "waiter", "km"]}>
                  {user?.role === "admin" && <Admin />}
                  {user?.role === "waiter" && <WaiterDashboard />}
                  {user?.role === "km" && <KitchenManager />}
                </ProtectedRoute>
              }
            />

            <Route
              path="/:restaurantId/add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Add />
                </ProtectedRoute>
              }
            />

            {/* 404 fallback */}
            <Route
              path="*"
              element={
                user ? (
                  <Navigate to={`/${restaurantId}`} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
