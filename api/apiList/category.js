export default axios => ({
  getMajorCategoryList() {
    return axios.get(`/api/category/majorCategory`, { params: { pageIndex: 1, pageSize: 99 } });
  }
});