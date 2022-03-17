import { celebrate, Segments, Joi } from "celebrate";

class FormsValidators {
  checkIdExistsValidor() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
    });
  }
}

export { FormsValidators };
