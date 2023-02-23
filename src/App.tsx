import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation()
  return (
    <>
      <Suspense fallback={null}>
        {t('product_list')}
      </Suspense>
    </>
  );
}

export default App;
