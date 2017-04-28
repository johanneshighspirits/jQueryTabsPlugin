/*  =============================== TL TABS ============================== 
//  Example Html markup:
    <div id="uniqueId">
      <ul>
        <li data-nav-headline="Shorter Headline">
            <h3>Tab 1</h3>
            <img src="">
            <p>Tab 1 content</p>
            <p class="rightLink"><a href="">För mer information &raquo;</a></p>
          </li>
          <li>
            <h3>Tab 2</h3>
            <img src="">
            <p>Tab 2 content</p>
            <p class="rightLink"><a href="">För mer information &raquo;</a></p>
          </li>
      </ul>
    </div>

//  Activate plugin
  $(document).ready(function(e) {
    $("#uniqueId").travellinkTabs();
  });
*/
(function($){
  $.fn.travellinkTabs = function() {
    var tabId = $(this).attr("id");
    var numberOfTabs = 0;

    /* Backwards compability check */
    if ($(this).is("ul")) {
      $(this).wrap("<div id='" + tabId + "-container'></div>");
      $(this).addClass("tl-tabs").attr("id", tabId);
    }else{
      $(this).attr("id", tabId + "-container");
      $(this).find("ul").addClass("tl-tabs").attr("id", tabId);
    }

    // Setup tabs
    // Add ul to hold navigation tabs
    $("#" + tabId).before('<ul id="tl-tabs-' + tabId + '" class="tl-tabs-navigation"></ul>');
    // Loop through content li and append to navigation ul 
    $("#" + tabId + ".tl-tabs > li").each(function(index, element) {
      // Is this a Master item?
      if ($(element).parent().parent().attr("id") == tabId + "-container"){
        // Yes, it is
        numberOfTabs += 1;
        var tabHeadline = $(element).attr("data-nav-headline") !== undefined ? $(element).attr("data-nav-headline") : $(element).find("h3").html();
        $("#tl-tabs-" + tabId + ".tl-tabs-navigation").append('<li id="' + tabId + '-tl-nav-' + index + '"><a href="#' + tabId + '-tl-tab-' + index + '">' + tabHeadline + '</a></li>');
        $(element).attr('id', tabId + '-tl-tab-' + index);

        var indexToOpen = 0;
        var hashTag = location.hash;
        if(hashTag !== ""){
          // Strip any GET variables
          var varStart = hashTag.indexOf("?");
          if(varStart != -1){
            hashTag = hashTag.substr(0, varStart);
          }
          var indexStart = hashTag.indexOf("tl-tab-");
          if(indexStart != -1){
            indexToOpen = hashTag.substr(indexStart + 7);
          }
        }
        
        if(index == indexToOpen){
          $(element).addClass("active");
          $('#' + tabId + '-tl-nav-' + index + ' a').addClass("active");
        }
      }
    });

  $("#tl-tabs-" + tabId + ".tl-tabs-navigation").append('<li class="clearer"></li>');

  // Tabs functions
  $("#tl-tabs-" + tabId + ".tl-tabs-navigation li a").click(function(e){
    e.preventDefault();
    $("#tl-tabs-" + tabId + ".tl-tabs-navigation li a.active").removeClass("active");
    $("#" + tabId + ".tl-tabs > li.active").removeClass("active");
    $($(this).attr("href")).addClass("active");
    $(this).addClass("active");
  });

  updateTabsWidth();

  $(window).resize(function(){
    updateTabsWidth();
  });

  function updateTabsWidth(){
    var marginBetweenTabs = 5;
    var leftAndRightMargin = 28;
    var tabWidth = ($(".turistbyra").width() - (numberOfTabs * marginBetweenTabs) - leftAndRightMargin) / numberOfTabs;
    var tabWidthPercent = tabWidth / $(".turistbyra").width() * 100;
    $("#tl-tabs-" + tabId + ".tl-tabs-navigation li").css("width", tabWidthPercent + "%");

      var liHeight = 0;
      var needsUpdate = false;
      $(".tl-tabs-navigation li a").each(function(index, element){
        if($(element).height() > liHeight){
          liHeight = $(element).height();
          needsUpdate = true;
        }
      });
      if(needsUpdate){
        $(".tl-tabs-navigation li a").each(function(index, element){
          $(element).css("height", liHeight);
        });
      }
  }

  if (location.hash !== ""){
    scrollToTabs();
  }
  
  function scrollToTabs(){
      var tabsTop = $("#" + tabId);
      $('html,body').animate({scrollTop: (tabsTop.offset().top - 80)}, 200);
  }

  return this;
  };

}(jQuery));