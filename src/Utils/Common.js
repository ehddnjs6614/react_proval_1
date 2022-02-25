// 세션 저장소를 사용하여 토큰을 관리하고 사용자 정보
export const getUser = () => {
  const userStr = sessionStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)
  else return null
}
export const getToken = () => {
  return sessionStorage.getItem('token') || null
}
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const removeUserSession = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
}
