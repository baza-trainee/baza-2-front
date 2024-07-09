import instanceBaza2 from './config/instance-baza2';

const token = {
  set: (token) => {
    instanceBaza2.defaults.headers.common.Authorization = `${token}`;
  },
  reset: () => {
    instanceBaza2.defaults.headers.common.Authorization = '';
  },
};


export const getInfoUser = async () => {
  const res = await instanceBaza2.get(`/auth/user`);
  return res;
}

export const logIn= async ({ email, password }) => {
  const response = await instanceBaza2.post(`/auth/login`, {
    email,
    password,
  });

  token.set(response.data.token);
  return response;
}


export const register= async ({
    name,
    email,
    password,
  }) => {
    const response = await instanceBaza2.post(`/auth/register`, {
      email,
      password,
      name,
    });

    token.set(response.data.token);
    return response;
  }
  export const changePassword = async ({
    oldPassword,
    newPassword,
  }) => {
    const response = await instanceBaza2.patch(`/auth/changePassword`, {
      oldPassword,
      newPassword,
    });

    token.set(response.data.token);
    return response;
  }
  export const passwordRequestReset = async ({
    email,
  }) => {
    const response = await instanceBaza2.post(`/auth/passwordRequestReset`, {
      email,
    });

    token.set(response.data.token);
    return response;
  }

export const passwordReset = async ({
    userId,
    token,
    password,
  })=> {
    const response = await instanceBaza2.post(`/auth/passwordReset`, {
      userId,
      token,
      password,
    });
    return response;
  }