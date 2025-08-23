import { logoutAction } from "@/app/(root)/(auth)/logout/actions";

export default function LogoutForm() {
  return (
    <form action={logoutAction}>
      <button
        aria-label="Log out"
        className="rounded-full px-4 py-2.5 font-medium text-sm transition-colors hover:bg-muted"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
}
