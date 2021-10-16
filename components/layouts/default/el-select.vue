<template>
  <div class="sm:w-24 md:w-32 lg:w-36 w-20 text-lg sm:text-base">
    <div class="relative">
      <button
        type="button"
        class="cursor-pointer clear-tap relative w-full h-10 sm:h-12 bg-white rounded-md shadow-sm pl-2 pr-6 md:pl-3 md:pr-10 text-left focus:outline-none focus:ring-2 focus:border-transparent"
        :class="focusring300"
        @click="isShowOptions = !isShowOptions"
      >
        <span class="flex items-center">
          <span class="sm:ml-2 md:ml-3 block truncate text-gray-700">
            {{ list[selectIndex].name }}
          </span>
        </span>
        <span
          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-2 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </button>
      <div
        :class="[
          isShowOptions !== ''
            ? isShowOptions
              ? 'listbox-actived'
              : 'listbox-inactived'
            : 'hidden',
        ]"
        class="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg"
      >
        <ul
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="listbox-ul max-h-56 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <li
            id="listbox-item"
            role="option"
            class="text-gray-600 cursor-pointer hover:text-white select-none relative py-1 sm:py-2 pl-2 md:py-3 md:pl-3 md:pr-9"
            :class="hoverbg300"
            v-for="(item, index) in list"
            :key="index"
            @click="getSelectOptions(index)"
          >
            <div class="flex items-center">
              <span class="sm:ml-2 md:ml-3 block font-normal truncate">
                {{ item.name }}
              </span>
            </div>
            <span
              v-if="index == selectIndex"
              class="absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-2 md:pr-4"
            >
              <svg
                class="h-4 w-4 sm:h-5 sm:w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowOptions: "", //是否展示其他options
      selectIndex: 0,
    };
  },
  computed:{
    hoverbg300(){
      let temp;
      switch(this.$store.state.themes.theme){
        case 'red':
         temp = `hover:bg-red-300`;
        break;
        case 'pink':
         temp = `hover:bg-pink-300`;
        break;
        case 'orange':
         temp = `hover:bg-orange-300`;
        break;
        case 'green':
         temp = `hover:bg-green-300`;
        break;
        case 'blue':
         temp = `hover:bg-blue-300`;
        break;
        case 'purple':
         temp = `hover:bg-purple-300`;
        break;
      }
      return temp;
    },
    focusring300(){
      let temp;
      switch(this.$store.state.themes.theme){
        case 'red':
         temp = `focus:ring-red-300`;
        break;
        case 'pink':
         temp = `focus:ring-pink-300`;
        break;
        case 'orange':
         temp = `focus:ring-orange-300`;
        break;
        case 'green':
         temp = `focus:ring-green-300`;
        break;
        case 'blue':
         temp = `focus:ring-blue-300`;
        break;
        case 'purple':
         temp = `focus:ring-purple-300`;
        break;
      }
      return temp;
    }
  },
  methods: {
    getSelectOptions(index) {
      this.selectIndex = index;
      this.$emit("selectResult", this.list[index].id);
      this.isShowOptions = false;
    },
  },
};
</script>
<style scoped>
.listbox-ul::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background-color: #fff;
}

.listbox-ul::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(204, 204, 204, 0.3);
  border-radius: 10px;
  background-color: rgb(223, 223, 223);
}
.listbox-ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(204, 204, 204, 0.3);
  background-color: #a8a8a8;
}

.listbox-actived {
  animation: listbox-fade-in 0.2s ease-in forwards;
}
.listbox-inactived {
  animation: listbox-fade-out 0.2s ease-out forwards;
}

@keyframes listbox-fade-in {
  0% {
    visibility: visible;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes listbox-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>