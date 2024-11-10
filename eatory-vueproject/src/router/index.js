import { createRouter, createWebHistory } from 'vue-router'
import BasicInfoView from '../views/signup/BasicInfoView.vue'
import DateOfBirthView from '../views/signup/DateOfBirthView.vue'
import PhoneNumberView from '../views/signup/PhoneNumberView.vue'
import AccountCreationView from '../views/signup/AccountCreationView.vue'
import MemberNameView from '../views/signup/MemberNameView.vue'

const routes = [
  { path: '/signup/basic-info', name: 'BasicInfo', component: BasicInfoView },
  { path: '/signup/date-of-birth', name: 'DateOfBirth', component: DateOfBirthView },
  { path: '/signup/phone-number', name: 'PhoneNumber', component: PhoneNumberView },
  { path: '/signup/create-account', name: 'AccountCreation', component: AccountCreationView },
  { path: '/signup/member-name', name: 'MemberName', component: MemberNameView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
