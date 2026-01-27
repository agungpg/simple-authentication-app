import MaterialIcons from "@react-native-vector-icons/material-icons";
import React from "react";
import { Text, View, StyleSheet, Touchable, TouchableOpacity } from "react-native"
import Typography from "@components/Typography";
import InfoRow from "@components/InfoRow"
import Button from "@components/Button"

const HomeScreen = () => {
    
    return <View style={styles.container}>
      <View style={styles.headerSection}>
        <Typography variant="heading">Profile</Typography>
        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialIcons name="logout" color={"#000"} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentSection}>
        <InfoRow
          icon={{
            name:"person",
            size: 30
          }}
          label="Name"
          value="Agung Perdana Gumelar"
        />
        <InfoRow
          icon={{
            name:"email",
            size: 30
          }}
          label="Email"
          value="agungperdana@gmail.com"
        />
      </View>
      <Button />
    </View>
}

const styles = StyleSheet.create({
  container: {
      padding: 28,
      backgroundColor: "#E6EBF0",
      flex: 1,
      display: "flex",
      gap: 40
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  contentSection: {
    gap: 12
  },
  title: {
    fontSize: 42, 
    fontWeight: "700", 
  },
  itemInfoValue: {
    fontSize: 20,
    fontWeight:"400" 
  },
  logoutBtn: {
    height: 48,
    width: 60,
    paddingHorizontal: 12,
    borderRadius: 24,
    // backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  },
  signInText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  infoItem:{
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  }
})

export default HomeScreen;
