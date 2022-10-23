import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/themed'
import { StyleSheet, Text, View } from 'react-native'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'


export default function CustomListItem({ id, chatName, enterChat }) {
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    const unsubscribe = async () => {
      const data = await getDocs(
        query(
          collection(db, "chats", id, "messages"),
          orderBy("timestamp", "desc")
        )
      ) 

      setChatMessages(
        data.docs.map((doc) => 
          doc.data()
        )
      )
    }

    unsubscribe()
  })
  

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
      <Avatar 
        rounded
        source={{
          uri: 
            chatMessages?.[0]?.photoURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName} 
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

const styles = StyleSheet.create({})