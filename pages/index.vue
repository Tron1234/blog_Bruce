<template>
  <div class="flex flex-grow" :class="scrollBarColor">
    <div class="w-0 flex-grow md:px-5 lg:pr-1 md:pb-4">
      <div class="fixed left-0 top-0 w-full h-26 sm:h-auto sm:static z-50 md:z-0 mb-4">
        <!-- 搜索框 -->
        <div class="
              flex
              items-center
              p-2
              sm:p-1.5
              bg-gray-200
              dark:bg-gray-800
              sm:rounded-md
              w-full
            ">
          <!-- select -->
          <el-select v-if="classiftyList.length>0" ref="elSelect" :list="classiftyList" @selectResult="getSearchClassifty" />
          <!-- 搜索框 -->
          <div class="ml-2 flex relative rounded-md bg-white w-full shadow-sm" :class="
                searchFocus ? `ring-2 ${ring300} border-transparent` : ''
              ">
            <label for="search-with-icon" class="
                  my-1
                  sm:my-2
                  rounded-l-md
                  inline-flex
                  items-center
                  px-3
                  sm:px-5
                  lg:px-7
                  xl:px-8
                  cursor-pointer
                  border-r-2 border-gray-100
                  text-gray-500 text-sm
                ">
              <svg t="1621058154759" class="icon w-3.5 sm:w-4 md:w-5" viewBox="0 0 1057 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1896">
                <path d="M409.012356 811.965935c-108.676129 0.660645-213.058065-41.851871-289.924129-117.991225A401.242839 401.242839 0 0 1 0.006937 406.594065a401.242839 401.242839 0 0 1 119.015226-287.512775A408.344774 408.344774 0 0 1 409.012356 0.990968a408.344774 408.344774 0 0 1 289.924129 118.05729 401.275871 401.275871 0 0 1 119.08129 287.44671 401.275871 401.275871 0 0 1-119.048258 287.380645 408.344774 408.344774 0 0 1-289.891096 118.090322h-0.066065z m0-695.130838A290.617806 290.617806 0 0 0 201.63584 200.836129a285.563871 285.563871 0 0 0-84.69471 205.625806c0 162.221419 128.495484 289.626839 292.071226 289.626839 163.641806 0 292.13729-127.405419 292.13729-289.560774 0-162.221419-128.495484-289.725935-292.071225-289.725935h-0.066065zM957.942421 1005.799226l-173.980904-171.866839a55.130839 55.130839 0 0 1 0-80.235355c23.221677-22.990452 58.004645-22.990452 81.193291 0l173.947871 171.965936a55.130839 55.130839 0 0 1 0 80.235355 56.419097 56.419097 0 0 1-81.160258 0v-0.099097z" p-id="1897" fill="#C0C0C0" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path>
              </svg>
            </label>
            <input type="text" id="search-with-icon" class="
                  focus:outline-none
                  text-lg
                  sm:text-base
                  h-10
                  sm:h-12
                  rounded-r-lg
                  flex-1
                  appearance-none
                  w-full
                  px-4
                  text-gray-700
                  placeholder-gray-400
                " name="search" placeholder="搜索" @focus="searchFocusFunc" v-model="searchKey" @input="searchArticle" @blur="searchFocus = false" />
          </div>
        </div>
        <!-- 移动端分类 -->
        <div class="md:hidden flex w-full flex-col sm:flex-row sm:flex-grow">
          <div class="
            flex
            pt-1
            pb-2
            overflow-x-auto
            dark:bg-gray-800
            bg-gray-200
            w-full
          ">
            <div class="px-2" v-for="(item, index) of selectList" :key="index">
              <div class="
              flex
              items-center
              rounded-full
              whitespace-nowrap
              select-none
              py-1
              px-4
              text-sm
              border-2
              shadow-md
              cursor-pointer
              bg-white
              text-gray-600
              dark:border-gray-100
              dark:hover:border-white
              font-bold
            " :class="[
              categoryId==item.id
                ? `${bg200} dark:text-gray-800`
                : `dark:bg-gray-800 dark:text-gray-100 dark:hover:text-white ${hoverbg50}`,
            ]" @click="getArticleByMajorCategory(item.id)">
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文章 -->
      <div class="sm:w-full mx-3 pt-28 sm:m-0 sm:pt-0 sm:px-4 md:px-0 article-height">
        <div class="w-full cursor-pointer p-4 sm:px-8 bg-white rounded-lg shadow-md dark:bg-gray-800" :class="{'mt-4':index}" v-for="(item,index) of articleList" :key="index" @click="articleDetail(item.id)">
          <div class="flex items-center justify-between">
            <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{item.time | timeFilter}}</span>
            <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform rounded-lg tworow-ellipsis" :class="[bg500,hoverbg400]" @click.stop="getArticleBySecondaryCategory(item.secondaryCategoryId)">{{item.secondaryName}}</a>
          </div>

          <div class="mt-2">
            <a class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline tworow-ellipsis">{{item.title}}</a>
            <p class="mt-2 text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 tworow-ellipsis">{{item.content}}</p>
          </div>

          <div class="flex items-center justify-end mt-2 text-sm">
            <a :class="[text600,darktext400]" class="hover:underline">更多详情</a>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden md:block md:w-1/4 2xl:w-3/15">
      <!-- 分类和推荐文章 -->
      <div class="sm:block p-4">
        <!-- 分类 -->
        <div>
          <div class="
                sm:text-lg
                lg:text-xl
                xl:text-2xl
                text-gray-700
                font-bold
                mb-4
              ">
            分类
          </div>
          <div class="
                flex flex-wrap
                sm:justify-around
                lg:justify-center
                dark:bg-gray-800
                bg-white
                sm:pt-3
                lg:pt-4
                xl:pt-6
                rounded-md
                shadow-lg
              ">
            <div class="
                  flex
                  items-center
                  lg:mx-3
                  sm:mb-3
                  lg:mb-4
                  xl:mb-6
                  xl:text-base
                  2xl:text-lg
                  rounded-full
                  whitespace-nowrap
                  py-1
                  sm:text-sm
                  px-4
                  border-2
                  shadow-sm
                  cursor-pointer
                  text-gray-600
                  dark:border-gray-100
                  dark:hover:border-white
                  font-bold
                " :class="
                  categoryId==item.id
                    ? `${bg200} dark:text-gray-800`
                    : `dark:text-gray-100 dark:hover:text-white ${hoverbg50}`
                " v-for="(item, index) of selectList" :key="index" @click="getArticleByMajorCategory(item.id)">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <!-- 推荐文章 -->
        <div class="mt-5">
          <div class="
                sm:text-lg
                lg:text-xl
                xl:text-2xl
                text-gray-700
                font-bold
                mb-4
              ">
            推荐文章
          </div>
          <!-- 推荐文章1 -->
          <div class="commond-article">
            <div class="
                w-full
                p-4
                bg-white
                rounded-lg
                shadow-md
                dark:bg-gray-800
                cursor-pointer
              " :class="{'mt-4':index}" v-for="(item,index) of recommandArticleList" :key="index" @click="articleDetail(item.id)">
              <div class="flex items-center justify-between flex-wrap">
                <span class="text-xs font-light text-gray-600 dark:text-gray-400 whitespace-nowrap lg:text-sm leading-8">{{item.time | timeFilter}}</span>
                <a class="
                    py-1
                    px-2
                    xl:px-3
                    xl:text-sm
                    text-xs
                    font-bold
                    text-gray-100
                    transition-colors
                    duration-200
                    transform
                    rounded-lg
                    tworow-ellipsis
                  " :class="[bg500,hoverbg400]" @click="getArticleBySecondaryCategory(item.secondaryCategoryId)">{{item.secondaryName}}</a>
              </div>

              <div class="mt-2">
                <a class="
                    text-2xl
                    font-bold
                    text-gray-700
                    dark:text-white
                    hover:text-gray-600
                    dark:hover:text-gray-200
                    hover:underline
                    tworow-ellipsis
                  ">{{item.title}}</a>
                <p class="
                    mt-2
                    text-gray-600
                    dark:text-gray-300
                    dark:hover:text-gray-200
                    tworow-ellipsis
                  ">
                  {{item.content}}
                </p>
              </div>
              <div class="flex items-center justify-end mt-2 text-sm">
                <a :class="[text600,darktext400]" class="hover:underline">更多详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import elSelect from "@/components/layouts/default/el-select";
import utils from '@/assets/js';
export default {
  async asyncData({ app }) {
    let articleList = []
      , selectList = []
      , classiftyList = []
      , recommandArticleList = [];
    const page = {
      pageIndex: 1,
      pageSize: 5
    }
    app.store.dispatch('user/requestUserInfo');

    let result = await app.$api.article.getArticleList({ ...page, ...{ majorCategoryId: 1 } });
    articleList = result.list;

    result = await app.$api.category.getMajorCategoryList();
    selectList = result.list;
    classiftyList = utils.deepClone(selectList);
    classiftyList.unshift({ id: 0, name: '全部' });

    result = await app.$api.article.getRecommendArticleList();
    recommandArticleList = result.list;

    return {
      articleList,
      selectList,
      classiftyList,
      recommandArticleList
    }
  },
  data() {
    return {
      articleList: [],
      selectList: [],
      classiftyList: [],
      recommandArticleList: [],
      searchFocus: false,
      categoryId: 1,
      setTimer: null,     //搜索使用的延时器
      setCategoryTimer: null,    //改变文章类型使用的延时器
      searchCategoryId: 0,        //默认全部
      searchKey: '',              //
      page: {
        pageIndex: 1,
        pageSize: 999
      }
    }
  },
  computed: {
    darktext400() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `dark:text-red-400`;
          break;
        case 'pink':
          temp = `dark:text-pink-400`;
          break;
        case 'orange':
          temp = `dark:text-orange-400`;
          break;
        case 'green':
          temp = `dark:text-green-400`;
          break;
        case 'blue':
          temp = `dark:text-blue-400`;
          break;
        case 'purple':
          temp = `dark:text-purple-400`;
          break;
      }
      return temp;
    },
    text600() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `text-red-600`;
          break;
        case 'pink':
          temp = `text-pink-600`;
          break;
        case 'orange':
          temp = `text-orange-600`;
          break;
        case 'green':
          temp = `text-green-600`;
          break;
        case 'blue':
          temp = `text-blue-600`;
          break;
        case 'purple':
          temp = `text-purple-600`;
          break;
      }
      return temp;
    },
    bg500() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `bg-red-500`;
          break;
        case 'pink':
          temp = `bg-pink-500`;
          break;
        case 'orange':
          temp = `bg-orange-500`;
          break;
        case 'green':
          temp = `bg-green-500`;
          break;
        case 'blue':
          temp = `bg-blue-500`;
          break;
        case 'purple':
          temp = `bg-purple-500`;
          break;
      }
      return temp;
    },
    hoverbg400() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `hover:bg-red-400`;
          break;
        case 'pink':
          temp = `hover:bg-pink-400`;
          break;
        case 'orange':
          temp = `hover:bg-orange-400`;
          break;
        case 'green':
          temp = `hover:bg-green-400`;
          break;
        case 'blue':
          temp = `hover:bg-blue-400`;
          break;
        case 'purple':
          temp = `hover:bg-purple-400`;
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
    hoverbg50() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `hover:bg-red-50`;
          break;
        case 'pink':
          temp = `hover:bg-pink-50`;
          break;
        case 'orange':
          temp = `hover:bg-orange-50`;
          break;
        case 'green':
          temp = `hover:bg-green-50`;
          break;
        case 'blue':
          temp = `hover:bg-blue-50`;
          break;
        case 'purple':
          temp = `hover:bg-purple-50`;
          break;
      }
      return temp;
    },
    ring300() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `ring-red-300`;
          break;
        case 'pink':
          temp = `ring-pink-300`;
          break;
        case 'orange':
          temp = `ring-orange-300`;
          break;
        case 'green':
          temp = `ring-green-300`;
          break;
        case 'blue':
          temp = `ring-blue-300`;
          break;
        case 'purple':
          temp = `ring-purple-300`;
          break;
      }
      return temp;
    },
    scrollBarColor(){
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `scroll-bar-red`;
          break;
        case 'pink':
          temp = `scroll-bar-pink`;
          break;
        case 'orange':
          temp = `scroll-bar-orange`;
          break;
        case 'green':
          temp = `scroll-bar-green`;
          break;
        case 'blue':
          temp = `scroll-bar-blue`;
          break;
        case 'purple':
          temp = `scroll-bar-purple`;
          break;
      }
      return temp;
    }
  },
  components: {
    elSelect,
  },
  methods: {
    searchFocusFunc() {
      this.searchFocus = true;
      if (this.$refs.elSelect.isShowOptions) {
        this.$refs.elSelect.isShowOptions = false;
      }
    },
    async getArticleList(params) {
      let result = await this.$api.article.getArticleList({ ...params, ...this.page });
      if (params.secondaryCategoryId) {
        this.articleList = result.list;
        this.categoryId = result.majorId;
        return;
      }
      this.articleList = result.list;
    },
    getArticleBySecondaryCategory(id) {
      clearTimeout(this.setTimer);
      this.setTimer = null;
      this.searchKey = '';
      if (this.setCategoryTimer > 0) {
        return;
      }
      this.getArticleList({ secondaryCategoryId: id });
      this.setCategoryTimer = setTimeout(() => {
        clearTimeout(this.setCategoryTimer);
        this.setCategoryTimer = null;
      }, 300);
    },
    getArticleByMajorCategory(id) {
      clearTimeout(this.setTimer);
      this.setTimer = null;
      this.searchKey = '';
      this.categoryId = id;
      if (this.setCategoryTimer > 0) {
        return;
      }
      this.getArticleList({ majorCategoryId: id });
      this.setCategoryTimer = setTimeout(() => {
        clearTimeout(this.setCategoryTimer);
        this.setCategoryTimer = null;
      }, 300);
    },
    getSearchClassifty(id) {
      this.searchCategoryId = id;
      clearTimeout(this.setCategoryTimer);
      this.setCategoryTimer = null;
      if (this.setTimer > 0) {
        clearTimeout(this.setTimer);
        this.setTimer = null;
      }
      if (this.searchKey) {
        this.setTimer = setTimeout(() => {
          this.getArticleList({ searchKey: this.searchKey, searchCategoryId: this.searchCategoryId });
        }, 300);
      }
    },
    searchArticle(e) {
      clearTimeout(this.setCategoryTimer);
      this.setCategoryTimer = null;
      if (this.setTimer > 0) {
        clearTimeout(this.setTimer);
        this.setTimer = null;
      }
      this.searchKey = e.currentTarget.value;
      if (this.searchKey) {
        this.setTimer = setTimeout(() => {
          this.getArticleList({ searchKey: this.searchKey, searchCategoryId: this.searchCategoryId });
        }, 300);
      } else {
        this.setTimer = setTimeout(() => {
          this.getArticleList({ majorCategoryId: this.categoryId });
        }, 300);
      }
    },
    articleDetail(id) {
      this.$router.push({
        path: `/article/${id}`
      })
    }
  }
}
</script>

<style scoped>
.tworow-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;
}
.article-height {
  @media (min-width: 768px) {
    padding-right:4px;
    height: calc(100vh - 12.5rem);
    overflow-y: auto;
  }
}
.commond-article {
  @media (min-width: 768px) {
    padding-right:4px;
    height: 310px;
    overflow-y: auto;
  }
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  border-radius: 2px;
}

.scroll-bar-red ::-webkit-scrollbar-thumb{
  @apply bg-red-300;
}

.scroll-bar-pink ::-webkit-scrollbar-thumb{
  @apply bg-pink-300;
}

.scroll-bar-orange ::-webkit-scrollbar-thumb{
  @apply bg-orange-300;
}

.scroll-bar-green ::-webkit-scrollbar-thumb{
  @apply bg-green-300;
}

.scroll-bar-blue ::-webkit-scrollbar-thumb{
  @apply bg-blue-300;
}

.scroll-bar-purple ::-webkit-scrollbar-thumb{
  @apply bg-purple-300;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: var(--theme);
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  border-radius: 2px;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  /*border-radius: 10px;*/
  border-radius: 2px;
}
</style>
