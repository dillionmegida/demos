import { useLocale } from '../hooks/useLocale';
import './LocaleSwitcher.css';

export const LocaleSwitcher = () => {
  const { locale, changeLocale, t } = useLocale();

  return (
    <div className="locale-switcher">
      <button
        className={`locale-btn ${locale === 'en' ? 'active' : ''}`}
        onClick={() => changeLocale('en')}
      >
        {t('english')}
      </button>
      <button
        className={`locale-btn ${locale === 'nl' ? 'active' : ''}`}
        onClick={() => changeLocale('nl')}
      >
        {t('dutch')}
      </button>
    </div>
  );
};
