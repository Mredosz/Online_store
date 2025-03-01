import { UserRole } from "../enum/user-role";

export default interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  role: UserRole;
}
