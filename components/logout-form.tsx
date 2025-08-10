import { logoutAction } from "@/app/(auth)/logout/actions";

export default function LogoutForm() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        aria-label="Log out"
      >
        Logout
      </button>
    </form>
  );
}
