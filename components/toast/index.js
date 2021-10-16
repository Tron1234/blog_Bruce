import TvToast from './toast.vue';
import Vue from 'vue';
/*
 * utils.js
 * Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */
export function removeElement(el) {
  if (typeof (el).remove !== 'undefined')
    el.remove()
  else
    el.parentNode.removeChild(el)
}

// add the component w/ the specified props
export function spawn(id, propsData) {
  const Instance = Vue.extend(TvToast)
  if (process.client) {
    return new Instance({
      el: document.getElementById(id).appendChild(document.createElement('div')),
      propsData,
    })
  }
}