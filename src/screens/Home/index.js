import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import TaskList from '../../components/TaskList';
import {getRealm} from '../../services/realm';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [taskList, setTaskList] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadTaskList() {
      const realm = await getRealm();

      const data = realm.objects('Task').sorted('_id', true);

      // console.log(data);

      setTaskList(data);
    }

    loadTaskList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Tarefas </Text>
      <FlatList
        style={styles.flat}
        // contentContainerStyle={{padding: 10}}
        showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="handled"
        data={taskList}
        keyExtractor={item => item._id}
        renderItem={({item}) => <TaskList data={item} />}
      />

      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>Adicionar</Text>
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    alignItems: 'center',

    // justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginTop: 60,
    color: '#43ABFB',
  },
  button: {
    width: '100%',
    backgroundColor: '#43ABFB',
    color: '#fff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    // marginBottom: 20,
  },
  text: {
    color: '#fff',
  },
  flat: {
    width: '90%',
    marginTop: 17,
    //   height: 40,
    // backgroundColor: 'red',
    //   marginBottom: 10,
  },
  footer: {
    width: '100%',
    // backgroundColor: '#F4F5F6',

    padding: 24,
  },
});

export default Home;
