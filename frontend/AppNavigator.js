import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Test from './Test';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Test: { screen: Test },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;