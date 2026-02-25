/* Draggable element script (robust touch + pointer support) */
(function(){
  const el = document.getElementById('draggable');
  if(!el) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let elWidth = 0;
  let elHeight = 0;

  function startDrag(clientX, clientY){
    if(isDragging) return;
    isDragging = true;
    el.classList.add('dragging');
    
    const rect = el.getBoundingClientRect();
    elWidth = rect.width;
    elHeight = rect.height;
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  }

  function moveDrag(clientX, clientY){
    if(!isDragging) return;
    
    const maxX = window.innerWidth - elWidth;
    const maxY = window.innerHeight - elHeight;
    let x = clientX - offsetX;
    let y = clientY - offsetY;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  }

  function endDrag(){
    if(!isDragging) return;
    isDragging = false;
    el.classList.remove('dragging');
  }

  // Touch events (primary for mobile)
  el.addEventListener('touchstart', function(e){
    if(e.touches.length === 0) return;
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
  }, {passive: true});

  document.addEventListener('touchmove', function(e){
    if(!isDragging || !e.touches || e.touches.length === 0) return;
    e.preventDefault();
    const t = e.touches[0];
    moveDrag(t.clientX, t.clientY);
  }, {passive: false});

  document.addEventListener('touchend', endDrag, {passive: true});
  document.addEventListener('touchcancel', endDrag, {passive: true});

  // Pointer events (fallback for desktop/hybrid)
  el.addEventListener('pointerdown', function(e){
    if(e.button && e.button !== 0) return;
    startDrag(e.clientX, e.clientY);
    try{ el.setPointerCapture(e.pointerId); }catch(err){}
  }, {passive: true});

  document.addEventListener('pointermove', function(e){
    if(!isDragging) return;
    moveDrag(e.clientX, e.clientY);
  }, {passive: true});

  document.addEventListener('pointerup', endDrag, {passive: true});
  document.addEventListener('pointercancel', endDrag, {passive: true});

  // Prevent native drag
  el.addEventListener('dragstart', e => e.preventDefault());
  
})();
