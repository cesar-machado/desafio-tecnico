/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {getRealm} from '../../services/realm';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import InputForm from '../../components/InputForm';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

export default function Register() {
  const [image, setImage] = useState();

  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }

    if (data.error) {
      return;
    }
    setImage(data);
  }

  const navigation = useNavigation();

  const schema = Yup.object().shape({
    title: Yup.string().required('Titulo é obrigatório'),
    description: Yup.string().required('A descrição é obrigatória'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)});

  const date = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date());

  async function saveTask(form) {
    const data = {
      _id: String(new Date().getTime()),
      title: form.title,
      description: form.description,
      image: image.assets[0].uri,
      create: String(date),
    };
    const realm = await getRealm();

    realm.write(() => {
      realm.create('Task', data);
    });

    reset();
    navigation.navigate('Home');
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastre sua Tarefa</Text>
        <ScrollView style={styles.fields}>
          <InputForm
            name="title"
            control={control}
            placeholder="  Título"
            placeholderTextColor={'#919293'}
            error={errors.title && errors.title.message}
          />
          <InputForm
            name="description"
            control={control}
            placeholder="  Descrição"
            multiline={true}
            numberOfLines={10}
            placeholderTextColor={'#919293'}
            error={errors.description && errors.description.message}
            style={{
              textAlignVertical: 'top',
              borderWidth: 2,
              borderColor: '#919293',
              borderRadius: 15,
            }}
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
          onPress={handleSubmit(saveTask)}>
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
    backgroundColor: '#f0f2f5',
    marginBottom: 10,
    padding: 18,
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
