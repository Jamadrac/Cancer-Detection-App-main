// ForgotPassword.tsx
import {router} from "expo-router"
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { BASEURI } from '../../config';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRequestOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASEURI}/password/request-otp`, {
        email,
      });

      if (response.status === 200) {
        Alert.alert('OTP Sent', 'An OTP has been sent to your email.');
        router.push('/update-password');  
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Request OTP failed', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter your email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <TouchableOpacity style={styles.sendBtn} onPress={handleRequestOTP} disabled={loading}>
        <Text style={styles.sendText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  inputView: {
    width: '100%',
    backgroundColor: '#e0ebeb',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c',
  },
  sendBtn: {
    width: '100%',
    borderRadius: 23,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#ff5c33',
  },
  sendText: {
    color: 'white',
    fontSize: 16,
  },
});
