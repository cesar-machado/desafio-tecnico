/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import {tasksStore} from '../../store/TaskStore';

export default function EditTask({route}) {
  const _id = route.params;
  const item = tasksStore.tasks.find(task => task._id === _id);
  const [image, setImage] = useState(item.image);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }

    if (data.error) {
      return;
    }

    setImage(data.assets[0].uri);
  }

  const navigation = useNavigation();

  const create = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date());

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastre sua Tarefa</Text>
        <ScrollView style={styles.fields}>
          <TextInput
            name="title"
            placeholder="  Título"
            onChangeText={setTitle}
            style={styles.input}
            value={title}
          />
          <TextInput
            name="description"
            placeholder="  Descrição"
            value={description}
            multiline={true}
            numberOfLines={10}
            placeholderTextColor={'#919293'}
            onChangeText={setDescription}
            style={[
              styles.input,
              {
                textAlignVertical: 'top',
              },
            ]}
          />

          <RectButton
            style={[
              styles.button,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#43ABFB',
              },
            ]}
            onPress={() =>
              ImagePicker.launchImageLibrary({}, imagePickerCallback)
            }>
            <Icon name="camera" size={24} color="#fff" />
            <Text style={[styles.text, {marginLeft: 10}]}>
              escolha uma imagem
            </Text>
          </RectButton>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <RectButton
          style={[styles.button, {borderWidth: 2, borderColor: '#000'}]}
          onPress={() => {
            tasksStore.EditTask({
              _id,
              title,
              description,
              image,
              create,
            });
            navigation.navigate('Home');
          }}>
          <Text style={styles.text}>Salvar</Text>
        </RectButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginTop: 80,
    color: '#43ABFB',
  },
  fields: {width: '90%', marginVertical: 20},
  input: {
    color: '#000',
    marginBottom: 10,
    padding: 18,
    borderWidth: 2,
    borderColor: '#919293',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#06D6A0',
    color: '#000',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: '#fff',
  },
  flat: {
    width: '90%',
  },
  footer: {
    width: '100%',
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: '#fbfbfb',
  },
});
