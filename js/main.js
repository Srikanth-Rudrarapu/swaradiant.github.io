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

// GSAP HERO ANIMATION

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
  threshold:0.2
});

document
  .querySelectorAll(".reveal")
  .forEach((el)=>observer.observe(el));


const form = document.getElementById("contactForm");

const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
const emailRegex = /^[a-z0-9]+([._%+-]?[a-z0-9]+)*@[a-z0-9-]+\.[a-z]{2,}$/;
const safeTextRegex = /^[A-Za-z0-9\s.,'-]{20,1000}$/;

function sanitize(input) {
  return input
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/{/g, "")
    .replace(/}/g, "")
    .replace(/\[/g, "")
    .replace(/\]/g, "")
    .trim();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = sanitize(document.getElementById("name").value);
  const email = sanitize(document.getElementById("email").value.toLowerCase());
  const company = sanitize(document.getElementById("company").value);
  const message = sanitize(document.getElementById("message").value);

  if (!nameRegex.test(name)) {
    alert("Invalid name format");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Invalid email format");
    return;
  }

  if (!safeTextRegex.test(message)) {
    alert("Message must be 20–1000 safe characters only");
    return;
  }

  const dangerPatterns = [/script/i, /select/i, /drop/i, /insert/i];

  for (let pattern of dangerPatterns) {
    if (pattern.test(name + email + message)) {
      alert("Unsafe input detected");
      return;
    }
  }

  console.log({ name, email, company, message });

  alert("Form submitted successfully!");
  form.reset();
});