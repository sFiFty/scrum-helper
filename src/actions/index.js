export const actions = {
  SIGN_OUT_USER: Symbol('SIGN_OUT_USER'),
  AUTH_USER: Symbol('AUTH_USER'),
};

export default {
  SIGN_OUT_USER: user => ({
    type: actions.SIGN_OUT_USER,
    user,
  }),
  AUTH_USER: user => ({
    type: actions.AUTH_USER,
    user,
  }),
};
