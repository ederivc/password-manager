import {
  Login,
  Website,
  NotFound,
  Register,
  Account,
  Category,
  Passwords,
  ResetPassword,
  Categories,
  ForgotPassword,
  GeneratePassword,
} from "../pages";

const publicRoutes = [
  {
    path: "/",
    Component: Website,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgotPassword",
    Component: ForgotPassword,
  },
  {
    path: "/resetPassword/:userId/:token",
    Component: ResetPassword,
  },
  {
    path: "*",
    Component: NotFound,
  },
];

const privateRoutes = [
  {
    path: "/generatePassword",
    Component: GeneratePassword,
  },
  {
    path: "/passwords",
    Component: Passwords,
  },
  {
    path: "/account",
    Component: Account,
  },
  {
    path: "/categories",
    Component: Categories,
  },
  {
    path: "/categories/:categoryName/:categoryId",
    Component: Category,
  },
];

export { publicRoutes, privateRoutes };
