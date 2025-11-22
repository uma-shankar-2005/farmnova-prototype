import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import ConsumerDashboard from './screens/ConsumerDashboard';
import FarmerDashboard from './screens/FarmerDashboard';
import OrderTracking from './screens/OrderTracking';
import SubscriptionBox from './screens/SubscriptionBox';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ConsumerDashboard" component={ConsumerDashboard} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen name="OrderTracking" component={OrderTracking} />
        <Stack.Screen name="SubscriptionBox" component={SubscriptionBox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;