"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      className="rounded-full"
      onClick={() => signOut({ callbackUrl: "/login" })}
      type="button"
      variant="secondary"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  );
}
