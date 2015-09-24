//fade in html on pageload

$('html').css('opacity', '0').fadeTo(1500, 1,'swing');

// -- sidebar slide away hide --
  // -- lives here bc sidebar is global --

function initMenu() {
$('#menu ul').hide();
$('#menu ul').children('.current').parent().show();
//$('#menu ul:first').show();
$('#menu li a').click(
  function() {
    var checkElement = $(this).next();
    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
      return false;
      }
    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
      $('#menu ul:visible').slideUp('normal');
      checkElement.slideDown('normal');
      return false;
      }
    }
  );
}

function formValidation() {
  webshim.setOptions('forms', {
    lazyCustomMessages: true,
    iVal: {
      sel: '.ws-validate',
      handleBubble: 'hide', // hide error bubble
      //add bootstrap specific classes
      errorMessageClass: 'help-block',
      successWrapperClass: 'has-success',
      errorWrapperClass: 'has-error',
      //add config to find right wrapper
      fieldWrapper: '.form-group'
    }
  });
  //load forms polyfill + iVal feature
  webshim.polyfill('forms');
};

$(document).ready(function() {
  initMenu();
  //toggle sidebar and adjust map accordingly
  $("#hide").click(function(){
      $("#wrapper").toggle();
      $("#map-canvas").css('margin-left', 'auto');
  });

  //when window resizes, hide sidebar and adjust map
  $(window).resize(function(){
    if ($(window).width() <= 750){
      $("#map-canvas").css('margin-left', 'auto');
    }
  });

  //detects screensize, if mobile auto loads with no sidebar
  $(window).load(function() {
    if ($(window).width() <= 750){
      $("#map-canvas").css('margin-left', 'auto');
    }
  });

  formValidation();
});
