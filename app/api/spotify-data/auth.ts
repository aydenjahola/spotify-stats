import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    throw new Error("Unauthorized");
  }
  return session;
}
