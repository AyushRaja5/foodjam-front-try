// src/services/Profile/UserNotification.js
import axios from 'axios';

export const getUserNotification = async (token, accountId, notificationparams) => {
    const { limit, offset } = notificationparams;
    try {
      const response = await axios.get(
        `notifications/v1/user/notifications`,
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
};
