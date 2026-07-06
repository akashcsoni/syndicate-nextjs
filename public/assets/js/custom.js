/* =====================================
    Template Name: Syndicate Business Advisory
    Author Name: WebbyCrown
    Description: Syndicate Business Advisory - HTML5 Template.
    Version:1.0
========================================*/

/*======================================
[ JS Table of contents ]
Home one js
01. General Open JS
    + Mobile menu
    + Mobile menu dropdown
    + AOS
    + Page scroll to Header sticky
    + Cookie js
    + Page scroll
    + Number count for stats
02. Slider Open JS
    + Hero slider
    + hero slider home 2 slider
    + What we do slider
    + Testimonial slider
03. Tabs Open JS
04. Accordion Open JS
05. Popup Open JS
    + Hero section youtube popup
    + Our Teachers popup
    + Newsletter Popup JS
    + Enquiry form Popup JS
06. Preloader JS

========================
Home Two js
01. Home Two General Open JS
    + Mobile menu
    + Page scroll to Header sticky Home Two
02. Home Two Slider Open JS
    + Logos slider Home Two
    + Testimonial slider Home Two

========================
Home Three js
01. Home Three General Open JS
    + Mobile menu
    + Page scroll to Header sticky Home Two
02. Home Three Slider Open JS
    + why choose us Grid slider
    + Testimonial slider Home Three
    + Our team members slider
03. Isotope JS

========================



========================================*/

(function ($) {
  business_advisory = {
    init: function() {
      // Home one js
      this.general_open();
      this.slider_open();
      this.tabs_open();
      this.accordion_open();
      this.Popup_open();
      this.Preloader_js();



      // Home Two js
      this.home_two_general_open();
      this.home_two_slider_open();

      // Home Three js
      this.home_three_general_open();
      this.home_three_slider_open();
      this.Isotope_js();
    },

    /*======================================
     Home one js
    ========================================*/

    /*======================================
     01. General Open JS
    ========================================*/
    general_open: function() {

      /* Mobile menu */
      $(document).on("click", ".toggle-menu-button a, .mobile-menu .menu-close a", function(){
        $('.mobile-menu').toggleClass("open");
        //$(this).toggleClass("active");
      });

      /* Mobile menu dropdown*/
      $(".main-menu > li").each(function (i) {
        if ($(this).has("ul").length)
        {
          $(this).find('ul').addClass("sub-menu");
          $(this).find('> a').after('<span class="caret-arrow"></span>');
          $(this).find('> .sub-menu').css('display', 'none');
        }
      });
      $('.main-menu li .caret-arrow').click(function () {
        var catSubUl = $(this).next('.sub-menu');
        var catSubli = $(this).closest('li');
        if (catSubUl.is(':hidden'))
        {
            //$("#window > ul > li .sub-menu").slideUp();
          catSubUl.slideDown();
            //$('.caret').removeClass('active');
          $(this).addClass('sub-active');
          catSubli.addClass('sub-active');
        }
        else
        {
          catSubUl.slideUp();
          $(this).removeClass('sub-active');
          catSubli.removeClass('sub-active');
        }
      });

      /* Search Popup */
      $(document).on("click", ".search-icon a, .close-search", function(){
        $('body').toggleClass("search-active");
      });


      /* AOS */
      AOS.init({
        once: true,
      });

      /* Page scroll to Header sticky */
      $(window).scroll(function() {
        if ($(this).scrollTop() > 0){  
          $('.header').addClass("sticky");
        }
        else{
          $('.header').removeClass("sticky");
        }
      });

      /* Cookie js */
      $(document).on("click", ".cookie-button .accept-btn", function(){
        $('.cookie-popup').removeClass("open");
      });

      /*Page scroll*/


      $(".scroll a").click(function (event) {
        $('.scroll a').removeClass("active");
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top = target_offset.top;
        $('html, body').animate({scrollTop: target_top - 100 }, 0);
        $(this).addClass("active");
      });

        /* Number count for stats*/
      var counted = 0;
      $(window).scroll(function() {
        if( $('#counter').length > 0 ){
          var oTop = $('#counter').offset().top - window.innerHeight;
          if (counted == 0 && $(window).scrollTop() > oTop) {
            $('.counting').each(function() {
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
                step: function() {
                  $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                  $this.text(this.countNum);
                    //alert('finished');
                }

              });
            });
            counted = 1;
          }  
        }
        

      });


    },

    /*======================================
     02. Slider Open JS
    ========================================*/
    slider_open: function() {

      /* Hero slider */
      var swiper = new Swiper(".hero-thumbs-slider.mySwiper", {
        spaceBetween: 0,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        mousewheel: true,
        keyboard: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        
        navigation: {
          nextEl: ".hero-section .swiper-button-next",
          prevEl: ".hero-section .swiper-button-prev",
        },

        breakpoints: {
          768: {
            direction: "vertical",
            spaceBetween: 20,
          },
        },

        thumbs: {
          swiper2: swiper,
        }, 

      });
      var swiper2 = new Swiper(".hero-content-slider.mySwiper2", {
        loop: true,
        slidesPerView: 1,
        effect: "fade",
        navigation: {
          nextEl: ".hero-section .swiper-button-next",
          prevEl: ".hero-section .swiper-button-prev",
        },
      });

      /* hero slider home 2 slider */
      var swiper = new Swiper(".hero-slider-style-2.swiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: ".hero-slider-style-2 .swiper-button-next",
          prevEl: ".hero-slider-style-2 .swiper-button-prev",
        },
      });

      /* What we do slider */
      var swiper = new Swiper(".what-we-do-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".what-we-do-slider .swiper-button-next",
          prevEl: ".what-we-do-slider .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
      });

      /* Testimonial slider */
      var swiper = new Swiper(".testimonial-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        pagination: {
          el: ".testimonial-slider .swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".testimonial-slider .swiper-button-next",
          prevEl: ".testimonial-slider .swiper-button-prev",
        },
      });

    },

    /*======================================
     03. Tabs Open JS
    ========================================*/
    tabs_open: function() {

      $('.tabs-list li, .tab-link-title').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('.tabs-list li, .tab-link-title').removeClass('current');
        $('.tabs-content').removeClass('current');
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
      });

    },

    /*======================================
     04. Accordion Open JS
    ========================================*/
    accordion_open: function() {

      $("body").on("click",".accordion .accordion-tabs",function(){
        $(".accordion-content").slideUp(),
        $(this).hasClass("active")?($(this).next(".accordion-content").slideUp(),
          $(this).removeClass("active")):(
          $(".accordion .accordion-tabs").removeClass("active"),
          $(this).addClass("active"),
          $(this).next(".accordion-content").slideDown())
        });

    },

    /*======================================
     05. Popup Open JS
    ========================================*/
    Popup_open: function() {

     
      $(document).ready(function() {

         /*Hero section youtube popup*/
        $('.popup-youtube').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });

        /*Our Teachers popup*/
        $('.user-popup').magnificPopup({
          type: 'inline'
        });

        /*Newsletter Popup JS*/
        setTimeout(function() {
          $('body').find('.newsletter-popup-link').trigger('click');
        }, 2500);

        $('.newsletter-popup-link').magnificPopup({
          type: 'inline',
          preloader: false,
          focus: '#name',
        });

        /*Enquiry form Popup JS*/
        $('.enquiry-apply').magnificPopup({
          type: 'inline',
          preloader: false,
          focus: '#name',
        });

        /*team Popup JS*/
        $('.team-popup-link').magnificPopup({
          type: 'inline',
          preloader: false,
          focus: '#name',
        });

        

      });

    },

    /*=====================================
    06. Preloader JS
    ======================================*/  
    Preloader_js: function() {
      //After 2s preloader is fadeOut
      $('.preloader').delay(2000).fadeOut('slow');
      setTimeout(function() {
      //After 2s, the no-scroll class of the body will be removed
        $('body').removeClass('no-scroll');
      }, 2000); //Here you can change preloader time
    },


    /*==================================================================
     Home Two js
    ====================================================================*/
    /*======================================
     01. Home Two General Open JS
    ========================================*/
    home_two_general_open: function() {

      /* Page scroll to Header sticky Home Two */
      $(window).scroll(function() {
        if ($(this).scrollTop() > 0){  
          $('.header-style-2').addClass("sticky");
        }
        else{
          $('.header-style-2').removeClass("sticky");
        }
      });


    },

    /*======================================
     02. Home Two Slider Open JS
    ========================================*/
    home_two_slider_open: function() {

      /* Logos slider Home Two*/
      var swiper = new Swiper(".logos-slider .mySwiper", {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,
        mousewheel: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".logos-slider .swiper-button-next",
          prevEl: ".logos-slider .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        },
      });

      /* Testimonial slider Home Two*/
      var swiper = new Swiper(".testimonial-slider-home-2 .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: ".testimonial-slider-home-2 .swiper-pagination",
          clickable: true,
        },
      });

    },

    /*==================================================================
     Home Three js
    ====================================================================*/
    /*======================================
     01. Home Three General Open JS
    ========================================*/
    
    home_three_general_open: function() {
      
    },
    /*======================================
     01. Home Three General Open JS
    ========================================*/
    home_two_general_open: function() {

      /* Page scroll to Header sticky Home Two */
      $(window).scroll(function() {
        if ($(this).scrollTop() > 0){  
          $('.header-style-2').addClass("sticky");
        }
        else{
          $('.header-style-2').removeClass("sticky");
        }
      });


    },

    /*======================================
     02. Home Three Slider Open JS
    ========================================*/
    home_three_slider_open: function() {

      /* why choose us Grid slider */
      var swiper = new Swiper(".why-choose-us-grid-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        pagination: {
          el: ".why-choose-us-grid-slider .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });

      /* Testimonial slider Home Three */
      var swiper = new Swiper(".testimonial-slider-home-3 .mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        direction: "vertical",
        pagination: {
          el: ".testimonial-slider-home-3 .swiper-pagination",
          clickable: true,
        },
      });

      /*Our team members slider*/
      var swiper = new Swiper(".our-team-members-slider .mySwiper", {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: ".our-team-members-slider .swiper-button-next",
          prevEl: ".our-team-members-slider .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        },
      });

    },

    /*======================================
     03. Isotope JS
    ========================================*/
    Isotope_js: function() {
      // init Isotope
      var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
      });

      var $grid_masonary = $('.grid-masonary').isotope({
        itemSelector: '.grid-item',
        masonry: {
          horizontalOrder: false,
        }
      });


        // bind filter button click
      $('#filters').on( 'click', '.button-tab-link', function() {
        var filterValue = $( this ).attr('data-filter');
          // use filterFn if matches value
          //filterValue = filterFns[ filterValue ] || filterValue;
        if($('.grid-masonary').length>0){
          $grid_masonary.isotope({ filter: filterValue });
        }else{
          $grid.isotope({ filter: filterValue });
        }
      });
      
      
        // change is-checked class on buttons
      $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', '.button-tab-link', function() {
          $buttonGroup.find('.current').removeClass('current');
          $( this ).addClass('current');
        });
      });
    },


  };
  business_advisory.init();

})(jQuery);
