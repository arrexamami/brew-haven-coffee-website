// ===== Brew Haven — main.js =====
(function () {
  "use strict";

  const money = (n) => "₹" + n.toLocaleString("en-IN");

  /* ---------------- CART STATE ---------------- */
  const CART_KEY = "brewhaven_cart_v1";
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      /* storage unavailable — cart still works for this session */
    }
  }

  function addToCart(id, qty = 1) {
    cart[id] = (cart[id] || 0) + qty;
    saveCart();
    renderCart();
    updateCartCount();
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) showToast(product.name + " added to cart");
  }

  function setQty(id, qty) {
    if (qty <= 0) {
      delete cart[id];
    } else {
      cart[id] = qty;
    }
    saveCart();
    renderCart();
    updateCartCount();
  }

  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
    updateCartCount();
  }

  function cartCount() {
    return Object.values(cart).reduce((sum, q) => sum + q, 0);
  }

  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, q]) => {
      const p = PRODUCTS.find((prod) => prod.id === id);
      return sum + (p ? p.price * q : 0);
    }, 0);
  }

  function updateCartCount() {
    const el = document.getElementById("cartCount");
    const n = cartCount();
    el.textContent = n;
    el.classList.toggle("show", n > 0);
  }

  function renderCart() {
    const itemsEl = document.getElementById("cartItems");
    const emptyEl = document.getElementById("cartEmptyState");
    const footerEl = document.getElementById("cartFooter");
    const entries = Object.entries(cart);

    if (entries.length === 0) {
      itemsEl.innerHTML = "";
      emptyEl.style.display = "flex";
      footerEl.style.display = "none";
      return;
    }

    emptyEl.style.display = "none";
    footerEl.style.display = "block";

    itemsEl.innerHTML = entries
      .map(([id, qty]) => {
        const p = PRODUCTS.find((prod) => prod.id === id);
        if (!p) return "";
        return `
        <div class="cart-item" data-id="${p.id}">
          <img src="${p.image}" alt="" width="64" height="64" loading="lazy">
          <div class="cart-item-info">
            <p class="ci-name">${p.name}</p>
            <p class="ci-price">${money(p.price)}</p>
            <div class="ci-qty">
              <button class="qty-btn" data-action="dec" aria-label="Decrease quantity of ${p.name}">−</button>
              <span aria-live="polite">${qty}</span>
              <button class="qty-btn" data-action="inc" aria-label="Increase quantity of ${p.name}">+</button>
            </div>
          </div>
          <button class="ci-remove" data-action="remove" aria-label="Remove ${p.name} from cart">✕</button>
        </div>`;
      })
      .join("");

    document.getElementById("cartSubtotal").textContent = money(cartTotal());
    document.getElementById("cartTotal").textContent = money(cartTotal());
  }

  // Delegate qty/remove clicks inside cart
  document.getElementById("cartItems").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const row = btn.closest(".cart-item");
    const id = row.dataset.id;
    const action = btn.dataset.action;
    if (action === "remove") removeFromCart(id);
    if (action === "inc") setQty(id, (cart[id] || 0) + 1);
    if (action === "dec") setQty(id, (cart[id] || 0) - 1);
  });

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cartCount() === 0) return;
    showToast("This is a portfolio demo — checkout isn't connected to payment.");
  });

  /* ---------------- CART DRAWER ---------------- */
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  const cartToggle = document.getElementById("cartToggle");
  const cartClose = document.getElementById("cartClose");

  function openCart() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    cartToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    cartClose.focus();
  }
  function closeCart() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    cartToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    cartToggle.focus();
  }
  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeCart();
  });

  /* ---------------- MOBILE NAV ---------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");

  function toggleMobileNav(open) {
    mobileNav.classList.toggle("open", open);
    mobileNavBackdrop.classList.toggle("open", open);
    hamburgerBtn.classList.toggle("open", open);
    hamburgerBtn.setAttribute("aria-expanded", String(open));
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("no-scroll", open);
  }
  hamburgerBtn.addEventListener("click", () => {
    toggleMobileNav(!mobileNav.classList.contains("open"));
  });
  mobileNavBackdrop.addEventListener("click", () => toggleMobileNav(false));
  mobileNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => toggleMobileNav(false))
  );

  /* ---------------- HEADER SHADOW ON SCROLL ---------------- */
  const header = document.getElementById("siteHeader");
  window.addEventListener(
    "scroll",
    () => header.classList.toggle("scrolled", window.scrollY > 10),
    { passive: true }
  );

  /* ---------------- PRODUCT CARD TEMPLATE ---------------- */
  function productCard(p) {
    return `
    <article class="product-card" role="listitem">
      <div class="pc-media">
        <img src="${p.image}" alt="${p.name} — ${p.description}" width="400" height="400" loading="lazy">
        <button class="pc-fav" aria-label="Add ${p.name} to favorites" data-fav="${p.id}">♥</button>
      </div>
      <div class="pc-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="pc-foot">
          <span class="pc-price">${money(p.price)}</span>
          <button class="pc-add" data-add="${p.id}" aria-label="Add ${p.name} to cart">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="21" r="1.3" fill="currentColor"/><circle cx="18" cy="21" r="1.3" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
    </article>`;
  }

  /* ---------------- POPULAR CAROUSEL ---------------- */
  const carousel = document.getElementById("popularCarousel");
  const popular = PRODUCTS.filter((p) => p.popular);
  carousel.innerHTML = popular.map(productCard).join("");

  document.getElementById("carPrev").addEventListener("click", () => {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  });
  document.getElementById("carNext").addEventListener("click", () => {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  });

  /* ---------------- MENU: TABS + SEARCH + GRID ---------------- */
  const menuTabs = document.getElementById("menuTabs");
  const menuGrid = document.getElementById("menuGrid");
  const menuSearch = document.getElementById("menuSearch");
  const menuEmpty = document.getElementById("menuEmpty");
  let activeCategory = "All";

  menuTabs.innerHTML = CATEGORIES.map(
    (c, i) =>
      `<button class="menu-tab${c === activeCategory ? " active" : ""}" role="tab" aria-selected="${c === activeCategory}" data-cat="${c}">${c}</button>`
  ).join("");

  function renderMenu() {
    const term = menuSearch.value.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const matchesCat = activeCategory === "All" || p.category === activeCategory;
      const matchesTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      return matchesCat && matchesTerm;
    });

    menuGrid.innerHTML = filtered.map(productCard).join("");
    menuEmpty.hidden = filtered.length !== 0;
  }

  menuTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".menu-tab");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    menuTabs.querySelectorAll(".menu-tab").forEach((t) => {
      t.classList.toggle("active", t === btn);
      t.setAttribute("aria-selected", String(t === btn));
    });
    renderMenu();
  });

  let searchDebounce;
  menuSearch.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(renderMenu, 120);
  });

  renderMenu();

  /* ---------------- ADD-TO-CART / FAVORITE (event delegation, page-wide) ---------------- */
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addToCart(addBtn.dataset.add, 1);
      return;
    }
    const favBtn = e.target.closest("[data-fav]");
    if (favBtn) {
      favBtn.classList.toggle("active");
      return;
    }
  });

  /* ---------------- NEWSLETTER VALIDATION ---------------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterMsg = document.getElementById("newsletterMsg");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = newsletterEmail.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!valid) {
      newsletterMsg.textContent = "Please enter a valid email address.";
      newsletterMsg.classList.remove("success");
      newsletterMsg.classList.add("error");
      newsletterEmail.setAttribute("aria-invalid", "true");
      return;
    }
    newsletterMsg.textContent = "You're subscribed! Welcome to Brew Haven.";
    newsletterMsg.classList.remove("error");
    newsletterMsg.classList.add("success");
    newsletterEmail.removeAttribute("aria-invalid");
    newsletterForm.reset();
  });

  /* ---------------- TOAST ---------------- */
  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
  }

  /* ---------------- SMOOTH SCROLL FOR ANCHOR LINKS ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------------- INIT ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  renderCart();
  updateCartCount();
})();
