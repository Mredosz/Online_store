import { UserRole } from "../enum/user-role";

export default interface Account {
  isLogged: boolean;
  isAdmin?: boolean;
  role: UserRole;
}
