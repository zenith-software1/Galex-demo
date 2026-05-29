(function () {
  'use strict';

  /* Una foto por modelo: cap1, cap2, cap3. hero/lifestyle = intro y lookbook solamente. */
  const products = [
    { id: 'g1', name: 'Origen Concreto', price: 65000, image: 'images/cap1-hq.jpg', desc: 'Snapback negra · bordado premium' },
    { id: 'g2', name: 'Atardecer Trucker', price: 55000, image: 'images/cap2-hq.jpg', desc: 'Mesh back · logo minimalista' },
    { id: 'g3', name: 'Negra Premium', price: 79900, image: 'images/cap3-hq.jpg', desc: 'Material premium · edición limitada' },
  ];

  function formatPrice(cents) {
    return '$' + (cents / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' MXN';
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem('galex_cart') || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem('galex_cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const el = document.getElementById('cartCount');
    if (!el) return;
    el.textContent = getCart().reduce((s, i) => s + i.qty, 0);
  }

  function loadImage(img) {
    const wrap = img.closest('.img-wrap');
    img.onload = () => {
      img.classList.add('is-loaded');
      wrap?.classList.remove('is-loading');
    };
    if (img.complete) img.onload();
  }

  function render() {
    const root = document.getElementById('products');
    if (!root) return;
    root.innerHTML = '';

    products.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'store-card glass glass--shimmer reveal is-visible';
      card.innerHTML = `
        <div class="store-card__img img-wrap is-loading">
          <img src="${p.image}" alt="${p.name}" width="800" height="800" loading="lazy" decoding="async" />
        </div>
        <div class="store-card__body">
          <h2 class="store-card__name">${p.name}</h2>
          <p class="store-card__desc">${p.desc}</p>
          <p class="store-card__price">${formatPrice(p.price)}</p>
          <button type="button" class="store-card__buy" data-id="${p.id}">Agregar</button>
        </div>
      `;
      root.appendChild(card);
      loadImage(card.querySelector('img'));
    });

    root.querySelectorAll('.store-card__buy').forEach((btn) => {
      btn.addEventListener('click', addToCart);
    });
    updateCartCount();
  }

  function addToCart(e) {
    const btn = e.currentTarget;
    const id = btn.getAttribute('data-id');
    const prod = products.find((p) => p.id === id);
    if (!prod) return;

    const cart = getCart();
    const entry = cart.find((c) => c.id === id);
    if (entry) entry.qty++;
    else cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
    saveCart(cart);
    updateCartCount();

    btn.textContent = '✓ Agregado';
    btn.classList.add('is-added');
    setTimeout(() => {
      btn.textContent = 'Agregar';
      btn.classList.remove('is-added');
    }, 1400);
  }

  function checkout() {
    const cart = getCart();
    if (!cart.length) {
      alert('Tu carrito está vacío');
      return;
    }
    const lines = cart
      .map((i) => `${i.qty}× ${i.name} — ${formatPrice(i.price * i.qty)}`)
      .join('\n');
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const body = encodeURIComponent(
      `Hola, quiero comprar:\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\nNombre:\nDirección:\nWhatsApp:`
    );
    const wa = `https://wa.me/525500000000?text=${body}`;
    if (confirm('¿Enviar pedido por WhatsApp?\n(Aceptar = WhatsApp · Cancelar = correo)')) {
      window.open(wa, '_blank');
    } else {
      window.location.href = `mailto:ventas@galexx.mx?subject=Pedido%20Galexx%20MX&body=${body}`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('cartBtn')?.addEventListener('click', checkout);
  });
})();
