window.addEventListener('DOMContentLoaded', function () {
    var el, val, res, status;
    var a,b,c,d,e;

    $('.partners_ref_accounts_unlink').click(function () {
        if(confirm(l('confirm'))) {
            location.href='/partners/unlink/';
        }
    })


    $('.status-panel__digest').slideDown(500);

    var digestOwl = $('.aside_digest__list');
    digestOwl.owlCarousel({
        autoplay: true,
        autoplayTimeout: 50000,
        smartSpeed: 500, 
        items:1,
        margin: 20,
        loop: true,
        nav: false,
        dots: false,
    });

    $('.aside_digest__nav__prev').click(function() {
        digestOwl.trigger('next.owl.carousel', [300]);
    })

    $('.aside_digest__nav__next').click(function() {
        digestOwl.trigger('prev.owl.carousel', [300]);
    })

    if(typeof config.user.isAuthSecure !== 'undefined') {
        var tronWallet = new Contract;
        var i = 0;
        var repeat = setInterval(function() {
            (++i > 20 || tronWallet.getConfig.addressBase58 || config.user.isAuthSecure) && clearInterval(repeat);
            if(config.user.isAuthSecure || tronWallet.getConfig.addressBase58 == config.user.address) {
                $('.reflink-visible').removeClass('d-none').addClass('d-block');
                $('.reflink-hidden').removeClass('d-block').addClass('d-none');
            } else {
                $('.reflink-visible').removeClass('d-block').addClass('d-none');
                $('.reflink-hidden').removeClass('d-none').addClass('d-block');
            }
        }, 500)
    }

    $('.OpenGiftBtn').click(function(){
        $('.firstWinG').css("display", "none");
        $('.secWinG').css("display", "block");
        setTimeout(showGift, 6000);
    });
    $('.getGift').click(function(){
        $('.getGift').css("display", "none");
    });
    function showGift(){
        $('.secWinG').css("display", "none");
        $('.thWinG').css("display", "flex");
        clearInterval(showGift);
    }


    // Токены обмен FRS на FRX
    // if(!cookie('exchange_frs')) {
    //     if($('.forsage-coin').length == 0) {
    //         contract = new Contract('Token.FRS');
    //         contract.FRSBalance().then(function(amount) {
    //             if(amount == 0) {
    //                 $('.forsage-coin').remove();
    //                 cookie('exchange_frs', true, {expires: 604800});
    //             }
    //         }, function(error) {
    //             $('.forsage-coin').remove();
    //             cookie('exchange_frs', true, {expires: 604800});
    //         });
    //     }
    // }
    $('[data-getToken="FRS"]').click(function() {
        contract = new Contract('Token.FRS');
        var spinner = $('.forsage-coin__spinner');
        spinner.show();
        contract.FRSBalance().then(function(amount) {
            amount = amount / 1000000;
            if(amount > 0) {
                $('[data-getToken="FRS"]').css('display', 'none');
                $('[data-tokenExchange="FRS-FRX"]').css('display', 'inline');
            } else {
                $('.forsage-coin').remove();
                cookie('exchange_frs', true, {expires: 604800});
            }
            $('.token-available__frs').text(amount.toFixed(2));
            $('.token-available__frs').attr('data-availableTokenFRS', (amount * 1000000).toFixed(0));
            spinner.hide();
        }, function(error) {
            Notice.warning(error);
            console.log('error', error)
            spinner.hide();
        });
    });
    $('[data-tokenExchange="FRS-FRX"]').click(function() {
        contract = new Contract('Token.FRS');
        var spinner = $('.forsage-coin__spinner');
        var availableTokens = $('.token-available__frs').attr('data-availableTokenFRS');
        spinner.show();
        contract.FRSApprove(availableTokens).then(function(tx) {
            if(tx) {
                $('[data-tokenExchange="FRS-FRX"]').css('display', 'none');
                $('[data-tokenExchangeConfirm="FRS-FRX"]').css('display', 'inline');
                $('.token-exchange_rate').css('display', 'inline');
            } else {
                Notice.warning('error confirmation action');
            }
            spinner.hide();
        }, function(error) {
            Notice.warning(error);
            console.log('error', error)
            spinner.hide();
        });
    });
    $('[data-tokenExchangeConfirm="FRS-FRX"]').click(function() {
        contract = new Contract('Token.Exchange');
        var spinner = $('.forsage-coin__spinner');
        var availableTokens = $('.token-available__frs').attr('data-availableTokenFRS');
        spinner.show();
        contract.exchangeFRS_FRX(availableTokens).then(function(tx) {
            if(tx) {
                $('.forsage-coin').remove();
                cookie('exchange_frs', true, {expires: 604800});
                Notice.info('Congratulations!');
            } else {
                Notice.warning('error exchange FRS to FRX');
            }
            spinner.hide();
        }, function(error) {
            Notice.warning(error);
            console.log('error', error)
            spinner.hide();
        });
    });
    $('.token-sync__frx').click(function() {
        contract = new Contract('Token.FRX');
        var sync = $('.token-sync__frx > i');
        sync.addClass('fa-spin');
        contract.FRXBalance().then(function(amount) {
            if(amount > 0) {
                amount = amount / 1000000;
                amount = amount.toFixed(2);
            }
            $('.token-available__frx').text(amount);
            cookie('balance_frx', amount, {expires: 31104000}); // 360 days
            sync.removeClass('fa-spin');
        }, function(error) {
            cookie('balance_frx', 0, {expires: 31104000}); // 360 days
            sync.removeClass('fa-spin');
        });
    });

    // Реавторизация
    $('#reauth').click(function (e) {
        var contract = new Contract();
        contract.autoLogin(function() {});
    });

    // $('[data-fancybox]').fancybox({
    //     touch: false,
    //     mobile: {
    //         touch: {
    //             vertical: true,
    //             momentum: true
    //         }
    //     }
    // });

    // Навигация по реинвестам
    el = document.querySelector('#changeCurrentReinvest');
    if(el) {
        el.onchange = function (e) {
            let i = this.value;
            let link = window.location.pathname;
            if(i >= 0) {
                link += $_GET({reinvest: i}, true);
            }
            window.location = link;
        }
    }

    // Замаскировать ID юзера, слева в разделе
    $('.status-panel__user-id').click(function () {
        // Запомнить выбор значения в хранилище
        status = storageTrigger(
            'user.id',
            true
        );
        // Скрыть, показать партнерскую ссылку
        el = $('.trigger_value__user-refkey');
        res = '';
        if(status == '1') {
            res = config.site.protocol + config.site.domain + `/i/***/`;
        } else {
            res = el.attr('title')
        }
        el.find('input').val(res);
    });
});

const userAddress = document.querySelector('div.trigger_value__user-address');

userAddress.addEventListener('copy', function(e){
    var userAddress = $('.trigger_value__user-address'),
        longUserAddress = userAddress.find('.longAddress').val();

    e.clipboardData.setData("Text", longUserAddress);
    e.preventDefault();
}); 
