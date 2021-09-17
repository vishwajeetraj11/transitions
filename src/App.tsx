import React from 'react';
import { Text, View } from 'react-native';
import Detail from './screens/Detail';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import List from './screens/List';
import { DATA } from './shared/statics';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
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
              open: { animation: 'timing', config: { duration: 1000 } },
              close: { animation: 'timing', config: { duration: 1000 } },
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
