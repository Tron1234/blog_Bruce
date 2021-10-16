import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('timeFilter', val => dayjs(val).format('YYYY-MM-DD HH:mm'));