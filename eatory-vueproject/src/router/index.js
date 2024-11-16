import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import User from "../views/UserView.vue";
import UserSignup from "@/views/UserSignup.vue";

import UserLogin from "@/components/user/UserLogin.vue";
import UserDetail from "@/components/user/UserDetail.vue";

import BasicInfoView from "@/components/user/signup/BasicInfoView.vue";
import DateOfBirthView from "@/components/user/signup/DateOfBirthView.vue";
import AccountCreationView from "@/components/user/signup/AccountCreationView.vue";
import CreateAccountChoiceView from "@/components/user/signup/CreateAccountChoiceView.vue";
import MemberNameView from "@/components/user/signup/MemberNameView.vue";
import PhoneNumberView from "@/components/user/signup/PhoneNumberView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: UserSignup,
    children: [
      {
        path: "", // 기본 경로로 이동했을 때 BasicInfoView가 나타남
        name: "basicInfo",
        component: BasicInfoView,
      },
      {
        path: "dob", // Date of Birth
        name: "dateOfBirth",
        component: DateOfBirthView,
      },
      {
        path: "/create-account-choice",
        name: "createAccountChoice",
        component: CreateAccountChoiceView, // 새로운 선택 화면
      },
      {
        path: "account", // Account Creation
        name: "accountCreation",
        component: AccountCreationView,
      },
      {
        path: "member-name", // Member Name
        name: "memberName",
        component: MemberNameView,
      },
      {
        path: "phone", // Phone Number
        name: "phoneNumber",
        component: PhoneNumberView,
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: User,
    children: [
      {
        path: ":id", // :id는 동적 경로
        name: "userDetail",
        component: UserDetail,
        props: true, // 컴포넌트로 :id를 prop으로 전달
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
