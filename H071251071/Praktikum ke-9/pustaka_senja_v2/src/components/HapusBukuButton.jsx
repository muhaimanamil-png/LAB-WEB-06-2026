"use client";

import { useActionState } from "react";

const nilaiAwal = { error: "" };

export default function HapusBukuButton({ action, id }) {
  const [state, formAction, pending] = useActionState(action, nilaiAwal);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Yakin ingin menghapus buku ini?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60"
      >
        {pending ? "Menghapus..." : "Hapus"}
      </button>
      {state.error && (
        <p className="mt-2 text-sm font-medium text-rose-700" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
