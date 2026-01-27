import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native"
import InfoRow from "../../components/InfoRow";
import Typography from "../../components/Typography";
import Button from "@components/Button";
import { AuthContext } from "app/provider/AuthProvider";

const HomeScreen = () => {
  const {profile, logout} = useContext(AuthContext)
    
    return <View style={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <Typography variant="heading">Profile Details</Typography>
      <View style={styles.detailsSection}>
        <InfoRow
          label={"Name"}
          value={profile?.name ?? ""}
          icon={{ name: "person" }}
        />
        <InfoRow
          label={"Email"}
          value={profile?.email ?? ""}
          icon={{ name: "email" }}
        />
      </View>
      
      </View>
      <Button onPress={logout} textColor="#DC2626" outline label="Logout"/>
    </View>
}

const styles = StyleSheet.create({
  screenContainer: {
      padding: 28,
      backgroundColor: "#E6EBF0",
      flex: 1,
      display: "flex",
      gap: 42,
      justifyContent: "space-between"
  },
  profileHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 48
  },
  detailsSection: {
    gap: 8,
    width: "100%"
  },
  logoutButton: {
    height: 48,
    // width: 60,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  },
  logoutLabel: {
    fontSize: 20,
    fontWeight: "600",
  },
})

export default HomeScreen;
