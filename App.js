import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCE7bUNxbfRBlk5VmQYnDm8onliF3iPsTY",
    authDomain: "ostoslista-firebase-01.firebaseapp.com",
    databaseURL: "https://ostoslista-firebase-01-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ostoslista-firebase-01",
    storageBucket: "ostoslista-firebase-01.appspot.com",
    messagingSenderId: "678987592078",
    appId: "1:678987592078:web:3a4c1a7626aeda023af4df"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // Add
  const saveItem = () => {
    push(
      ref(database, 'items/'),
      { 'product': product, 'amount': amount });
  }

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(Object.values(data));
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text></Text>
      <TextInput 
        placeholder='Product'
        onChangeText={text => setProduct(text)}
        value={product} />
      <TextInput
        placeholder='Amount'
        onChangeText={text => setAmount(text)}
        value={amount} />
      <Button onPress={saveItem} title='SAVE' />
      <Text></Text>
      <Text>SHOPPING LIST</Text>
      <FlatList
        style={{marginLeft: "5%"}}
        keyExtractor={item => item.toString()}
        renderItem={({item}) =>
          <View style={styles.listcontainer}>
            <Text>{item.product}, {item.amount} </Text>
          </View>}
        data={items}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
});