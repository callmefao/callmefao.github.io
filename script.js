// DOM Elements
const header = document.getElementById("header")
const menuToggle = document.getElementById("menu-toggle")
const menu = document.querySelector(".menu")
const menuLinks = document.querySelectorAll(".menu-link")
const contactForm = document.getElementById("contact-form")
const formMessage = document.getElementById("form-message")
const currentYearEl = document.getElementById("current-year")

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear()

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active")
  menuToggle.classList.toggle("active")
})

// Close mobile menu when clicking a link
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active")
    menuToggle.classList.remove("active")
  })
})

// Active menu link based on scroll position
window.addEventListener("scroll", () => {
  let current = ""

  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  menuLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
})

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Simple validation
  if (!name || !email || !message) {
    showFormMessage("Please fill in all fields", "error")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".submit-btn")
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    showFormMessage("Thank you for your message! I will get back to you soon.", "success")
    contactForm.reset()
    submitBtn.textContent = "Send Message"
    submitBtn.disabled = false

    // Clear success message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = ""
      formMessage.className = "form-message"
    }, 5000)
  }, 1500)
})

// Show form message
function showFormMessage(msg, type) {
  formMessage.textContent = msg
  formMessage.className = `form-message ${type}`
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })
    }
  })
})

// Project cards hover effect for mobile
const projectCards = document.querySelectorAll(".project-card")

if (window.innerWidth < 768) {
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active class from all cards
      projectCards.forEach((c) => c.classList.remove("active"))
      // Add active class to clicked card
      card.classList.toggle("active")
    })
  })
}

