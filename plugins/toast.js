import { spawn } from '~/components/toast';

const containerClasses = [
  'z-40', 'fixed', 'inset-0', 'flex', 'flex-col-reverse', 'items-end', 'justify-end',
  'px-4', 'py-6', 'pointer-events-none', 'sm:p-6','mt-20','sm:mt-24'
]

export default (ctx, inject) => {
  if (process.client) {
    const toasts = document.createElement('div')
    containerClasses.forEach(c => toasts.classList.add(c))
    toasts.setAttribute('id', 'toasts')
    document.body.appendChild(toasts)
  }

  const ToastProgrammatic = {
    show(props) {
      if (typeof props === 'string') props = { message: props }
      return spawn('toasts', props)
    },
    success(message) {
      return spawn('toasts', { type: 'success', message })
    },
    info(message) {
      return spawn('toasts', { type: 'info', message })
    },
    danger(message) {
      return spawn('toasts', { type: 'danger', message, timeout: 20 })
    },
    warning(message) {
      return spawn('toasts', { type: 'warning', message, timeout: 10 })
    },
    denied(message) {
      return spawn('toasts', { type: 'denied', message, timeout: 10 })
    },
  }
  inject('toast', ToastProgrammatic)
}