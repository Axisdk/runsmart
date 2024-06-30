$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 2000,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg"></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true
            }
          },
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass
          ('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        })
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');


      // Modal
      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      $('.modal__close, .overlay').on('click', function() {
        $('.overlay, #consultation, #order, #thank').fadeOut('slow');
      });
      $('.modal').on('click', function(event) {
        event.stopPropagation();
      });



      function validateForm(form) {
        $(form).validate({
          rules: {
            name: {
              required: true
            },
            phone: "required",
            email: {
              required: true,
              email: true
            },
          },
          messages: {
            name: "Введите ваше имя",
            phone: "Введите ваш номер",
            email: {
              required: "Введите почту, для контакта с вами",
              email: "Введите эл.почту"
            }
          }
        });
      }

      validateForm('#consultation form');
      validateForm('#order form');
      validateForm('#consultation-form form');

      $('input[name=phone]').mask("+7 999-999-99-99")

      $('form').submit(function (e) {
        e.preventDefault();

        $.ajax({
          type: "POST",
          url: 'mailer/smart.php',
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");


          $('form').trigger('reset');
        });
        return false;
      });

  //  Scroll Up

      $(window).scroll(function() {
        if ($(this).scrollTop() > 1200) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      })
      $('#scrollToTopBtn').click(function() {
        $('html, body').animate({scrollTop: 0}, 1000);
        return false;
      });

  });