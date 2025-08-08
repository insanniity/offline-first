import { useAuthStore } from "@/store/auth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const logado = useAuthStore((state) => state.logado);

  if (logado) {
    return <Redirect href={'/home'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
