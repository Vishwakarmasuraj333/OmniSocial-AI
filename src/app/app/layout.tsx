import React from "react";
import { redirect } from "next/navigation";
import { getSession, destroySession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !session.id) {
    redirect("/login?redirectTo=/app");
  }

  let isAuthorized = false;
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, status: true, emailVerified: true },
    });

    if (user) {
      if (user.status === "ACTIVE") {
        isAuthorized = true;
      }
    } else {
      if (session.emailVerified !== false) {
        isAuthorized = true;
      }
    }
  } catch {
    if (session.emailVerified !== false) {
      isAuthorized = true;
    }
  }

  if (!isAuthorized) {
    await destroySession().catch(() => {});
    redirect("/login?logout=true");
  }

  return <>{children}</>;
}
