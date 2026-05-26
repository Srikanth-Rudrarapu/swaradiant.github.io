// ACTIVE NAVBAR

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop;

    if(scrollY >= sectionTop - 200){
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if(
      link.getAttribute("href")
      === `#${current}`
    ){
      link.classList.add("active");
    }
  });
});



gsap.from(".hero-badge",{
  y:30,
  opacity:0,
  duration:1
});

gsap.from(".hero-title",{
  y:60,
  opacity:0,
  duration:1,
  delay:0.2
});

gsap.from(".hero-text",{
  y:40,
  opacity:0,
  duration:1,
  delay:0.4
});


gsap.from(".hero-buttons",{
  y:40,
  opacity:0,
  duration:1,
  delay:0.6
});

gsap.from(".glass-card",{
  x:100,
  opacity:0,
  duration:1.4,
  delay:0.5
});

// REVEAL ON SCROLL

const observer = new IntersectionObserver((entries)=>{

  entries.forEach((entry)=>{

    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });

},{
  threshold:0.1
});

document
  .querySelectorAll(".reveal")
  .forEach((el)=>observer.observe(el));


document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://op6nup71de.execute-api.us-east-1.amazonaws.com/contact";

  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert(data.error || "Failed to send message");
      }

    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("navLinks");

  if(menuToggle && mobileNav){
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("show");
    });
  }

});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    
    // Checks if the menu is open, then shuts it
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});
