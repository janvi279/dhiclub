import Cookies from 'js-cookie'

export const getToken = () => {
  return Cookies.get('user_token')
}

export const setToken = (token) => {
  Cookies.set('user_token', token)
}

export const removeToken = () => {
  Cookies.remove('user_token')
}


export const getRole = () => {
  return Cookies.get('user_role')
}

export const setRole = (role) => {
  Cookies.set('user_role', role)
}

export const removeRole = () => {
  Cookies.remove('user_role')
}
