import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native'
import { Button, Image, Input } from "@rneui/themed";
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error))
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "null"}
      style={styles.container}
    >
      <StatusBar style="light"/>
      <Image 
        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png", }} 
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input 
          placeholder="Email" 
          autoFocus 
          type="email" 
          value={email} 
          onChangeText={(text) => setEmail(text)}
        />
        <Input 
          placeholder="Password" 
          secureTextEntry 
          type="password"
          value={password} 
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="login" />
      <Button 
        onPress={() => navigation.navigate("Register")} 
        containerStyle={styles.button} 
        type="outline" 
        title="Register" 
      />
      <View style={{ height: 100 }}/>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})