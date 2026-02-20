import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bluetooth } from 'lucide-react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

/*
  Define Device Type
*/
interface DeviceItem {
  id: number;
  name: string;
  address: string;
  signal: number;
}

type DeviceType = 'basic' | 'bmi' | 'fat' | 'pro' | 'mini';

export default function DevicesScreen() {
  const router = useRouter();

  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [connectingId, setConnectingId] = useState<number | null>(null);

  /*
    Device Profiles Mapping
  */
  const deviceProfiles: Record<string, DeviceType> = {
    'BioScale Device 1': 'basic',
    'BioScale Device 2': 'bmi',
    'BioScale Device 3': 'fat',
    'BioScale Pro': 'pro',
    'BioScale Mini': 'mini',
  };

  /*
    Command Mapping
  */
  const deviceCommands: Record<DeviceType, string> = {
    basic: 'GET_WEIGHT\n',
    bmi: 'GET_BMI\n',
    fat: 'GET_BODY_FAT\n',
    pro: 'GET_FULL_REPORT\n',
    mini: 'GET_MINI_DATA\n',
  };

  useEffect(() => {
    scanDevices();
  }, []);

  const scanDevices = async (): Promise<void> => {
    try {
      const bondedDevices = await RNBluetoothClassic.getBondedDevices();

      const formattedDevices: DeviceItem[] = bondedDevices.map(
        (device: any, index: number) => ({
          id: index,
          name: device.name ?? 'Unknown Device',
          address: device.address,
          signal: Math.floor(Math.random() * 40) + 60,
        })
      );

      setDevices(formattedDevices);
    } catch (error) {
      console.log('Scan Error:', error);
      Alert.alert('Error', 'Failed to scan Bluetooth devices');
    }
  };

  const handleDeviceSelect = async (device: DeviceItem): Promise<void> => {
    try {
      setConnectingId(device.id);

      const connected = await RNBluetoothClassic.connectToDevice(
        device.address
      );

      if (!connected) {
        throw new Error('Connection failed');
      }

      const type = deviceProfiles[device.name];

      if (!type) {
        Alert.alert('Unknown Device', 'No profile found for this device');
        return;
      }

      const command = deviceCommands[type];

      await RNBluetoothClassic.writeToDevice(device.address, command);

      const response = await RNBluetoothClassic.readFromDevice(
        device.address
      );

      Alert.alert(
        'Success',
        `Connected to ${device.name}\n\nResponse:\n${response}`
      );

      router.back();
    } catch (error: any) {
      console.log('Connection Error:', error);
      Alert.alert('Connection Error', error?.message ?? 'Unknown error');
    } finally {
      setConnectingId(null);
    }
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
            onPress={() => handleDeviceSelect(device)}
            activeOpacity={0.7}
          >
            <View style={styles.deviceIcon}>
              <Bluetooth size={20} color="#1f2937" strokeWidth={2.5} />
            </View>

            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceSignal}>
                {connectingId === device.id
                  ? 'Connecting...'
                  : `Signal: ${device.signal}%`}
              </Text>
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