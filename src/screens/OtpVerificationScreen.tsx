import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Snackbar, TextInput, Title, useTheme } from 'react-native-paper';

export function OtpVerificationScreen({ navigation }: any) {
    
    const [otp, setOtp] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
  
    const handleVerifyOtp = () => {
      // Logic to verify OTP
      if (otp === '1234') {
        setSnackbarVisible(true);
        navigation.navigate('WelcomeScreen');
      } else {
        alert('Invalid OTP');
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          label="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={4}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleVerifyOtp}>
          Verify OTP
        </Button>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          OTP Verified!
        </Snackbar>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    input: {
      marginBottom: 20,
      width: '100%',
    },
  });
  
  export default OtpVerificationScreen;