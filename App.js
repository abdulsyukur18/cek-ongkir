import React from 'react'
import 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import theme from './config/theme'
import HomeScreen from './screens/home'
import ResultScreen from './screens/result'


const Stack = createStackNavigator()

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Result' component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

