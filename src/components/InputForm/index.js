import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

export default function InputForm({control, error, name, ...rest}) {
  return (
    <View>
      <Controller
        render={({field: {onChange, value}}) => (
          <TextInput
            onChangeText={onChange}
            style={styles.input}
            value={value}
            {...rest}
          />
        )}
        control={control}
        name={name}
      />
      {error && <Text style={styles.text}> {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: '#000',
    marginBottom: 10,
    padding: 18,
    borderWidth: 2,
    borderColor: '#919293',
    borderRadius: 10,
  },

  text: {
    color: 'red',
    marginBottom: 10,
  },
});
