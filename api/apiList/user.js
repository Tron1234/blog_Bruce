export default axios => ({
  getBlogInfo() {
    return axios.get(`/api/user/blogInfo`);
  }
});