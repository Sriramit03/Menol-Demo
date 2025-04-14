import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FormField from '../../components/FormField';
import {colors} from '../../utils/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AddAddress = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState({
    name: '',
    phoneNumber: '',
    alternateNumber: '',
    pincode: '',
    state: '',
    city: '',
    houseNumber: '',
    roadName: '',
    nearbyLocation: '',
    addressType: '',
  });
  const [isalternateNumber, setIsAlternateNumber] = useState(false);
  const [isNearByLocation, setIsNearByLocation] = useState(false);

  return (
    <SafeAreaView>
      <CustomHeader
        title={'Add Address'}
        backFunc={() => navigation.goBack()}
      />
      <ScrollView style={[styles.container]}>
        <TextInput
          style={styles.input}
          placeholder="Full Name (Required) *"
          placeholderTextColor={colors.primaryGrey}
          value={address.name}
          onChangeText={e => setAddress({...address, name: e})}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number (Required) *"
          keyboardType="phone-pad"
          placeholderTextColor={colors.primaryGrey}
          value={address.phoneNumber}
          onChangeText={e => setAddress({...address, phoneNumber: e})}
        />

        <TouchableOpacity
          onPress={() => setIsAlternateNumber(!isalternateNumber)}>
          <Text style={styles.linkText}>+ Add Alternate Phone Number</Text>
        </TouchableOpacity>
        {isalternateNumber && (
          <TextInput
            style={styles.input}
            placeholder="Alternate Number*"
            keyboardType="phone-pad"
            placeholderTextColor={colors.primaryGrey}
            value={address.alternateNumber}
            onChangeText={e => setAddress({...address, alternateNumber: e})}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Pincode (Required) *"
          keyboardType="number-pad"
          placeholderTextColor={colors.primaryGrey}
          value={address.pincode}
          onChangeText={e => setAddress({...address, pincode: e})}
        />
        <TextInput
          style={styles.input}
          placeholder="State (Required) *"
          placeholderTextColor={colors.primaryGrey}
          value={address.state}
          onChangeText={e => setAddress({...address, state: e})}
        />
        <TextInput
          style={styles.input}
          placeholder="City (Required) *"
          placeholderTextColor={colors.primaryGrey}
          value={address.city}
          onChangeText={e => setAddress({...address, city: e})}
        />
        <TextInput
          style={styles.input}
          placeholder="House No., Building Name (Required) *"
          placeholderTextColor={colors.primaryGrey}
          value={address.houseNumber}
          onChangeText={e => setAddress({...address, houseNumber: e})}
        />
        <TextInput
          style={styles.input}
          placeholder="Road name, Area, Colony (Required) *"
          placeholderTextColor={colors.primaryGrey}
          value={address.roadName}
          onChangeText={e => setAddress({...address, roadName: e})}
        />

        <TouchableOpacity
          onPress={() => setIsNearByLocation(!isNearByLocation)}>
          <Text style={styles.linkText}>
            + Add Nearby Famous Shop/Mall/Landmark
          </Text>
        </TouchableOpacity>
        {isNearByLocation && (
          <TextInput
            style={styles.input}
            placeholder="Nearby Location"
            placeholderTextColor={colors.primaryGrey}
            value={address.nearbyLocation}
            onChangeText={e => setAddress({...address, nearbyLocation: e})}
          />
        )}

        <Text style={styles.label}>Type of address</Text>
        <View style={styles.addressTypeContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              address.addressType === 'Home' && styles.radioButtonSelected,
            ]}
            onPress={() => setAddress({...address, addressType: 'Home'})}>
            <Text
              style={[
                styles.radioText,
                address.addressType === 'Work' && styles.radioButtonSelected,
              ]}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              address.addressType === 'Work' && styles.radioButtonSelected,
            ]}
            onPress={() => setAddress({...address, addressType: 'Work'})}>
            <Text
              style={[
                styles.radioText,
                address.addressType === 'Work' && styles.radioButtonSelected,
              ]}>
              Work
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginBottom: 170,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    color: colors.primaryGrey,
    borderColor: colors.primaryGrey,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  linkText: {
    color: colors.primaryBlack,
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 16,
    borderColor: colors.primaryGrey,
  },
  radioButtonSelected: {
    backgroundColor: colors.primaryBlack,
    borderColor: colors.primaryBlack,
  },

  radioText: {
    fontSize: 16,
  },
  radioTextSelected: {},
  saveButton: {
    backgroundColor: colors.primaryBlack,
    padding: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.primaryWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAddress;
