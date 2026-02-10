import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Sparkles, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const stages = [
  { id: 1, name: 'Cleaning' },
  { id: 2, name: 'Drying' },
  { id: 3, name: 'Grinding' },
  { id: 4, name: 'Mixing' },
  { id: 5, name: 'Heating' },
];

export default function CompleteScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const sparkleRotate = useRef(new Animated.Value(0)).current;
  const bubbleAnim1 = useRef(new Animated.Value(0)).current;
  const bubbleAnim2 = useRef(new Animated.Value(0)).current;
  const bubbleAnim3 = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const itemAnimations = useRef(stages.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.stagger(80,
          itemAnimations.map(anim =>
            Animated.timing(anim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            })
          )
        ),
      ]),
    ]).start();

    Animated.loop(
      Animated.timing(sparkleRotate, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleAnim1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnim1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(bubbleAnim2, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnim2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(800),
        Animated.timing(bubbleAnim3, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnim3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleDone = () => {
    router.replace('/main');
  };

  const sparkleRotateInterpolate = sparkleRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const bubbleTranslate1 = bubbleAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150],
  });

  const bubbleTranslate2 = bubbleAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -160],
  });

  const bubbleTranslate3 = bubbleAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });

  const bubbleOpacity1 = bubbleAnim1.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 1, 0],
  });

  const bubbleOpacity2 = bubbleAnim2.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 1, 0],
  });

  const bubbleOpacity3 = bubbleAnim3.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <LinearGradient
      colors={['#e8f8f5', '#d4f4f0', '#c0f0e8']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabel}>Overall Progress</Text>
          <Text style={styles.progressPercentage}>100%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successCircleContainer}>
          <Animated.View
            style={[
              styles.successCircleWrapper,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.successCircle}>
              <LinearGradient
                colors={['#00d4aa', '#00b896']}
                style={styles.successCircleGradient}
              >
                <Check size={80} color="#ffffff" strokeWidth={4} />
              </LinearGradient>
            </View>

            <Animated.View
              style={[
                styles.sparkleIcon,
                {
                  transform: [{ rotate: sparkleRotateInterpolate }],
                },
              ]}
            >
              <Sparkles size={40} color="#fbbf24" fill="#fbbf24" strokeWidth={2} />
            </Animated.View>

            <Animated.View
              style={[
                styles.bubble,
                styles.bubble1,
                {
                  transform: [{ translateY: bubbleTranslate1 }],
                  opacity: bubbleOpacity1,
                },
              ]}
            >
              <View style={styles.bubbleContent}>
                <CheckCircle size={14} color="#00d4aa" fill="#00d4aa" strokeWidth={2} />
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.bubble,
                styles.bubble2,
                {
                  transform: [{ translateY: bubbleTranslate2 }],
                  opacity: bubbleOpacity2,
                },
              ]}
            >
              <View style={styles.bubbleContent}>
                <CheckCircle size={14} color="#00d4aa" fill="#00d4aa" strokeWidth={2} />
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.bubble,
                styles.bubble3,
                {
                  transform: [{ translateY: bubbleTranslate3 }],
                  opacity: bubbleOpacity3,
                },
              ]}
            >
              <View style={styles.bubbleContent}>
                <CheckCircle size={14} color="#00d4aa" fill="#00d4aa" strokeWidth={2} />
              </View>
            </Animated.View>
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.messageContainer,
            {
              opacity: titleOpacity,
            },
          ]}
        >
          <Text style={styles.title}>All Stages Complete!</Text>
          <Text style={styles.subtitle}>Process finished successfully</Text>
          <View style={styles.decorativeDotContainer}>
            <View style={styles.decorativeDot} />
          </View>
        </Animated.View>

        <View style={styles.stagesListContainer}>
          {stages.map((stage, index) => (
            <Animated.View
              key={stage.id}
              style={[
                styles.stageItem,
                {
                  opacity: itemAnimations[index],
                  transform: [
                    {
                      translateX: itemAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.stageCheckboxContainer}>
                <View style={styles.stageCheckbox}>
                  <Check size={16} color="#ffffff" strokeWidth={3} />
                </View>
              </View>
              <Text style={styles.stageName}>{stage.name}</Text>
            </Animated.View>
          ))}
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#00d4aa', '#00b896']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.doneButtonGradient}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    backgroundColor: '#ffffff',
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#00d4aa',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
  },
  successCircleContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  successCircleWrapper: {
    position: 'relative',
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    shadowColor: '#00a896',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 16,
  },
  successCircleGradient: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleIcon: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
  bubble: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble1: {
    left: -8,
  },
  bubble2: {
    right: -8,
  },
  bubble3: {
    bottom: -8,
    alignSelf: 'center',
  },
  bubbleContent: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#d4f4f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#00a896',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '500',
    textAlign: 'center',
  },
  decorativeDotContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  decorativeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fbbf24',
  },
  stagesListContainer: {
    width: '100%',
    gap: 14,
  },
  stageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  stageCheckboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageCheckbox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00d4aa',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00a896',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  stageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  spacer: {
    height: 80,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: '#e8f8f5',
    borderTopWidth: 1,
    borderTopColor: '#c0f0e8',
  },
  doneButton: {
    borderRadius: 16,
    shadowColor: '#00a896',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  doneButtonGradient: {
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});
