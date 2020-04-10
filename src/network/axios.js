import originAxios from 'axios'

export default function axios(option) {
  return new Promise(((resolve, reject) => {
    //创建axios实例
    const instance = originAxios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:5000
    });

    //配置请求和响应拦截
    instance.interceptors.request.use(config =>{
      return config

    },
      error => {
      return error
      })

    //响应拦截
    instance.interceptors.response.use(response =>{
      return response.data
    },error => {
      console.log('响应拦截出错');
      console.log(error);
      if (error && error.response){
        switch (error.response.status) {
          case 400:
            error.message = '请求错误'
            break
          case 401:
            error.message = '未经授权的访问'
            break
        }
      }
        return error
    })

    //传入对象进行网络请求
    instance(option).then(res =>{
      resolve(res)
    }).catch(err =>{
      reject(err)
    })

  }))
}
