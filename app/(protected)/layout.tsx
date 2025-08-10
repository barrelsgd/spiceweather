import { requireAuthOrRedirect } from '@/lib/auth';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuthOrRedirect('/login');
  return <>{children}</>;
}
