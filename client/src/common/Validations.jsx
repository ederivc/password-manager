import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const accountValidations = (user, changePassword) => {
  const schema = Yup.object().shape(
    {
      name: Yup.string()
        .min(5)
        .max(10)
        .default(user.name ? user.name : ""),
      email: Yup.string()
        .email()
        .min(8)
        .default(user.email ? user.email : ""),
      phoneNumber: Yup.string()
        .notRequired()
        .default(user.phoneNumber ? user.phoneNumber : "")
        .when("phoneNumber", {
          is: (value) => value?.length,
          then: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
        }),
      birthDate: Yup.date()
        .notRequired()
        .default(user.birthDate ? user.birthDate : () => new Date())
        .when("birthDate", {
          is: (value) => value?.length,
          then: Yup.date(),
        }),
      changePasswordYup: Yup.bool().default(changePassword),
      newPassword: Yup.string()
        .default("")
        .when("changePasswordYup", {
          is: true,
          then: Yup.string().min(1).max(15),
        }),
      confirmPassword: Yup.string()
        .default("")
        .when("changePasswordYup", {
          is: true,
          then: Yup.string().min(1).max(15),
        }),
      password: Yup.string()
        .default("")
        .when("changePasswordYup", {
          is: true,
          then: Yup.string().min(1).max(15),
        }),
    },
    [
      ["phoneNumber", "phoneNumber"],
      ["birthDate", "birthDate"],
    ]
  );

  return schema;
};

const updatePasswordValidation = (
  passwordName = "",
  password = "",
  category = ""
) => {
  const schema = Yup.object().shape({
    passwordName: Yup.string().min(5).max(15).default(passwordName),
    password: Yup.string().min(8).max(20).default(password),
    category: Yup.string().default(category),
  });

  return schema;
};

export { accountValidations, updatePasswordValidation };
