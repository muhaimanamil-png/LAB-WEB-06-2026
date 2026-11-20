export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-stone-600 sm:px-10">
        <p>
          © {new Date().getFullYear()} Pustaka Senja. Ruang baca untuk semua.
        </p>
      </div>
    </footer>
  );
}