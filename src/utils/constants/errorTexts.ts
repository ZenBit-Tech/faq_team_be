export const AuthServiceErrors = {
  errors: {
    VALIDATION: 'An error occurred while validating user',
    INVALID_CREDENTIALS: 'Invalid credentials',
    LOGIN: 'An error occurred while logging in',
    REGISTER: 'An error occurred while registering user',
    ACCESS_TOKEN: 'An error occured when generating a new access token,',
  },
};

export const UsersServiceErrors = {
  errors: {
    FIND: 'An error occurred while finding the user',
    NOT_FOUND: (email: string) => `User with email ${email} not found`,
    CREATE: 'An error occurred while creating the user',
  },
  uuid: 'uuidv4',
};
