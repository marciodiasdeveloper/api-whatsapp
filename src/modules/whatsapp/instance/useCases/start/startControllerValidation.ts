import * as yup from "yup";

const startSchema = yup.object({
  params: yup.object({
    sessionName: yup.string().required(),
  }),
});

export default startSchema;
