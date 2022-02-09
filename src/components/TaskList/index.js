/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {tasksStore} from '../../store/TaskStore';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

const TaskList = observer(({data}) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  function handleVisible() {
    setOpen(true);
  }
  function handleInvisible() {
    setOpen(false);
  }

  return (
    <>
      {open === false ? (
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: '#646D7E',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text
            style={[
              styles.title,
              {letterSpacing: 2.3, textTransform: 'capitalize'},
            ]}>
            {data.create} - {data.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="eye"
              size={24}
              color="#646D7E"
              style={{
                marginRight: 10,
              }}
              onPress={handleVisible}
            />
            <Icon
              name="edit"
              size={24}
              color="#43ABFB"
              onPress={() => navigation.navigate('EditTask', data._id)}
            />
            <Icon
              name="trash"
              size={24}
              color="red"
              onPress={() => tasksStore.deleteTask(data._id)}
              style={{
                marginRight: 10,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>{data.create}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 20,
              }}>
              <Icon
                name="eye-off"
                size={24}
                color="#646D7E"
                style={{
                  marginRight: 10,
                }}
                onPress={handleInvisible}
              />
              <Icon
                name="edit"
                size={24}
                color="#43ABFB"
                onPress={() => navigation.navigate('EditTask', data._id)}
              />
              <Icon
                name="trash"
                size={24}
                color="red"
                onPress={() => tasksStore.deleteTask(data._id)}
                style={{
                  marginLeft: 10,
                }}
              />
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.title,
                {letterSpacing: 1, textTransform: 'capitalize', marginTop: 10},
              ]}>
              Título: {data.title}{' '}
            </Text>
            <Text style={[styles.title, {letterSpacing: 1}]}>
              Descrição: {data.description}
            </Text>
          </View>

          <View style={{alignItems: 'center', marginTop: 10}}>
            <Image
              style={styles.avatar}
              source={{
                uri: data
                  ? data.image
                  : 'https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045__480.jpg',
              }}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#646D7E',
    borderRadius: 15,
    backgroundColor: '#F2F2F2',
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    color: '#fff',
  },
  avatar: {
    width: 320,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default TaskList;
