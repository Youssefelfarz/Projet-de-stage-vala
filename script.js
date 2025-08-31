document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      const spans = navToggle.querySelectorAll("span")
      spans.forEach((span, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) span.style.opacity = "0"
          if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          span.style.transform = "none"
          span.style.opacity = "1"
        }
      })
    })
  }

  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.remove("active")
        const spans = navToggle?.querySelectorAll("span")
        spans?.forEach((span) => {
          span.style.transform = "none"
          span.style.opacity = "1"
        })
      }
    })
  })

  document.querySelectorAll(".cta-button").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()

      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      if (this.id === "choose-plan-btn") {
        const plansSection = document.querySelector("#hebergement")
        if (plansSection) {
          plansSection.scrollIntoView({ behavior: "smooth" })
        }
      } else if (this.id === "performance-btn") {
        const aboutSection = document.querySelector(".strategy-section")
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })

  document.querySelectorAll(".service-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()

      const serviceCard = this.closest(".service-card")
      const serviceName = serviceCard.querySelector("h3").textContent
      const servicePrice = serviceCard.querySelector(".amount").textContent

      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      document.querySelectorAll(".service-card").forEach((card) => {
        card.classList.remove("selected")
      })
      serviceCard.classList.add("selected")

      showSelectionPopup(serviceName, `€${servicePrice}/mois`)
    })
  })

  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const name = this.querySelector("#name").value.trim()
      const email = this.querySelector("#email").value.trim()
      const plan = this.querySelector("#plan").value
      const message = this.querySelector("#message").value.trim()

      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs obligatoires.")
        return
      }

      if (!isValidEmail(email)) {
        alert("Veuillez entrer une adresse email valide.")
        return
      }

      const submitBtn = this.querySelector(".btn-primary")
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !'
        submitBtn.style.background = "#10b981"

        // showSuccessMessage("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.style.background = ""
          this.reset()
        }, 3000)
      }, 2000)
    })
  }
})

function showSelectionPopup(serviceName, servicePrice) {
  const popup = document.createElement("div")
  popup.className = "selection-popup"
  popup.innerHTML = `
    <div class="popup-content">
      <h3>Plan sélectionné !</h3>
      <p><strong>${serviceName}</strong></p>
      <p>Prix: ${servicePrice}</p>
      <div class="popup-buttons">
        <button class="btn-confirm">Continuer la commande</button>
        <button class="btn-cancel">Annuler</button>
      </div>
    </div>
  `

  document.body.appendChild(popup)

  popup.querySelector(".btn-confirm").addEventListener("click", () => {
    const contactSection = document.querySelector("#contact")
    const messageField = document.querySelector("#message")
    const planField = document.querySelector("#plan")

    if (messageField) {
      messageField.value = `Je souhaite commander le plan ${serviceName} (${servicePrice}). Merci de me contacter pour finaliser ma commande.`
    }

    if (planField) {
      const planValue = serviceName.toLowerCase().includes("starter")
        ? "starter"
        : serviceName.toLowerCase().includes("business")
          ? "business"
          : "premium"
      planField.value = planValue
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }

    document.body.removeChild(popup)
  })

  popup.querySelector(".btn-cancel").addEventListener("click", () => {
    document.querySelectorAll(".service-card").forEach((card) => card.classList.remove("selected"))
    document.body.removeChild(popup)
  })

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      document.querySelectorAll(".service-card").forEach((card) => card.classList.remove("selected"))
      document.body.removeChild(popup)
    }
  })
}

function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.innerHTML = `
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <p>${message}</p>
    </div>
  `

  document.body.appendChild(successDiv)

  setTimeout(() => {
    if (successDiv.parentNode) {
      document.body.removeChild(successDiv)
    }
  }, 4000)
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".service-card, .problem-card, .strategy-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroVisual = document.querySelector(".hero-visual")
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`
  }

  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  }
})

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".floating-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)"
      this.style.boxShadow = "0 15px 30px rgba(30, 64, 175, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 10px 25px rgba(30, 64, 175, 0.1)"
    })
  })
})