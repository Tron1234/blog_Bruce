export default axios => ({
  getBlogInfo() {
    return axios.get(`/api/user/blogInfo`);
  },
  sendContactMessage(message) {
    return axios.post(`/api/user/contact`,message);
  }
});