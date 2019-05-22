var allow = true;

$(function() {
    var pervScrPos = $('body main').scrollTop();
    $('body main').on('scroll', function() {
        if ($(window).width() > 1020) {
            var corentScrPos = $('body main').scrollTop()
            scrDown = true;
            if (corentScrPos < pervScrPos)
                scrDown = false;

            if (allow) {
                allow = false;
                findCorrentSection(corentScrPos, scrDown);
            }
            pervScrPos = corentScrPos;
        }
    });

    $('.tabs-bullets button').on('click', function() {
        $('.tabs-bullets button').removeClass('is-active');
        $(this).addClass('is-active');
        var $tab = $('#' + $(this).data("tab"));

        $('.js-tab').slideUp(700).removeClass('_activeContent');
        $tab.slideDown(700);
        setTimeout(function() {
            $tab.addClass('_activeContent');
            $('html, body').animate({
                scrollTop: $('#whyChoose').height()
            }, 650);
        }, 710);
    });

    $('.js-goSection').on('click', function() {
        var id = $(this).data('section');
        allow = false;

        if ($(window).width() > 1020)
            goToSection($('#' + id));
        else if (id == "form")
            $('.tabs-bullets button[data-tab="' + id + '"]').click();
    });
});

function goToSection(e) {
    var padd = $('body main').offset().top;
    var id = e.attr('id');

    if (id == "form")
        $('.scr-animation').hide();
    else
        $('.scr-animation').show();

    $('.js-scroll').removeClass('_activeContent');
    $('body main').animate({
        scrollTop: $('body main').scrollTop() + e.offset().top - padd
    }, 650);
    setTimeout(function() {
        allow = true;
        e.addClass('_activeContent');
    }, 700);

    $('.nav-slide a').removeClass('is-active');
    $('.nav-slide a[data-section="' + id + '"]').addClass('is-active');
}

function findCorrentSection(corentScrPos, scrDown) {
    var find = false;
    var padd = $('body main').offset().top;
    
    $('.js-scroll').each(function(index) {
        var thisPos = $('body main').scrollTop() + $(this).offset().top - padd,
            thisHeigh = $(this).height();
        
        if (scrDown) {
            if(thisPos <= corentScrPos && thisPos + thisHeigh > corentScrPos && !find) {
                find = true;
                goToSection($($('.js-scroll')[index + 1]));
            }
        }
        else {
            if(thisPos >= corentScrPos && !find) {
                find = true
                goToSection($($('.js-scroll')[index - 1]));

            }
        }
    });
}