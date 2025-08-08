import { ErrorBoundary } from "@/components/ErrorBoundary";
import ToastContainer from "@/components/ToastContainer";
import { mySync } from "@/db/sync";
import { useAxios } from "@/hooks/useAxios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { Try } from "expo-router/build/views/Try";
import * as ScreenOrientation from "expo-screen-orientation";
import { AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retryOnMount: false,
    },
  },
});

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

AppState.addEventListener('change', (state) => {
  if (state === 'active' || state === 'background') {
    mySync();
  }
})



export default function RootLayout() {
  useAxios();


  return (
    <Try catch={ErrorBoundary}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
          <Slot />
          <ToastContainer />
        </SafeAreaView>
      </QueryClientProvider>
    </Try>
  );
}
