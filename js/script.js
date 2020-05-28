/* ----------------------------------------------------------------------------------------
* Template Name    : Primpt - Responsive creative agency template
* Author           : Qrolic
* Version          : 1.0
* File Description : Main JS file of the template
* ---------------------------------------------------------------------------------------- */

$(document).ready(function () {
    "use strict";

    // Preloader Effect
    $(".preloader").fadeOut(500);

    // go to top section
    $(".home__down-section").on( 'click', "a", function () {
        $('html, body').animate({
            scrollTop: $($(this).attr("href")).offset().top - 0
        }, 2000);
        return false;
    });


    var a       = 0;
    var b       = 0;
    var counter = $("#counter");
    var range   = $(".ranger");

    // scroll to top
    var scrolltop_btn = $('.body-back-to-top');
    var counter1      = $('#counter1');
    var header        = $('#header');
    var header_logo   = $('#header-logo');

    scrolltop_btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

    counter.each(function (i, el) {
        var element = $(el);
        if (element.is(":visible")) {
            element.addClass("already-visible");
        }
    });

    // on scroll
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 10) {
            header.addClass('sticky-header');
            header_logo.attr('src', 'images/black-logo.png');
        }
        else {
            header.removeClass('sticky-header');
            header_logo.attr('src', 'images/white-logo.png');
        }

        if (scroll > 200) {
            scrolltop_btn.addClass('visible');
        } else {
            scrolltop_btn.removeClass('visible');
        }

        var oTop1 = counter.offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop1) {
            counterNumber('.counter-number');
            a = 1;
        }
        var oTop2 = counter1.offset().top - window.innerHeight;
        if (b == 0 && $(window).scrollTop() > oTop2) {
            counterNumber('.counter-number11');
            b = 1;
        }

        range.each(function (i, el) {
            var element = $(el);
            if (element.visible(true)) {
                element.addClass("ranger--active");
            }
        });

        counter.each(function (i, el) {
            var element = $(el);
            if (element.visible(true)) {
                element.addClass("come-in");
            }
        });
    });

    // menu
    $('.header__inner-icon').on( 'click', function () {
        $('.header-menu').addClass('header-menu--active');
        $('body').addClass('open-menu');
    });
    $('.header-menu__close').on( 'click',function () {
        $('.header-menu').removeClass('header-menu--active');
        $('body').removeClass('open-menu');
    });

    $('.drop').on( 'click', function () {
        if (screen.width <= 991) {
            $(this).children('ul').slideToggle();
        }
    });

    $('.header-menu').on( 'click', 'a', function(e){
        var target = $($(this).attr('href'));
        if(target.length){
            var extraSpace = 72;
            if (screen.width <= 991) {
                $('.header-menu').removeClass('header-menu--active');
                $('body').removeClass('open-menu');
            }
            var scrollTo = target.offset().top - extraSpace;
            $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
        }
    });

    // portfolio isotop
    apply_isototop( '*' );

    $('.portfolioFilter a').on( 'click',function () {
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
        apply_isototop( $(this).attr('data-filter') );
        return false;
    });

    // logo slider
    $('.logo-slider__inner--slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });


    // Testimonaials slider
    $('.testimonials__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        nextArrow: '<i class="flaticon-right-chevron slick-right"></i>',
        prevArrow: '<i class="flaticon-left-chevron slick-left"></i>'
    });


    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
 
        var links = this.el.find('.link');
        links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
        var $el   = e.data.el;
        var $this = $(this);
        var $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }
    };

    new Accordion($('#accordion'), false);

    // on element screen visible event
    $.fn.visible = function (partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

   

    // theme option
    $('.theme-panel__button--color').on( 'click',function(){
        $('.theme-panel').toggleClass('theme-panel--open');
    });

    // theme color change
    $('.choose-color').on( 'click', 'a', function(){
        var color = $( this ).data( 'color' );
        $('body').removeAttr('class').addClass('theme-' + color );
    });

}); //doctype end

//countnumber function
function counterNumber( element ) {
    $( element ).each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');
        $({
            countNum: $this.text()
        }).animate({
                countNum: countTo
            },
            {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
    });
}

// isotoo
function apply_isototop( selector ) {
    $('.portfolioContainer').isotope({
        filter: selector,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
}