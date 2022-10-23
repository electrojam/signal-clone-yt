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
import { collection, addDoc, orderBy, getDocs, query } from "firebase/firestore"
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
                messages[0]?.data.photoURL,
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
  }, [navigation, messages])

  const sendMessage = async() => {
    if (!input) return

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
        query(
          collection(db, "chats", route.params.id, "messages"),
          orderBy("timestamp", "desc")
        )
      )

      setMessages(
        data.docs.map((doc) => ({
          id: doc.id, 
          data: doc.data(),
        }))
      )
      
    }

    unsubscribe()
  }, [route, messages])

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
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({id, data}) => (
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Avatar 
                    position="absolute"
                    rounded
                    bottom={-15}
                    right={-5}
                    // WEB
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      right: -5,
                    }}
                    size={30}
                    source={{ 
                      uri: data.photoURL, 
                    }}
                  />
                  <Text style={styles.receiverText}>{data.message}</Text>
                </View>
              ):(
                <View key={id} style={styles.sender}>
                  <Avatar 
                    position="absolute"
                    rounded
                    bottom={-15}
                    left={-5}
                    // WEB
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      left: -5,
                    }}
                    size={30}
                    source={{ 
                      uri: data.photoURL, 
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
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
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
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
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
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