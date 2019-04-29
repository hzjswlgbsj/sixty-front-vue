/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2019/4/29
 * Time: 11:49
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}
const i18n = new VueI18n({
  locale: 'zh',
  messages
})
export default i18n
