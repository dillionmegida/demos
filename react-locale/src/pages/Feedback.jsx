import { useState } from "react"
import { useLocale } from "../hooks/useLocale"
import { Link } from "react-router-dom"
import "./Feedback.css"
import { LocaleSwitcher } from "../components/LocaleSwitcher"

export const Feedback = () => {
  const { t, locale } = useLocale()
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "I have a suggestion",
    message: "What a great app!",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [serverResponse, setServerResponse] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      // Using JSONPlaceholder API as a random API endpoint
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.subject,
            body: `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
            userId: 1,
          }),
        }
      )

      if (response.ok) {
        setStatus("success")
        setServerResponse("feedbackSuccess")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        // Clear success message after 5 seconds
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus("error")
        setServerResponse("feedbackError")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setStatus("error")
      setServerResponse("feedbackError")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feedback-container">
      <LocaleSwitcher />
      <nav className="main-nav">
        <Link to={`/${locale}`} className="nav-link">
          {t("home")}
        </Link>
        <Link to={`/${locale}/feedback`} className="nav-link active">
          {t("feedback")}
        </Link>
      </nav>

      <div className="feedback-content">
        <h1>{t("feedbackTitle")}</h1>
        <p className="feedback-description">{t("feedbackDescription")}</p>

        {status === "success" && (
          <div className="alert alert-success">{t(serverResponse)}</div>
        )}
        {status === "error" && (
          <div className="alert alert-error">{t(serverResponse)}</div>
        )}

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">{t("name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("namePlaceholder")}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">{t("subject")}</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t("subjectPlaceholder")}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t("message")}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("messagePlaceholder")}
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </div>
  )
}
