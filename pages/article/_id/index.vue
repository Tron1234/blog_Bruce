<template>
  <div>
    <!-- sideBar -->
    <div class="h-screen flex flex-row bg-gray-100 box-border">
      <div class="z-10 fixed inset-0 flex flex-col justify-between transition-all pt-4 pb-8 border-r-2 border-gray-100 overflow-hidden w-60" :class="[{'-translate-x-60 transform':hideMenu},bg200]">
        <div class="absolute top-3 right-3 text-2xl" @click="hideMenu = true">
          <icon class="cursor-pointer text-2xl" type="menu_hide" />
        </div>
        <div class="flex flex-col">
          <p class="px-8 text-3xl font-bold mb-6">目录</p>
          <ul class="flex flex-col pl-6 pr-4 menu-height">
            <li v-for="(anchor,index) in titles" :key="index" :style="{paddingLeft:`${anchor.indent*18}px`}" @click="handleAnchorClick(anchor)">
              <a class="flex flex-row flex-wrap items-center py-1 transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                {{anchor.title}}
              </a>
            </li>
          </ul>
        </div>
        <div class="flex pl-9">
          <img class="rounded-full w-8 h-8 object-contain mr-4" :src="getUserInfo.avatar" />
          <div class="text-xl font-bold text-gray-800">
            {{getUserInfo.nickname}}
          </div>
        </div>
      </div>
      <div class="absolute left-0 top-0 right-0 transition-all bg-white" :class="[{'md:left-60':!hideMenu},bg200]">
        <div class="hidden sticky top-0 z-10 md:flex items-center justify-between px-8 py-3" :class="bg200">
          <div class="flex items-center">
            <div class="mr-4" v-show="hideMenu" @click="hideMenu = false">
              <icon class="cursor-pointer text-2xl" type="menu_show" />
            </div>
            <div class="font-bold text-3xl">{{articleInfo.title}}</div>
          </div>
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
        <div class="md:hidden fixed top-0 left-0 w-screen h-14 box-border flex justify-between px-4 pt-3" style="z-index:2" :class="bg200">
          <nuxt-link to="/">
            <icon class="cursor-pointer text-2xl" type="back" />
          </nuxt-link>
          <div class="font-bold text-xl">{{articleInfo.title}}</div>
          <div @click="hideMenu = !hideMenu">
            <icon class="cursor-pointer text-2xl" type="menu_show" />
          </div>
        </div>
        <v-md-preview class="md:relative pt-14 md:pt-0" :style="{'--previewbg':bg200}" ref="preview" :text="articleInfo.content" />
      </div>
    </div>
    <!-- 移动端切换主题 -->
    <div id="otherThemes" class="md:hidden z-10 fixed right-8 bottom-8 flex items-center">
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
export default {
  layout: 'article',
  data() {
    return {
      titles: [],
      hideMenu: true,
      isShowThemes: null
    }
  },
  computed: {
    ...mapGetters('user', ['getUserInfo']),
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
    theme() {
      return this.$store.state.themes.theme;
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
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async asyncData({ app, params }) {
    const articleInfo = await app.$api.article.getArticlInfo(params.id);
    return {
      articleInfo
    }
  },
  mounted() {
    document.getElementsByClassName('vuepress-markdown-body')[0].classList.add('custom');
    this.hideMenu = document.body.clientWidth <= 768;
    const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
    const titles = Array.from(anchors).filter(title => !!title.innerText.trim());
    if (!titles.length) {
      this.titles = [];
      return;
    }
    const hTags = Array.from(new Set(titles.map(title => title.tagName))).sort();
    this.titles = titles.map(el => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName)
    }));
  },
  methods: {
    ...mapMutations('themes', ['setTheme']),
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;
      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60
        })
      }
      this.hideMenu = true;
    },
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
}
</script>
<style scoped>
li > a {
  @apply cursor-pointer;
}
::v-deep .vuepress-markdown-body {
  background: var(--previewbg);
  @apply px-5 md:px-8 pt-2 pb-6;
}
.menu-height{
  height:calc(100vh - 9.75rem);
  @apply overflow-y-auto;
}
</style>