import { theme } from "@/assets/styles/theme";
import { useAuthStore } from "@/store/auth";
import { Redirect, Tabs } from "expo-router";
import { LayoutDashboardIcon } from "lucide-react-native";

export default function PainelLayout() {
  const logado = useAuthStore((state) => state.logado);

  if (!logado) {
    return <Redirect href={'/login'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border.light,
          borderBottomWidth: 1,
          ...theme.shadows.sm,
        },
        headerTitleStyle: {
          ...theme.typography.h3,
          color: theme.colors.text.primary,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <LayoutDashboardIcon size={size} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>

  );
}
