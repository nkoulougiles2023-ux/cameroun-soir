import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <main>
      <h1>{t("featured")}</h1>
      <p>CAMEROUN SOIR Hebdo</p>
    </main>
  );
}
