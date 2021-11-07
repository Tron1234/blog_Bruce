<template>
  <div class="flex justify-center min-h-screen">
    <div class="flex flex-col container" :class="bg200">
      <div class="flex justify-between sm:p-4 sm:pb-3 sm:pt-3">
        <div class="flex flex-col justify-between flex-grow">
          <div class="
              sm:justify-between
              sm:rounded-md
              hidden
              w-full
              sm:flex
            ">
            <!-- 时间 -->
            <div></div>
            <!-- 主题 -->
            <div class="flex items-center">
              <div class="
                  w-7
                  h-7
                  flex
                  items-center
                  justify-center
                  rounded-full
                  cursor-pointer
                  ml-2
                " :class="item.color == theme ? bg100 : 'bg-white'" v-for="(item, index) in themeList" :key="index" @click="setThemes(item.color)">
                <div class="
                    w-4/5
                    h-4/5
                    flex
                    items-center
                    justify-center
                    rounded-full
                  " :class="item.color == theme ? 'bg-white' : item.bg200">
                  <icon :class="item.color == theme ? item.text200 : 'hidden'" type="common-yes" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- 个人logo -->
        <div class="
            items-center
            justify-end
            hidden
            sm:flex
            sm:w-1/4 2xl:w-3/15
          ">
          <img class="rounded-full w-8 mr-4" :src="getUserInfo.avatar" />
          <div class="text-xl font-bold text-gray-800">
            {{getUserInfo.nickname}}
          </div>
        </div>
      </div>
      <Nuxt keep-alive class="flex-grow" />

      <!-- <div class="sm:hidden sm:w-full mt-2 mx-2">
        <Nuxt />
      </div> -->
      <!-- 版权信息 -->
      <footer class="
          flex
          flex-col
          items-center
          justify-between
          px-6
          py-2
          sm:flex-row
          whitespace-nowrap
        " :class="bg200">
        <a class="hidden sm:block text-xl font-bold text-gray-800 hover:text-gray-700">contact</a>

        <p class="text-gray-800">
          Copyright © {{ currentYear }} Bruce. All rights reserved.
        </p>

        <div class="hidden sm:flex -mx-2">
          <a :href="getUserInfo.github" class="mx-2 text-gray-600 hover:text-gray-500" aria-label="Github">
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
            </svg>
          </a>

          <a :href="getUserInfo.twitter" class="mx-2 text-gray-600 hover:text-gray-500" aria-label="Twitter">
            <svg class="w-7 h-7 fill-current" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
    <!-- 移动端切换主题 -->
    <div id="otherThemes" class="sm:hidden fixed right-8 bottom-8 flex items-center">
      <div class="
          w-11
          h-11
          flex
          items-center
          justify-center
          rounded-full
          cursor-pointer
          mr-2
          bg-white
        " :class="{ 'transition-transform': isShowThemes !== null }" :style="{
          transform: isShowThemes
            ? 'translateX(0px)'
            : `translateX(${3.25 * (themeListExtra.length - index) + 'rem'})`,
        }" v-for="(item, index) in themeListExtra" :key="index" @click="setThemes(item.color)">
        <div class="w-4/5 h-4/5 flex items-center justify-center rounded-full" :class="item.bg200">
          <icon class="text-lg hidden" type="common-yes" />
        </div>
      </div>
      <div class="w-11 h-11 flex items-center justify-center rounded-full z-10 cursor-pointer" :class="bg100" @click="changeShowThemes">
        <div class="
            w-4/5
            h-4/5
            flex
            items-center
            justify-center
            rounded-full
            bg-white
          ">
          <icon class="text-xl font-bold" :class="text200" type="common-yes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
const month = new Date().getMonth() + 1; //获取当前时间
export default {
  data() {
    return {
      isShowThemes: null
    };
  },
  computed: {
    ...mapGetters('user', ['getUserInfo']),
    currentYear() {
      return this.$dayjs().year();
    },
    text200() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `text-red-200`;
          break;
        case 'pink':
          temp = `text-pink-200`;
          break;
        case 'orange':
          temp = `text-orange-200`;
          break;
        case 'green':
          temp = `text-green-200`;
          break;
        case 'blue':
          temp = `text-blue-200`;
          break;
        case 'purple':
          temp = `text-purple-200`;
          break;
      }
      return temp;
    },
    bg200() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `bg-red-200`;
          break;
        case 'pink':
          temp = `bg-pink-200`;
          break;
        case 'orange':
          temp = `bg-orange-200`;
          break;
        case 'green':
          temp = `bg-green-200`;
          break;
        case 'blue':
          temp = `bg-blue-200`;
          break;
        case 'purple':
          temp = `bg-purple-200`;
          break;
      }
      return temp;
    },
    bg100() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `bg-red-100`;
          break;
        case 'pink':
          temp = `bg-pink-100`;
          break;
        case 'orange':
          temp = `bg-orange-100`;
          break;
        case 'green':
          temp = `bg-green-100`;
          break;
        case 'blue':
          temp = `bg-blue-100`;
          break;
        case 'purple':
          temp = `bg-purple-100`;
          break;
      }
      return temp;
    },
    theme(){
      return this.$store.state.themes.theme;
    },
    themeList() {
      return this.$store.state.themes.themeList.map(item => {
        let bg200, text200;
        switch (item) {
          case 'red':
            bg200 = `bg-red-200`;
            text200 = `text-red-200`;
            break;
          case 'pink':
            bg200 = `bg-pink-200`;
            text200 = `text-pink-200`;
            break;
          case 'orange':
            bg200 = `bg-orange-200`;
            text200 = `text-orange-200`;
            break;
          case 'green':
            bg200 = `bg-green-200`;
            text200 = `text-green-200`;
            break;
          case 'blue':
            bg200 = `bg-blue-200`;
            text200 = `text-blue-200`;
            break;
          case 'purple':
            bg200 = `bg-purple-200`;
            text200 = `text-purple-200`;
            break;
        }
        return { color: item, bg200, text200 }
      })
    },
    themeListExtra() {
      let temp = this.$store.state.themes.themeList.filter((item) => {
        return item != this.$store.state.themes.theme;
      });
      return temp.map(item => {
        let bg200;
        switch (item) {
          case 'red':
            bg200 = `bg-red-200`;
            break;
          case 'pink':
            bg200 = `bg-pink-200`;
            break;
          case 'orange':
            bg200 = `bg-orange-200`;
            break;
          case 'green':
            bg200 = `bg-green-200`;
            break;
          case 'blue':
            bg200 = `bg-blue-200`;
            break;
          case 'purple':
            bg200 = `bg-purple-200`;
            break;
        }
        return { color: item, bg200 }
      })
    }
  },
  mounted(){
    document.body.classList.add(`bg-${this.theme}-200`);
  },
  methods: {
    ...mapMutations('themes', ['setTheme']),
    setThemes(params) {
      this.isShowThemes = false;
      this.setTheme(params);
    },
    changeShowThemes() {
      if (this.isShowThemes === null) {
        this.isShowThemes = true;
        return;
      }
      this.isShowThemes = !this.isShowThemes;
    }
  }
};
</script>

<style>

</style>
