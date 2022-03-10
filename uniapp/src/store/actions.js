import { UPDATE_USERINFO } from './mutations-type'

export default {
  UPDATE_USERINFO (context) {
    console.log(context)
    return new Promise(resolve => {
      setTimeout(() => {
        context.commit(UPDATE_USERINFO, 'successfuly')
        resolve('successfuly')
      }, 5000)
    })
  }
}
