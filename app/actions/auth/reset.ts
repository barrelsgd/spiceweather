'use server';

import { redirect } from 'next/navigation';
import { loginApi } from '@/lib/api';

export async function resetPasswordAction(formData: FormData) {
  const token = String(formData.get('token') || '').trim();
  const new_password = String(formData.get('new_password') || '');
  const next = String(formData.get('next') || '/');
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  try {
    if (!token) {
      throw new Error('Reset token is required');
    }
    if (!new_password) {
      throw new Error('New password is required');
    }

    await loginApi().resetPassword({ token, new_password });

    const url = new URL('/login', base);
    url.searchParams.set('success', 'Password has been reset. Please log in.');
    if (next) {
      url.searchParams.set('next', next);
    }
    redirect(url.toString());
  } catch (err) {
    const anyErr = err as { message?: string };
    const url = new URL('/reset', base);
    url.searchParams.set('error', anyErr.message || 'Failed to reset password');
    if (token) {
      url.searchParams.set('token', token);
    }
    if (next) {
      url.searchParams.set('next', next);
    }
    redirect(url.toString());
  }
}
