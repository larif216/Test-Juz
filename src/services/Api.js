import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://api.alquran.cloud/v1/'
  })
}
