export enum ERouteName {
  AUTH_ROUTE = 'auth',
  SIGNIN_ROUTE = 'sign-in',
  SIGNUP_ROUTE = 'sign-up',
  USERS_ROUTE = 'users',
  GET_USER = 'user/:id',
  RATE_USER = 'rate/:id',
  MAKE_REVIEW = '/user/make-review',
  GET_REVIEWS = '/user/reviews',
  DELETE_REVIEW = '/user/review/:id',
  USER_UPDATEBYID_ROUTE = 'update/:id',
  GET_USERS_ROUTE = 'get-all',
  SEND_OTP = 'send-otp',
  VERIFY_OTP = 'verify-otp',

  GOOGLE_ROUTE = 'google',
  GOOGLE_REDIRECT = 'redirect',

  DOCS_ROUTE = 'api',
}
