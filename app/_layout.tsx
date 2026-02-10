 import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameWorkReady } from '@/hooks/use.frame.work';

export default function RootLayout() {
  useFrameWorkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="main" />
        <Stack.Screen name="devices" options={{ presentation: 'modal' }} />
        <Stack.Screen name="processing" />
        <Stack.Screen name="complete" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
