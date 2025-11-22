import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import ConsumerDashboard from './pages/ConsumerDashboard';
// import Login from './pages/Login';ages/ConsumerDashboard';
// import Register from './pages/Register';
// import ProductList from './pages/ProductList';
// import SubscriptionBox from './pages/SubscriptionBox';
// import OrderTracking from './pages/OrderTracking';

const Routes = () => {
    return (
        <Router>
            <Switch>
                {/* <Route path="/admin" component={AdminDashboard} />
                <Route path="/farmer" component={FarmerDashboard} />
                <Route path="/consumer" component={ConsumerDashboard} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" component={Register} />
                <Route path="/products" component={ProductList} />
                <Route path="/subscriptions" component={SubscriptionBox} />
                <Route path="/orders" component={OrderTracking} /> */}
                {/* <Route path="/" exact component={Login} /> */}
            </Switch>
        </Router>
    );
};

export default Routes;