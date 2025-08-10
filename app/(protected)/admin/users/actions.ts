'use server';

import { redirect } from 'next/navigation';
import { usersApi } from '@/lib/api';
import type { UserCreate, UserUpdate } from '@/lib/api/types.gen';
import { requireSuperuserOrRedirect } from '@/lib/auth';

export async function createUserAction(formData: FormData) {
  await requireSuperuserOrRedirect('/admin');
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '').trim();
  const full_name = String(formData.get('full_name') || '').trim() || null;
  const is_active = String(formData.get('is_active') || 'false') === 'true';
  const is_superuser =
    String(formData.get('is_superuser') || 'false') === 'true';
  try {
    const body: UserCreate = {
      email,
      password,
      full_name,
      is_active,
      is_superuser,
    };
    await usersApi().createUser(body);
    redirect('/admin/users?success=User%20created');
  } catch (e: unknown) {
    const msg = encodeURIComponent(
      e instanceof Error ? e.message : 'Failed to create user'
    );
    redirect(`/admin/users/new?error=${msg}`);
  }
}

export async function updateUserAction(formData: FormData) {
  await requireSuperuserOrRedirect('/admin');
  const id = String(formData.get('id') || '');
  const email = formData.get('email');
  const full_name = formData.get('full_name');
  const password = formData.get('password');
  const is_active = formData.get('is_active');
  const is_superuser = formData.get('is_superuser');
  const body: Partial<UserUpdate> = {};
  if (email !== null) {
    body.email = String(email) || null;
  }
  if (full_name !== null) {
    body.full_name = String(full_name) || null;
  }
  if (password) {
    body.password = String(password) || null;
  }
  if (is_active !== null) {
    body.is_active = String(is_active) === 'true';
  }
  if (is_superuser !== null) {
    body.is_superuser = String(is_superuser) === 'true';
  }
  try {
    await usersApi().updateUser(id, body);
    redirect(`/admin/users/${id}?success=Saved`);
  } catch (e: unknown) {
    const msg = encodeURIComponent(
      e instanceof Error ? e.message : 'Failed to update user'
    );
    redirect(`/admin/users/${id}?error=${msg}`);
  }
}

export async function deleteUserAction(formData: FormData) {
  await requireSuperuserOrRedirect('/admin');
  const id = String(formData.get('id') || '');
  try {
    await usersApi().deleteUser(id);
    redirect('/admin/users?success=User%20deleted');
  } catch (e: unknown) {
    const msg = encodeURIComponent(
      e instanceof Error ? e.message : 'Failed to delete user'
    );
    redirect(`/admin/users/${id}?error=${msg}`);
  }
}
