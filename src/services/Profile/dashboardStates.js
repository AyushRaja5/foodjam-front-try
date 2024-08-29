import axios from 'axios';

export const GetDashboardStatesService = async (token, accountId)  => {
    try {
      if(!token){
        const response = await axios.get('users/v2/users/stats');
        return response.data;
      }
      const response = await axios.get(
        'users/v2/users/stats',
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export const GetUserProfilebyAccountIdService = async (token, accountId, userparams)  => {
    const { account_id} = userparams;
    try {
      if(!token || token === null){
        const response = await axios.get(`users/v2/user/profile?account_id=${account_id}`);
        return response.data;
      }
      else {
        const response = await axios.get(
          `users/v2/user/profile?account_id=${account_id}`,
          {
            headers: {
              'x-access-token': token,
              'x-access-user': accountId,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }

  export const EditUserProfileService = async (token, accountId, editProfile)  => {
    console.log(editProfile, 'edit Profile in service')
    try {
      const response = await axios.patch(
        `users/v1/user/profile`,
        {
          first_name: editProfile.name.split(' ')[0] || '',
          middle_name: '',
          last_name: editProfile.name.split(' ')[1] || '',
          user_name: editProfile.username,
          phone: editProfile.phone,
          profile_picture: editProfile.profile_picture || '',
          email: editProfile.email,
          facebook: editProfile.facebook,
          instagram: editProfile.instagram,
          youtube: editProfile.youtube,
        },
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }