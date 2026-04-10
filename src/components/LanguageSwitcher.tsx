"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === "fr" ? "en" : "fr";

  function handleSwitch() {
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  }

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      <span className="text-white opacity-90 uppercase">{locale}</span>
      <span className="text-white opacity-40 mx-0.5">|</span>
      <button
        onClick={handleSwitch}
        disabled={isPending}
        className="uppercase text-white opacity-50 hover:opacity-100 transition-opacity disabled:cursor-wait"
        aria-label={`Switch to ${otherLocale.toUpperCase()}`}
      >
        {otherLocale}
      </button>
    </div>
  );
}
