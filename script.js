// Mobilmeny, aktiv navigasjon og automatisk årstall.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Lukk meny" : "Åpne meny");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Åpne meny");
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// E-postlenken er deaktivert inntil korrekt e-postadresse er lagt inn.
const emailLink = document.querySelector('a[href="mailto:"]');
if (emailLink) {
  emailLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("E-postadresse må legges inn før nettsiden publiseres. Oppdater mailto-lenken i index.html.");
  });
}
