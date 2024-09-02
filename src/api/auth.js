import instanceBaza2 from './config/instance-baza2';

// Управління access_token
export const token = {
  get:()=>{
    const token = sessionStorage.getItem('access_token');
    return token
  },

  set: (token) => {
    sessionStorage.setItem(
      'access_token',
      token
    )
  },

  reset: () => {
    sessionStorage.removeItem('access_token')
  },
};

const authEndpoint = '/auth'

export const getInfoUser = async () => {
  const res = await instanceBaza2.get(`${authEndpoint}/user`)
  return res;
}

export const logIn = async ({ email, password }) => {
    const response = await instanceBaza2.post(`${authEndpoint}/login`, {
      email,
      password,
    });
    token.set(response.data.token);
    return response;
}

export const changePassword = async ({
  oldPassword,
  newPassword,
}) => {
  const response = await instanceBaza2.patch(`${authEndpoint}/changePassword`, {
    oldPassword,
    newPassword,
  });
  return response;
}