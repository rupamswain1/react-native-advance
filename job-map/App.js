import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './src/screens/AuthScreen';
import Welcome from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingScreen from './src/screens/SettingScreen';

import { Provider } from 'react-redux';
import store from './src/redux/store';
const Tab = createBottomTabNavigator();
// const MainTab=createBottomTabNavigator();
const Stack = createStackNavigator();

const ReviewComponent=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Review"
       component={ReviewScreen} 
      //  options={{title:"Review Jobs",
      //  headerTitleAlign:'center',
      //  headerRight:()=>{
      //   return <Text>Go Back</Text>
      //  }
      // }}
      />
      <Stack.Screen name="Setting" component={SettingScreen} />
   </Stack.Navigator>
  )
}

const MainTabConponent=()=>{
  return(
    <Tab.Navigator>
    <Tab.Screen name="map" component={MapScreen}/>
    <Tab.Screen name="deck" component={DeckScreen}/>
    <Tab.Screen name="review" component={ReviewComponent}
      options={{headerShown:false}}
    />
  </Tab.Navigator>
  )
}
export default function App() {
  
  return (
    <Provider store={store}>
          <View style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="welcome" component={Welcome} 
          options={{headerShown:false}}
        />
        <Tab.Screen name="auth" component={AuthScreen} />
        <Tab.Screen name="main" component={MainTabConponent}
          options={{headerShown:false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
