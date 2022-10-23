import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/themed'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function HomeScreen({ navigation }) {

  const [chats, setChats] = useState([])

  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    })
  }

  const postCollectionRef = collection(db, "chats")

    useEffect(() => {
      const unsubscribe = async () => {
        const data = await getDocs(postCollectionRef)
            setChats(
              data.docs.map((doc) => ({
                id: doc.id, 
                data: doc.data(),
              }))
            )
        
      }
      unsubscribe() 
    }, [chats])
     

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle : { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginHorizontal: 10 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ 
            flexDirection: "row",  
            justifyContent: "space-between",
            width: 80,
            marginRight: 10,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate("AddChat")} 
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id, 
      chatName,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
      {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  }
})