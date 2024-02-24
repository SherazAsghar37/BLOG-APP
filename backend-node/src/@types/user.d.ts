import { Genders, Roles } from "../utils/enums";
type User = {
  full_name: string;
  email: string;
  password: string;
  salt: string?;
  gender: Genders;
  role?: Roles?;
};

export { User };
