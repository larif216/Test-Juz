import Api from '@/services/Api'

export default {
  getJuz (params) {
    return Api().get('juz/' + params.numberOfJuz + '/quran-uthmani')
  }
}
