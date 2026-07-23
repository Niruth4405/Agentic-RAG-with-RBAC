"use client";

import { useEffect, useState } from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = document.documentElement.getAttribute(
      "data-theme"
    ) as "dark" | "light";
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="cursor-pointer p-1.5 rounded-md transition-colors"
      style={{ color: "var(--text-secondary)" }}
    >
      {theme === "dark" ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
    </button>
  );
}