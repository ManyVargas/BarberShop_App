import api from "../lib/axios";

export default {
  register(data) {
    return api.post('/auth/register', data)
  },
  verifyAccount(token) {
    return api.get(`/auth/verified/${token}`);
  },
  login(data) {
    return api.post('/auth/login', data)
  },
  auth() {
    return api.get('/auth/user')
  }
}