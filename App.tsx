import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Tasks from './src/components/Tasks';
// @ts-ignore
import masthead from './assets/masthead.png';
export default function App() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >

      <View style={styles.container}>
        <StatusBar style="light" />
        
        <ImageBackground source={masthead} style={styles.welcome}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hi Egecan!  Write your tasks </Text>
          </View>
        </ImageBackground>

        <View style={styles.tasks}>
          <Tasks />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    flex: 1,
    backgroundColor: 'rgb(0,116,216)'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingLeft: 20
  },
  title: {
    fontSize: 22,
    color: '#FFFF',
    fontWeight: '500'
  },
  tasks: {
    flex: 2,
    marginTop: -40,
    borderRadius: 50,
    backgroundColor: '#FFFF',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  }
});
