export default axios => ({
  getArticleList(params) {
    return axios.get(`/api/article/articleList`, { params });
  },
  getArticlInfo(id) {
    return axios.get(`/api/article/articleInfo/${id}`);
  },
  getRecommendArticleList() {
    return axios.get(`/api/article/recommendArticleList`, { params: { pageIndex: 1, pageSize: 999 } });
  }
});