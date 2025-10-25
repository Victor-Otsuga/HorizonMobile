// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../../../theme/colors'
import { JSX } from 'react'
import { useViewMode } from '../../../../context/ViewModeContext'

type TabIconProps = {
  color: string
  focused: boolean

}

type CustomTabBarButtonProps = {
  onPress?: (e?: any) => void;
  accessibilityState?: { selected?: boolean };
  children?: React.ReactNode;
  [key: string]: any;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets()

  const renderIcon = (name: keyof typeof FontAwesome.glyphMap) =>
    ({ color, focused }: TabIconProps) => (
      <FontAwesome name={name} size={24} color={focused ? colors.primary : color} />
    )


  const { mode } = useViewMode();


  const CustomTabBarButton = ({ onPress, children }: CustomTabBarButtonProps) => (
    <TouchableOpacity style={styles.plusButton} onPress={onPress}>
      {mode === 'mechanic' ? (
        // QR code icon for mechanic mode
        <FontAwesome name="qrcode" size={28} color={colors.background} />
      ) : (
        // Car icon for normal mode
        <FontAwesome name="car" size={28} color={colors.background} />
      )}
    </TouchableOpacity>
  )

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70 + insets.bottom,
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: '#fff',
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen name="dashboard/index" options={{ tabBarIcon: renderIcon('home') }} c />
      <Tabs.Screen name="store/index" options={{ tabBarIcon: renderIcon('shopping-cart') }} />
      <Tabs.Screen name="plus/index" options={{ tabBarButton: (props) => <CustomTabBarButton {...props} /> }} />
      <Tabs.Screen name="chat/index" options={{ tabBarIcon: renderIcon('comment') }} />
      <Tabs.Screen name="settings/index" options={{ tabBarIcon: renderIcon('cog') }} />

      {/* rotas que nao devem aparecer na navbar */}
      <Tabs.Screen name="dashboard/styles" options={{ href: null }} />
      <Tabs.Screen name="settings/styles" options={{ href: null }} />
      <Tabs.Screen name="chat/styles" options={{ href: null }} />
      <Tabs.Screen name="plus/styles" options={{ href: null }} />
      <Tabs.Screen name="store/styles" options={{ href: null }} />
      <Tabs.Screen name="settings/profile" options={{ href: null }} />
      <Tabs.Screen name="store/profile" options={{ href: null }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  plusButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 30,
    alignSelf: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 10,
  },
  plusText: {
    color: colors.background,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -2,
  },
})
