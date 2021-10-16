export default function (ctx) {
  ctx.$axios.onRequest(config => {
    console.log('请求的url：' + config.url);
  })

  ctx.$axios.onResponse(response => {
    //console.log('请求结果：', response);
    if (response.status == 200) {
      if(response.data.code!=200){
        return ctx.$toast.show({
          type: 'danger',
          title: 'Error',
          message: response.data.msg
        })
      }
      return response.data.data;
    }
  })

  ctx.$axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code !== 200) {
        return ctx.$toast.show({
          type: 'danger',
          title: 'Error',
          message: error.response.data.msg
        })
      }
  })
}