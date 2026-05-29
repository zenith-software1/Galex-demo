(function(){
  const products = [
    {id:'g1',name:'Gorra Clásica Negra',price:4990,image:'cap1.png',desc:'Gorra en canvas resistente, bordado frontal.'},
    {id:'g2',name:'Gorra Logo Blanco',price:5490,image:'cap2.png',desc:'Logo minimalista, visera curva.'},
    {id:'g3',name:'Gorra Edición Hero',price:6990,image:'hero.png',desc:'Edición limitada con detalles reflectantes.'},
    {id:'g4',name:'Gorra Lifestyle',price:4590,image:'lifestyle1.png',desc:'Diseño cómodo para uso diario.'},
    {id:'g5',name:'Gorra Vintage',price:4990,image:'lifestyle2.png',desc:'Look clásico con lavado vintage.'},
    {id:'g6',name:'Gorra Negra Premium',price:7990,image:'cap3.png',desc:'Material premium, resistente al agua.'}
  ];

  function formatPrice(cents){
    return (cents/100).toFixed(2) + ' MXN';
  }

  function render(){
    const root = document.getElementById('products');
    root.innerHTML = '';
    products.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div class="product-meta">
          <div class="text-lg font-medium">${p.name}</div>
          <div class="text-sm text-white/70">${p.desc}</div>
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
    alert(prod.name + ' agregado al carrito');
  }

  function updateCartCount(){
    const count = getCart().reduce((s,i)=>s+i.qty,0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartBtn').href = '#';
  }

  // Simple checkout: opens email draft with order summary (demo)
  function checkout(){
    const cart = getCart();
    if(cart.length===0){ alert('El carrito está vacío'); return; }
    const lines = cart.map(i=>`${i.qty} x ${i.name} — ${(i.price/100).toFixed(2)} MXN`).join('%0A');
    const total = (cart.reduce((s,i)=>s+i.price*i.qty,0)/100).toFixed(2);
    const body = encodeURIComponent(`Hola, quiero comprar:%0A${lines}%0A%0ATotal: ${total} MXN%0A%0ANombre:%0ADirección de envío:%0AContacto:%0A`);
    const mailto = `mailto:ventas@tu-dominio.com?subject=Pedido%20Galexx&body=${body}`;
    window.location.href = mailto;
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    render();
    document.getElementById('cartBtn').addEventListener('click', function(e){ e.preventDefault(); checkout(); });
  });
})();
