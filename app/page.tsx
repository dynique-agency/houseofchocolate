'use client'

import { useEffect, useState } from 'react'
import { translations, Language } from './translations'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('nl')
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    date: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')
  
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      fadeElements.forEach(el => observer.unobserve(el))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create WhatsApp message
    const whatsappMessage = `*${language === 'nl' ? 'Nieuwe Truffel Aanvraag' : 'Neue Trüffel-Anfrage'}* 🍫%0A%0A` +
      `*${language === 'nl' ? 'Naam' : 'Name'}:* ${formData.name}%0A` +
      `*${language === 'nl' ? 'Aantal Truffels' : 'Anzahl Trüffel'}:* ${formData.quantity} ${language === 'nl' ? 'stuks' : 'Stück'}%0A` +
      `*${language === 'nl' ? 'Leverdatum' : 'Lieferdatum'}:* ${formData.date}%0A` +
      `*${language === 'nl' ? 'Bericht' : 'Nachricht'}:* ${formData.message || (language === 'nl' ? 'Geen extra wensen' : 'Keine zusätzlichen Wünsche')}%0A%0A` +
      `_${language === 'nl' ? 'Verzonden via House of Chocolate website' : 'Gesendet über House of Chocolate Website'}_`
    
    // Open WhatsApp
    window.open(`https://wa.me/31612936276?text=${whatsappMessage}`, '_blank')
    
    setFormStatus(t.request.form.success)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        quantity: '',
        date: '',
        message: ''
      })
      setFormStatus('')
    }, 2000)
  }

  return (
    <>
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo">
            <img src="/img/house.png" alt="House of Chocolate Logo" className="logo-image" />
            <span className="logo-text">House <span className="logo-highlight">of</span> Chocolate</span>
          </a>
          
          <div className="nav-right">
            <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a></li>
              <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a></li>
              <li><a href="#request" onClick={() => setMobileMenuOpen(false)}>{t.nav.request}</a></li>
              <li className="mobile-lang-switch">
                <div className="language-switch mobile">
                  <button 
                    className={`lang-btn ${language === 'nl' ? 'active' : ''}`}
                    onClick={() => setLanguage('nl')}
                  >
                    NL
                  </button>
                  <span className="lang-divider">|</span>
                  <button 
                    className={`lang-btn ${language === 'de' ? 'active' : ''}`}
                    onClick={() => setLanguage('de')}
                  >
                    DE
                  </button>
                </div>
              </li>
            </ul>

            <div className="language-switch desktop">
              <button 
                className={`lang-btn ${language === 'nl' ? 'active' : ''}`}
                onClick={() => setLanguage('nl')}
              >
                NL
              </button>
              <span className="lang-divider">|</span>
              <button 
                className={`lang-btn ${language === 'de' ? 'active' : ''}`}
                onClick={() => setLanguage('de')}
              >
                DE
              </button>
            </div>

            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-split">
          <div className="hero-left">
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <h1 className="hero-title">
              <span className="typing-text">{t.hero.title}</span>
            </h1>
            <p className="hero-description">
              {t.hero.description}
            </p>
            <a href="#request" className="cta-button">{t.hero.cta}</a>
          </div>
          <div className="hero-right">
            <div className="hero-image-container">
              <video 
                src="/img/truffels.mp4" 
                className="hero-image"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-hero fade-in">
            <span className="crumb"></span>
            <span className="crumb"></span>
            <span className="crumb"></span>
            <span className="crumb"></span>
            <span className="crumb"></span>
            <span className="crumb"></span>
            <span className="crumb"></span>
            <div className="about-content">
              <p className="section-label">{t.about.label}</p>
              <h2>{t.about.title}</h2>
              <div className="about-text">
                <p className="lead-text">
                  {t.about.leadText}
                </p>
                <p>
                  {t.about.paragraph1}
                </p>
                <p>
                  {t.about.paragraph2}
                </p>
              </div>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">{t.about.stats.handmade}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">Premium</div>
                  <div className="stat-label">{t.about.stats.ingredients}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24u</div>
                  <div className="stat-label">{t.about.stats.fresh}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="features">
            <div className="feature-card-premium fade-in">
              <div className="feature-number">01</div>
              <div className="feature-icon-premium">🍫</div>
              <h3>{t.about.features.chocolate.title}</h3>
              <p>
                {t.about.features.chocolate.description}
              </p>
            </div>

            <div className="feature-card-premium fade-in">
              <div className="feature-number">02</div>
              <div className="feature-icon-premium">👨‍🍳</div>
              <h3>{t.about.features.craftsmanship.title}</h3>
              <p>
                {t.about.features.craftsmanship.description}
              </p>
            </div>

            <div className="feature-card-premium fade-in">
              <div className="feature-number">03</div>
              <div className="feature-icon-premium">🎁</div>
              <h3>{t.about.features.presentation.title}</h3>
              <p>
                {t.about.features.presentation.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Section */}
      <section id="request" className="request">
        <div className="container">
          <div className="request-content">
            <div className="section-title fade-in">
              <p className="section-label">{t.request.label}</p>
              <h2>{t.request.title}</h2>
            </div>
            <p className="section-description fade-in">
              {t.request.description}
            </p>

            <div className="form-container fade-in">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t.request.form.name} {t.request.form.required}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={t.request.form.namePlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">{t.request.form.quantity} {t.request.form.required}</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder={t.request.form.quantityPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">{t.request.form.date} {t.request.form.required}</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t.request.form.message}</label>
                  <p className="field-hint">
                    {t.request.form.hint}
                  </p>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.request.form.messagePlaceholder}
                  />
                </div>

                <button type="submit" className="submit-button">
                  <span className="button-icon">💬</span>
                  {t.request.form.submit}
                </button>

                {formStatus && (
                  <p style={{ 
                    marginTop: '1.5rem', 
                    textAlign: 'center', 
                    color: 'var(--gold)',
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}>
                    {formStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

