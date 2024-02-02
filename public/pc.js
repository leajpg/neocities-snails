/*################################################################################
##################################################################################
##########                                                             ###########
##########                                                             ###########
##########        Windows Template by                                  ###########
##########            https://html5-templates.com/                      ###########
##########                                                             ###########
##########        All rights reserved.                                 ###########
##########                                                             ###########
##################################################################################
################################################################################*/

var i = 0,
  minimizedWidth = new Array(),
  minimizedHeight = new Array(),
  windowTopPos = new Array(),
  windowLeftPos = new Array(),
  panel,
  id;

function adjustFullScreenSize() {
  $(".fullSizeWindow .wincontent").css("width", window.innerWidth - 32);
  $(".fullSizeWindow .wincontent").css("height", window.innerHeight - 98);
}

function makeWindowActive(thisid) {
  $(".window").each(function () {
    $(this).css("z-index", $(this).css("z-index") - 1);
  });
  $("#window" + thisid).css("z-index", 1000);
  $(".window").removeClass("activeWindow");
  $("#window" + thisid).addClass("activeWindow");

  $(".taskbarPanel").removeClass("activeTab");

  $("#minimPanel" + thisid).addClass("activeTab");
}

function minimizeWindow(id) {
  windowTopPos[id] = $("#window" + id).css("top");
  windowLeftPos[id] = $("#window" + id).css("left");

  $("#window" + id).animate(
    {
      top: 800,
      left: 0,
    },
    200,
    function () {
      //animation complete
      $("#window" + id).addClass("minimizedWindow");
      $("#minimPanel" + id).addClass("minimizedTab");
      $("#minimPanel" + id).removeClass("activeTab");
    }
  );
}

function openWindow(id) {
  if ($("#window" + id).hasClass("minimizedWindow")) {
    openMinimized(id);
  } else {
    makeWindowActive(id);
    $("#window" + id).show(); // Show the window
    $("#minimPanel" + id).removeClass("closed");
  }
}

function closeWindow(id) {
  if ($("#window" + id).hasClass("minimizedWindow")) {
    $("#window" + id).removeClass("minimizedWindow");
    $("#minimPanel" + id).removeClass("minimizedTab");
    makeWindowActive(id);

    $("#window" + id).animate(
      {
        top: windowTopPos[id],
        left: windowLeftPos[id],
      },
      200,
      function () {}
    );
  }

  // Close the window by hiding it
  $("#window" + id).hide();
  $("#minimPanel" + id).addClass("closed");
}

$(document).ready(function () {
  $(".window").each(function () {
    $(this).css("z-index", 1000);
    $(this).attr("data-id", i);
    minimizedWidth[i] = $(this).width();
    minimizedHeight[i] = $(this).height();
    windowTopPos[i] = $(this).css("top");
    windowLeftPos[i] = $(this).css("left");
    $("#taskbar").append(
      '<div class="taskbarPanel" id="minimPanel' +
        i +
        '" data-id="' +
        i +
        '">' +
        $(this).attr("data-title") +
        "</div>"
    );
    if ($(this).hasClass("closed")) {
      $("#minimPanel" + i).addClass("closed");
    }
    $(this).attr("id", "window" + i++);
    $(this).wrapInner('<div class="wincontent"></div>');
    $(this).prepend(
      '<div class="windowHeader"><strong>' +
        $(this).attr("data-title") +
        '</strong><span title="Minimize" class="winminimize"><span></span></span><span title="Maximize" class="winmaximize"><span></span><span></span></span><span title="Close" class="winclose">x</span></div>'
    );
  });

  $("#minimPanel" + (i - 1)).addClass("activeTab");
  $("#window" + (i - 1)).addClass("activeWindow");

  $(".wincontent").resizable(); // resizable
  $(".window").draggable({ cancel: ".wincontent" }); // draggable

  // Additional code for draggable-only windows
  $(".dragOnlyWindow").draggable();

  $(".window").mousedown(function () {
    makeWindowActive($(this).attr("data-id"));
  });

  $(".winclose").click(function () {
    closeWindow($(this).parent().parent().attr("data-id"));
  });

  $(".winminimize").click(function () {
    minimizeWindow($(this).parent().parent().attr("data-id"));
  });

  $(".taskbarPanel").click(function () {
    id = $(this).attr("data-id");
    if ($(this).hasClass("activeTab")) {
      minimizeWindow($(this).attr("data-id"));
    } else {
      if ($(this).hasClass("minimizedTab")) {
        openMinimized(id);
      } else {
        makeWindowActive(id);
      }
    }
  });

  $(".openWindow").click(function () {
    openWindow($(this).attr("data-id"));
  });

  $(".winmaximize").click(function () {
    if ($(this).parent().parent().hasClass("fullSizeWindow")) {
      $(this).parent().parent().removeClass("fullSizeWindow");
      $(this)
        .parent()
        .parent()
        .children(".wincontent")
        .height(minimizedHeight[$(this).parent().parent().attr("data-id")]);
      $(this)
        .parent()
        .parent()
        .children(".wincontent")
        .width(minimizedWidth[$(this).parent().parent().attr("data-id")]);
    } else {
      $(this).parent().parent().addClass("fullSizeWindow");

      minimizedHeight[$(this).parent().parent().attr("data-id")] = $(this)
        .parent()
        .parent()
        .children(".wincontent")
        .height();
      minimizedWidth[$(this).parent().parent().attr("data-id")] = $(this)
        .parent()
        .parent()
        .children(".wincontent")
        .width();

      adjustFullScreenSize();
    }
  });

  adjustFullScreenSize();
});

/* Add the provided JavaScript code below this comment */
$(document).ready(function () {
  $(".window").draggable({
    handle: ".windowHeader",
  });

  $(".dragOnlyWindow").resizable({
    disabled: true,
  });

  $(".winclose").click(function () {
    $(this).closest(".window").hide();
  });
});
