import { readUserSession } from "@/lib/actions";
import UserNavClient from "./user-nav-client";

export async function UserNav() {
  const { data: userSession } = await readUserSession();
  console.log("session", userSession.session);
  return <UserNavClient email={userSession.session.user.email} />;
}
