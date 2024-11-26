import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import User from "../views/UserView.vue";
import UserSignup from "@/views/UserSignup.vue";

import UserLogin from "@/components/user/UserLogin.vue";
import UserProfile from "@/components/user/UserProfile.vue";

import BasicInfoView from "@/components/user/signup/BasicInfoView.vue";
import DateOfBirthView from "@/components/user/signup/DateOfBirthView.vue";
import AccountCreationView from "@/components/user/signup/AccountCreationView.vue";
import CreateAccountChoiceView from "@/components/user/signup/CreateAccountChoiceView.vue";
import MemberNameView from "@/components/user/signup/MemberNameView.vue";
import PhoneNumberView from "@/components/user/signup/PhoneNumberView.vue";
import AllergyView from "@/components/user/AllergyView.vue";
import OAuth2CallbackView from "@/components/user/socialLogin/OAuth2CallbackView.vue";
import CalendarView from "@/views/CalendarView.vue";
import PostFeed from "@/components/post/PostFeed.vue"

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
        name: "userProfile",
        component: UserProfile,
        props: true, // 컴포넌트로 :id를 prop으로 전달
        children: [
          {
            path: "allergies",
            name: "allergyView", 
            component: AllergyView,
          }
        ]
      },
    ],
  },
  {
    path: "/oauth2/callback",
    name: "OAuth2Callback", 
    component:OAuth2CallbackView, //콜백 처리 뷰 
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin,
  },
  {
    path: "/calendar", // 캘린더 경로 추가
    name: "calendar",
    component: CalendarView,
    beforeEnter: (to, from, next) => {
      const userInfo = sessionStorage.getItem("user-info"); // 세션에서 유저 정보 확인
      if (userInfo) {
        next(); // 유저가 로그인 상태이면 캘린더로 이동
      } else {
        alert("로그인이 필요합니다."); // 비로그인 상태일 경우 경고 메시지
        next({ name: "login" }); // 로그인 페이지로 리다이렉트
      }
    },
  },
  {
    path: "/postFeed",
    name: "postFeed",
    component: PostFeed,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
