import React, { useLayoutEffect } from 'react'
import { Avatar } from '@rneui/themed'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase'

export default function HomeScreen({ navigation }) {

useLayoutEffect(() => {
  navigation.setOptions({
    title: "Signal",
    headerStyle : { backgroundColor: "#fff" },
    headerTitleStyle: { color: "black" },
    headerTintColor: "black",
    headerLeft: () => (
      <View style={{ marginLeft: 20 }}>
        <TouchableOpacity>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}} />
        </TouchableOpacity>
      </View>
      
    ),
  })
}, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})