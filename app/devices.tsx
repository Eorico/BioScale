import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Bluetooth } from 'lucide-react-native';

const devices = [
  { id: 1, name: 'BioScale Device 1', signal: 95 },
  { id: 2, name: 'BioScale Device 2', signal: 87 },
  { id: 3, name: 'BioScale Device 3', signal: 72 },
  { id: 4, name: 'BioScale Pro', signal: 90 },
  { id: 5, name: 'BioScale Mini', signal: 65 },
];

export default function DevicesScreen() {
  const router = useRouter();

  const handleDeviceSelect = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.bluetoothIconContainer}>
          <Bluetooth size={32} color="#ffffff" strokeWidth={2.5} />
        </View>
        <Text style={styles.title}>Available Devices</Text>
        <Text style={styles.subtitle}>Select a device to connect</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {devices.map((device) => (
          <TouchableOpacity
            key={device.id}
            style={styles.deviceCard}
            onPress={handleDeviceSelect}
            activeOpacity={0.7}
          >
            <View style={styles.deviceIcon}>
              <Bluetooth size={20} color="#1f2937" strokeWidth={2.5} />
            </View>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceSignal}>Signal: {device.signal}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  bluetoothIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 16,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  deviceSignal: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
});
