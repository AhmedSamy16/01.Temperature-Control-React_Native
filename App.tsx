import { useRef, useState } from 'react';
import { 
  Animated, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

const COLD = "#035aa6"
const HOT = "#ff5200"

export default function App() {
  const [tempValue, setTempValue] = useState(10)
  const colorAnimation = useRef(new Animated.Value(0)).current
  const interpolateColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLD, HOT]
  })

  const increase = () => {
    if (tempValue === 30) return
    const newTemp = tempValue + 1
    if (newTemp >= 15) {
      Animated.timing(colorAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
    setTempValue(prev => prev + 1)
  }
  
  const decrease = () => {
    if (tempValue === 0) return
    const newTemp = tempValue - 1
    if (newTemp < 15) {
      Animated.timing(colorAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
    setTempValue(prev => prev - 1)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appContainer}>
        <View style={styles.tempDisplayContainer}>
          <Animated.View style={[styles.tempDisplay, { backgroundColor: interpolateColor }]}>
            <Text style={styles.tempDisplayText}>{tempValue}°C</Text>
          </Animated.View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={increase}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={decrease}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  appContainer: {
    height: 400,
    width: 300,
    backgroundColor: '#2b5870',
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    elevation: 10
  },
  tempDisplayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%'
  },
  tempDisplay: {
    height: 220,
    width: 220,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 3
  },
  tempDisplayText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center'
  },
  btnContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgb(105, 104, 104)",
    color: "#fff",
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 28,
    color: "#fff"
  }
});
