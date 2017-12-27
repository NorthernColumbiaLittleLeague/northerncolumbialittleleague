NCLL.Menu = (function() {
  
  function bindEvents($menuBtn) {
    $menuBtn.on('click', function(){
      $('#nav-links').toggle();
    })
  }
  
  
  return {
    init: function($menuBtn) {
      bindEvents($menuBtn);
    }
  }
})();

$(document).ready(function() {
  NCLL.Menu.init($('#menu-btn'));
})