import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const stages = [
  { id: 1, name: 'Cleaning' },
  { id: 2, name: 'Drying' },
  { id: 3, name: 'Grinding' },
  { id: 4, name: 'Mixing' },
  { id: 5, name: 'Heating' },
];

export default function ProcessingScreen() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    if (currentStage < stages.length) {
      const timer = setTimeout(() => {
        setCompletedStages((prev) => [...prev, currentStage]);
        setCurrentStage((prev) => prev + 1);

        Animated.timing(progressAnim, {
          toValue: ((currentStage + 1) / stages.length) * 100,
          duration: 800,
          useNativeDriver: false,
        }).start();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        router.replace('/complete');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  const progress = ((currentStage) / stages.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabel}>Overall Progress</Text>
          <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statusCircle}>
          <LinearGradient
            colors={['#00d4aa', '#00b896']}
            style={styles.statusCircleGradient}
          >
            {currentStage < stages.length ? (
              <View style={styles.pulseContainer}>
                <View style={styles.pulse} />
                <View style={styles.pulse} />
                <Text style={styles.statusNumber}>{currentStage + 1}</Text>
              </View>
            ) : (
              <Check size={64} color="#ffffff" strokeWidth={3} />
            )}
          </LinearGradient>
        </View>

        {currentStage < stages.length && (
          <View style={styles.currentStageContainer}>
            <Text style={styles.currentStageLabel}>Currently Processing</Text>
            <Text style={styles.currentStageName}>
              {stages[currentStage].name}
            </Text>
          </View>
        )}

        <View style={styles.stagesListContainer}>
          {stages.map((stage, index) => (
            <View key={stage.id} style={styles.stageItem}>
              <View
                style={[
                  styles.stageCheckbox,
                  completedStages.includes(index) && styles.stageCheckboxCompleted,
                  currentStage === index && styles.stageCheckboxActive,
                ]}
              >
                {completedStages.includes(index) && (
                  <Check size={16} color="#00a896" strokeWidth={3} />
                )}
              </View>
              <Text
                style={[
                  styles.stageName,
                  completedStages.includes(index) && styles.stageNameCompleted,
                  currentStage === index && styles.stageNameActive,
                ]}
              >
                {stage.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafb',
  },
  progressHeader: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00a896',
  },
  progressBarContainer: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00d4aa',
    borderRadius: 6,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  statusCircle: {
    marginBottom: 40,
    shadowColor: '#00a896',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  statusCircleGradient: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#00d4aa',
    opacity: 0.3,
  },
  statusNumber: {
    fontSize: 72,
    fontWeight: '700',
    color: '#ffffff',
  },
  currentStageContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  currentStageLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  currentStageName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  stagesListContainer: {
    width: '100%',
    paddingHorizontal: 48,
    gap: 20,
  },
  stageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stageCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageCheckboxCompleted: {
    borderColor: '#00a896',
    backgroundColor: '#d4f4f0',
  },
  stageCheckboxActive: {
    borderColor: '#00d4aa',
    borderWidth: 3,
  },
  stageName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#9ca3af',
  },
  stageNameCompleted: {
    color: '#1f2937',
    fontWeight: '600',
  },
  stageNameActive: {
    color: '#00a896',
    fontWeight: '700',
  },
});
