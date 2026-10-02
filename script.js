// ================================
// Typing Animation
// ================================

const textArray = [
    "Web Developer",
    "Frontend Developer",
    "JavaScript Developer",
    "CSE Student"
];
let textIndex = 0;
let charIndex = 0;

const typingElement = document.querySelector(".home-content h3");


function typeEffect(){

    if(charIndex < textArray[textIndex].length){

        typingElement.textContent += 
        textArray[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect,100);

    }

    else{

        setTimeout(eraseEffect,1500);

    }

}
function eraseEffect(){

    if(charIndex > 0){

        typingElement.textContent =
        textArray[textIndex].substring(0,charIndex-1);

        charIndex--;

        setTimeout(eraseEffect,50);

    }

    else{

        textIndex++;

        if(textIndex >= textArray.length){

            textIndex = 0;

        }

        setTimeout(typeEffect,500);

    }

}


document.addEventListener(
"DOMContentLoaded",
()=>{

    typingElement.textContent="";
    typeEffect();

});
// ================================
// Scroll Reveal Animation
// ================================


const revealElements =
document.querySelectorAll("section");


window.addEventListener("scroll",()=>{


    revealElements.forEach(element=>{


        const position =
        element.getBoundingClientRect().top;


        if(position < window.innerHeight - 120){

            element.classList.add("show");

        }


    });


});
// ================================
// Navbar Scroll Effect
const header =
document.querySelector("header");
window.addEventListener("scroll",()=>{
    if(window.scrollY > 50){

        header.style.background =
        "rgba(2,6,23,0.95)";

        header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.5)";

    }

    else{

        header.style.boxShadow="none";

    }
});
// Active Navigation Link
const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll("nav a");
window.addEventListener("scroll",()=>{
let current="";
sections.forEach(section=>{
const sectionTop =
section.offsetTop-150;
if(scrollY >= sectionTop){
current=section.getAttribute("id");
}
});
navItems.forEach(link=>{
link.classList.remove("active");
if(link.getAttribute("href")
.includes(current)){
link.classList.add("active");
}

});
});
// Project Card 3D Effect
const cards =
document.querySelectorAll(".project-card");
cards.forEach(card=>{
card.addEventListener("mousemove",(e)=>{
const rect =
card.getBoundingClientRect();
const x =
e.clientX-rect.left;
const y =
e.clientY-rect.top;
const rotateX =
((y-rect.height/2)/20);
const rotateY =
((x-rect.width/2)/20);
card.style.transform =
`
rotateX(${-rotateX}deg)
rotateY(${rotateY}deg)
scale(1.05)
`;
});
card.addEventListener("mouseleave",()=>{
card.style.transform =
"rotateX(0) rotateY(0) scale(1)";
});


});
// Auto Update Footer Year
const year =
document.querySelector("footer p");
if(year){
year.innerHTML =
`© ${new Date().getFullYear()} Mohan Singh | Web Developer`;

}
// Console Message
console.log(
"🚀 Portfolio Loaded Successfully!"
);

console.log(
"👨‍💻 Welcome Recruiters!"
);
// Education: toggle CGPA note and add simple reveal on scroll
document.addEventListener('DOMContentLoaded', () => {
  // CGPA toggle
  const toggle = document.querySelector('.cgpa-toggle');
  const note = document.getElementById('cgpa-note');
  if (toggle && note) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        note.hidden = true;
      } else {
        note.hidden = false;
        note.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
    });
  }

  // simple reveal for edu cards
  const cards = document.querySelectorAll('.edu-card');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        o.unobserve(e.target);
      }
    });
  }, {threshold: .15});
  cards.forEach(c => { c.style.opacity = 0; c.style.transform = 'translateY(12px)'; obs.observe(c); });

  // apply visible styles after observation
  document.addEventListener('animationFrame', () => {});
  // fallback: when visible class added, animate via inline styles
  const visObserver = new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.target.classList && m.target.classList.contains('is-visible')) {
        m.target.style.transition = 'opacity .45s ease, transform .45s ease';
        m.target.style.opacity = 1;
        m.target.style.transform = 'translateY(0)';
      }
    });
  });
  cards.forEach(c => visObserver.observe(c, { attributes: true }));
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skill').forEach(s => {
    const fill = s.querySelector('.skill-fill');
    const pct = s.dataset.pct ? s.dataset.pct + '%' : (fill?.style.getPropertyValue('--pct') || '0%');
    if (fill) fill.style.width = '0%'; // start collapsed
  });

  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const s = e.target;
      s.classList.add('is-visible');
      const fill = s.querySelector('.skill-fill');
      const pct = s.dataset.pct ? s.dataset.pct + '%' : (fill?.style.getPropertyValue('--pct') || '0%');
      if (fill) requestAnimationFrame(() => fill.style.width = pct);
      o.unobserve(s);
    });
  }, {threshold: 0.18});

  document.querySelectorAll('.skill').forEach(s => obs.observe(s));
});

 /* contact section */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const statusText = status?.querySelector('.status-text');
  const mailtoBtn = document.getElementById('mailto-btn');
  const sendBtn = document.getElementById('send-btn');

  if (!form) return;

  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    subject: form.querySelector('#subject'),
    message: form.querySelector('#message'),
  };

  const setError = (el, msg) => {
    const container = el.closest('.field');
    const err = container.querySelector('.field-error');
    if (err) err.textContent = msg || '';
    if (msg) {
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.removeAttribute('aria-invalid');
    }
  };

  const validate = () => {
    let valid = true;
    // name
    if (!fields.name.value.trim()) {
      setError(fields.name, 'Please enter your name.');
      valid = false;
    } else {
      setError(fields.name, '');
    }
    // email (simple pattern)
    const emailVal = fields.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      setError(fields.email, 'Please enter your email.');
      valid = false;
    } else if (!emailRegex.test(emailVal)) {
      setError(fields.email, 'Please enter a valid email address.');
      valid = false;
    } else {
      setError(fields.email, '');
    }
    // subject
    if (!fields.subject.value.trim()) {
      setError(fields.subject, 'Please add a subject.');
      valid = false;
    } else {
      setError(fields.subject, '');
    }
    // message
    if (!fields.message.value.trim() || fields.message.value.trim().length < 10) {
      setError(fields.message, 'Please enter a message (at least 10 characters).');
      valid = false;
    } else {
      setError(fields.message, '');
    }

    return valid;
  };

  const showStatus = (msg, ok = true) => {
    if (!status || !statusText) return;
    status.hidden = false;
    statusText.textContent = msg;
    status.style.borderColor = ok ? 'rgba(34,197,94,0.14)' : 'rgba(239,68,68,0.14)';
    status.style.background = ok ? 'rgba(34,197,94,0.03)' : 'rgba(239,68,68,0.03)';
    // auto-hide after a while
    setTimeout(() => {
      status.hidden = true;
    }, 6000);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      showStatus('Please fix the highlighted errors and try again.', false);
      return;
    }

    // Prepare payload (for future backend)
    const payload = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      subject: fields.subject.value.trim(),
      message: fields.message.value.trim(),
      ts: new Date().toISOString(),
    };

    // Here we simulate a successful send (replace with real fetch if you add a backend)
    console.log('Contact payload prepared:', payload);
    form.reset();
    showStatus('Message sent locally. If you wired a backend, it will be delivered.', true);
  });

  // Mailto fallback: open mail client with prefilled subject/body
  mailtoBtn?.addEventListener('click', () => {
    const name = encodeURIComponent(fields.name.value.trim() || '');
    const email = encodeURIComponent(fields.email.value.trim() || '');
    const subject = encodeURIComponent(fields.subject.value.trim() || 'Contact from portfolio');
    const body = encodeURIComponent((fields.message.value.trim() || '') + (email ? `\n\nReply-to: ${email}` : '') + (name ? `\n\nFrom: ${name}` : ''));
    window.location.href = `mailto:yourmail@gmail.com?subject=${subject}&body=${body}`;
  });

  // Optional: real-time validation on blur
  Object.values(fields).forEach(f => {
    f.addEventListener('blur', () => {
      validate();
    });
  });
});
