import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Update from './Update';

const HomeNavigator = createStackNavigator({
  Home: { screen: Home },
  Update: { screen: Update }
});

const DrawerNavigator = createDrawerNavigator({
  Pages: {
    screen: HomeNavigator,
  }
});

const AppContainer = createAppContainer(DrawerNavigator);

export default AppContainer;