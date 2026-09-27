const loader = document.getElementById("loader");
const header = document.querySelector(".site-header");
const modal = document.getElementById("registerModal");
const form = document.getElementById("registrationForm");
const successState = document.getElementById("successState");
const toast = document.getElementById("toast");
const cursorGlow = document.getElementById("cursorGlow");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("done"), 650);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

document.addEventListener("mousemove", (e) => {
  if (!cursorGlow || window.matchMedia("(pointer: coarse)").matches) return;
  cursorGlow.animate(
    { left: `${e.clientX}px`, top: `${e.clientY}px` },
    { duration: 500, fill: "forwards" }
  );
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 35, 180)}ms`;
  revealObserver.observe(el);
});

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => document.getElementById("name").focus(), 250);
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-open-register]").forEach(btn => btn.addEventListener("click", openModal));
document.querySelectorAll("[data-close-register]").forEach(btn => btn.addEventListener("click", closeModal));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

function validate() {
  let valid = true;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const college = document.getElementById("collegeId").value.trim();

  setError("nameError", "");
  setError("emailError", "");
  setError("collegeError", "");

  if (name.length < 2) {
    setError("nameError", "Please enter your full name.");
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("emailError", "Please enter a valid email address.");
    valid = false;
  }

  if (college.length < 2) {
    setError("collegeError", "Please enter your college ID.");
    valid = false;
  }

  return { valid, name, email, college };
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = validate();
  if (!result.valid) return;

  const registrations = JSON.parse(localStorage.getItem("thunderRegistrations") || "[]");
  registrations.push({
    name: result.name,
    email: result.email,
    collegeId: result.college,
    registeredAt: new Date().toISOString()
  });
  localStorage.setItem("thunderRegistrations", JSON.stringify(registrations));

  form.hidden = true;
  successState.hidden = false;
  showToast("Registration saved on this device.");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = button.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

const toastStyle = document.createElement("style");
toastStyle.textContent = `
.toast{position:fixed;left:50%;bottom:28px;z-index:700;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:#f4f4f2;color:#0b0b0e;padding:12px 18px;border-left:3px solid #e11d2e;font:700 10px "Manrope";letter-spacing:.05em;transition:.35s cubic-bezier(.22,1,.36,1);box-shadow:0 15px 40px rgba(0,0,0,.35)}
.toast.show{opacity:1;transform:translate(-50%,0)}
`;
document.head.appendChild(toastStyle);

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
