import { FlatList, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Card, Text, TextInput } from 'react-native-paper';
import { FloatingSettingsButton } from '../components/FloatingTooltip';


// Sample data for matches. You might want to fetch real data in a real app
const matchesData = [
    { id: '1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/150', lastMessage: "Hey, how's it going?" },
    { id: '2', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150', lastMessage: 'Wanna hang out tomorrow?' },
    { id: '3', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150', lastMessage: 'Wanna hang out tomorrow?' },
    { id: '4', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150', lastMessage: 'Wanna hang out tomorrow?' },
    { id: '5', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150', lastMessage: 'Wanna hang out tomorrow?' },
    { id: '6', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150', lastMessage: 'Wanna hang out tomorrow?' },
    { id: '7', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150', lastMessage: 'Wanna hang out tomorrow?' },
    { id: '8', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/150', lastMessage: 'Wanna hang out tomorrow?' },
];

export function MatchesScreen({ navigation }: any) {

    return (

        <SafeAreaView style={styles.safeArea}>

            <ScrollView contentContainerStyle={styles.scrollView} >
                <FloatingSettingsButton />
                <Text style={styles.title} variant="headlineLarge">
                    Your Matches
                </Text>
                <Text style={styles.subTitle} variant="bodyLarge">
                    Here are your potential meetings
                </Text>

                {matchesData.map((item, index) => (
                    <Card
                        key={index}
                        style={styles.card}
                        onPress={() => navigation.navigate('Chat', { contactId: item.id })}>
                        <Card.Title
                            title={item.name}
                            subtitle={item.lastMessage}
                            left={(props) => <Avatar.Image {...props} source={{ uri: item.avatarUrl }} size={48} />}
                        />
                    </Card>
                ))}



            </ScrollView>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        paddingTop: 30,
    },
    subTitle: {
        paddingBottom: 20,
    },
    card: { marginVertical: 10 }
})

export default MatchesScreen;
