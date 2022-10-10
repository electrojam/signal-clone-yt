import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from '@rneui/themed'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useLayoutEffect(() => {  /* This is only for IOS */
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    })
  }, [navigation])

  const register = () => {}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "null"}
      style={styles.container}
    >
      <StatusBar style="light"/>
      <Text h3 style={{ marginBottom: 50 }}>
        Crea una cuenta en Signal
      </Text>

      <View style={styles.inputContainer}>
        <Input 
          placeholder="Nombre Completo" 
          autoFocus 
          type="text" 
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input 
          placeholder="Email" 
          autoFocus 
          type="email" 
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input 
          placeholder="Password" 
          autoFocus 
          type="password" 
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input 
          placeholder="Imagen de perfil (opcional)" 
          autoFocus 
          type="text" 
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button 
        containerStyle={styles.button}
        raised 
        onPress={register} 
        title="Register"
      />

      <View style={{ height: 100 }}/>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 20,
  },
  inputContainer: {
    width: 300,
  },
})