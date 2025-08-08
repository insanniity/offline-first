import { useAuthStore } from "@/store/auth";
import { Redirect } from "expo-router";

export default function IndexScreen() {
  const logado = useAuthStore((state) => state.logado);

  if (logado) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
