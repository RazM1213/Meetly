import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput, Title, useTheme } from 'react-native-paper';
import { useUser } from '../core/hooks/useUser';
import DropDown from "react-native-paper-dropdown";

export function UserInfoScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const months = [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];

    const handleSave = () => {
        setBirthDate(`${year}-${month}-${day}`);
    };

    const { setUser } = useUser();
    const { colors } = useTheme();

    const handleNext = () => {
        const birthDateTimestamp = new Date(birthDate).getTime();
        setUser({ firstName: name, lastName, birthDate: birthDateTimestamp });
        navigation.navigate('PhoneNumberScreen');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Title style={styles.title}>Enter Your Information</Title>
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Last Name (Optional)"
                    value={lastName}
                    onChangeText={setLastName}
                    mode="outlined"
                    style={styles.input}
                />

                <View style={styles.dateContainer}>
                    <TextInput
                        mode='outlined'
                        label="Day"
                        value={day}
                        onChangeText={setDay}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <View style={{ paddingHorizontal: 15 }}>
                        <DropDown
                            label="Month"
                            mode='outlined'
                            value={month}
                            setValue={setMonth}
                            list={months}
                            visible={showMultiSelectDropDown}
                            onDismiss={function (): void {
                                setShowMultiSelectDropDown(false)
                            }}
                            showDropDown={function (): void {
                                setShowMultiSelectDropDown(true)
                            }}
                        />
                    </View>
                    <TextInput
                        label="Year"
                        mode='outlined'
                        value={year}
                        onChangeText={setYear}
                        keyboardType="numeric"
                        style={styles.input}
                    />

                </View>
                <Button mode="contained" onPress={handleNext} style={styles.button}>
                    Next
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        flex: 1
    },
    button: {
        marginTop: 20,
    },
});

export default UserInfoScreen;
