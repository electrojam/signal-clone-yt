import React, {useLayoutEffect, useState} from 'react'
import { Input } from '@rneui/themed'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from '@rneui/themed'
import { db } from '../firebase'
import { collection, addDoc } from "firebase/firestore"

const AddChatScreen = ({ navigation }) => {
const [input, setInput] = useState("")

useLayoutEffect(() => {
  navigation.setOptions({
    title: "Añade un nuevo chat",
    headerBackTitle: "Chats",
  })
}, [navigation])

const createChat = async () => {
  await addDoc(
    collection(db, "chats" ), {
      chatName: input
    }
  )
    .then(() => {
      navigation.goBack()
    })
    .catch((error) => alert(error))
}

  return (
    <View style={styles.container}>
      <Input 
        placeholder="Ingrese un nombre para el chat" 
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={createChat} title="Crear nuevo chat"/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  }
})