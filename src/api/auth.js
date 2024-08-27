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

// Response body
// {
//   "_id": "66784417e8df71a9ba2e74df",
//   "name": "John",
//   "email": "user@example.com",
//   "passwordHash": "$2b$10$tmyQubyZG8zK3VvFKJi2fOCOkybnGCPK9UajrU9NxP.6N5nr6k0YG",
//   "__v": 0,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc4NDQxN2U4ZGY3MWE5YmEyZTc0ZGYiLCJpYXQiOjE3MjA4NTQwODYsImV4cCI6MTcyMzQ0NjA4Nn0.d2zhoKsLjUSaYRDo-4sjWdKUVqYVMgrk1jzgDS4YM8E"
// }

export const registerAdmin = async ({
    name,
    email,
    password,
  }) => {

  const response = await instanceBaza2.post(`${authEndpoint}/register`, {
    email,
    password,
    name,
  });
    return response; 
}
  // {
  //   "email": "user@example.com",
  //   "password": "password123",
  //   "name": "John"
  // }


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

export const passwordRequestReset = async ({
  email,
}) => {
  const response = await instanceBaza2.post(`${authEndpoint}/passwordRequestReset`, {
    email,
  });
    return response; 
}

export const passwordReset = async ({
    userId,
    token,
    password,
  })=> {

  const response = await instanceBaza2.post(`${authEndpoint}/passwordReset`, {
    userId,
    token,
    password,
  });
    return response;   
}