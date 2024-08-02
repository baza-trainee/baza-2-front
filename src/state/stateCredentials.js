export const credentialsSessionStorage={
  get:()=>{
    const credentials = sessionStorage.getItem('credentials');
    if (credentials) {
      const credentialsData = JSON.parse(credentials);
      return credentialsData
    }else return null
  },

  set: (data) => {
    sessionStorage.setItem(
      'credentials',
      JSON.stringify({...data})
    )
  },
}

export const credentialslocalStorage={
  get:()=>{
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      const credentialsData = JSON.parse(credentials);
      return credentialsData
    }else return null
  },

  set: (data) => {
    localStorage.setItem(
      'credentials',
      JSON.stringify({...data})
    )
  },

  reset: () => {
    localStorage.removeItem('credentials')
  },
}