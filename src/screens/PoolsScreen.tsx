import { useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native'
import { Card, Text, Title, Paragraph, AnimatedFAB } from 'react-native-paper'
import { usePools } from '../core/hooks/usePools'
import { mainTheme } from '../theme/theme'
import { FloatingSettingsButton } from '../components/FloatingTooltip'



export function PoolsScreen({ navigation }: any) {
  const [isExtended, setIsExtended] = useState(true)
  const { poolList } = usePools()
  const onScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  // CHANGE THIS TO import * as Crypto from 'expo-crypto';
  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView} onScroll={onScroll}>
        <FloatingSettingsButton />
        <Text style={styles.title} variant="headlineLarge">
          Pools Of Friends
        </Text>
        <Text style={styles.subTitle} variant="bodyLarge">
          Create, Edit, and Remove Pools of Friends You'd Love to Hang Out With!
        </Text>
        <View style={styles.cardContainer}>
          {poolList.map((item, index) => (
            <Card
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate('EditPoolScreen', { id: item.id })}
              theme={
                mainTheme
              }
            >
              <Card.Content>
                <Title>{item.name}</Title>
                {item.selectedContacts?.map((contact) => (
                  <Paragraph>{contact.name}</Paragraph>
                ))}
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
      <AnimatedFAB
        icon={'plus'}
        label={'Add Pool'}
        extended={isExtended}
        onPress={() => { navigation.navigate('EditPoolScreen', { id: generateUniqueId() }) }}
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={styles.fabStyle}
      />
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
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16
  },
  addCard: {
    marginBottom: 16,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    paddingTop: 30,
  },
  subTitle: {
    paddingBottom: 20,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
})

export default PoolsScreen
