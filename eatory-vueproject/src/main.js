import './assets/main.css' // 기존 main.css 파일
//import './assets/base.css' // base.css 파일이 생성된 경우에만 추가

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar'

// v-calendar 기본 스타일 가져오기
import 'v-calendar/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VCalendar, {})

app.mount('#app')
