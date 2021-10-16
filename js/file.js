var currentPageTitle = "";
var currentPageURL = "";
function downloadPro() {
    $(".download-link, #downloadButtonMain").click(function(e) {
        if (!$(this).hasClass('in-cloud')) {
            e.preventDefault();
            $('#save-link-' + $(this).attr('data-id')).addClass('animated tada');
            $.notify({
                message: '<span class="notification">' + lang.js_save_file_for_quick_download + '</span>'
            }, {
                type: 'danger',
                allow_dismiss: false,
                placement: {
                    from: "bottom",
                    align: "center"
                },
                animate: {
                    enter: "animated zoomIn",
                    exit: "animated zoomOut"
                }
            });
        } else {
            $.post("/AI/d", {
                file_id: $(this).attr('data-id')
            }).done(function(data) {});
        }
    });
}
function AiD(file_id) {
    $.post("/AI/d", {
        file_id: file_id
    }).done(function(data) {});
}
function reloadIFrame() {
    document.getElementById("viewerPro").src = document.getElementById("viewerPro").src;
}
$(document).ready(function() {
    $('.modal').on('hidden.bs.modal', function() {
        if (window.location.hash == '#modal') {
            history.replaceState("", document.title, window.location.pathname + window.location.search);
        }
    });
});
timerId = null;
iframeLoadingTrials = 0;
function previewPro() {
    downloadPro();
    $('[data-toggle="popover"]').popover();
    currentPageTitle = document.title;
    currentPageURL = window.location.href;
    $('#previewModalPro').on('hidden.bs.modal', function() {
        document.title = currentPageTitle;
        history.replaceState(null, null, currentPageURL);
        if ("ontouchstart"in document.documentElement) {
            $('#viewerPro').attr('src', null);
        }
    });
    $("#download-button-pro, #goToFileButtonMemberModal").click(function(e) {
        document.title = currentPageTitle;
        history.replaceState(null, null, currentPageURL);
    });
    $("#download-button-pro").click(function(e) {
        $.post("/AI/d", {
            file_id: $(this).attr('data-id')
        }).done(function(data) {});
    });
    $(".preview-link, #previewButtonMain").click(function(e) {
        if ($('#viewerPro').attr('src') != $(this).attr('data-preview')) {
            $('#viewerPro').attr('src', '');
            var previewUrl = $(this).attr('data-preview');
            getReviews($(this).attr('data-id'), 'preview-reviews');
            $('#loading-overlay, #previewLoadingIcon').show();
            $('#viewerPro').attr('src', previewUrl);
            reportReason = '';
            reportId = $(this).attr('data-id');
            if (timerId)
                clearInterval(timerId);
            iframeLoadingTrials = 0;
            timerId = setInterval(function() {
                if (iframeLoadingTrials <= 0) {
                    $('#viewerPro').attr('src', previewUrl + '&trial' + iframeLoadingTrials);
                    console.log("Load again: " + $('#viewerPro').attr('src') + " " + iframeLoadingTrials);
                } else {
                    $('#reload-overlay').show();
                }
                iframeLoadingTrials += 1;
            }, 10000);
            $('#viewerPro').on('load', function() {
                clearInterval(timerId);
                console.log("Loaded: " + $('#viewerPro').attr('src'));
                $('#loading-overlay').hide();
                $('#reload-overlay, #previewLoadingIcon').hide();
            });
            window.setTimeout(function() {
                $('#viewerPro').attr('src', previewUrl + '&ok');
                console.log("Loading.");
            }, 200);
            window.setTimeout(function() {
                $('#loading-overlay').hide();
            }, 6000);
        }
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width < 640) {
            $('#viewerPro').height(window.innerHeight - 75 + 'px');
        } else {
            $('#viewerPro').height(window.innerHeight - 175 + 'px');
        }
        $('#previewModalPro').modal('show');
        window.history.pushState({
            page: 1
        }, "", "");
        history.replaceState(null, null, $(this).attr('data-url'));
        if ($(this).attr('data-title')) {
            document.title = $(this).attr('data-title');
        }
        if ($(this).hasClass('in-cloud-2')) {
            $('#download-button-pro').show();
            $('#download-button-pro').attr('href', $(this).attr('data-download'));
            $('#download-button-pro').attr('data-id', $(this).attr('data-id'));
            $('#goToFileButtonMemberModal').hide();
        } else {
            $('#goToFileButtonMemberModal').show();
            $('#download-button-pro').hide();
            $('#goToFileButtonMemberModal').attr('href', $(this).attr('data-download-page'));
        }
        return e.preventDefault();
    });
}
function getReviews(id, target) {
    return;
    $('#' + target).load("/reviews/getReview/" + id + "/" + target, {}, function() {
        var $star_rating = $('#star-rating-' + target + ' .fa');
        var SetRatingStar = function() {
            return $star_rating.each(function() {
                if (parseInt($star_rating.siblings('#input-rate-' + target).val()) >= parseInt($(this).data('rating'))) {
                    return $(this).removeClass('fa-star-o').addClass('fa-star');
                } else {
                    return $(this).removeClass('fa-star').addClass('fa-star-o');
                }
            });
        };
        $star_rating.on('click', function() {
            $star_rating.siblings('#input-rate-' + target).val($(this).data('rating'));
            return SetRatingStar();
        });
        SetRatingStar();
    });
}
function aiSimilar() {
    $(".ai-similar").off("click");
    $(".ai-similar").click(function(e) {
        $.post("/AI/similar", {
            file_from: $(this).attr('data-from'),
            file_to: $(this).attr('data-to'),
            location: $(this).attr('data-loc')
        }).done(function(data) {});
    });
    $(".ai-search").off("click");
    $(".ai-search").click(function(e) {
        $.post("/AI/similar", {
            query: query,
            file_to: $(this).attr('data-to'),
            location: $(this).attr('data-loc')
        }).done(function(data) {});
    });
}
if (user.member == 0) {
    $(document).ready(function() {
        $(document).on({
            mouseleave: function(e) {
                if (e.clientY < 0 && getCookie("pdfdriveAlerts") == "") {
                    $('#pdfdriveAlertsImg').attr('src', '/assets/img/pd-trending-mail.jpg');
                    $('#pdfdriveAlerts').modal('show');
                    setCookie("pdfdriveAlerts", 1, 30);
                }
            }
        });
    });
}
setTimeout(function() {
    if ("ontouchstart"in document.documentElement && getCookie("pdfdriveAlerts") == "") {
        $('#pdfdriveAlertsImg').attr('src', '/assets/img/pd-trending-mail.jpg');
        $('#pdfdriveAlerts').modal('show');
        setCookie("pdfdriveAlerts", 1, 30);
    }
}, 10000);
function writeReview(target) {
    if ($('#input-rate-' + target).val() != 0) {
        var id = $('#input-file-id-' + target).val();
        $.post("/reviews/write", {
            file_id: id,
            review: $('#input-review-' + target).val(),
            rate: $('#input-rate-' + target).val()
        }).done(function(data) {
            $('#' + target).html('');
            getReviews(id, target);
        });
    } else {
        $('#star-rating-' + target).removeClass('animated tada');
        $('#star-rating-' + target).tooltip('show');
        $('#star-rating-' + target).addClass('animated tada');
    }
    return false;
}
var just_loaded = false;
$(document).ready(function() {
    setTimeout(function() {
        just_loaded = true
    }, 6000);
    window.onpopstate = function(event) {
        if ($('.mobile-menu').hasClass('mobile-menu--open')) {
            $('.mobile-nav-button').click();
            return false;
        } else if ($('.modal-backdrop').hasClass('show')) {
            $('.modal').modal('hide');
            return false;
        } else if ($("#m-search-form").is(":visible")) {
            toggleMSearch();
            return false;
        } else if ($("iframe[name*='stripe_checkout_app']").is(':visible')) {
            $("iframe[name*='stripe_checkout_app']").hide();
            history.replaceState(null, null, window.location.href);
            return false;
        } else {
            if (window.location.hash == "" && just_loaded)
                window.history.back();
        }
    }
});
function askYourself() {
    $("#ask-yourself").fadeTo(300, 0).load("/home/askYourself", {}, function() {
        $("#ask-yourself").fadeTo(0, 1);
        ga('send', 'event', 'AskYourself');
    });
}
var isMobile = false;
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
    isMobile = true;
function chainAnim(e, s, o) {
    var $fade = $(e);
    $fade.each(function(i) {
        $(this).delay(i * s).fadeTo(s, o);
        if (i == 5) {
            $('.files:last .file').show();
            return false;
        }
    });
}
function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    }
}
function validate(id) {
    if (validateEmail($('#email-' + id).val())) {
        $.getScript("https://www.google.com/recaptcha/api.js?render=6Lfo3eoUAAAAAG1agFKNm0HMJiuml_Dee8kdr1nz").done(function(script, textStatus) {
            grecaptcha.ready(function() {
                grecaptcha.execute('6Lfo3eoUAAAAAG1agFKNm0HMJiuml_Dee8kdr1nz', {
                    action: 'emailSignup'
                }).then(function(token) {
                    $.post("/mail/addMail", {
                        email: $('#email-' + id).val(),
                        recaptchaMail: token
                    }).done(function(data) {
                        $('#subscribebox-' + id).html(data);
                        try {
                            ga('send', 'event', 'Subscribed', id);
                        } catch (err) {}
                    });
                });
            });
        });
    } else {
        $('#email-' + id).css('border', '1px solid #dea3a3').fadeTo(500, 0.3).fadeTo(200, 1).focus();
    }
    return false;
}
function sprintf(format) {
    for (var i = 1; i < arguments.length; i++) {
        format = format.replace(/%s/, arguments[i]);
    }
    return format;
}
function initTooltips() {
    try {
        $('[data-toggle="tooltip"]').tooltip();
    } catch (err) {}
}
function chainAnim(e, s, o) {
    var $fade = $(e);
    $fade.each(function(i) {
        $(this).delay(i * s).fadeTo(s, o);
        if (i == 5) {
            $('.files:last .file').show();
            return false;
        }
    });
}
var vis = (function() {
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c)
            document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
}
)();
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
$.fn.random = function() {
    return this.eq(Math.floor(Math.random() * this.length));
}
function rd() {
    if (navigator.cookieEnabled) {
        var redirected = getCookie("redirected");
        if (getCookie("redirected") == "")
            redirected = 0;
        if (!vis() && redirected == 0) {
            try {} catch (err) {}
            if (redirected == 0) {
                alert(window.location.host);
            }
            setCookie("redirected", parseInt(redirected) + 1, 30);
        }
    }
}
setTimeout("rd()", 300000);
function fileInfoForMobile(force) {
    if (window.innerWidth <= 640 || force) {
        $('.file-info').each(function(i) {
            $('#file-info-' + $(this).attr('data-id')).html($(this).children('.pages').html().toLowerCase() + ' · ' + $(this).children('.year').html() + ' · ' + $(this).children('.size').html() + ' · ' + $(this).children('.downloads').html().toLowerCase() + ' · ');
        });
    }
}
$(document).ready(function() {
    $(".img-zoom").hoverIntent({
        over: makeLarge,
        out: makeSmall
    });
    getFileNumber();
});
var orjwidth = "116px";
var orjheight = "160px";
function makeLarge() {
    orjwidth = $(this).css('width');
    orjheight = $(this).css('height');
    $(this).attr('src', $(this).attr('data-original').replace('-s.jpg', '.jpg'));
    $(this).css('z-index', 13);
    $(this).css('border-radius', '3px');
    $(this).animate({
        width: "230px",
        height: "317px",
        "margin-left": "-57px",
        "margin-top": "-120px"
    }, 150);
}
function makeSmall() {
    $(this).css('border-radius', '3px 0px 0px 3px');
    $(this).animate({
        width: orjwidth,
        height: orjheight,
        "margin-left": "0px",
        "margin-top": "0px"
    }, 150);
    $(this).css('z-index', 10);
}
var cend = 0;
function animateValue(id, start, end, duration) {
    if (Math.abs(end - start) > 200)
        return;
    var obj = document.getElementById(id);
    var range = end - start;
    var minTimer = 50;
    var stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    var orjStepTime = stepTime;
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        try {
            obj.innerHTML = numberWithCommas(value);
        } catch (err) {}
        if (!$('#q').is(":focus"))
            $('#q').attr("placeholder", sprintf(lang.js_search_for_books, numberWithCommas(value)));
        if (value == end) {
            cend = end;
            clearInterval(timer);
            getFileNumber();
        }
    }
    timer = setInterval(run, stepTime);
    run();
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getFileNumber() {
    $.ajax({
        url: "/ebook/counter",
        data: {
            time: Math.random()
        }
    }).done(function(data) {
        if (cend == 0) {
            cend = data;
            animateValue("counter", data - 100, data, 40000);
        } else {
            animateValue("counter", cend, data, 40000);
        }
    });
}
(function(e) {
    e.fn.hoverIntent = function(t, n, r) {
        var i = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        if (typeof t === "object") {
            i = e.extend(i, t)
        } else if (e.isFunction(n)) {
            i = e.extend(i, {
                over: t,
                out: n,
                selector: r
            })
        } else {
            i = e.extend(i, {
                over: t,
                out: t,
                selector: n
            })
        }
        var s, o, u, a;
        var f = function(e) {
            s = e.pageX;
            o = e.pageY
        };
        var l = function(t, n) {
            n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
            if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
                e(n).off("mousemove.hoverIntent", f);
                n.hoverIntent_s = 1;
                return i.over.apply(n, [t])
            } else {
                u = s;
                a = o;
                n.hoverIntent_t = setTimeout(function() {
                    l(t, n)
                }, i.interval)
            }
        };
        var c = function(e, t) {
            t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
            t.hoverIntent_s = 0;
            return i.out.apply(t, [e])
        };
        var h = function(t) {
            var n = jQuery.extend({}, t);
            var r = this;
            if (r.hoverIntent_t) {
                r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
            }
            if (t.type == "mouseenter") {
                u = n.pageX;
                a = n.pageY;
                e(r).on("mousemove.hoverIntent", f);
                if (r.hoverIntent_s != 1) {
                    r.hoverIntent_t = setTimeout(function() {
                        l(n, r)
                    }, i.interval)
                }
            } else {
                e(r).off("mousemove.hoverIntent", f);
                if (r.hoverIntent_s == 1) {
                    r.hoverIntent_t = setTimeout(function() {
                        c(n, r)
                    }, i.timeout)
                }
            }
        };
        return this.on({
            "mouseenter.hoverIntent": h,
            "mouseleave.hoverIntent": h
        }, i.selector)
    }
}
)(jQuery)
!function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports && "function" == typeof require ? require("jquery") : jQuery)
}(function(a) {
    "use strict";
    function b(c, d) {
        var e = function() {}
          , f = this
          , g = {
            ajaxSettings: {},
            autoSelectFirst: !1,
            appendTo: document.body,
            serviceUrl: null,
            lookup: null,
            onSelect: null,
            width: "auto",
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            params: {},
            formatResult: b.formatResult,
            delimiter: null,
            zIndex: 9999,
            type: "GET",
            noCache: !1,
            onSearchStart: e,
            onSearchComplete: e,
            onSearchError: e,
            containerClass: "autocomplete-suggestions",
            tabDisabled: !1,
            dataType: "text",
            currentRequest: null,
            triggerSelectOnValidInput: !0,
            preventBadQueries: !0,
            lookupFilter: function(a, b, c) {
                return -1 !== a.value.toLowerCase().indexOf(c)
            },
            paramName: "query",
            transformResult: function(b) {
                return "string" == typeof b ? a.parseJSON(b) : b
            },
            showNoSuggestionNotice: !1,
            noSuggestionNotice: "No results",
            orientation: "bottom",
            forceFixPosition: !1
        };
        f.element = c,
        f.el = a(c),
        f.suggestions = [],
        f.badQueries = [],
        f.selectedIndex = -1,
        f.currentValue = f.element.value,
        f.intervalId = 0,
        f.cachedResponse = {},
        f.onChangeInterval = null,
        f.onChange = null,
        f.isLocal = !1,
        f.suggestionsContainer = null,
        f.noSuggestionsContainer = null,
        f.options = a.extend({}, g, d),
        f.classes = {
            selected: "autocomplete-selected",
            suggestion: "autocomplete-suggestion"
        },
        f.hint = null,
        f.hintValue = "",
        f.selection = null,
        f.initialize(),
        f.setOptions(d)
    }
    var c = function() {
        return {
            escapeRegExChars: function(a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            },
            createNode: function(a) {
                var b = document.createElement("div");
                return b.className = a,
                b.style.position = "absolute",
                b.style.display = "none",
                b
            }
        }
    }()
      , d = {
        ESC: 27,
        TAB: 9,
        RETURN: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };
    b.utils = c,
    a.Autocomplete = b,
    b.formatResult = function(a, b) {
        var d = "(" + c.escapeRegExChars(b) + ")";
        return a.value.replace(new RegExp(d,"gi"), "<strong>$1</strong>")
    }
    ,
    b.prototype = {
        killerFn: null,
        initialize: function() {
            var c, d = this, e = "." + d.classes.suggestion, f = d.classes.selected, g = d.options;
            d.element.setAttribute("autocomplete", "off"),
            d.killerFn = function(b) {
                0 === a(b.target).closest("." + d.options.containerClass).length && (d.killSuggestions(),
                d.disableKillerFn())
            }
            ,
            d.noSuggestionsContainer = a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),
            d.suggestionsContainer = b.utils.createNode(g.containerClass),
            c = a(d.suggestionsContainer),
            c.appendTo(g.appendTo),
            "auto" !== g.width && c.width(g.width),
            c.on("mouseover.autocomplete", e, function() {
                d.activate(a(this).data("index"))
            }),
            c.on("mouseout.autocomplete", function() {
                d.selectedIndex = -1,
                c.children("." + f).removeClass(f)
            }),
            c.on("click.autocomplete", e, function() {
                d.select(a(this).data("index"))
            }),
            d.fixPositionCapture = function() {
                d.visible && d.fixPosition()
            }
            ,
            a(window).on("resize.autocomplete", d.fixPositionCapture),
            d.el.on("keydown.autocomplete", function(a) {
                d.onKeyPress(a)
            }),
            d.el.on("keyup.autocomplete", function(a) {
                d.onKeyUp(a)
            }),
            d.el.on("blur.autocomplete", function() {
                d.onBlur()
            }),
            d.el.on("focus.autocomplete", function() {
                d.onFocus()
            }),
            d.el.on("change.autocomplete", function(a) {
                d.onKeyUp(a)
            })
        },
        onFocus: function() {
            var a = this;
            a.fixPosition(),
            a.options.minChars <= a.el.val().length && a.onValueChange()
        },
        onBlur: function() {
            this.enableKillerFn()
        },
        setOptions: function(b) {
            var c = this
              , d = c.options;
            a.extend(d, b),
            c.isLocal = a.isArray(d.lookup),
            c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)),
            d.orientation = c.validateOrientation(d.orientation, "bottom"),
            a(c.suggestionsContainer).css({
                "max-height": d.maxHeight + "px",
                width: d.width + "px",
                "z-index": d.zIndex
            })
        },
        clearCache: function() {
            this.cachedResponse = {},
            this.badQueries = []
        },
        clear: function() {
            this.clearCache(),
            this.currentValue = "",
            this.suggestions = []
        },
        disable: function() {
            var a = this;
            a.disabled = !0,
            clearInterval(a.onChangeInterval),
            a.currentRequest && a.currentRequest.abort()
        },
        enable: function() {
            this.disabled = !1
        },
        fixPosition: function() {
            var b = this
              , c = a(b.suggestionsContainer)
              , d = c.parent().get(0);
            if (d === document.body || b.options.forceFixPosition) {
                var e = b.options.orientation
                  , f = c.outerHeight()
                  , g = b.el.outerHeight()
                  , h = b.el.offset()
                  , i = {
                    top: h.top,
                    left: h.left
                };
                if ("auto" == e) {
                    var j = a(window).height()
                      , k = a(window).scrollTop()
                      , l = -k + h.top - f
                      , m = k + j - (h.top + g + f);
                    e = Math.max(l, m) === l ? "top" : "bottom"
                }
                if (i.top += "top" === e ? -f : g,
                d !== document.body) {
                    var n, o = c.css("opacity");
                    b.visible || c.css("opacity", 0).show(),
                    n = c.offsetParent().offset(),
                    i.top -= n.top,
                    i.left -= n.left,
                    b.visible || c.css("opacity", o).hide()
                }
                "auto" === b.options.width && (i.width = b.el.outerWidth() - 2 + "px"),
                c.css(i)
            }
        },
        enableKillerFn: function() {
            var b = this;
            a(document).on("click.autocomplete", b.killerFn)
        },
        disableKillerFn: function() {
            var b = this;
            a(document).off("click.autocomplete", b.killerFn)
        },
        killSuggestions: function() {
            var a = this;
            a.stopKillSuggestions(),
            a.intervalId = window.setInterval(function() {
                a.hide(),
                a.stopKillSuggestions()
            }, 50)
        },
        stopKillSuggestions: function() {
            window.clearInterval(this.intervalId)
        },
        isCursorAtEnd: function() {
            var a, b = this, c = b.el.val().length, d = b.element.selectionStart;
            return "number" == typeof d ? d === c : document.selection ? (a = document.selection.createRange(),
            a.moveStart("character", -c),
            c === a.text.length) : !0
        },
        onKeyPress: function(a) {
            var b = this;
            if (!b.disabled && !b.visible && a.which === d.DOWN && b.currentValue)
                return void b.suggest();
            if (!b.disabled && b.visible) {
                switch (a.which) {
                case d.ESC:
                    b.el.val(b.currentValue),
                    b.hide();
                    break;
                case d.RIGHT:
                    if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
                        b.selectHint();
                        break
                    }
                    return;
                case d.TAB:
                    if (b.hint && b.options.onHint)
                        return void b.selectHint();
                case d.RETURN:
                    if (-1 === b.selectedIndex)
                        return void b.hide();
                    if (b.select(b.selectedIndex),
                    a.which === d.TAB && b.options.tabDisabled === !1)
                        return;
                    break;
                case d.UP:
                    b.moveUp();
                    break;
                case d.DOWN:
                    b.moveDown();
                    break;
                default:
                    return
                }
                a.stopImmediatePropagation(),
                a.preventDefault()
            }
        },
        onKeyUp: function(a) {
            var b = this;
            if (!b.disabled) {
                switch (a.which) {
                case d.UP:
                case d.DOWN:
                    return
                }
                clearInterval(b.onChangeInterval),
                b.currentValue !== b.el.val() && (b.findBestHint(),
                b.options.deferRequestBy > 0 ? b.onChangeInterval = setInterval(function() {
                    b.onValueChange()
                }, b.options.deferRequestBy) : b.onValueChange())
            }
        },
        onValueChange: function() {
            var b, c = this, d = c.options, e = c.el.val(), f = c.getQuery(e);
            return c.selection && c.currentValue !== f && (c.selection = null,
            (d.onInvalidateSelection || a.noop).call(c.element)),
            clearInterval(c.onChangeInterval),
            c.currentValue = e,
            c.selectedIndex = -1,
            d.triggerSelectOnValidInput && (b = c.findSuggestionIndex(f),
            -1 !== b) ? void c.select(b) : void (f.length < d.minChars ? c.hide() : c.getSuggestions(f))
        },
        findSuggestionIndex: function(b) {
            var c = this
              , d = -1
              , e = b.toLowerCase();
            return a.each(c.suggestions, function(a, b) {
                return b.value.toLowerCase() === e ? (d = a,
                !1) : void 0
            }),
            d
        },
        getQuery: function(b) {
            var c, d = this.options.delimiter;
            return d ? (c = b.split(d),
            a.trim(c[c.length - 1])) : b
        },
        getSuggestionsLocal: function(b) {
            var c, d = this, e = d.options, f = b.toLowerCase(), g = e.lookupFilter, h = parseInt(e.lookupLimit, 10);
            return c = {
                suggestions: a.grep(e.lookup, function(a) {
                    return g(a, b, f)
                })
            },
            h && c.suggestions.length > h && (c.suggestions = c.suggestions.slice(0, h)),
            c
        },
        getSuggestions: function(b) {
            var c, d, e, f, g = this, h = g.options, i = h.serviceUrl;
            if (h.params[h.paramName] = b,
            d = h.ignoreParams ? null : h.params,
            h.onSearchStart.call(g.element, h.params) !== !1) {
                if (a.isFunction(g.lookup))
                    return void g.lookup(b, function(a) {
                        g.suggestions = a.suggestions,
                        g.suggest(),
                        h.onSearchComplete.call(g.element, b, a.suggestions)
                    });
                g.isLocal ? c = g.getSuggestionsLocal(b) : (a.isFunction(i) && (i = i.call(g.element, b)),
                e = i + "?" + a.param(d || {}),
                c = g.cachedResponse[e]),
                c && a.isArray(c.suggestions) ? (g.suggestions = c.suggestions,
                g.suggest(),
                h.onSearchComplete.call(g.element, b, c.suggestions)) : g.isBadQuery(b) ? h.onSearchComplete.call(g.element, b, []) : (g.currentRequest && g.currentRequest.abort(),
                f = {
                    url: i,
                    data: d,
                    type: h.type,
                    dataType: h.dataType
                },
                a.extend(f, h.ajaxSettings),
                g.currentRequest = a.ajax(f).done(function(a) {
                    var c;
                    g.currentRequest = null,
                    c = h.transformResult(a),
                    g.processResponse(c, b, e),
                    h.onSearchComplete.call(g.element, b, c.suggestions)
                }).fail(function(a, c, d) {
                    h.onSearchError.call(g.element, b, a, c, d)
                }))
            }
        },
        isBadQuery: function(a) {
            if (!this.options.preventBadQueries)
                return !1;
            for (var b = this.badQueries, c = b.length; c--; )
                if (0 === a.indexOf(b[c]))
                    return !0;
            return !1
        },
        hide: function() {
            var b = this;
            b.visible = !1,
            b.selectedIndex = -1,
            clearInterval(b.onChangeInterval),
            a(b.suggestionsContainer).hide(),
            b.signalHint(null)
        },
        suggest: function() {
            if (0 === this.suggestions.length)
                return void (this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide());
            var b, c, d = this, e = d.options, f = e.groupBy, g = e.formatResult, h = d.getQuery(d.currentValue), i = d.classes.suggestion, j = d.classes.selected, k = a(d.suggestionsContainer), l = a(d.noSuggestionsContainer), m = e.beforeRender, n = "", o = function(a) {
                var c = a.data[f];
                return b === c ? "" : (b = c,
                '<div class="autocomplete-group"><strong>' + b + "</strong></div>")
            };
            return e.triggerSelectOnValidInput && (c = d.findSuggestionIndex(h),
            -1 !== c) ? void d.select(c) : (a.each(d.suggestions, function(a, b) {
                f && (n += o(b, h, a)),
                n += '<div class="' + i + '" data-index="' + a + '">' + g(b, h) + "</div>"
            }),
            this.adjustContainerWidth(),
            l.detach(),
            k.html(n),
            a.isFunction(m) && m.call(d.element, k),
            d.fixPosition(),
            k.show(),
            e.autoSelectFirst && (d.selectedIndex = 0,
            k.scrollTop(0),
            k.children().first().addClass(j)),
            d.visible = !0,
            void d.findBestHint())
        },
        noSuggestions: function() {
            var b = this
              , c = a(b.suggestionsContainer)
              , d = a(b.noSuggestionsContainer);
            this.adjustContainerWidth(),
            d.detach(),
            c.empty(),
            c.append(d),
            b.fixPosition(),
            c.show(),
            b.visible = !0
        },
        adjustContainerWidth: function() {
            var b, c = this, d = c.options, e = a(c.suggestionsContainer);
            "auto" === d.width && (b = c.el.outerWidth() - 2,
            e.width(b > 0 ? b : 300))
        },
        findBestHint: function() {
            var b = this
              , c = b.el.val().toLowerCase()
              , d = null;
            c && (a.each(b.suggestions, function(a, b) {
                var e = 0 === b.value.toLowerCase().indexOf(c);
                return e && (d = b),
                !e
            }),
            b.signalHint(d))
        },
        signalHint: function(b) {
            var c = ""
              , d = this;
            b && (c = d.currentValue + b.value.substr(d.currentValue.length)),
            d.hintValue !== c && (d.hintValue = c,
            d.hint = b,
            (this.options.onHint || a.noop)(c))
        },
        verifySuggestionsFormat: function(b) {
            return b.length && "string" == typeof b[0] ? a.map(b, function(a) {
                return {
                    value: a,
                    data: null
                }
            }) : b
        },
        validateOrientation: function(b, c) {
            return b = a.trim(b || "").toLowerCase(),
            -1 === a.inArray(b, ["auto", "bottom", "top"]) && (b = c),
            b
        },
        processResponse: function(a, b, c) {
            var d = this
              , e = d.options;
            a.suggestions = d.verifySuggestionsFormat(a.suggestions),
            e.noCache || (d.cachedResponse[c] = a,
            e.preventBadQueries && 0 === a.suggestions.length && d.badQueries.push(b)),
            b === d.getQuery(d.currentValue) && (d.suggestions = a.suggestions,
            d.suggest())
        },
        activate: function(b) {
            var c, d = this, e = d.classes.selected, f = a(d.suggestionsContainer), g = f.find("." + d.classes.suggestion);
            return f.find("." + e).removeClass(e),
            d.selectedIndex = b,
            -1 !== d.selectedIndex && g.length > d.selectedIndex ? (c = g.get(d.selectedIndex),
            a(c).addClass(e),
            c) : null
        },
        selectHint: function() {
            var b = this
              , c = a.inArray(b.hint, b.suggestions);
            b.select(c)
        },
        select: function(a) {
            var b = this;
            b.hide(),
            b.onSelect(a)
        },
        moveUp: function() {
            var b = this;
            if (-1 !== b.selectedIndex)
                return 0 === b.selectedIndex ? (a(b.suggestionsContainer).children().first().removeClass(b.classes.selected),
                b.selectedIndex = -1,
                b.el.val(b.currentValue),
                void b.findBestHint()) : void b.adjustScroll(b.selectedIndex - 1)
        },
        moveDown: function() {
            var a = this;
            a.selectedIndex !== a.suggestions.length - 1 && a.adjustScroll(a.selectedIndex + 1)
        },
        adjustScroll: function(b) {
            var c = this
              , d = c.activate(b);
            if (d) {
                var e, f, g, h = a(d).outerHeight();
                e = d.offsetTop,
                f = a(c.suggestionsContainer).scrollTop(),
                g = f + c.options.maxHeight - h,
                f > e ? a(c.suggestionsContainer).scrollTop(e) : e > g && a(c.suggestionsContainer).scrollTop(e - c.options.maxHeight + h),
                c.el.val(c.getValue(c.suggestions[b].value)),
                c.signalHint(null)
            }
        },
        onSelect: function(b) {
            var c = this
              , d = c.options.onSelect
              , e = c.suggestions[b];
            c.currentValue = c.getValue(e.value),
            c.currentValue !== c.el.val() && c.el.val(c.currentValue),
            c.signalHint(null),
            c.suggestions = [],
            c.selection = e,
            a.isFunction(d) && d.call(c.element, e)
        },
        getValue: function(a) {
            var b, c, d = this, e = d.options.delimiter;
            return e ? (b = d.currentValue,
            c = b.split(e),
            1 === c.length ? a : b.substr(0, b.length - c[c.length - 1].length) + a) : a
        },
        dispose: function() {
            var b = this;
            b.el.off(".autocomplete").removeData("autocomplete"),
            b.disableKillerFn(),
            a(window).off("resize.autocomplete", b.fixPositionCapture),
            a(b.suggestionsContainer).remove()
        }
    },
    a.fn.autocomplete = a.fn.devbridgeAutocomplete = function(c, d) {
        var e = "autocomplete";
        return 0 === arguments.length ? this.first().data(e) : this.each(function() {
            var f = a(this)
              , g = f.data(e);
            "string" == typeof c ? g && "function" == typeof g[c] && g[c](d) : (g && g.dispose && g.dispose(),
            g = new b(this,c),
            f.data(e, g))
        })
    }
});
!function(a, b) {
    "use strict";
    var c = {
        item: 3,
        autoWidth: !1,
        slideMove: 1,
        slideMargin: 10,
        addClass: "",
        mode: "slide",
        useCSS: !0,
        cssEasing: "ease",
        easing: "linear",
        speed: 400,
        auto: !1,
        pauseOnHover: !1,
        loop: !1,
        slideEndAnimation: !0,
        pause: 2e3,
        keyPress: !1,
        controls: !0,
        prevHtml: "",
        nextHtml: "",
        rtl: !1,
        adaptiveHeight: !1,
        vertical: !1,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: !0,
        gallery: !1,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: "middle",
        enableTouch: !0,
        enableDrag: !0,
        freeMove: !0,
        swipeThreshold: 40,
        responsive: [],
        onBeforeStart: function(a) {},
        onSliderLoad: function(a) {},
        onBeforeSlide: function(a, b) {},
        onAfterSlide: function(a, b) {},
        onBeforeNextSlide: function(a, b) {},
        onBeforePrevSlide: function(a, b) {}
    };
    a.fn.lightSlider = function(b) {
        if (0 === this.length)
            return this;
        if (this.length > 1)
            return this.each(function() {
                a(this).lightSlider(b)
            }),
            this;
        var d = {}
          , e = a.extend(!0, {}, c, b)
          , f = {}
          , g = this;
        d.$el = this,
        "fade" === e.mode && (e.vertical = !1);
        var h = g.children()
          , i = a(window).width()
          , j = null
          , k = null
          , l = 0
          , m = 0
          , n = !1
          , o = 0
          , p = ""
          , q = 0
          , r = e.vertical === !0 ? "height" : "width"
          , s = e.vertical === !0 ? "margin-bottom" : "margin-right"
          , t = 0
          , u = 0
          , v = 0
          , w = 0
          , x = null
          , y = "ontouchstart"in document.documentElement
          , z = {};
        return z.chbreakpoint = function() {
            if (i = a(window).width(),
            e.responsive.length) {
                var b;
                if (e.autoWidth === !1 && (b = e.item),
                i < e.responsive[0].breakpoint)
                    for (var c = 0; c < e.responsive.length; c++)
                        i < e.responsive[c].breakpoint && (j = e.responsive[c].breakpoint,
                        k = e.responsive[c]);
                if ("undefined" != typeof k && null !== k)
                    for (var d in k.settings)
                        k.settings.hasOwnProperty(d) && (("undefined" == typeof f[d] || null === f[d]) && (f[d] = e[d]),
                        e[d] = k.settings[d]);
                if (!a.isEmptyObject(f) && i > e.responsive[0].breakpoint)
                    for (var g in f)
                        f.hasOwnProperty(g) && (e[g] = f[g]);
                e.autoWidth === !1 && t > 0 && v > 0 && b !== e.item && (q = Math.round(t / ((v + e.slideMargin) * e.slideMove)))
            }
        }
        ,
        z.calSW = function() {
            e.autoWidth === !1 && (v = (o - (e.item * e.slideMargin - e.slideMargin)) / e.item)
        }
        ,
        z.calWidth = function(a) {
            var b = a === !0 ? p.find(".lslide").length : h.length;
            if (e.autoWidth === !1)
                m = b * (v + e.slideMargin);
            else {
                m = 0;
                for (var c = 0; b > c; c++)
                    m += parseInt(h.eq(c).width()) + e.slideMargin
            }
            return m
        }
        ,
        d = {
            doCss: function() {
                var a = function() {
                    for (var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], b = document.documentElement, c = 0; c < a.length; c++)
                        if (a[c]in b.style)
                            return !0
                };
                return e.useCSS && a() ? !0 : !1
            },
            keyPress: function() {
                e.keyPress && a(document).on("keyup.lightslider", function(b) {
                    a(":focus").is("input, textarea") || (b.preventDefault ? b.preventDefault() : b.returnValue = !1,
                    37 === b.keyCode ? g.goToPrevSlide() : 39 === b.keyCode && g.goToNextSlide())
                })
            },
            controls: function() {
                e.controls && (g.after('<div class="lSAction"><a class="lSPrev">' + e.prevHtml + '</a><a class="lSNext">' + e.nextHtml + "</a></div>"),
                e.autoWidth ? z.calWidth(!1) < o && p.find(".lSAction").hide() : l <= e.item && p.find(".lSAction").hide(),
                p.find(".lSAction a").on("click", function(b) {
                    return b.preventDefault ? b.preventDefault() : b.returnValue = !1,
                    "lSPrev" === a(this).attr("class") ? g.goToPrevSlide() : g.goToNextSlide(),
                    !1
                }))
            },
            initialStyle: function() {
                var a = this;
                "fade" === e.mode && (e.autoWidth = !1,
                e.slideEndAnimation = !1),
                e.auto && (e.slideEndAnimation = !1),
                e.autoWidth && (e.slideMove = 1,
                e.item = 1),
                e.loop && (e.slideMove = 1,
                e.freeMove = !1),
                e.onBeforeStart.call(this, g),
                z.chbreakpoint(),
                g.addClass("lightSlider").wrap('<div class="lSSlideOuter ' + e.addClass + '"><div class="lSSlideWrapper"></div></div>'),
                p = g.parent(".lSSlideWrapper"),
                e.rtl === !0 && p.parent().addClass("lSrtl"),
                e.vertical ? (p.parent().addClass("vertical"),
                o = e.verticalHeight,
                p.css("height", o + "px")) : o = g.outerWidth(),
                h.addClass("lslide"),
                e.loop === !0 && "slide" === e.mode && (z.calSW(),
                z.clone = function() {
                    if (z.calWidth(!0) > o) {
                        for (var b = 0, c = 0, d = 0; d < h.length && (b += parseInt(g.find(".lslide").eq(d).width()) + e.slideMargin,
                        c++,
                        !(b >= o + e.slideMargin)); d++)
                            ;
                        var f = e.autoWidth === !0 ? c : e.item;
                        if (f < g.find(".clone.left").length)
                            for (var i = 0; i < g.find(".clone.left").length - f; i++)
                                h.eq(i).remove();
                        if (f < g.find(".clone.right").length)
                            for (var j = h.length - 1; j > h.length - 1 - g.find(".clone.right").length; j--)
                                q--,
                                h.eq(j).remove();
                        for (var k = g.find(".clone.right").length; f > k; k++)
                            g.find(".lslide").eq(k).clone().removeClass("lslide").addClass("clone right").appendTo(g),
                            q++;
                        for (var l = g.find(".lslide").length - g.find(".clone.left").length; l > g.find(".lslide").length - f; l--)
                            g.find(".lslide").eq(l - 1).clone().removeClass("lslide").addClass("clone left").prependTo(g);
                        h = g.children()
                    } else
                        h.hasClass("clone") && (g.find(".clone").remove(),
                        a.move(g, 0))
                }
                ,
                z.clone()),
                z.sSW = function() {
                    l = h.length,
                    e.rtl === !0 && e.vertical === !1 && (s = "margin-left"),
                    e.autoWidth === !1 && h.css(r, v + "px"),
                    h.css(s, e.slideMargin + "px"),
                    m = z.calWidth(!1),
                    g.css(r, m + "px"),
                    e.loop === !0 && "slide" === e.mode && n === !1 && (q = g.find(".clone.left").length)
                }
                ,
                z.calL = function() {
                    h = g.children(),
                    l = h.length
                }
                ,
                this.doCss() && p.addClass("usingCss"),
                z.calL(),
                "slide" === e.mode ? (z.calSW(),
                z.sSW(),
                e.loop === !0 && (t = a.slideValue(),
                this.move(g, t)),
                e.vertical === !1 && this.setHeight(g, !1)) : (this.setHeight(g, !0),
                g.addClass("lSFade"),
                this.doCss() || (h.fadeOut(0),
                h.eq(q).fadeIn(0))),
                e.loop === !0 && "slide" === e.mode ? h.eq(q).addClass("active") : h.first().addClass("active")
            },
            pager: function() {
                var a = this;
                if (z.createPager = function() {
                    w = (o - (e.thumbItem * e.thumbMargin - e.thumbMargin)) / e.thumbItem;
                    var b = p.find(".lslide")
                      , c = p.find(".lslide").length
                      , d = 0
                      , f = ""
                      , h = 0;
                    for (d = 0; c > d; d++) {
                        "slide" === e.mode && (e.autoWidth ? h += (parseInt(b.eq(d).width()) + e.slideMargin) * e.slideMove : h = d * (v + e.slideMargin) * e.slideMove);
                        var i = b.eq(d * e.slideMove).attr("data-thumb");
                        if (f += e.gallery === !0 ? '<li style="width:100%;' + r + ":" + w + "px;" + s + ":" + e.thumbMargin + 'px"><a href="#"><img src="' + i + '" /></a></li>' : '<li><a href="#">' + (d + 1) + "</a></li>",
                        "slide" === e.mode && h >= m - o - e.slideMargin) {
                            d += 1;
                            var j = 2;
                            e.autoWidth && (f += '<li><a href="#">' + (d + 1) + "</a></li>",
                            j = 1),
                            j > d ? (f = null,
                            p.parent().addClass("noPager")) : p.parent().removeClass("noPager");
                            break
                        }
                    }
                    var k = p.parent();
                    k.find(".lSPager").html(f),
                    e.gallery === !0 && (e.vertical === !0 && k.find(".lSPager").css("width", e.vThumbWidth + "px"),
                    u = d * (e.thumbMargin + w) + .5,
                    k.find(".lSPager").css({
                        property: u + "px",
                        "transition-duration": e.speed + "ms"
                    }),
                    e.vertical === !0 && p.parent().css("padding-right", e.vThumbWidth + e.galleryMargin + "px"),
                    k.find(".lSPager").css(r, u + "px"));
                    var l = k.find(".lSPager").find("li");
                    l.first().addClass("active"),
                    l.on("click", function() {
                        return e.loop === !0 && "slide" === e.mode ? q += l.index(this) - k.find(".lSPager").find("li.active").index() : q = l.index(this),
                        g.mode(!1),
                        e.gallery === !0 && a.slideThumb(),
                        !1
                    })
                }
                ,
                e.pager) {
                    var b = "lSpg";
                    e.gallery && (b = "lSGallery"),
                    p.after('<ul class="lSPager ' + b + '"></ul>');
                    var c = e.vertical ? "margin-left" : "margin-top";
                    p.parent().find(".lSPager").css(c, e.galleryMargin + "px"),
                    z.createPager()
                }
                setTimeout(function() {
                    z.init()
                }, 0)
            },
            setHeight: function(a, b) {
                var c = null
                  , d = this;
                c = e.loop ? a.children(".lslide ").first() : a.children().first();
                var f = function() {
                    var d = c.outerHeight()
                      , e = 0
                      , f = d;
                    b && (d = 0,
                    e = 100 * f / o),
                    a.css({
                        height: d + "px",
                        "padding-bottom": e + "%"
                    })
                };
                f(),
                c.find("img").length ? c.find("img")[0].complete ? (f(),
                x || d.auto()) : c.find("img").on("load", function() {
                    setTimeout(function() {
                        f(),
                        x || d.auto()
                    }, 100)
                }) : x || d.auto()
            },
            active: function(a, b) {
                this.doCss() && "fade" === e.mode && p.addClass("on");
                var c = 0;
                if (q * e.slideMove < l) {
                    a.removeClass("active"),
                    this.doCss() || "fade" !== e.mode || b !== !1 || a.fadeOut(e.speed),
                    c = b === !0 ? q : q * e.slideMove;
                    var d, f;
                    b === !0 && (d = a.length,
                    f = d - 1,
                    c + 1 >= d && (c = f)),
                    e.loop === !0 && "slide" === e.mode && (c = b === !0 ? q - g.find(".clone.left").length : q * e.slideMove,
                    b === !0 && (d = a.length,
                    f = d - 1,
                    c + 1 === d ? c = f : c + 1 > d && (c = 0))),
                    this.doCss() || "fade" !== e.mode || b !== !1 || a.eq(c).fadeIn(e.speed),
                    a.eq(c).addClass("active")
                } else
                    a.removeClass("active"),
                    a.eq(a.length - 1).addClass("active"),
                    this.doCss() || "fade" !== e.mode || b !== !1 || (a.fadeOut(e.speed),
                    a.eq(c).fadeIn(e.speed))
            },
            move: function(a, b) {
                e.rtl === !0 && (b = -b),
                this.doCss() ? a.css(e.vertical === !0 ? {
                    transform: "translate3d(0px, " + -b + "px, 0px)",
                    "-webkit-transform": "translate3d(0px, " + -b + "px, 0px)"
                } : {
                    transform: "translate3d(" + -b + "px, 0px, 0px)",
                    "-webkit-transform": "translate3d(" + -b + "px, 0px, 0px)"
                }) : e.vertical === !0 ? a.css("position", "relative").animate({
                    top: -b + "px"
                }, e.speed, e.easing) : a.css("position", "relative").animate({
                    left: -b + "px"
                }, e.speed, e.easing);
                var c = p.parent().find(".lSPager").find("li");
                this.active(c, !0)
            },
            fade: function() {
                this.active(h, !1);
                var a = p.parent().find(".lSPager").find("li");
                this.active(a, !0)
            },
            slide: function() {
                var a = this;
                z.calSlide = function() {
                    m > o && (t = a.slideValue(),
                    a.active(h, !1),
                    t > m - o - e.slideMargin ? t = m - o - e.slideMargin : 0 > t && (t = 0),
                    a.move(g, t),
                    e.loop === !0 && "slide" === e.mode && (q >= l - g.find(".clone.left").length / e.slideMove && a.resetSlide(g.find(".clone.left").length),
                    0 === q && a.resetSlide(p.find(".lslide").length)))
                }
                ,
                z.calSlide()
            },
            resetSlide: function(a) {
                var b = this;
                p.find(".lSAction a").addClass("disabled"),
                setTimeout(function() {
                    q = a,
                    p.css("transition-duration", "0ms"),
                    t = b.slideValue(),
                    b.active(h, !1),
                    d.move(g, t),
                    setTimeout(function() {
                        p.css("transition-duration", e.speed + "ms"),
                        p.find(".lSAction a").removeClass("disabled")
                    }, 50)
                }, e.speed + 100)
            },
            slideValue: function() {
                var a = 0;
                if (e.autoWidth === !1)
                    a = q * (v + e.slideMargin) * e.slideMove;
                else {
                    a = 0;
                    for (var b = 0; q > b; b++)
                        a += parseInt(h.eq(b).width()) + e.slideMargin
                }
                return a
            },
            slideThumb: function() {
                var a;
                switch (e.currentPagerPosition) {
                case "left":
                    a = 0;
                    break;
                case "middle":
                    a = o / 2 - w / 2;
                    break;
                case "right":
                    a = o - w
                }
                var b = q - g.find(".clone.left").length
                  , c = p.parent().find(".lSPager");
                "slide" === e.mode && e.loop === !0 && (b >= c.children().length ? b = 0 : 0 > b && (b = c.children().length));
                var d = b * (w + e.thumbMargin) - a;
                d + o > u && (d = u - o - e.thumbMargin),
                0 > d && (d = 0),
                this.move(c, d)
            },
            auto: function() {
                e.auto && (clearInterval(x),
                x = setInterval(function() {
                    g.goToNextSlide()
                }, e.pause))
            },
            pauseOnHover: function() {
                var b = this;
                e.auto && e.pauseOnHover && (p.on("mouseenter", function() {
                    a(this).addClass("ls-hover"),
                    g.pause(),
                    e.auto = !0
                }),
                p.on("mouseleave", function() {
                    a(this).removeClass("ls-hover"),
                    p.find(".lightSlider").hasClass("lsGrabbing") || b.auto()
                }))
            },
            touchMove: function(a, b) {
                if (p.css("transition-duration", "0ms"),
                "slide" === e.mode) {
                    var c = a - b
                      , d = t - c;
                    if (d >= m - o - e.slideMargin)
                        if (e.freeMove === !1)
                            d = m - o - e.slideMargin;
                        else {
                            var f = m - o - e.slideMargin;
                            d = f + (d - f) / 5
                        }
                    else
                        0 > d && (e.freeMove === !1 ? d = 0 : d /= 5);
                    this.move(g, d)
                }
            },
            touchEnd: function(a) {
                if (p.css("transition-duration", e.speed + "ms"),
                "slide" === e.mode) {
                    var b = !1
                      , c = !0;
                    t -= a,
                    t > m - o - e.slideMargin ? (t = m - o - e.slideMargin,
                    e.autoWidth === !1 && (b = !0)) : 0 > t && (t = 0);
                    var d = function(a) {
                        var c = 0;
                        if (b || a && (c = 1),
                        e.autoWidth)
                            for (var d = 0, f = 0; f < h.length && (d += parseInt(h.eq(f).width()) + e.slideMargin,
                            q = f + c,
                            !(d >= t)); f++)
                                ;
                        else {
                            var g = t / ((v + e.slideMargin) * e.slideMove);
                            q = parseInt(g) + c,
                            t >= m - o - e.slideMargin && g % 1 !== 0 && q++
                        }
                    };
                    a >= e.swipeThreshold ? (d(!1),
                    c = !1) : a <= -e.swipeThreshold && (d(!0),
                    c = !1),
                    g.mode(c),
                    this.slideThumb()
                } else
                    a >= e.swipeThreshold ? g.goToPrevSlide() : a <= -e.swipeThreshold && g.goToNextSlide()
            },
            enableDrag: function() {
                var b = this;
                if (!y) {
                    var c = 0
                      , d = 0
                      , f = !1;
                    p.find(".lightSlider").addClass("lsGrab"),
                    p.on("mousedown", function(b) {
                        return o > m && 0 !== m ? !1 : void ("lSPrev" !== a(b.target).attr("class") && "lSNext" !== a(b.target).attr("class") && (c = e.vertical === !0 ? b.pageY : b.pageX,
                        f = !0,
                        b.preventDefault ? b.preventDefault() : b.returnValue = !1,
                        p.scrollLeft += 1,
                        p.scrollLeft -= 1,
                        p.find(".lightSlider").removeClass("lsGrab").addClass("lsGrabbing"),
                        clearInterval(x)))
                    }),
                    a(window).on("mousemove", function(a) {
                        f && (d = e.vertical === !0 ? a.pageY : a.pageX,
                        b.touchMove(d, c))
                    }),
                    a(window).on("mouseup", function(g) {
                        if (f) {
                            p.find(".lightSlider").removeClass("lsGrabbing").addClass("lsGrab"),
                            f = !1,
                            d = e.vertical === !0 ? g.pageY : g.pageX;
                            var h = d - c;
                            Math.abs(h) >= e.swipeThreshold && a(window).on("click.ls", function(b) {
                                b.preventDefault ? b.preventDefault() : b.returnValue = !1,
                                b.stopImmediatePropagation(),
                                b.stopPropagation(),
                                a(window).off("click.ls")
                            }),
                            b.touchEnd(h)
                        }
                    })
                }
            },
            enableTouch: function() {
                var a = this;
                if (y) {
                    var b = {}
                      , c = {};
                    p.on("touchstart", function(a) {
                        c = a.originalEvent.targetTouches[0],
                        b.pageX = a.originalEvent.targetTouches[0].pageX,
                        b.pageY = a.originalEvent.targetTouches[0].pageY,
                        clearInterval(x)
                    }),
                    p.on("touchmove", function(d) {
                        if (o > m && 0 !== m)
                            return !1;
                        var f = d.originalEvent;
                        c = f.targetTouches[0];
                        var g = Math.abs(c.pageX - b.pageX)
                          , h = Math.abs(c.pageY - b.pageY);
                        e.vertical === !0 ? (3 * h > g && d.preventDefault(),
                        a.touchMove(c.pageY, b.pageY)) : (3 * g > h && d.preventDefault(),
                        a.touchMove(c.pageX, b.pageX))
                    }),
                    p.on("touchend", function() {
                        if (o > m && 0 !== m)
                            return !1;
                        var d;
                        d = e.vertical === !0 ? c.pageY - b.pageY : c.pageX - b.pageX,
                        a.touchEnd(d)
                    })
                }
            },
            build: function() {
                var b = this;
                b.initialStyle(),
                this.doCss() && (e.enableTouch === !0 && b.enableTouch(),
                e.enableDrag === !0 && b.enableDrag()),
                a(window).on("focus", function() {
                    b.auto()
                }),
                a(window).on("blur", function() {
                    clearInterval(x)
                }),
                b.pager(),
                b.pauseOnHover(),
                b.controls(),
                b.keyPress()
            }
        },
        d.build(),
        z.init = function() {
            z.chbreakpoint(),
            e.vertical === !0 ? (o = e.item > 1 ? e.verticalHeight : h.outerHeight(),
            p.css("height", o + "px")) : o = p.outerWidth(),
            e.loop === !0 && "slide" === e.mode && z.clone(),
            z.calL(),
            "slide" === e.mode && g.removeClass("lSSlide"),
            "slide" === e.mode && (z.calSW(),
            z.sSW()),
            setTimeout(function() {
                "slide" === e.mode && g.addClass("lSSlide")
            }, 1e3),
            e.pager && z.createPager(),
            e.adaptiveHeight === !0 && e.vertical === !1 && g.css("height", h.eq(q).outerHeight(!0)),
            e.adaptiveHeight === !1 && ("slide" === e.mode ? e.vertical === !1 ? d.setHeight(g, !1) : d.auto() : d.setHeight(g, !0)),
            e.gallery === !0 && d.slideThumb(),
            "slide" === e.mode && d.slide(),
            e.autoWidth === !1 ? h.length <= e.item ? p.find(".lSAction").hide() : p.find(".lSAction").show() : z.calWidth(!1) < o && 0 !== m ? p.find(".lSAction").hide() : p.find(".lSAction").show()
        }
        ,
        g.goToPrevSlide = function() {
            if (q > 0)
                e.onBeforePrevSlide.call(this, g, q),
                q--,
                g.mode(!1),
                e.gallery === !0 && d.slideThumb();
            else if (e.loop === !0) {
                if (e.onBeforePrevSlide.call(this, g, q),
                "fade" === e.mode) {
                    var a = l - 1;
                    q = parseInt(a / e.slideMove)
                }
                g.mode(!1),
                e.gallery === !0 && d.slideThumb()
            } else
                e.slideEndAnimation === !0 && (g.addClass("leftEnd"),
                setTimeout(function() {
                    g.removeClass("leftEnd")
                }, 400))
        }
        ,
        g.goToNextSlide = function() {
            var a = !0;
            if ("slide" === e.mode) {
                var b = d.slideValue();
                a = b < m - o - e.slideMargin
            }
            q * e.slideMove < l - e.slideMove && a ? (e.onBeforeNextSlide.call(this, g, q),
            q++,
            g.mode(!1),
            e.gallery === !0 && d.slideThumb()) : e.loop === !0 ? (e.onBeforeNextSlide.call(this, g, q),
            q = 0,
            g.mode(!1),
            e.gallery === !0 && d.slideThumb()) : e.slideEndAnimation === !0 && (g.addClass("rightEnd"),
            setTimeout(function() {
                g.removeClass("rightEnd")
            }, 400))
        }
        ,
        g.mode = function(a) {
            e.adaptiveHeight === !0 && e.vertical === !1 && g.css("height", h.eq(q).outerHeight(!0)),
            n === !1 && ("slide" === e.mode ? d.doCss() && (g.addClass("lSSlide"),
            "" !== e.speed && p.css("transition-duration", e.speed + "ms"),
            "" !== e.cssEasing && p.css("transition-timing-function", e.cssEasing)) : d.doCss() && ("" !== e.speed && g.css("transition-duration", e.speed + "ms"),
            "" !== e.cssEasing && g.css("transition-timing-function", e.cssEasing))),
            a || e.onBeforeSlide.call(this, g, q),
            "slide" === e.mode ? d.slide() : d.fade(),
            p.hasClass("ls-hover") || d.auto(),
            setTimeout(function() {
                a || e.onAfterSlide.call(this, g, q)
            }, e.speed),
            n = !0
        }
        ,
        g.play = function() {
            g.goToNextSlide(),
            e.auto = !0,
            d.auto()
        }
        ,
        g.pause = function() {
            e.auto = !1,
            clearInterval(x)
        }
        ,
        g.refresh = function() {
            z.init()
        }
        ,
        g.getCurrentSlideCount = function() {
            var a = q;
            if (e.loop) {
                var b = p.find(".lslide").length
                  , c = g.find(".clone.left").length;
                a = c - 1 >= q ? b + (q - c) : q >= b + c ? q - b - c : q - c
            }
            return a + 1
        }
        ,
        g.getTotalSlideCount = function() {
            return p.find(".lslide").length
        }
        ,
        g.goToSlide = function(a) {
            q = e.loop ? a + g.find(".clone.left").length - 1 : a,
            g.mode(!1),
            e.gallery === !0 && d.slideThumb()
        }
        ,
        g.destroy = function() {
            g.lightSlider && (g.goToPrevSlide = function() {}
            ,
            g.goToNextSlide = function() {}
            ,
            g.mode = function() {}
            ,
            g.play = function() {}
            ,
            g.pause = function() {}
            ,
            g.refresh = function() {}
            ,
            g.getCurrentSlideCount = function() {}
            ,
            g.getTotalSlideCount = function() {}
            ,
            g.goToSlide = function() {}
            ,
            g.lightSlider = null,
            z = {
                init: function() {}
            },
            g.parent().parent().find(".lSAction, .lSPager").remove(),
            g.removeClass("lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right").removeAttr("style").unwrap().unwrap(),
            g.children().removeAttr("style"),
            h.removeClass("lslide active"),
            g.find(".clone").remove(),
            h = null,
            x = null,
            n = !1,
            q = 0)
        }
        ,
        setTimeout(function() {
            e.onSliderLoad.call(this, g)
        }, 10),
        a(window).on("resize orientationchange", function(a) {
            setTimeout(function() {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1,
                z.init()
            }, 200)
        }),
        this
    }
}(jQuery);
!function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e(require, exports, module) : t.Tether = e()
}(this, function(t, e, o) {
    "use strict";
    function i(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(t) {
        var e = t.getBoundingClientRect()
          , o = {};
        for (var i in e)
            o[i] = e[i];
        if (t.ownerDocument !== document) {
            var r = t.ownerDocument.defaultView.frameElement;
            if (r) {
                var s = n(r);
                o.top += s.top,
                o.bottom += s.top,
                o.left += s.left,
                o.right += s.left
            }
        }
        return o
    }
    function r(t) {
        var e = getComputedStyle(t) || {}
          , o = e.position
          , i = [];
        if ("fixed" === o)
            return [t];
        for (var n = t; (n = n.parentNode) && n && 1 === n.nodeType; ) {
            var r = void 0;
            try {
                r = getComputedStyle(n)
            } catch (s) {}
            if ("undefined" == typeof r || null === r)
                return i.push(n),
                i;
            var a = r
              , f = a.overflow
              , l = a.overflowX
              , h = a.overflowY;
            /(auto|scroll|overlay)/.test(f + h + l) && ("absolute" !== o || ["relative", "absolute", "fixed"].indexOf(r.position) >= 0) && i.push(n)
        }
        return i.push(t.ownerDocument.body),
        t.ownerDocument !== document && i.push(t.ownerDocument.defaultView),
        i
    }
    function s() {
        A && document.body.removeChild(A),
        A = null
    }
    function a(t) {
        var e = void 0;
        t === document ? (e = document,
        t = document.documentElement) : e = t.ownerDocument;
        var o = e.documentElement
          , i = n(t)
          , r = P();
        return i.top -= r.top,
        i.left -= r.left,
        "undefined" == typeof i.width && (i.width = document.body.scrollWidth - i.left - i.right),
        "undefined" == typeof i.height && (i.height = document.body.scrollHeight - i.top - i.bottom),
        i.top = i.top - o.clientTop,
        i.left = i.left - o.clientLeft,
        i.right = e.body.clientWidth - i.width - i.left,
        i.bottom = e.body.clientHeight - i.height - i.top,
        i
    }
    function f(t) {
        return t.offsetParent || document.documentElement
    }
    function l() {
        if (M)
            return M;
        var t = document.createElement("div");
        t.style.width = "100%",
        t.style.height = "200px";
        var e = document.createElement("div");
        h(e.style, {
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            visibility: "hidden",
            width: "200px",
            height: "150px",
            overflow: "hidden"
        }),
        e.appendChild(t),
        document.body.appendChild(e);
        var o = t.offsetWidth;
        e.style.overflow = "scroll";
        var i = t.offsetWidth;
        o === i && (i = e.clientWidth),
        document.body.removeChild(e);
        var n = o - i;
        return M = {
            width: n,
            height: n
        }
    }
    function h() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]
          , e = [];
        return Array.prototype.push.apply(e, arguments),
        e.slice(1).forEach(function(e) {
            if (e)
                for (var o in e)
                    ({}).hasOwnProperty.call(e, o) && (t[o] = e[o])
        }),
        t
    }
    function d(t, e) {
        if ("undefined" != typeof t.classList)
            e.split(" ").forEach(function(e) {
                e.trim() && t.classList.remove(e)
            });
        else {
            var o = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)","gi")
              , i = c(t).replace(o, " ");
            g(t, i)
        }
    }
    function p(t, e) {
        if ("undefined" != typeof t.classList)
            e.split(" ").forEach(function(e) {
                e.trim() && t.classList.add(e)
            });
        else {
            d(t, e);
            var o = c(t) + (" " + e);
            g(t, o)
        }
    }
    function u(t, e) {
        if ("undefined" != typeof t.classList)
            return t.classList.contains(e);
        var o = c(t);
        return new RegExp("(^| )" + e + "( |$)","gi").test(o)
    }
    function c(t) {
        return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString ? t.className.baseVal : t.className
    }
    function g(t, e) {
        t.setAttribute("class", e)
    }
    function m(t, e, o) {
        o.forEach(function(o) {
            e.indexOf(o) === -1 && u(t, o) && d(t, o)
        }),
        e.forEach(function(e) {
            u(t, e) || p(t, e)
        })
    }
    function i(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function v(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    function y(t, e) {
        var o = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
        return t + o >= e && e >= t - o
    }
    function b() {
        return "undefined" != typeof performance && "undefined" != typeof performance.now ? performance.now() : +new Date
    }
    function w() {
        for (var t = {
            top: 0,
            left: 0
        }, e = arguments.length, o = Array(e), i = 0; i < e; i++)
            o[i] = arguments[i];
        return o.forEach(function(e) {
            var o = e.top
              , i = e.left;
            "string" == typeof o && (o = parseFloat(o, 10)),
            "string" == typeof i && (i = parseFloat(i, 10)),
            t.top += o,
            t.left += i
        }),
        t
    }
    function C(t, e) {
        return "string" == typeof t.left && t.left.indexOf("%") !== -1 && (t.left = parseFloat(t.left, 10) / 100 * e.width),
        "string" == typeof t.top && t.top.indexOf("%") !== -1 && (t.top = parseFloat(t.top, 10) / 100 * e.height),
        t
    }
    function O(t, e) {
        return "scrollParent" === e ? e = t.scrollParents[0] : "window" === e && (e = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]),
        e === document && (e = e.documentElement),
        "undefined" != typeof e.nodeType && !function() {
            var t = e
              , o = a(e)
              , i = o
              , n = getComputedStyle(e);
            if (e = [i.left, i.top, o.width + i.left, o.height + i.top],
            t.ownerDocument !== document) {
                var r = t.ownerDocument.defaultView;
                e[0] += r.pageXOffset,
                e[1] += r.pageYOffset,
                e[2] += r.pageXOffset,
                e[3] += r.pageYOffset
            }
            G.forEach(function(t, o) {
                t = t[0].toUpperCase() + t.substr(1),
                "Top" === t || "Left" === t ? e[o] += parseFloat(n["border" + t + "Width"]) : e[o] -= parseFloat(n["border" + t + "Width"])
            })
        }(),
        e
    }
    var E = function() {
        function t(t, e) {
            for (var o = 0; o < e.length; o++) {
                var i = e[o];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
            }
        }
        return function(e, o, i) {
            return o && t(e.prototype, o),
            i && t(e, i),
            e
        }
    }()
      , x = void 0;
    "undefined" == typeof x && (x = {
        modules: []
    });
    var A = null
      , T = function() {
        var t = 0;
        return function() {
            return ++t
        }
    }()
      , S = {}
      , P = function() {
        var t = A;
        t && document.body.contains(t) || (t = document.createElement("div"),
        t.setAttribute("data-tether-id", T()),
        h(t.style, {
            top: 0,
            left: 0,
            position: "absolute"
        }),
        document.body.appendChild(t),
        A = t);
        var e = t.getAttribute("data-tether-id");
        return "undefined" == typeof S[e] && (S[e] = n(t),
        k(function() {
            delete S[e]
        })),
        S[e]
    }
      , M = null
      , W = []
      , k = function(t) {
        W.push(t)
    }
      , _ = function() {
        for (var t = void 0; t = W.pop(); )
            t()
    }
      , B = function() {
        function t() {
            i(this, t)
        }
        return E(t, [{
            key: "on",
            value: function(t, e, o) {
                var i = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
                "undefined" == typeof this.bindings && (this.bindings = {}),
                "undefined" == typeof this.bindings[t] && (this.bindings[t] = []),
                this.bindings[t].push({
                    handler: e,
                    ctx: o,
                    once: i
                })
            }
        }, {
            key: "once",
            value: function(t, e, o) {
                this.on(t, e, o, !0)
            }
        }, {
            key: "off",
            value: function(t, e) {
                if ("undefined" != typeof this.bindings && "undefined" != typeof this.bindings[t])
                    if ("undefined" == typeof e)
                        delete this.bindings[t];
                    else
                        for (var o = 0; o < this.bindings[t].length; )
                            this.bindings[t][o].handler === e ? this.bindings[t].splice(o, 1) : ++o
            }
        }, {
            key: "trigger",
            value: function(t) {
                if ("undefined" != typeof this.bindings && this.bindings[t]) {
                    for (var e = 0, o = arguments.length, i = Array(o > 1 ? o - 1 : 0), n = 1; n < o; n++)
                        i[n - 1] = arguments[n];
                    for (; e < this.bindings[t].length; ) {
                        var r = this.bindings[t][e]
                          , s = r.handler
                          , a = r.ctx
                          , f = r.once
                          , l = a;
                        "undefined" == typeof l && (l = this),
                        s.apply(l, i),
                        f ? this.bindings[t].splice(e, 1) : ++e
                    }
                }
            }
        }]),
        t
    }();
    x.Utils = {
        getActualBoundingClientRect: n,
        getScrollParents: r,
        getBounds: a,
        getOffsetParent: f,
        extend: h,
        addClass: p,
        removeClass: d,
        hasClass: u,
        updateClasses: m,
        defer: k,
        flush: _,
        uniqueId: T,
        Evented: B,
        getScrollBarSize: l,
        removeUtilElements: s
    };
    var z = function() {
        function t(t, e) {
            var o = []
              , i = !0
              , n = !1
              , r = void 0;
            try {
                for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value),
                !e || o.length !== e); i = !0)
                    ;
            } catch (f) {
                n = !0,
                r = f
            } finally {
                try {
                    !i && a["return"] && a["return"]()
                } finally {
                    if (n)
                        throw r
                }
            }
            return o
        }
        return function(e, o) {
            if (Array.isArray(e))
                return e;
            if (Symbol.iterator in Object(e))
                return t(e, o);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
      , E = function() {
        function t(t, e) {
            for (var o = 0; o < e.length; o++) {
                var i = e[o];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
            }
        }
        return function(e, o, i) {
            return o && t(e.prototype, o),
            i && t(e, i),
            e
        }
    }()
      , j = function(t, e, o) {
        for (var i = !0; i; ) {
            var n = t
              , r = e
              , s = o;
            i = !1,
            null === n && (n = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(n, r);
            if (void 0 !== a) {
                if ("value"in a)
                    return a.value;
                var f = a.get;
                if (void 0 === f)
                    return;
                return f.call(s)
            }
            var l = Object.getPrototypeOf(n);
            if (null === l)
                return;
            t = l,
            e = r,
            o = s,
            i = !0,
            a = l = void 0
        }
    };
    if ("undefined" == typeof x)
        throw new Error("You must include the utils.js file before tether.js");
    var Y = x.Utils
      , r = Y.getScrollParents
      , a = Y.getBounds
      , f = Y.getOffsetParent
      , h = Y.extend
      , p = Y.addClass
      , d = Y.removeClass
      , m = Y.updateClasses
      , k = Y.defer
      , _ = Y.flush
      , l = Y.getScrollBarSize
      , s = Y.removeUtilElements
      , L = function() {
        if ("undefined" == typeof document)
            return "";
        for (var t = document.createElement("div"), e = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], o = 0; o < e.length; ++o) {
            var i = e[o];
            if (void 0 !== t.style[i])
                return i
        }
    }()
      , D = []
      , X = function() {
        D.forEach(function(t) {
            t.position(!1)
        }),
        _()
    };
    !function() {
        var t = null
          , e = null
          , o = null
          , i = function n() {
            return "undefined" != typeof e && e > 16 ? (e = Math.min(e - 16, 250),
            void (o = setTimeout(n, 250))) : void ("undefined" != typeof t && b() - t < 10 || (null != o && (clearTimeout(o),
            o = null),
            t = b(),
            X(),
            e = b() - t))
        };
        "undefined" != typeof window && "undefined" != typeof window.addEventListener && ["resize", "scroll", "touchmove"].forEach(function(t) {
            window.addEventListener(t, i)
        })
    }();
    var F = {
        center: "center",
        left: "right",
        right: "left"
    }
      , H = {
        middle: "middle",
        top: "bottom",
        bottom: "top"
    }
      , N = {
        top: 0,
        left: 0,
        middle: "50%",
        center: "50%",
        bottom: "100%",
        right: "100%"
    }
      , U = function(t, e) {
        var o = t.left
          , i = t.top;
        return "auto" === o && (o = F[e.left]),
        "auto" === i && (i = H[e.top]),
        {
            left: o,
            top: i
        }
    }
      , V = function(t) {
        var e = t.left
          , o = t.top;
        return "undefined" != typeof N[t.left] && (e = N[t.left]),
        "undefined" != typeof N[t.top] && (o = N[t.top]),
        {
            left: e,
            top: o
        }
    }
      , R = function(t) {
        var e = t.split(" ")
          , o = z(e, 2)
          , i = o[0]
          , n = o[1];
        return {
            top: i,
            left: n
        }
    }
      , q = R
      , I = function(t) {
        function e(t) {
            var o = this;
            i(this, e),
            j(Object.getPrototypeOf(e.prototype), "constructor", this).call(this),
            this.position = this.position.bind(this),
            D.push(this),
            this.history = [],
            this.setOptions(t, !1),
            x.modules.forEach(function(t) {
                "undefined" != typeof t.initialize && t.initialize.call(o)
            }),
            this.position()
        }
        return v(e, t),
        E(e, [{
            key: "getClass",
            value: function() {
                var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0]
                  , e = this.options.classes;
                return "undefined" != typeof e && e[t] ? this.options.classes[t] : this.options.classPrefix ? this.options.classPrefix + "-" + t : t
            }
        }, {
            key: "setOptions",
            value: function(t) {
                var e = this
                  , o = arguments.length <= 1 || void 0 === arguments[1] || arguments[1]
                  , i = {
                    offset: "0 0",
                    targetOffset: "0 0",
                    targetAttachment: "auto auto",
                    classPrefix: "tether"
                };
                this.options = h(i, t);
                var n = this.options
                  , s = n.element
                  , a = n.target
                  , f = n.targetModifier;
                if (this.element = s,
                this.target = a,
                this.targetModifier = f,
                "viewport" === this.target ? (this.target = document.body,
                this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body,
                this.targetModifier = "scroll-handle"),
                ["element", "target"].forEach(function(t) {
                    if ("undefined" == typeof e[t])
                        throw new Error("Tether Error: Both element and target must be defined");
                    "undefined" != typeof e[t].jquery ? e[t] = e[t][0] : "string" == typeof e[t] && (e[t] = document.querySelector(e[t]))
                }),
                p(this.element, this.getClass("element")),
                this.options.addTargetClasses !== !1 && p(this.target, this.getClass("target")),
                !this.options.attachment)
                    throw new Error("Tether Error: You must provide an attachment");
                this.targetAttachment = q(this.options.targetAttachment),
                this.attachment = q(this.options.attachment),
                this.offset = R(this.options.offset),
                this.targetOffset = R(this.options.targetOffset),
                "undefined" != typeof this.scrollParents && this.disable(),
                "scroll-handle" === this.targetModifier ? this.scrollParents = [this.target] : this.scrollParents = r(this.target),
                this.options.enabled !== !1 && this.enable(o)
            }
        }, {
            key: "getTargetBounds",
            value: function() {
                if ("undefined" == typeof this.targetModifier)
                    return a(this.target);
                if ("visible" === this.targetModifier) {
                    if (this.target === document.body)
                        return {
                            top: pageYOffset,
                            left: pageXOffset,
                            height: innerHeight,
                            width: innerWidth
                        };
                    var t = a(this.target)
                      , e = {
                        height: t.height,
                        width: t.width,
                        top: t.top,
                        left: t.left
                    };
                    return e.height = Math.min(e.height, t.height - (pageYOffset - t.top)),
                    e.height = Math.min(e.height, t.height - (t.top + t.height - (pageYOffset + innerHeight))),
                    e.height = Math.min(innerHeight, e.height),
                    e.height -= 2,
                    e.width = Math.min(e.width, t.width - (pageXOffset - t.left)),
                    e.width = Math.min(e.width, t.width - (t.left + t.width - (pageXOffset + innerWidth))),
                    e.width = Math.min(innerWidth, e.width),
                    e.width -= 2,
                    e.top < pageYOffset && (e.top = pageYOffset),
                    e.left < pageXOffset && (e.left = pageXOffset),
                    e
                }
                if ("scroll-handle" === this.targetModifier) {
                    var t = void 0
                      , o = this.target;
                    o === document.body ? (o = document.documentElement,
                    t = {
                        left: pageXOffset,
                        top: pageYOffset,
                        height: innerHeight,
                        width: innerWidth
                    }) : t = a(o);
                    var i = getComputedStyle(o)
                      , n = o.scrollWidth > o.clientWidth || [i.overflow, i.overflowX].indexOf("scroll") >= 0 || this.target !== document.body
                      , r = 0;
                    n && (r = 15);
                    var s = t.height - parseFloat(i.borderTopWidth) - parseFloat(i.borderBottomWidth) - r
                      , e = {
                        width: 15,
                        height: .975 * s * (s / o.scrollHeight),
                        left: t.left + t.width - parseFloat(i.borderLeftWidth) - 15
                    }
                      , f = 0;
                    s < 408 && this.target === document.body && (f = -11e-5 * Math.pow(s, 2) - .00727 * s + 22.58),
                    this.target !== document.body && (e.height = Math.max(e.height, 24));
                    var l = this.target.scrollTop / (o.scrollHeight - s);
                    return e.top = l * (s - e.height - f) + t.top + parseFloat(i.borderTopWidth),
                    this.target === document.body && (e.height = Math.max(e.height, 24)),
                    e
                }
            }
        }, {
            key: "clearCache",
            value: function() {
                this._cache = {}
            }
        }, {
            key: "cache",
            value: function(t, e) {
                return "undefined" == typeof this._cache && (this._cache = {}),
                "undefined" == typeof this._cache[t] && (this._cache[t] = e.call(this)),
                this._cache[t]
            }
        }, {
            key: "enable",
            value: function() {
                var t = this
                  , e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                this.options.addTargetClasses !== !1 && p(this.target, this.getClass("enabled")),
                p(this.element, this.getClass("enabled")),
                this.enabled = !0,
                this.scrollParents.forEach(function(e) {
                    e !== t.target.ownerDocument && e.addEventListener("scroll", t.position)
                }),
                e && this.position()
            }
        }, {
            key: "disable",
            value: function() {
                var t = this;
                d(this.target, this.getClass("enabled")),
                d(this.element, this.getClass("enabled")),
                this.enabled = !1,
                "undefined" != typeof this.scrollParents && this.scrollParents.forEach(function(e) {
                    e.removeEventListener("scroll", t.position)
                })
            }
        }, {
            key: "destroy",
            value: function() {
                var t = this;
                this.disable(),
                D.forEach(function(e, o) {
                    e === t && D.splice(o, 1)
                }),
                0 === D.length && s()
            }
        }, {
            key: "updateAttachClasses",
            value: function(t, e) {
                var o = this;
                t = t || this.attachment,
                e = e || this.targetAttachment;
                var i = ["left", "top", "bottom", "right", "middle", "center"];
                "undefined" != typeof this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length),
                "undefined" == typeof this._addAttachClasses && (this._addAttachClasses = []);
                var n = this._addAttachClasses;
                t.top && n.push(this.getClass("element-attached") + "-" + t.top),
                t.left && n.push(this.getClass("element-attached") + "-" + t.left),
                e.top && n.push(this.getClass("target-attached") + "-" + e.top),
                e.left && n.push(this.getClass("target-attached") + "-" + e.left);
                var r = [];
                i.forEach(function(t) {
                    r.push(o.getClass("element-attached") + "-" + t),
                    r.push(o.getClass("target-attached") + "-" + t)
                }),
                k(function() {
                    "undefined" != typeof o._addAttachClasses && (m(o.element, o._addAttachClasses, r),
                    o.options.addTargetClasses !== !1 && m(o.target, o._addAttachClasses, r),
                    delete o._addAttachClasses)
                })
            }
        }, {
            key: "position",
            value: function() {
                var t = this
                  , e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                if (this.enabled) {
                    this.clearCache();
                    var o = U(this.targetAttachment, this.attachment);
                    this.updateAttachClasses(this.attachment, o);
                    var i = this.cache("element-bounds", function() {
                        return a(t.element)
                    })
                      , n = i.width
                      , r = i.height;
                    if (0 === n && 0 === r && "undefined" != typeof this.lastSize) {
                        var s = this.lastSize;
                        n = s.width,
                        r = s.height
                    } else
                        this.lastSize = {
                            width: n,
                            height: r
                        };
                    var h = this.cache("target-bounds", function() {
                        return t.getTargetBounds()
                    })
                      , d = h
                      , p = C(V(this.attachment), {
                        width: n,
                        height: r
                    })
                      , u = C(V(o), d)
                      , c = C(this.offset, {
                        width: n,
                        height: r
                    })
                      , g = C(this.targetOffset, d);
                    p = w(p, c),
                    u = w(u, g);
                    for (var m = h.left + u.left - p.left, v = h.top + u.top - p.top, y = 0; y < x.modules.length; ++y) {
                        var b = x.modules[y]
                          , O = b.position.call(this, {
                            left: m,
                            top: v,
                            targetAttachment: o,
                            targetPos: h,
                            elementPos: i,
                            offset: p,
                            targetOffset: u,
                            manualOffset: c,
                            manualTargetOffset: g,
                            scrollbarSize: S,
                            attachment: this.attachment
                        });
                        if (O === !1)
                            return !1;
                        "undefined" != typeof O && "object" == typeof O && (v = O.top,
                        m = O.left)
                    }
                    var E = {
                        page: {
                            top: v,
                            left: m
                        },
                        viewport: {
                            top: v - pageYOffset,
                            bottom: pageYOffset - v - r + innerHeight,
                            left: m - pageXOffset,
                            right: pageXOffset - m - n + innerWidth
                        }
                    }
                      , A = this.target.ownerDocument
                      , T = A.defaultView
                      , S = void 0;
                    return T.innerHeight > A.documentElement.clientHeight && (S = this.cache("scrollbar-size", l),
                    E.viewport.bottom -= S.height),
                    T.innerWidth > A.documentElement.clientWidth && (S = this.cache("scrollbar-size", l),
                    E.viewport.right -= S.width),
                    ["", "static"].indexOf(A.body.style.position) !== -1 && ["", "static"].indexOf(A.body.parentElement.style.position) !== -1 || (E.page.bottom = A.body.scrollHeight - v - r,
                    E.page.right = A.body.scrollWidth - m - n),
                    "undefined" != typeof this.options.optimizations && this.options.optimizations.moveElement !== !1 && "undefined" == typeof this.targetModifier && !function() {
                        var e = t.cache("target-offsetparent", function() {
                            return f(t.target)
                        })
                          , o = t.cache("target-offsetparent-bounds", function() {
                            return a(e)
                        })
                          , i = getComputedStyle(e)
                          , n = o
                          , r = {};
                        if (["Top", "Left", "Bottom", "Right"].forEach(function(t) {
                            r[t.toLowerCase()] = parseFloat(i["border" + t + "Width"])
                        }),
                        o.right = A.body.scrollWidth - o.left - n.width + r.right,
                        o.bottom = A.body.scrollHeight - o.top - n.height + r.bottom,
                        E.page.top >= o.top + r.top && E.page.bottom >= o.bottom && E.page.left >= o.left + r.left && E.page.right >= o.right) {
                            var s = e.scrollTop
                              , l = e.scrollLeft;
                            E.offset = {
                                top: E.page.top - o.top + s - r.top,
                                left: E.page.left - o.left + l - r.left
                            }
                        }
                    }(),
                    this.move(E),
                    this.history.unshift(E),
                    this.history.length > 3 && this.history.pop(),
                    e && _(),
                    !0
                }
            }
        }, {
            key: "move",
            value: function(t) {
                var e = this;
                if ("undefined" != typeof this.element.parentNode) {
                    var o = {};
                    for (var i in t) {
                        o[i] = {};
                        for (var n in t[i]) {
                            for (var r = !1, s = 0; s < this.history.length; ++s) {
                                var a = this.history[s];
                                if ("undefined" != typeof a[i] && !y(a[i][n], t[i][n])) {
                                    r = !0;
                                    break
                                }
                            }
                            r || (o[i][n] = !0)
                        }
                    }
                    var l = {
                        top: "",
                        left: "",
                        right: "",
                        bottom: ""
                    }
                      , d = function(t, o) {
                        var i = "undefined" != typeof e.options.optimizations
                          , n = i ? e.options.optimizations.gpu : null;
                        if (n !== !1) {
                            var r = void 0
                              , s = void 0;
                            if (t.top ? (l.top = 0,
                            r = o.top) : (l.bottom = 0,
                            r = -o.bottom),
                            t.left ? (l.left = 0,
                            s = o.left) : (l.right = 0,
                            s = -o.right),
                            window.matchMedia) {
                                var a = window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches;
                                a || (s = Math.round(s),
                                r = Math.round(r))
                            }
                            l[L] = "translateX(" + s + "px) translateY(" + r + "px)",
                            "msTransform" !== L && (l[L] += " translateZ(0)")
                        } else
                            t.top ? l.top = o.top + "px" : l.bottom = o.bottom + "px",
                            t.left ? l.left = o.left + "px" : l.right = o.right + "px"
                    }
                      , p = !1;
                    if ((o.page.top || o.page.bottom) && (o.page.left || o.page.right) ? (l.position = "absolute",
                    d(o.page, t.page)) : (o.viewport.top || o.viewport.bottom) && (o.viewport.left || o.viewport.right) ? (l.position = "fixed",
                    d(o.viewport, t.viewport)) : "undefined" != typeof o.offset && o.offset.top && o.offset.left ? !function() {
                        l.position = "absolute";
                        var i = e.cache("target-offsetparent", function() {
                            return f(e.target)
                        });
                        f(e.element) !== i && k(function() {
                            e.element.parentNode.removeChild(e.element),
                            i.appendChild(e.element)
                        }),
                        d(o.offset, t.offset),
                        p = !0
                    }() : (l.position = "absolute",
                    d({
                        top: !0,
                        left: !0
                    }, t.page)),
                    !p)
                        if (this.options.bodyElement)
                            this.options.bodyElement.appendChild(this.element);
                        else {
                            for (var u = !0, c = this.element.parentNode; c && 1 === c.nodeType && "BODY" !== c.tagName; ) {
                                if ("static" !== getComputedStyle(c).position) {
                                    u = !1;
                                    break
                                }
                                c = c.parentNode
                            }
                            u || (this.element.parentNode.removeChild(this.element),
                            this.element.ownerDocument.body.appendChild(this.element))
                        }
                    var g = {}
                      , m = !1;
                    for (var n in l) {
                        var v = l[n]
                          , b = this.element.style[n];
                        b !== v && (m = !0,
                        g[n] = v)
                    }
                    m && k(function() {
                        h(e.element.style, g),
                        e.trigger("repositioned")
                    })
                }
            }
        }]),
        e
    }(B);
    I.modules = [],
    x.position = X;
    var $ = h(I, x)
      , z = function() {
        function t(t, e) {
            var o = []
              , i = !0
              , n = !1
              , r = void 0;
            try {
                for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value),
                !e || o.length !== e); i = !0)
                    ;
            } catch (f) {
                n = !0,
                r = f
            } finally {
                try {
                    !i && a["return"] && a["return"]()
                } finally {
                    if (n)
                        throw r
                }
            }
            return o
        }
        return function(e, o) {
            if (Array.isArray(e))
                return e;
            if (Symbol.iterator in Object(e))
                return t(e, o);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
      , Y = x.Utils
      , a = Y.getBounds
      , h = Y.extend
      , m = Y.updateClasses
      , k = Y.defer
      , G = ["left", "top", "right", "bottom"];
    x.modules.push({
        position: function(t) {
            var e = this
              , o = t.top
              , i = t.left
              , n = t.targetAttachment;
            if (!this.options.constraints)
                return !0;
            var r = this.cache("element-bounds", function() {
                return a(e.element)
            })
              , s = r.height
              , f = r.width;
            if (0 === f && 0 === s && "undefined" != typeof this.lastSize) {
                var l = this.lastSize;
                f = l.width,
                s = l.height
            }
            var d = this.cache("target-bounds", function() {
                return e.getTargetBounds()
            })
              , p = d.height
              , u = d.width
              , c = [this.getClass("pinned"), this.getClass("out-of-bounds")];
            this.options.constraints.forEach(function(t) {
                var e = t.outOfBoundsClass
                  , o = t.pinnedClass;
                e && c.push(e),
                o && c.push(o)
            }),
            c.forEach(function(t) {
                ["left", "top", "right", "bottom"].forEach(function(e) {
                    c.push(t + "-" + e)
                })
            });
            var g = []
              , v = h({}, n)
              , y = h({}, this.attachment);
            return this.options.constraints.forEach(function(t) {
                var r = t.to
                  , a = t.attachment
                  , l = t.pin;
                "undefined" == typeof a && (a = "");
                var h = void 0
                  , d = void 0;
                if (a.indexOf(" ") >= 0) {
                    var c = a.split(" ")
                      , m = z(c, 2);
                    d = m[0],
                    h = m[1]
                } else
                    h = d = a;
                var b = O(e, r);
                "target" !== d && "both" !== d || (o < b[1] && "top" === v.top && (o += p,
                v.top = "bottom"),
                o + s > b[3] && "bottom" === v.top && (o -= p,
                v.top = "top")),
                "together" === d && ("top" === v.top && ("bottom" === y.top && o < b[1] ? (o += p,
                v.top = "bottom",
                o += s,
                y.top = "top") : "top" === y.top && o + s > b[3] && o - (s - p) >= b[1] && (o -= s - p,
                v.top = "bottom",
                y.top = "bottom")),
                "bottom" === v.top && ("top" === y.top && o + s > b[3] ? (o -= p,
                v.top = "top",
                o -= s,
                y.top = "bottom") : "bottom" === y.top && o < b[1] && o + (2 * s - p) <= b[3] && (o += s - p,
                v.top = "top",
                y.top = "top")),
                "middle" === v.top && (o + s > b[3] && "top" === y.top ? (o -= s,
                y.top = "bottom") : o < b[1] && "bottom" === y.top && (o += s,
                y.top = "top"))),
                "target" !== h && "both" !== h || (i < b[0] && "left" === v.left && (i += u,
                v.left = "right"),
                i + f > b[2] && "right" === v.left && (i -= u,
                v.left = "left")),
                "together" === h && (i < b[0] && "left" === v.left ? "right" === y.left ? (i += u,
                v.left = "right",
                i += f,
                y.left = "left") : "left" === y.left && (i += u,
                v.left = "right",
                i -= f,
                y.left = "right") : i + f > b[2] && "right" === v.left ? "left" === y.left ? (i -= u,
                v.left = "left",
                i -= f,
                y.left = "right") : "right" === y.left && (i -= u,
                v.left = "left",
                i += f,
                y.left = "left") : "center" === v.left && (i + f > b[2] && "left" === y.left ? (i -= f,
                y.left = "right") : i < b[0] && "right" === y.left && (i += f,
                y.left = "left"))),
                "element" !== d && "both" !== d || (o < b[1] && "bottom" === y.top && (o += s,
                y.top = "top"),
                o + s > b[3] && "top" === y.top && (o -= s,
                y.top = "bottom")),
                "element" !== h && "both" !== h || (i < b[0] && ("right" === y.left ? (i += f,
                y.left = "left") : "center" === y.left && (i += f / 2,
                y.left = "left")),
                i + f > b[2] && ("left" === y.left ? (i -= f,
                y.left = "right") : "center" === y.left && (i -= f / 2,
                y.left = "right"))),
                "string" == typeof l ? l = l.split(",").map(function(t) {
                    return t.trim()
                }) : l === !0 && (l = ["top", "left", "right", "bottom"]),
                l = l || [];
                var w = []
                  , C = [];
                o < b[1] && (l.indexOf("top") >= 0 ? (o = b[1],
                w.push("top")) : C.push("top")),
                o + s > b[3] && (l.indexOf("bottom") >= 0 ? (o = b[3] - s,
                w.push("bottom")) : C.push("bottom")),
                i < b[0] && (l.indexOf("left") >= 0 ? (i = b[0],
                w.push("left")) : C.push("left")),
                i + f > b[2] && (l.indexOf("right") >= 0 ? (i = b[2] - f,
                w.push("right")) : C.push("right")),
                w.length && !function() {
                    var t = void 0;
                    t = "undefined" != typeof e.options.pinnedClass ? e.options.pinnedClass : e.getClass("pinned"),
                    g.push(t),
                    w.forEach(function(e) {
                        g.push(t + "-" + e)
                    })
                }(),
                C.length && !function() {
                    var t = void 0;
                    t = "undefined" != typeof e.options.outOfBoundsClass ? e.options.outOfBoundsClass : e.getClass("out-of-bounds"),
                    g.push(t),
                    C.forEach(function(e) {
                        g.push(t + "-" + e)
                    })
                }(),
                (w.indexOf("left") >= 0 || w.indexOf("right") >= 0) && (y.left = v.left = !1),
                (w.indexOf("top") >= 0 || w.indexOf("bottom") >= 0) && (y.top = v.top = !1),
                v.top === n.top && v.left === n.left && y.top === e.attachment.top && y.left === e.attachment.left || (e.updateAttachClasses(y, v),
                e.trigger("update", {
                    attachment: y,
                    targetAttachment: v
                }))
            }),
            k(function() {
                e.options.addTargetClasses !== !1 && m(e.target, g, c),
                m(e.element, g, c)
            }),
            {
                top: o,
                left: i
            }
        }
    });
    var Y = x.Utils
      , a = Y.getBounds
      , m = Y.updateClasses
      , k = Y.defer;
    x.modules.push({
        position: function(t) {
            var e = this
              , o = t.top
              , i = t.left
              , n = this.cache("element-bounds", function() {
                return a(e.element)
            })
              , r = n.height
              , s = n.width
              , f = this.getTargetBounds()
              , l = o + r
              , h = i + s
              , d = [];
            o <= f.bottom && l >= f.top && ["left", "right"].forEach(function(t) {
                var e = f[t];
                e !== i && e !== h || d.push(t)
            }),
            i <= f.right && h >= f.left && ["top", "bottom"].forEach(function(t) {
                var e = f[t];
                e !== o && e !== l || d.push(t)
            });
            var p = []
              , u = []
              , c = ["left", "top", "right", "bottom"];
            return p.push(this.getClass("abutted")),
            c.forEach(function(t) {
                p.push(e.getClass("abutted") + "-" + t)
            }),
            d.length && u.push(this.getClass("abutted")),
            d.forEach(function(t) {
                u.push(e.getClass("abutted") + "-" + t)
            }),
            k(function() {
                e.options.addTargetClasses !== !1 && m(e.target, u, p),
                m(e.element, u, p)
            }),
            !0
        }
    });
    var z = function() {
        function t(t, e) {
            var o = []
              , i = !0
              , n = !1
              , r = void 0;
            try {
                for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value),
                !e || o.length !== e); i = !0)
                    ;
            } catch (f) {
                n = !0,
                r = f
            } finally {
                try {
                    !i && a["return"] && a["return"]()
                } finally {
                    if (n)
                        throw r
                }
            }
            return o
        }
        return function(e, o) {
            if (Array.isArray(e))
                return e;
            if (Symbol.iterator in Object(e))
                return t(e, o);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    return x.modules.push({
        position: function(t) {
            var e = t.top
              , o = t.left;
            if (this.options.shift) {
                var i = this.options.shift;
                "function" == typeof this.options.shift && (i = this.options.shift.call(this, {
                    top: e,
                    left: o
                }));
                var n = void 0
                  , r = void 0;
                if ("string" == typeof i) {
                    i = i.split(" "),
                    i[1] = i[1] || i[0];
                    var s = i
                      , a = z(s, 2);
                    n = a[0],
                    r = a[1],
                    n = parseFloat(n, 10),
                    r = parseFloat(r, 10)
                } else
                    n = i.top,
                    r = i.left;
                return e += n,
                o += r,
                {
                    top: e,
                    left: o
                }
            }
        }
    }),
    $
});
