import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  const dotOpacity1 = new Animated.Value(0.3);
  const dotOpacity2 = new Animated.Value(0.3);
  const dotOpacity3 = new Animated.Value(0.3);

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dotOpacity1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(dotOpacity1, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity2, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity3, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animateDots());
    };

    animateDots();

    const timer = setTimeout(() => {
      router.replace('/main');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#00b8a9', '#00a896', '#008e7f']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>BioScale</Text>
        <Text style={styles.subtitle}>Intelligent Bio Processing</Text>
        <View style={styles.dotsContainer}>
          <Animated.View
            style={[styles.dot, { opacity: dotOpacity1 }]}
          />
          <Animated.View
            style={[styles.dot, { opacity: dotOpacity2 }]}
          />
          <Animated.View
            style={[styles.dot, { opacity: dotOpacity3 }]}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.95,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});
