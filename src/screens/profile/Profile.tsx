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
import CustomHeader from '../../components/CustomHeader';
import {images} from '../../utils/images';
import {icons} from '../../utils/icons';
import {colors} from '../../utils/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useGlobalContext} from '../../context/GlobalProvider';
import {signOut} from '../../firebase/authConfig';

export const ProfileOption = ({title, icon, navigationFunc}) => {
  return (
    <TouchableOpacity
      style={optionStyles.container}
      onPress={() => navigationFunc()}>
      <View style={optionStyles.innerContainer}>
        {icon}
        <Text style={optionStyles.optionText}>{title}</Text>
      </View>
      <FontAwesome name="angle-right" size={24} color={colors.primaryBlack} />
    </TouchableOpacity>
  );
};

const Profile = ({navigation}) => {
  const {user} = useGlobalContext();

  const logOut = async () => {
    await signOut();
    navigation.navigate('LogInScreen');
  };

  return (
    <SafeAreaView>
      <CustomHeader title={'Profile'} backFunc={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        {/* Profile Image and Edit Icon */}
        <View style={styles.profileImageContainer}>
          {user.profileImage ? (
            <Image
              source={images.profilePicture}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={images.blankProfile}
              style={styles.profileImage}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity style={styles.editIconContainer}>
            <Image source={icons.edit} style={styles.editIcon} />
          </TouchableOpacity>
          <Text style={styles.profileText}>{user.name}</Text>
        </View>

        <View>
          <ProfileOption
            title={'Your Profile'}
            icon={
              <FeatherIcon name="user" size={24} color={colors.primaryBlack} />
            }
            navigationFunc={() => navigation.navigate('YourProfile')}
          />
          {/*           <ProfileOption
            title={'Payment Methods'}
            icon={
              <FeatherIcon
                name="credit-card"
                size={24}
                color={colors.primaryBlack}
              />
            }
          /> */}
          <ProfileOption
            title={'My Orders'}
            icon={
              <FeatherIcon name="edit" size={24} color={colors.primaryBlack} />
            }
            navigationFunc={() => console.log('Clicked')}
          />
          <ProfileOption
            title={'Wardrobe'}
            icon={
              <FeatherIcon
                name="shopping-cart"
                size={24}
                color={colors.primaryBlack}
              />
            }
            navigationFunc={() => navigation.navigate('Wardrobe')}
          />
          <ProfileOption
            title={'Settings'}
            icon={
              <FeatherIcon
                name="settings"
                size={24}
                color={colors.primaryBlack}
              />
            }
            navigationFunc={() => navigation.navigate('Settings')}
          />
          <ProfileOption
            title={'Help Center'}
            icon={
              <FontAwesome
                name="question-circle-o"
                size={24}
                color={colors.primaryBlack}
              />
            }
            navigationFunc={() => navigation.navigate('HelpCenter')}
          />
          <ProfileOption
            title={'Privacy Policy'}
            icon={
              <FeatherIcon name="lock" size={24} color={colors.primaryBlack} />
            }
            navigationFunc={() => console.log('Clicked')}
          />
          <ProfileOption
            title={'Log Out'}
            icon={
              <FeatherIcon
                name="log-out"
                size={24}
                color={colors.primaryBlack}
              />
            }
            navigationFunc={() => logOut()}
          />
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
    letterSpacing: 3,
  },
});

const optionStyles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
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
    gap: 50,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});
