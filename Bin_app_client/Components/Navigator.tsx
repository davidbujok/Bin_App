import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react-native'
import RemindersScreen from './RemindersScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Reminders" component={Reminders} />
      <Drawer.Screen name="Our Website" component={WebInfoPage} />
      <Drawer.Screen name="Privacy Policy" component={Article} />
    </Drawer.Navigator>
  );
}