import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function PhoneNumberScreen({ navigation }: any) {
    
  const [phoneNumber, setPhoneNumber] = useState('');
  const { colors } = useTheme();

  const handleSendOTP = () => {
    // Here, you would integrate with your backend or OTP service
    // to send an OTP to the provided phone number.
    console.log("Sending OTP to: ", phoneNumber);
    
    // Navigate to OTP verification screen
    navigation.navigate('OtpVerificationScreen'); // Make sure to have this screen in your navigation stack
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Title style={styles.title}>Enter Your Phone Number</Title>
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          mode="outlined"
          keyboardType="phone-pad" // Ensures numeric keyboard is shown
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSendOTP} style={styles.button}>
          Send OTP
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default PhoneNumberScreen;
