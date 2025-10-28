import { createContext, useState } from 'react';

export const LocaleContext = createContext();

// Function to get locale from URL path synchronously
const getLocaleFromPath = () => {
  const pathLocale = window.location.pathname.split('/')[1];
  return ['en', 'nl'].includes(pathLocale) ? pathLocale : 'en';
};

export const LocaleProvider = ({ children }) => {
  // Set initial locale synchronously from URL
  const [locale, setLocale] = useState(getLocaleFromPath);

  const changeLocale = (newLocale) => {
    const currentPath = window.location.pathname;
    // Remove existing locale prefix and get the remaining path
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
    // Construct new path with new locale
    const newPath = pathWithoutLocale === '/' ? `/${newLocale}` : `/${newLocale}${pathWithoutLocale}`;

    setLocale(newLocale);
    window.history.pushState(null, '', newPath);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
