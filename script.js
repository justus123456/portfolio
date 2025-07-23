// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', () => {
  navList.classList.toggle('nav-open');
});


  // Elements
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const hero = document.querySelector('.hero');

  // Persisted theme (default to dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Hero background URLs
  const lightHeroBg = "url('images/25956.jpg') center/cover no-repeat";
  const darkHeroBg  = "url('images/nubelson-fernandes-iE71-TMrrkE-unsplash.jpg') center/cover no-repeat";

  // Initialize theme and hero bg on page load
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  hero.style.background = `var(--bg-alt) ${savedTheme === 'dark' ? darkHeroBg : lightHeroBg}`;

  // Toggle handler
  themeToggle.addEventListener('click', () => {
    // Flip theme
    const current = root.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';

    // Update hero background
    hero.style.background = `var(--bg-alt) ${newTheme === 'dark' ? darkHeroBg : lightHeroBg}`;
  });



// GSAP scroll animations
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// Load projects dynamically (mock version)
async function loadProjects() {
  const projects = [
    {
      title: "calculator",
      desc: "A responsive and modern calculator for basic arithmetic operations.",
      image: "images/callc.jpg",
      live: "projects/calculator/calculator.html",
      repo: "https://github.com/justus123456/username.github.io/tree/main/calculator"
    },
    {
      title: "To-do-list",
      desc: "A sleek and intuitive to-do list app designed to help users organize tasks with ease. Includes add, delete, and mark-as-complete functionality.",
      image: "images/lis.jpg",
      live: "projects/todolist/list.html",
      repo: "https://github.com/justus123456/username.github.io/tree/main/todolist"
    },
    {
      title: "Static Website",
      desc: "A clean and responsive static website built with HTML and CSS",
      image: "images/static.jpg",
      live: "projects/static/index.html",
      repo: "https://github.com/justus123456/username.github.io/tree/main/static"
    },
    {
      title: "laundry",
      desc: "A smart laundry management system for tracking and scheduling services.",
      image: "images/laund.jpg",
      live: "projects/laundry/views/index.html",
      repo: "https://github.com/justus123456/username.github.io/tree/main/laundry"
    }
  ];

  const grid = document.getElementById('project-grid');
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="card-links">
          <a href="${p.live}" class="btn ripple">Live</a>
          <a href="${p.repo}" class="btn ripple">Code</a>
        </div>
      </div>
    `;
    grid.append(card);
  });
}

window.addEventListener('DOMContentLoaded', loadProjects);
