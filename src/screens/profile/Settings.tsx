import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/theme';

export const SettingOption = ({title, navigationFunc}) => {
  return (
    <TouchableOpacity
      style={optionStyles.container}
      onPress={() => navigationFunc()}>
      <View style={optionStyles.innerContainer}>
        <Text style={optionStyles.optionText}>{title}</Text>
      </View>
      <FontAwesome name="angle-right" size={24} color={colors.primaryBlack} />
    </TouchableOpacity>
  );
};

const Settings = ({navigation}) => {
  return (
    <SafeAreaView>
      <CustomHeader title={'Settings'} backFunc={() => navigation.goBack()} />
      <ScrollView>
        <SettingOption title={'Add Address'} navigationFunc={()=>navigation.navigate("AddAddress")} />
        <SettingOption title={'Change Theme'} navigationFunc={undefined} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});

const optionStyles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    paddingHorizontal: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});
