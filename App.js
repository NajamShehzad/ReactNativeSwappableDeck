import React from 'react';
import { Notifications, Permissions } from 'expo';
// import firebase from 'firebase'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './components/Deck/Deck';
import firebaseKey from './firebaseApi';


const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];


export default class App extends React.Component {


  renderCard(item) {
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
      >
        <Text style={{ marginBottom: 10 }} >
          Animated Card Info With Pan Handler
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          title="View Now"
        />
      </Card>
    )
  }
  componentWillMount() {
    // firebase.initializeApp(firebaseKey);

  }
  componentDidMount() {

    this.registerPushNotifications();

  }
  registerPushNotifications = async () => {

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    console.log(finalStatus);

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    Notifications.getExpoPushTokenAsync().then(x => {
      console.log(x);

    }).catch(err => {
      console.log(err);
    });


  }

  renderNoMoreCards() {
    return (
      <Card
        title="All Done"
      >
        <Text style={{ marginBottom: 10 }}>
          No More Cards to Show
      </Text>
        <Button
          backgroundColor="#03A9F4"
          title="View Now"
        />
      </Card>
    )
  }
  render() {
    return (
      // <ScrollView>
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          onSwipeLeft={() => console.log("Left Working")}
          onSwipeRight={() => console.log('Right Working')}
          renderNoMoreCards={this.renderNoMoreCards}
        />
        <View>
          <Text>
            Test Under images
            </Text>
        </View>
      </View>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
