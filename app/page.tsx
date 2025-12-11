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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])


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
    const selectedOption = t.request.form.quantityOptions.find(opt => opt.value === formData.quantity)
    const quantityText = selectedOption ? selectedOption.label : formData.quantity
    
    const whatsappMessage = `*${language === 'nl' ? 'Nieuwe Truffel Aanvraag' : 'Neue Trüffel-Anfrage'}* 🍫%0A%0A` +
      `*${language === 'nl' ? 'Naam' : 'Name'}:* ${formData.name}%0A` +
      `*${language === 'nl' ? 'Aantal Truffels' : 'Anzahl Trüffel'}:* ${quantityText}%0A` +
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
            <ul className="nav-links desktop">
              <li><a href="#home">{t.nav.home}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#request">{t.nav.request}</a></li>
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
              <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen */}
      <div className={`mobile-menu-fullscreen ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-menu-links">
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a></li>
            <li><a href="#request" onClick={() => setMobileMenuOpen(false)}>{t.nav.request}</a></li>
          </ul>

          <div className="mobile-menu-footer">
            <div className="language-switch mobile">
              <button 
                className={`lang-btn ${language === 'nl' ? 'active' : ''}`}
                onClick={() => {
                  setLanguage('nl')
                  setMobileMenuOpen(false)
                }}
              >
                NL
              </button>
              <span className="lang-divider">|</span>
              <button 
                className={`lang-btn ${language === 'de' ? 'active' : ''}`}
                onClick={() => {
                  setLanguage('de')
                  setMobileMenuOpen(false)
                }}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero">
        <video 
          src="/img/truffels.mp4" 
          className="hero-background-video"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-overlay"></div>
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
              <div className="about-text-compact">
                <p className="lead-text-compact">
                  {t.about.leadText}
                </p>
              </div>
              <div className="stats-container-compact">
                <div className="stat-item-compact">
                  <div className="stat-icon">✨</div>
                  <div className="stat-content">
                    <div className="stat-number-compact">100%</div>
                    <div className="stat-label-compact">{t.about.stats.handmade}</div>
                  </div>
                </div>
                <div className="stat-item-compact">
                  <div className="stat-icon">👑</div>
                  <div className="stat-content">
                    <div className="stat-number-compact">Premium</div>
                    <div className="stat-label-compact">{t.about.stats.ingredients}</div>
                  </div>
                </div>
                <div className="stat-item-compact">
                  <div className="stat-icon">⏰</div>
                  <div className="stat-content">
                    <div className="stat-number-compact">24u</div>
                    <div className="stat-label-compact">{t.about.stats.fresh}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="pricing-section fade-in">
            <h3 className="pricing-title">{t.about.pricing.title}</h3>
            <div className="pricing-card">
              <div className="pricing-main">
                <span className="pricing-icon">🍫</span>
                <span className="pricing-amount">{t.about.pricing.base}</span>
              </div>
              <p className="pricing-bulk">{t.about.pricing.bulk}</p>
              <p className="pricing-note">{t.about.pricing.note}</p>
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
                  <select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    className="quantity-select"
                  >
                    <option value="">{t.request.form.quantityPlaceholder}</option>
                    {t.request.form.quantityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="date-picker"
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
                  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
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

      {/* Floating CTA Button */}
      <a href="#request" className="floating-cta">
        <svg className="floating-cta-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="floating-cta-text">Aanvragen</span>
      </a>

      {/* Footer Credits */}
      <footer className="footer-credits">
        <p>
          Webdesign by{' '}
          <a href="https://dynique.nl" target="_blank" rel="noopener noreferrer" className="dynique-link">
            dynique.nl
          </a>
        </p>
      </footer>
    </>
  )
}

