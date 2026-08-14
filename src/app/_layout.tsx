import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { 
  PlusJakartaSans_400Regular, 
  PlusJakartaSans_500Medium, 
  PlusJakartaSans_600SemiBold, 
  PlusJakartaSans_700Bold, 
  PlusJakartaSans_800ExtraBold 
} from '@expo-google-fonts/plus-jakarta-sans';
import { AuthProvider } from '../context/AuthContext';
import { AppStateProvider } from '../context/AppStateContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <AppStateProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="login/doctor" />
          <Stack.Screen name="login/staff" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="staff/index" />
          <Stack.Screen name="staff/patients" />
          <Stack.Screen name="staff/new-patient" />
          <Stack.Screen name="staff/appointments" />
          <Stack.Screen name="staff/risk-assessments" />
          <Stack.Screen name="staff/alerts" />
          <Stack.Screen name="staff/reports" />
        </Stack>
      </AppStateProvider>
    </AuthProvider>
  );
}
