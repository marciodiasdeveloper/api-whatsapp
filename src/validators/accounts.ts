import { celebrate, Segments, Joi } from "celebrate";

class AccountsValidators {
  // constructor() {}
  checkEmailExistsValidor() {
    return celebrate({
      [Segments.QUERY]: {
        email: Joi.string().email().required(),
      },
    });
  }
  checkValidRegisterValidor() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
      },
    });
  }
}

export { AccountsValidators };
