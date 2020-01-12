import Cookies from 'js-cookie'

export const getSession = () => {
  const jwt = Cookies.get('__session')
  let session
  try {
    if (jwt) {
        const base64Url = jwt.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')

        const vars = JSON.parse(window.atob(base64))

        session = {
            "jwt": jwt,
            "aud": vars.aud
        };
    }
  } catch (error) {
    console.log(error)
  }
  return session
}
export const logOut = () => {
  Cookies.remove('__session')
}

export const logIn = (jwt) => {
    Cookies.set("__session", jwt);
}