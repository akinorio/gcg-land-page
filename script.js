/* ==========================================================
   Guedes Casa Grande Advogados — Interações
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("topo");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menuToggle");

  /* ---- Cabeçalho muda ao rolar ---- */
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Menu mobile ---- */
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    header.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMenu(); });

  /* ---- Acordeão das áreas de atuação ---- */
  const areas = document.querySelectorAll(".area");
  areas.forEach(area => {
    const btn = area.querySelector(".area__header");
    const body = area.querySelector(".area__body");

    btn.addEventListener("click", () => {
      const isOpen = area.classList.contains("is-open");

      // fecha as demais para manter a leitura limpa
      areas.forEach(other => {
        if (other !== area) {
          other.classList.remove("is-open");
          other.querySelector(".area__header").setAttribute("aria-expanded", "false");
          other.querySelector(".area__body").style.maxHeight = null;
        }
      });

      area.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      body.style.maxHeight = isOpen ? null : body.scrollHeight + "px";
    });
  });

  /* ---- Link ativo no menu conforme a seção ---- */
  const links = document.querySelectorAll(".nav__link");
  const sections = [...links]
    .map(l => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l =>
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- Animação de entrada ---- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    revealObserver.observe(el);
  });

  /* ---- Ano atual no rodapé ---- */
  document.getElementById("year").textContent = new Date().getFullYear();
});