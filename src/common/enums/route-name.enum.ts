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
  SEND_OTP = 'send-otp',
  VERIFY_OTP = 'verify-otp',

  SAVE_ROLE = 'save-role',
  SAVE_GENERAL_INFO = 'save-general-info',
  SAVE_ADDRESS = 'save-address',
  SAVE_CARD_INFO = 'save-card-info',
  SAVE_SIZES = 'save-sizes',

  GOOGLE_ROUTE = 'google',
  GOOGLE_REDIRECT = 'redirect',

  DOCS_ROUTE = 'api',
}
