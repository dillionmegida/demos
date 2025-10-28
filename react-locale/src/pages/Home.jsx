import { useEffect, useState } from "react"
import { useLocale } from "../hooks/useLocale"
import { LocaleSwitcher } from "../components/LocaleSwitcher"
import { Link } from "react-router-dom"
import "../App.css"

export const Home = () => {
  const { t, locale } = useLocale()
  const [welcomeMessage, setWelcomeMessage] = useState(null)

  useEffect(() => {
    setWelcomeMessage(t("welcome"))
  }, [])

  return (
    <div className="app-container">
      <div className="header-with-nav">
        <LocaleSwitcher />
        <nav className="main-nav">
          <Link to={`/${locale}`} className="nav-link active">
            {t("home")}
          </Link>
          <Link to={`/${locale}/feedback`} className="nav-link">
            {t("feedback")}
          </Link>
        </nav>
      </div>

      {welcomeMessage && (
        <main className="content">
          <h1>{t(welcomeMessage)}</h1>
          <p className="description">{t("description")}</p>

          <section className="features-section">
            <h2>{t("features")}</h2>
            <ul className="features-list">
              <li>{t("feature1")}</li>
              <li>{t("feature2")}</li>
              <li>{t("feature3")}</li>
            </ul>
          </section>

          <div className="info-box">
            <p>
              {t("currentUrl")}: <code>/{locale}</code>
            </p>
            <p>{t("urlWillUpdateAndPersist")}</p>
          </div>
        </main>
      )}
    </div>
  )
}
