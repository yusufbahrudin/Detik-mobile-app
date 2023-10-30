import { createStackNavigator } from "@react-navigation/stack"
import Detail from "../screens/Detail"
import Dashboard from "../screens/Dashboard"

const Stack = createStackNavigator()

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}
