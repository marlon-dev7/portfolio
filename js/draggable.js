/* Draggable element script (pointer events + touch fallback) */
(function(){
  const el = document.getElementById('draggable');
  if(!el) return; // Exit if element doesn't exist

  el.addEventListener('dragstart', e => e.preventDefault());

  // Core move logic used by both pointer and touch
  function startDrag(clientX, clientY, pointerId){
    el.classList.add('dragging');
    const rect = el.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    function moveTo(clientXMove, clientYMove){
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      let x = clientXMove - offsetX;
      let y = clientYMove - offsetY;
      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    }

    function endDrag(){
      cleanup();
      el.classList.remove('dragging');
    }

    // Pointer move handlers
    function onPointerMove(ev){ moveTo(ev.clientX, ev.clientY); }
    function onPointerUp(ev){
      if(ev.pointerId === pointerId) endDrag();
    }

    // Touch handlers
    function onTouchMove(ev){
      if(!ev.touches || ev.touches.length === 0) return;
      const t = ev.touches[0];
      moveTo(t.clientX, t.clientY);
    }
    function onTouchEnd(ev){ endDrag(); }

    function cleanup(){
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      try{ el.releasePointerCapture && el.releasePointerCapture(pointerId); }catch(e){}
    }

    // attach listeners
    if(window.PointerEvent){
      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerup', onPointerUp);
      try{ el.setPointerCapture && el.setPointerCapture(pointerId); }catch(e){}
    } else {
      // fallback to touch
      window.addEventListener('touchmove', onTouchMove, {passive: false});
      window.addEventListener('touchend', onTouchEnd);
    }

    return cleanup;
  }

  // Pointer start
  el.addEventListener('pointerdown', function(e){
    // only left button / touch
    if(e.button && e.button !== 0) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY, e.pointerId);
  });

  // Touchstart fallback for browsers without PointerEvent
  if(!window.PointerEvent){
    el.addEventListener('touchstart', function(e){
      if(!e.touches || e.touches.length === 0) return;
      e.preventDefault();
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY, null);
    }, {passive: false});
  }

})();
