import { User } from "../../Model/User";
import { getUserData } from "../Connections/user";

export async function extractUser() {
  var user = await getUserData();

  return new User(user.username, user.email, user.id, []);
}
