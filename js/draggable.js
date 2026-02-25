/* Draggable element script (pointer events) */
(function(){
  const el = document.getElementById('draggable');
  if(!el) return; // Exit if element doesn't exist

  el.addEventListener('dragstart', e => e.preventDefault());

  el.addEventListener('pointerdown', function init(e){
    el.setPointerCapture && el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    function onPointerMove(ev){
      let x = ev.clientX - offsetX;
      let y = ev.clientY - offsetY;
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    }

    function onPointerUp(ev){
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.classList.remove('dragging');
      try{ el.releasePointerCapture(ev.pointerId); }catch(err){}
    }

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
  });
})();
