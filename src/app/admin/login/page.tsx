'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from './actions';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="w-full rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

export default function AdminLogin() {
  const [state, action] = useFormState(login, null);
  return (
    <main className="mx-auto mt-32 max-w-sm px-4">
      <h1 className="mb-6 text-2xl font-bold text-white">AuraForm admin</h1>
      <form action={action} className="space-y-4">
        <label className="block text-sm text-gray-300">
          Password
          <input name="password" type="password" required autoFocus className="mt-1 block w-full rounded border border-gray-600 bg-gray-800 p-2 text-white" />
        </label>
        {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
        <Submit />
      </form>
    </main>
  );
}
