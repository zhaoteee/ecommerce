import { currentUser } from "@clerk/nextjs/server";

export const verifyAdminUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthenticated.");
  if (user.privateMetadata.role !== "ADMIN") {
    throw new Error("Unauhorized Access: Admin Privileges Required for Entry");
  }
  return user;
};
