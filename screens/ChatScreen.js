import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/themed'
import { 
  Keyboard, 
  KeyboardAvoidingView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  View 
} from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../firebase'
import { collection, addDoc, orderBy, getDocs } from "firebase/firestore"
import { serverTimestamp } from "firebase/firestore";

export default function ChatScreen({ navigation, route }) {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerBackVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar 
            rounded 
            source={{ 
              uri: 
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" 
            }} 
          />
          <Text
            style={{ color: "white", marginLeft:10, fontWeight: "700" }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{ 
            flexDirection: "row" ,
            justifyContent:"space-between",
            width: 80,
            marginRight: 10,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="phone" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const sendMessage = async() => {
    Keyboard.dismiss()

    await addDoc(
      collection(db, "chats", route.params.id, "messages" ), {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL, 
      }
    )

    setInput("")

  }

  useLayoutEffect(() => {
    const unsubscribe = async () => {
      const data = await getDocs(
        collection(db, "chats", route.params.id, "messages"),
        orderBy("timestamp", "desc" )
      )

      setMessages(
        data.docs.map((doc) => ({
          id: doc.id, 
          data: doc.data(),
        }))
      )
      
    }

    unsubscribe()
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "null"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView>
            {messages.map(({id, data}) => (
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Avatar />
                  <Text style={styles.receiverText}>{data.message}</Text>
                </View>
              ):(
                <View style={styles.sender}>
                  <Avatar />
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              )
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput 
              value={input} 
              onChangeText={(text) => setInput(text)} 
              onSubmitEditing={sendMessage}
              placeholder="Signal Message" 
              style={styles.textInput}
            />
            <TouchableOpacity 
              onPress={sendMessage} 
              activeOpacity={0.5}
            >
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
})