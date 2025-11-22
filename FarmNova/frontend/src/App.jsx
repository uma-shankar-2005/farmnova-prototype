import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FarmerLogin from './pages/FarmerLogin';
import CustomerLogin from './pages/CustomerLogin';
import CustomerSignup from './pages/CustomerSignup';
import Dashboard, { CustomerDashboard } from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import FarmerDashboard from './pages/FarmerDashboard';
import Cart from './pages/Cart';
import ProductListingPage from './pages/ProductListingPage';
import FarmerUploadPanel from './pages/FarmerUploadPanel';
import AdminApprovalDashboard from './pages/AdminApprovalDashboard';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Marketplace from './pages/Marketplace';
import About from './pages/About';

function PrivateRoute({ children, ...rest }) {
  const isAuth = !!localStorage.getItem("authToken");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
}

function RoleRoute({ children, role, ...rest }) {
  const token = localStorage.getItem("authToken");
  let userRole = null;
  if (token) {
    try {
      userRole = JSON.parse(atob(token.split('.')[1])).role;
    } catch {}
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token && (!role || userRole === role)
          ? children
          : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/farmer-login" component={FarmerLogin} />
            <Route path="/customer-login" component={CustomerLogin} />
            <Route path="/customer-signup" component={CustomerSignup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/admin" component={AdminPanel} />
            {/* Only allow access if user is logged in and has the correct role */}
            <RoleRoute path="/admin-approval" role="admin">
              <AdminApprovalDashboard />
            </RoleRoute>
            <RoleRoute path="/farmer-upload" role="farmer">
              <FarmerUploadPanel />
            </RoleRoute>
            <RoleRoute path="/farmer-dashboard" role="farmer">
              <FarmerDashboard />
            </RoleRoute>
            <RoleRoute path="/customer-dashboard" role="customer">
              <CustomerDashboard />
            </RoleRoute>
            <Route path="/checkout" component={Checkout} />
            <PrivateRoute path="/order-confirmation">
              <OrderConfirmation />
            </PrivateRoute>
            <Route path="/cart" component={Cart} />
            <Route path="/products/:id" component={ProductDetailsPage} />
            <Route path="/products" component={ProductListingPage} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/about" component={About} />
            {/* ...add other routes as needed... */}
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;