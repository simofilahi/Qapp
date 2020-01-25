import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/home/Home';
import SurveyScreen from '../screens/survey/Survey';
import SplashScreen from '../screens/slider_and_splach/SplashScreen';
import QRCodeScreen from '../screens/qrcode/QRCode';
import AboutUs from '../screens/aboutUs/AboutUs';
import MapScreen from '../screens/map/Map';
import Sliders from '../screens/slider_and_splach/Sliders';
import MyFooter from '../screens/footer/Footer'
import SurveyItemScreen from '../screens/survey/SurveyItem'
import QrCodeReaderMethodes from '../screens/qrcode/QrCodeReaderMethodes'

const RootStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    SurveyScreen: SurveyScreen,
    QRCodeScreen: QRCodeScreen,
    SurveyItemScreen: SurveyItemScreen,
    AboutUs: AboutUs,
    MapScreen: MapScreen,
    Sliders: Sliders,
    MyFooter: MyFooter,
    QrCodeReaderMethodes: QrCodeReaderMethodes,
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