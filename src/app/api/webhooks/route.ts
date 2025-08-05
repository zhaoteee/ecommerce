import { User } from "@/generated/prisma";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const data = evt.data;
      const user: Partial<User> = {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        picture: data.image_url,
      };
      console.log(user, evt.type);
      const dbUser = await db.user.upsert({
        where: {
          email: user.email,
        },
        update: user,
        create: {
          id: user.id,
          name: user.name || "",
          email: user.email || "",
          picture: user.picture || "",
          role: user.role || "SELLER",
        },
      });
      const client = await clerkClient();
      await client.users.updateUserMetadata(evt.data.id, {
        privateMetadata: {
          role: dbUser.role || "SELLER",
        },
      });
    }
    if (evt.type === "user.deleted") {
      await db.user.delete({
        where: { id: evt.data.id },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
