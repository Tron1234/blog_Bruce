<template>
  <transition name="fade">
    <div v-if="visible" class="contact-dialog" @click.stop.prevent="close">
      <section class="w-full max-w-xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" @click.stop.prevent="">
        <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Contact Bruce</h2>

        <div class="mt-6">
          <form>
            <div class="items-center -mx-2 md:flex">
              <div class="w-full mx-2">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">昵称</label>

                <input v-model="form.nickname" class="block w-full px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none" :class="[focusborder500]" type="text">
              </div>

              <div class="w-full mx-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">邮箱</label>

                <input v-model="form.email" class="block w-full px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none" :class="[focusborder500]" type="email">
              </div>
            </div>

            <div class="w-full mt-4">
              <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">消息</label>

              <textarea v-model="form.content" maxlength="250" class="block w-full h-40 max-h-40 px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none" :class="[focusborder500]" />
            </div>

            <div class="flex justify-end mt-6">
              <button class="px-4 py-2 text-gray-500 hover:text-white focus:text-white transition-colors duration-200 transform bg-gray-200 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 mr-4" @click="close">取消</button>
              <button class="px-4 py-2 text-white cursor-pointer transition-colors duration-200 transform rounded-md focus:outline-none" :class="[bg600,hoverbg500,focusbg500]" type="submit" @click="send">发送</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        nickname: '',
        email: '',
        content: ''
      }
    }
  },
  computed: {
    focusborder500() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `focus:border-red-500`;
          break;
        case 'pink':
          temp = `focus:border-pink-500`;
          break;
        case 'orange':
          temp = `focus:border-orange-500`;
          break;
        case 'green':
          temp = `focus:border-green-500`;
          break;
        case 'blue':
          temp = `focus:border-blue-500`;
          break;
        case 'purple':
          temp = `focus:border-purple-500`;
          break;
      }
      return temp;
    },
    bg600() {
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
    hoverbg500() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `hover:bg-red-600`;
          break;
        case 'pink':
          temp = `hover:bg-pink-600`;
          break;
        case 'orange':
          temp = `hover:bg-orange-600`;
          break;
        case 'green':
          temp = `hover:bg-green-600`;
          break;
        case 'blue':
          temp = `hover:bg-blue-600`;
          break;
        case 'purple':
          temp = `hover:bg-purple-600`;
          break;
      }
      return temp;
    },
    focusbg500() {
      let temp;
      switch (this.$store.state.themes.theme) {
        case 'red':
          temp = `focus:bg-red-600`;
          break;
        case 'pink':
          temp = `focus:bg-pink-600`;
          break;
        case 'orange':
          temp = `focus:bg-orange-600`;
          break;
        case 'green':
          temp = `focus:bg-green-600`;
          break;
        case 'blue':
          temp = `focus:bg-blue-600`;
          break;
        case 'purple':
          temp = `focus:bg-purple-600`;
          break;
      }
      return temp;
    }
  },
  methods: {
    scrollprevent(e) {
      e.preventDefault();
    },
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    async send() {
      if (!this.form.nickname) {
        return this.$toast.show({
          type: 'danger',
          title: '错误',
          message: '昵称不能为空！'
        });
      }
      if (!this.form.email) {
        return this.$toast.show({
          type: 'danger',
          title: '错误',
          message: '邮箱不能为空！'
        });
      }
      if (!this.form.content) {
        return this.$toast.show({
          type: 'danger',
          title: '错误',
          message: '消息不能为空!'
        });
      }
      await this.$api.user.sendContactMessage(this.form);
      this.close();
      this.form.nickname = '';
      this.form.email = '';
      this.form.content = '';
      this.$toast.show({
        type: 'success',
        title: '成功',
        message: '消息发送成功!'
      });
    }
  }
}
</script>
<style scoped>
.contact-dialog {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active {
  transition: all 0.2s ease;
}
.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(1.1);
  opacity: 0;
}
</style>