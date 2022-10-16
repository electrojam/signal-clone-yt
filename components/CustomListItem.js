import { Avatar, ListItem } from '@rneui/themed'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default function CustomListItem({ id, chatName, enterChat }) {
  return (
    <ListItem>
      <Avatar 
        rounded
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          Youtube Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a test subtitle This is a test subtitle This is a test subtitle
          This is a test subtitle This is a test subtitle This is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

const styles = StyleSheet.create({})