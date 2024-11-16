import React, { useState } from "react";
import { Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import Toast from "react-native-toast-message";
import { authState, userDetailsState } from "../../atoms";
import { BASEURI } from "../../config";

// Define interfaces for user details and login response
interface UserDetails {
  id: string;
  username: string;
  email: string;
  address: string;
  phone: any;
  userType: any;
  gender: any;
}

interface LoginResponse {
  phone: any;
  userType: any;
  id: string;
  token: string;
  username: string;
  email: string;
  gender: any;
  address: string;
}

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setAuth = useSetRecoilState(authState);
  const setUserDetails = useSetRecoilState(userDetailsState);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>(
        `${BASEURI}/admin/login`,
        {
          email,
          password,
        }
      );

      const data = response.data;
      if (data.token) {
        const userDetails = {
          id: data.id,
          username: data.username,
          email: data.email,
          address: data.address,
          phone: data.phone,
          userType: data.userType,
          gender: data.gender,
        };

        setAuth({
          isAuthenticated: true,
          token: data.token,
        });
        setUserDetails(userDetails);
        router.push("/(tabs)");

        Toast.show({
          type: "success",
          text1: "Login Successful",
        });
      }
    } catch (error: any) {
      console.error("Login failed", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid email or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Doctor's Handy Tool</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <Link href="./(auth)/ForgotPassword">
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Link>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginText}>LOGIN</Text>
        )}
      </TouchableOpacity>
      <Link href={"./(tabs)"}>
        {" "}
        <Text style={styles.forgot}>by-pass?</Text>
      </Link>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    padding: 50,
    fontSize: 41,
    fontWeight: "bold",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e0ebeb",
    shadowOpacity: 0.3,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  forgot: {
    color: "gray",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 23,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: "#55FF33FF",
  },
  loginText: {
    color: "white",
  },
});
