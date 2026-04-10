"use client";

import { useTranslations } from "next-intl";

export default function InstitutionalBadge() {
  const t = useTranslations("common");

  return (
    <span className="inline-block rounded-full border border-institutional-border bg-institutional-bg px-3 py-1 text-xs font-semibold text-institutional-badge">
      {t("institutionalContent")}
    </span>
  );
}
