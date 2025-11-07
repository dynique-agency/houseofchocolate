'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    date: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')

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
    const whatsappMessage = `*Nieuwe Truffel Aanvraag* 🍫%0A%0A` +
      `*Naam:* ${formData.name}%0A` +
      `*Aantal Truffels:* ${formData.quantity} stuks%0A` +
      `*Leverdatum:* ${formData.date}%0A` +
      `*Bericht:* ${formData.message || 'Geen extra wensen'}%0A%0A` +
      `_Verzonden via House of Chocolate website_`
    
    // Open WhatsApp
    window.open(`https://wa.me/31612936276?text=${whatsappMessage}`, '_blank')
    
    setFormStatus('Je wordt doorgestuurd naar WhatsApp...')
    
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
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>Over Ons</a></li>
            <li><a href="#request" onClick={() => setMobileMenuOpen(false)}>Aanvraag</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-split">
          <div className="hero-left">
            <p className="hero-subtitle">House of Chocolate</p>
            <h1 className="hero-title">
              <span className="typing-text">Oreo Truffels</span>
            </h1>
            <p className="hero-description">
              Handgemaakte luxe chocolade truffels, perfect voor uw speciale momenten
            </p>
            <a href="#request" className="cta-button">Plaats Uw Aanvraag</a>
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
              <p className="section-label">Ons Verhaal</p>
              <h2>Over House of Chocolate</h2>
              <div className="about-text">
                <p className="lead-text">
                  Bij House of Chocolate draait alles om passie, perfectie en pure luxe. 
                  Elke Oreo truffel is een uniek kunstwerk, met zorg vervaardigd uit de 
                  fijnste Zwitserse chocolade.
                </p>
                <p>
                  Ons ambacht begint met de selectie van premium ingrediënten. We gebruiken 
                  alleen de beste cacaobonen, verse room en originele Oreo koekjes. Het 
                  resultaat? Een smaakervaring die uw zintuigen prikkelt en uw verwachtingen 
                  overtreft.
                </p>
                <p>
                  Of het nu gaat om een intiem dineetje, een groot feest, of een zakelijk 
                  evenement – onze truffels maken elk moment onvergetelijk. Wij leveren 
                  niet alleen chocolade, wij leveren herinneringen.
                </p>
              </div>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Handgemaakt</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">Premium</div>
                  <div className="stat-label">Ingrediënten</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24u</div>
                  <div className="stat-label">Vers Gemaakt</div>
                </div>
              </div>
            </div>
          </div>

          <div className="features">
            <div className="feature-card-premium fade-in">
              <div className="feature-number">01</div>
              <div className="feature-icon-premium">🍫</div>
              <h3>Zwitserse Chocolade</h3>
              <p>
                Geselecteerd van de beste chocolatiers in Zwitserland. Elke truffel 
                wordt gemaakt met premium cacaobonen voor een rijke, fluweelzachte smaak.
              </p>
            </div>

            <div className="feature-card-premium fade-in">
              <div className="feature-number">02</div>
              <div className="feature-icon-premium">👨‍🍳</div>
              <h3>Artisanaal Vakmanschap</h3>
              <p>
                Handgemaakt met liefde. Elke truffel wordt met aandacht en zorg 
                vervaardigd, zodat elk stukje een unieke en onvergetelijke ervaring is.
              </p>
            </div>

            <div className="feature-card-premium fade-in">
              <div className="feature-number">03</div>
              <div className="feature-icon-premium">🎁</div>
              <h3>Luxe Presentatie</h3>
              <p>
                Verpakt in elegante geschenkdozen met gouden details. Elke bestelling 
                wordt een visueel meesterwerk dat perfect is voor elk speciaal moment.
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
              <p className="section-label">Bestel Nu</p>
              <h2>Plaats Uw Aanvraag</h2>
            </div>
            <p className="section-description fade-in">
              Vul het formulier in en verstuur een WhatsApp bericht om uw bestelling te plaatsen. 
              Wij nemen zo snel mogelijk contact met u op!
            </p>

            <div className="form-container fade-in">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Naam *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Jouw naam"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Aantal Truffels *</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="bijv. 24"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Gewenste Leverdatum *</label>
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
                  <label htmlFor="message">Jouw Wensen & Ideeën</label>
                  <p className="field-hint">
                    Tip: Onze truffels kunnen aangepast worden met verschillende kleuren, versieringen en toppings
                  </p>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Vertel ons over je wensen, thema's, allergieën of andere speciale ideeën..."
                  />
                </div>

                <button type="submit" className="submit-button">
                  <span className="button-icon">💬</span>
                  Verstuur via WhatsApp
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

