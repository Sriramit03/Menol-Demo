import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import {images} from '../utils/images';
import {icons} from '../utils/icons';
import {colors} from '../utils/theme';

export const ProfileOption = ({icon, title}) => {
  return (
    <TouchableOpacity style={optionStyles.container}>
      <View style={optionStyles.innerContainer}>
        <Image source={icon} style={optionStyles.icon} />
        <Text style={optionStyles.optionText}>{title}</Text>
      </View>
      <Image source={icons.rightArrow} style={optionStyles.icon} />
    </TouchableOpacity>
  );
};

const Profile = () => {
  return (
    <SafeAreaView>
      <CustomHeader title={'Profile'} />
      <ScrollView style={styles.container}>
        {/* Profile Image and Edit Icon */}
        <View style={styles.profileImageContainer}>
          <Image
            source={images.profilePicture}
            style={styles.profileImage}
            resizeMode="stretch"
          />
          <TouchableOpacity style={styles.editIconContainer}>
            <Image source={icons.edit} style={styles.editIcon} />
          </TouchableOpacity>
          <Text style={styles.profileText}>Esther Howard</Text>
        </View>

        <View>
          <ProfileOption icon={icons.profile.default} title={'Your Profile'} />
          <ProfileOption icon={icons.payment} title={'Payment Methods'} />
          <ProfileOption icon={icons.editOrders} title={'My Orders'} />
          <ProfileOption icon={icons.setting} title={'Setting'} />
          <ProfileOption icon={icons.helpCenter} title={'Help Center'} />
          <ProfileOption icon={icons.privacy} title={'Privacy Policy'} />
          <ProfileOption icon={icons.logOut} title={'Log Out'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
   
  },
  profileImage: {
    width: 107,
    height: 107,
    borderRadius: 200,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    backgroundColor: colors.primaryWhite,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.primaryGrey,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -35,
    marginRight: -80,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  profileText: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

const optionStyles = StyleSheet.create({
  container: {
    paddingVertical:'5%',
    paddingHorizontal: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:50,
  },
  optionText:{
    fontSize:16,
    fontWeight:'bold'
  }
});
