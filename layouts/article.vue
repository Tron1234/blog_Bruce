<template>
  <Nuxt />
</template>
<script>
export default {
  computed: {
    theme() {
      return this.$store.state.themes.theme;
    }
  },
  mounted() {
    document.body.classList.add(`bg-${this.theme}-200`);
  }
}
</script>