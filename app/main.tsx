import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Bluetooth } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const stages = [
  { id: 1, name: 'Cleaning' },
  { id: 2, name: 'Drying' },
  { id: 3, name: 'Grinding' },
  { id: 4, name: 'Mixing' },
  { id: 5, name: 'Heating' },
];

export default function MainScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>BioScale</Text>
          <Text style={styles.subtitle}>5-Stage Bio Processing System</Text>
        </View>
        <TouchableOpacity
          style={styles.bluetoothButton}
          onPress={() => router.push('/devices')}
        >
          <Bluetooth size={24} color="#ffffff" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.circleContainer}>
          <View style={styles.circleOuter}>
            <View style={styles.circleInner}>
              <Text style={styles.circleNumber}>5</Text>
              <Text style={styles.circleLabel}>Stages</Text>
            </View>
          </View>
        </View>

        <View style={styles.stagesContainer}>
          {stages.map((stage) => (
            <View key={stage.id} style={styles.stageCard}>
              <View style={styles.stageBadge}>
                <Text style={styles.stageBadgeText}>{stage.id}</Text>
              </View>
              <Text style={styles.stageName}>{stage.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/processing')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#00d4aa', '#00b896']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButtonGradient}
          >
            <View style={styles.playIcon} />
            <Text style={styles.startButtonText}>Start Process</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00a896',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  bluetoothButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  circleOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00a896',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  circleInner: {
    width: 156,
    height: 156,
    borderRadius: 78,
    borderWidth: 8,
    borderColor: '#00d4aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleNumber: {
    fontSize: 64,
    fontWeight: '700',
    color: '#00a896',
    lineHeight: 64,
  },
  circleLabel: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  stagesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  stageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  stageBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d4f4f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageBadgeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00a896',
  },
  stageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: '#f8fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  startButton: {
    borderRadius: 16,
    shadowColor: '#00a896',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 16,
    gap: 12,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: '#ffffff',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 4,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});
