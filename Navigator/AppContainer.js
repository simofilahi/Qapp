import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../Screens/HomeScreen';
import SurveyScreen from '../Screens/SurveyScreen';
import SplashScreen from '../Screens/SplashScreen';

const RootStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    SurveyScreen: SurveyScreen,
  }
);

const RootNavigator = createSwitchNavigator(
  {
    RootStack: RootStack,
    SplashScreen: SplashScreen
  }, 
  {
    initialRouteName: 'SplashScreen'
  }
);

const AppContainer = createAppContainer(RootNavigator);
export default AppContainer;