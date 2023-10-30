import Category from "../screens/Category"
import HotPost from "../screens/HotPost"
import NewPost from "../screens/NewPost"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Terbaru" component={NewPost} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Hot" component={HotPost} />
    </Tab.Navigator>
  )
}
