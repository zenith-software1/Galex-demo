(function(){
  const products = [
    {id:'g1',name:'Gorra Clásica Negra',price:4990,image:'cap1.png',desc:'Canvas resistente, bordado frontal premium.'},
    {id:'g2',name:'Gorra Logo Blanco',price:5490,image:'cap2.png',desc:'Logo minimalista, visera curva ergonómica.'},
    {id:'g3',name:'Gorra Edición Hero',price:6990,image:'hero.png',desc:'Edición limitada con detalles reflectantes.'},
    {id:'g4',name:'Gorra Lifestyle Daily',price:4590,image:'lifestyle1.png',desc:'Diseño cómodo para uso diario premium.'},
    {id:'g5',name:'Gorra Vintage Edition',price:4990,image:'lifestyle2.png',desc:'Look clásico con lavado vintage exclusivo.'},
    {id:'g6',name:'Gorra Negra Premium',price:7990,image:'cap3.png',desc:'Material premium, resistente al agua.'}
  ];

  function formatPrice(cents){
    return '$' + (cents/100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' MXN';
  }

  function render(){
    const root = document.getElementById('products');
    root.innerHTML = '';
    products.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-meta">
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="price">${formatPrice(p.price)}</div>
          <button class="buy" data-id="${p.id}">Agregar al carrito</button>
        </div>
      `;
      root.appendChild(card);
    });
    document.querySelectorAll('.buy').forEach(btn=>btn.addEventListener('click', addToCart));
    updateCartCount();
  }

  function getCart(){
    try { return JSON.parse(localStorage.getItem('galex_cart')||'[]'); } catch(e){return []}
  }
  function saveCart(cart){ localStorage.setItem('galex_cart', JSON.stringify(cart)); }

  function addToCart(e){
    const id = e.currentTarget.getAttribute('data-id');
    const prod = products.find(p=>p.id===id);
    if(!prod) return;
    const cart = getCart();
    const entry = cart.find(c=>c.id===id);
    if(entry) entry.qty++; else cart.push({id:prod.id,name:prod.name,price:prod.price,qty:1});
    saveCart(cart);
    updateCartCount();
    e.currentTarget.textContent = '✓ Agregado';
    setTimeout(() => { e.currentTarget.textContent = 'Agregar al carrito'; }, 1200);
  }

  function updateCartCount(){
    const count = getCart().reduce((s,i)=>s+i.qty,0);
    document.getElementById('cartCount').textContent = count;
  }

  // Checkout: opens email draft with order summary
  function checkout(){
    const cart = getCart();
    if(cart.length===0){ alert('El carrito está vacío'); return; }
    const lines = cart.map(i=>`${i.qty} x ${i.name} — ${(i.price/100).toFixed(0)} MXN`).join('%0A');
    const total = (cart.reduce((s,i)=>s+i.price*i.qty,0)/100).toFixed(0);
    const body = encodeURIComponent(`Hola, quiero realizar esta compra:%0A%0A${lines}%0A%0ATotal: $${total} MXN%0A%0A---DATOS DE ENVÍO---%0ANombre completo:%0ADirección:%0ATelefono/WhatsApp:%0A`);
    window.location.href = `mailto:ventas@tudominio.com?subject=Pedido%20Galexx%20Mx&body=${body}`;
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    render();
    document.getElementById('cartBtn').addEventListener('click', function(e){ e.preventDefault(); checkout(); });
  });
})();
