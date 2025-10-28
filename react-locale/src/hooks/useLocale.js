import { useContext } from 'react';
import { LocaleContext } from '../context/LocaleContext';
import { getTranslation } from '../locales/translations';

export const useLocale = () => {
  const { locale, changeLocale } = useContext(LocaleContext);

  const t = (key) => getTranslation(locale, key);

  return { locale, changeLocale, t };
};
