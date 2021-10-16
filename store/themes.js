export const state = () => ({
  theme: 'green',
  themeList: ['red', 'pink', 'orange', 'green', 'blue', 'purple']
})

export const mutations = {
  setTheme(state, name) {
    state.theme = name;
  }
}
