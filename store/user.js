export const state = () => ({
  userInfo: {}
})

export const getters = {
  getUserInfo(state){
    return state.userInfo;
  }
}

export const mutations = {
  setUserInfo(state, obj) {
    state.userInfo = obj;
  }
}

export const actions = {
  async requestUserInfo({ commit }) {
    const result = await this.$api.user.getBlogInfo();
    commit('setUserInfo', result);
  }
}