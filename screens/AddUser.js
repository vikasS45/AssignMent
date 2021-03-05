/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const AddUser = ({ navigation }) => {
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [firstNameError, setFirstNameError] = useState('');
  let [lastNameError, setLastNameError] = useState('');
  let [emailError, setEmailError] = useState('');

  let required = (demo, error) => {
    if (demo.trim() === '') {
      error = 'Required Field';
    } else {
      error = '';
    }
    return error;
  };

  let emailValidation = (demo, error) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (demo.trim() === '') {
      error = 'Required Field';
    }
    if (reg.test(demo) === false) {
      error = 'Email Is Not Valid';
    }
    else {
      error = '';
    }
    return error;
  };

  const validation = () => {
    setFirstNameError(() => required(firstName, firstNameError));
    setLastNameError(() => required(lastName, lastNameError));
    setEmailError(() => emailValidation(email, emailError));
  };

  const login = async () => {
    await validation();
    if (
      firstNameError === '' &&
      lastNameError === '' &&
      emailError === ''
    ) {
      fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          first_name: firstName,
          last_name: lastName,
          avatar: 'https://reqres.in/img/faces/1-image.jpg',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.email) {
            navigation.navigate('Home');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="ENTER FIRST NAME"
          placeholderTextColor="gray"
          value={firstName}
          onChangeText={firstName => setFirstName(firstName)}
        />
      </View>
      {/* VALIDATION */}
      {!!firstNameError && <Text style={styles.error}>{firstNameError}</Text>}

      <View style={styles.textInput}>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="ENTER LAST  NAME"
          placeholderTextColor="gray"
          value={lastName}
          onChangeText={lastName => setLastName(lastName)}
        />
      </View>
      {/* VALIDATION */}
      {!!lastNameError && <Text style={styles.error}>{lastNameError}</Text>}

      <View style={styles.textInput}>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="ENTER EMAIL"
          placeholderTextColor="gray"
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>
      {/* VALIDATION */}
      {!!emailError && <Text style={styles.error}>{emailError}</Text>}

      <View>
        <TouchableOpacity
          onPress={() => login()}
          style={styles.button}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
          }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    color: 'grey',
    flexDirection: 'row',
    width: 280,
    height: 50,
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'gray',
    marginTop: 20,
    marginLeft: 10,
    padding: 5,
  },

  button: {
    padding: 10,
    backgroundColor: '#5499c7',
    width: 160,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },

  error: {
    color: 'red',
    width: 250,
    marginLeft: 40,
    marginTop: 8,
    fontWeight: '400',
    fontSize: 15,
  },
});

export default AddUser;
