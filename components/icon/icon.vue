<template>
  <span class="icons-style" @click="$emit('iconClick')">{{icons[type]}}</span>
</template>
<script>
import config from "./config";
export default {
  props: {
    type: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
        icons:config
    }
  }
};
</script>
<style scoped>
@font-face {
	font-family: icons;
	src: url('./icomoon.ttf') format('truetype');
}

.icons-style{
	font-family: icons;
  user-select: none;
}
</style>