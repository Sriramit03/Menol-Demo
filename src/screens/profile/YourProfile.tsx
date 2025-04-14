import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {useGlobalContext} from '../../context/GlobalProvider';
import {images} from '../../utils/images';
import {colors} from '../../utils/theme';

const YourProfile = ({navigation}) => {
  const {user} = useGlobalContext();
  const [details, setDetails] = useState({
    firstName: user.name,
    lastName: '',
    email: user.email,
    mobileNumber: '',
  });
  return (
    <>
      <CustomHeader
        title={'Your Profile'}
        backFunc={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={images.blankProfile}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.textHeader}>First Name</Text>
            <TextInput
              value={details.firstName}
              onChangeText={e => setDetails({...details, firstName: e})}
              style={styles.textField}
            />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.textHeader}>LastName</Text>
            <TextInput
              value={details.lastName}
              onChangeText={e => setDetails({...details, lastName: e})}
              style={styles.textField}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.textHeader}>Mobile Number</Text>
            <View style={styles.inlineButtonContainer}>
              <TextInput
                value={details.mobileNumber}
                onChangeText={e => setDetails({...details, mobileNumber: e})}
                style={[styles.inlineTextField]}
              />
              <TouchableOpacity style={styles.inlineButton}>
                <Text style={styles.inlineText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.textHeader}>Email</Text>
            <View style={styles.inlineButtonContainer}>
              <TextInput
                value={details.email}
                onChangeText={e => setDetails({...details, email: e})}
                style={styles.inlineTextField}
              />
              <TouchableOpacity style={styles.inlineButton}>
                <Text style={styles.inlineText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default YourProfile;

const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
  },
  detailsContainer: {
    marginHorizontal: '5%',
  },
  textHeader: {
    fontSize: 14,
    paddingBottom: 2,
    color: colors.darkGrey,
    letterSpacing: 3,
  },
  detailContainer: {
    marginVertical: 15,
  },
  text: {
    letterSpacing: 3,
    fontSize: 16,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
  textField: {
    fontSize: 16,
    borderBottomWidth: 1,
    letterSpacing: 3,
    fontWeight: '500',
  },
  inlineButtonContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inlineTextField: {
    width: '85%',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing:3
  },
  inlineButton: {
    minWidth: '10%',
  },
  inlineText: {
    fontWeight: '600',
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    padding: 10,
    backgroundColor: colors.primaryBlack,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.primaryWhite,
  },
});
