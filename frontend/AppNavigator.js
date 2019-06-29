import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Update from './Update';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Update: { screen: Update },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;