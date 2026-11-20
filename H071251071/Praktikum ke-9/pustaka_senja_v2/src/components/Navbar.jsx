"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuNavigasi = [
  { label: "Beranda", path: "/" },
  { label: "Katalog", path: "/katalog" },
  { label: "Usulan Buku", path: "/usulan" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-amber-900"
        >
          Pustaka Senja
        </Link>
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
          {menuNavigasi.map((menu) => {
            const aktif =
              pathname === menu.path ||
              (menu.path === "/katalog" && pathname.startsWith("/katalog/"));

            return (
              <li key={menu.path}>
                <Link
                  href={menu.path}
                  aria-current={aktif ? "page" : undefined}
                  className={`block rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                    aktif
                      ? "bg-amber-100 text-amber-900"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  {menu.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}