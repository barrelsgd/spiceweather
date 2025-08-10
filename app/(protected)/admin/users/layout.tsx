import { requireSuperuserOrRedirect } from "@/lib/auth";

export default async function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  await requireSuperuserOrRedirect("/admin");
  return <>{children}</>;
}
