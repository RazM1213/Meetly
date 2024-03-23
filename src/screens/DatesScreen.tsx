import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { useRecoilValue } from "recoil";
import { userState } from "../core/recoil/atoms/user";
import { User } from "../core/types";
import { Card, SegmentedButtons, Text } from "react-native-paper";
import { mainTheme } from "../theme/theme";
import React, { useState } from 'react';
import { Button, Dialog, Portal, List } from 'react-native-paper';
import { FloatingSettingsButton } from "../components/FloatingTooltip";

const generateDateRange = (): Date[] => {
    let dates = [];
    const today = new Date();
    for (let i = 1; i < 15; i++) { // 2 weeks
        let newDate = new Date(today);
        newDate.setDate(newDate.getDate() + i);
        dates.push(newDate);
    }
    return dates;
};

const timeSlots = ['9-12', '12-16', '16-20', '20-24'];




const TimeSlotSelector = ({
    slots,
    onSelect
}: {
    slots: string[];
    onSelect: (slot: string, selected: boolean) => void;
}) => {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    const toggleSlot = (slot: string) => {
        console.log(slot)
        const isSelected = selectedSlots.includes(slot);
        if (isSelected) {
            const newSelectedSlots = selectedSlots.filter(s => s !== slot);
            setSelectedSlots(newSelectedSlots);
            onSelect(slot, false);
        } else {
            const newSelectedSlots = [...selectedSlots, slot];
            setSelectedSlots(newSelectedSlots);
            onSelect(slot, true);
        }
    };

    const [value, setValue] = React.useState([]);

    const toggleSlots = (slots: any) => {
        setValue(slots)
        return slots;
    }

    return (
        <View 
        style={{  paddingTop: 8 }}
        >
            <SegmentedButtons
                value={value}
                onValueChange={toggleSlots}
                multiSelect={true}
                buttons={[
                    {
                        value: timeSlots[0],
                        label: timeSlots[0],
                    },
                    {
                        value: timeSlots[1],
                        label: timeSlots[1],
                    }, 
                    {
                        value: timeSlots[2],
                        label: timeSlots[2],
                    }, 
                    {
                        value: timeSlots[3],
                        label: timeSlots[3],
                    },

                ]}
            />
            {/* {slots.map((slot, index) => (
                <Button
                    key={index}
                    mode={selectedSlots.includes(slot) ? 'contained' : 'outlined'}
                    onPress={() => toggleSlot(slot)}
                    style={{ margin: 2 }}>
                    {slot}
                </Button>
            ))} */}
        </View>
    );
};

const DateCard = ({
    date
}: {
    date: Date;
}) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const handleSlotSelection = (slot: string, selected: boolean) => {
        // You can implement further logic here, e.g., updating a state that tracks selections
        console.log(`Slot ${slot} selected: ${selected}`);
    };

    return (
        <Card style={{ margin: 4 }}>
            <Card.Content>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{dayOfWeek}</Text>
                <Text>{dateStr}</Text>
                <TimeSlotSelector slots={timeSlots} onSelect={handleSlotSelection} />
            </Card.Content>
        </Card>
    );
};


export function DatesScreen({ navigation }: any) {
    const user = useRecoilValue<User>(userState);
    const dates = generateDateRange();

    return (

        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView} >
                <FloatingSettingsButton/>

                <Text style={styles.title} variant="headlineLarge">
                    Available Dates
                </Text>
                <Text style={styles.subTitle} variant="bodyLarge">
                    Fill in your free time, and let us help you turn it into busy time!
                </Text>

                {dates.map((date, index) => (
                    <DateCard key={index} date={date} />
                ))}

            </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        paddingTop: 40,
    },
    subTitle: {
        paddingBottom: 20,
    },
    card: { marginVertical: 10 }
})