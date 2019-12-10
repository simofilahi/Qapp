import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../Screens/HomeScreen';
import SurveyScreen from '../Screens/SurveyScreen';
import SplashScreen from '../Screens/SplashScreen';
import QRCodeScreen from '../Screens/QRCodeScreen';

const RootStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    SurveyScreen: SurveyScreen,
    QRCodeScreen: QRCodeScreen,
  }
);

const RootNavigator = createSwitchNavigator(
  {
    RootStack: RootStack,
    SplashScreen: SplashScreen
  }, 
  {
    initialRouteName: 'SplashScreen',
  }
);

const AppNavigator = createAppContainer(RootNavigator);
export default AppNavigator;