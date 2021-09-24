import React from 'react';
import { Easing } from 'react-native';
import Detail from './screens/Detail';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import List from './screens/List';
import { DATA } from './shared/statics';
import { TravelList } from './screens/TravelList';
import TravelListDetail from './screens/TravelListDetail';

enableScreens();
const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TravelList" headerMode="none">
        {/* Animation 1 */}
        <Stack.Screen name="List" component={List} />
        <Stack.Screen
          name="Detail"
          component={Detail}
          sharedElementsConfig={(route, otherRoute, showing) => {
            return DATA.map(item => `item.${item.id}.icon`);
          }}
          options={() => ({
            gestureEnabled: false,
            // for the open or the close of the navigation what type of animation should occur
            transitionSpec: {
              open: {
                animation: 'timing',
                config: { duration: 500, easing: Easing.inOut(Easing.ease) },
              },
              close: {
                animation: 'timing',
                config: { duration: 500, easing: Easing.inOut(Easing.ease) },
              },
            },
            // currently it's transition => opacity based on navigation percentage
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
        />
        {/* Animation 1 */}
        <Stack.Screen name="TravelList" component={TravelList} />
        <Stack.Screen
          name="TravelListDetail"
          component={TravelListDetail}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const { item } = route.params;
            // console.log(route);
            return [
              {
                id: `item.${item.id}.photo`,
              },
              {
                id: `item.${item.id}.location`,
              },
            ];
          }}
          options={() => ({
            gestureEnabled: false,
            // for the open or the close of the navigation what type of animation should occur
            transitionSpec: {
              open: {
                animation: 'timing',
                config: { duration: 500, easing: Easing.inOut(Easing.ease) },
              },
              close: {
                animation: 'timing',
                config: { duration: 500, easing: Easing.inOut(Easing.ease) },
              },
            },
            // currently it's transition => opacity based on navigation percentage
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
