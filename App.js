import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import ManageIncomeScreen from './screens/ManageIncomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import FindStoreScreen from './screens/FindStoreScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />
        <Drawer.Screen name="Manage expenses" component={ManageExpenseScreen} />
        <Drawer.Screen name="Manage incomes" component={ManageIncomeScreen} />
        <Drawer.Screen name="Find store" component={FindStoreScreen} />
        <Drawer.Screen name="Shopping list" component={ShoppingListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
