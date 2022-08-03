    window.addEventListener('DOMContentLoaded', function () {

    if($('#main-course__change')) {
        var curCourse = getCookie('currency');

        $("#main-course__change option[value="+ curCourse+ "]").prop("selected", true);

        $('#main-course__change').on('change', function() {
            var url = $(this).val(); // get selected value
            $("#main-course__change option[value="+ url+ "]").prop("selected", true);
            if (url) { // require a URL
                window.location = '?currency=' + url ; // redirect
            }
            return false;
        });
    }


    if($('.matrix__toggle_btn')) {
        if (localStorage.getItem('matrixx3')) {
            $('.matrix__wrapper#x3').addClass(localStorage.getItem(`matrixx3`));
            $('#toggleX3').html('<i class="fas fa-expand-arrows-alt"></i>');
        }
        if (localStorage.getItem('matrixx4')) {
            $('.matrix__wrapper#x4').addClass(localStorage.getItem(`matrixx4`));
            $('#toggleX4').html('<i class="fas fa-expand-arrows-alt"></i>');
        }
        if (localStorage.getItem('matrixxGold')) {
            $('.matrix__wrapper#xGold').addClass(localStorage.getItem(`matrixxGold`));
            $('#toggleXGold').html('<i class="fas fa-expand-arrows-alt"></i>');
        }
        $('.buy__header').on('click', function() {
            var matrixWrapper = $(this).parents('.matrix__wrapper'),
                matrixID = matrixWrapper.attr('id'),
                toggleMatrix = matrixWrapper.find('.matrix__toggle_btn');

            if (matrixWrapper.hasClass('matrix__wrapper_close')) {
                matrixWrapper.removeClass('matrix__wrapper_close');
                // toggleMatrix.html('<i class="fas fa-compress-arrows-alt"></i>');
                localStorage.removeItem(`matrix${matrixID}`);
            } else {
                matrixWrapper.toggleClass('matrix__wrapper_close');
                // toggleMatrix.html('<i class="fas fa-expand-arrows-alt"></i>');
                localStorage.setItem(`matrix${matrixID}`, 'matrix__wrapper_close');
            }
        });
    }

    $('[data-popup_key]').click(function() {
        $($(this).data('popup_key')).addClass('popup_show');
    });

    $(document).on("click", ".send_t", function () {
        user_id= $('.user_id').val();
        key_id= $('.key_id').val();
        lang= $('.langv').val();
        val= $('#tx').val();
        d = new Date();
        twoDigitMonth = ((d.getMonth().length+1) === 1)? (d.getMonth()+1) : '0' + (d.getMonth()+1);
        date = d.getFullYear() + "-" + twoDigitMonth + "-" + d.getDate()+' '+ d.getHours()+':' +d.getMinutes();
        //date = new Date();
        if(val == ''){
            return false;
        }
        $.ajax({
            url: '/AjaxTranslate/',
            type: 'POST',
            cache: false,
            async: true,
            dataType: 'json',
            data: {
                type:'add',
                user_id: user_id,
                key_id: key_id,
                lang: lang,
                val:val
            },
            success: function (response) {
                console.log(response.id);
                ns =    ' <div class="lang-edit__option" data-id="'+response.id+'"><div class="lang-edit__option-content"><div class="lang-edit__option-word"><p class="lang-edit__option-word-value">'+val+'</p></div><div class="lang-edit__option-stat"><div class="lang-edit__option-info"><p>ID: '+user_id+'</p></div><div class="lang-edit__option-feedback"><div class="lang-edit__option-like"><a class="ibtn key-suggestion-like"><i class="fas fa-thumbs-up" aria-hidden="true"></i><span></span></a><a class="ibtn key-suggestion-dislike"><i class="fas fa-thumbs-down" aria-hidden="true"></i><span></span></a><a class="ibtn key-suggestion-comment"><i class=" fas fa-comment" aria-hidden="true"></i><span></span></a></div></div></div></div><div class="lang-edit__option-comments-container"><div class="lang-edit__option-comments-stat">'+l('Комментариев')+': 0<span></span></div><div class="lang-edit__option-comments-add  input_border-gray input_radius input_md"><textarea rows="1" name="text" class="input__area form-control" placeholder="'+l('Добавить комментарий')+'" dir="auto"></textarea><button class="btn btn-sm btn-primary form-submit-btn btn_bg-violet btn_md btn_radius btn_hover-bg-gray">'+l('Отправить')+'</button></div></div></div></div>';
                $('.lang-edit__list').append(ns);
                $('#tx').val('');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error Ajax request: ' + jqXHR.responseText);
            }
        });
    });


    $(document).on("click", ".it-remove", function () {
        id = $(this).closest(".lang-edit__option").attr('data-id');
        //console.log(rr);
        if (confirm("Удалить?"))
        {
            $.ajax({
                url: '/AjaxTranslate/',
                type: 'POST',
                cache: false,
                async: true,
                dataType: 'json',
                data: {
                    type:'delete',
                    id:id
                },
                success: function (response) {
                    console.log(response);
                    if(response){
                        $('.lang-edit__option[data-id="'+id+'"]').remove();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error Ajax request: ' + jqXHR.responseText);
                }
            });
        }
    });


    $(document).on("click", ".it-set", function () {
        id = $(this).closest(".lang-edit__option").attr('data-id');
        key_id= $('.key_id').val();
        lang= $('.langv').val();
        val = $('.lang-edit__option[data-id="'+id+'"] .lang-edit__option-word .lang-edit__option-word-value').html();
        $.ajax({
            url: '/AjaxTranslate/',
            type: 'POST',
            cache: false,
            async: true,
            dataType: 'json',
            data: {
                type:'top',
                id:id,
                lang:lang,
                key:key_id,
                val:val
            },
            success: function (response) {
                console.log(response);
                if(response){
                    $('.lang-edit__option .lang-edit__select-word').remove();
                    $('.lang-edit__option').removeClass('lang-edit__option-check');
                    $('.lang-edit__option[data-id="'+id+'"]').addClass('lang-edit__option-check');
                    $('.lang-edit__option[data-id="'+id+'"] .lang-edit__option-word').append('<div class="lang-edit__select-word"><i class="fas fa-check"></i></div>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error Ajax request: ' + jqXHR.responseText);
            }
        });
        //}
    });

    $(document).on("click", ".key-suggestion-like", function () {
        id = $(this).closest(".lang-edit__option").attr('data-id');
        user_id= $('.user_id').val();
        $.ajax({
            url: '/AjaxTranslate/',
            type: 'POST',
            cache: false,
            async: true,
            dataType: 'json',
            data: {
                type:'like',
                id:id,
                user_id:user_id
            },
            success: function (response) {
                console.log(response);
                if(response){
                    $('.lang-edit__option[data-id="'+id+'"] .key-suggestion-like span').text(response.like);
                    $('.lang-edit__option[data-id="'+id+'"] .key-suggestion-dislike span').text(response.dislike);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error Ajax request: ' + jqXHR.responseText)
            }
        });
        //}
    });

    $(document).on("click", ".key-suggestion-dislike", function () {
        id = $(this).closest(".lang-edit__option").attr('data-id');
        user_id= $('.user_id').val();
        $.ajax({
            url: '/AjaxTranslate/',
            type: 'POST',
            cache: false,
            async: true,
            dataType: 'json',
            data: {
                type:'dislike',
                id:id,
                user_id:user_id
            },
            success: function (response) {
                console.log(response);
                if(response){
                    $('.lang-edit__option[data-id="'+id+'"] .key-suggestion-like span').text(response.like);
                    $('.lang-edit__option[data-id="'+id+'"] .key-suggestion-dislike span').text(response.dislike);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error Ajax request: ' + jqXHR.responseText)
            }
        });
        //}
    });

    $(document).on("click", ".lang-edit__option-comments-container button", function () {
        id = $(this).closest(".lang-edit__option").attr('data-id');
        user_id= $('.user_id').val();
        comment= $('.lang-edit__option[data-id="'+id+'"] .comment-form textarea').val();
        d = new Date();
        twoDigitMonth = ((d.getMonth().length+1) === 1)? (d.getMonth()+1) : '0' + (d.getMonth()+1);
        date = d.getFullYear() + "-" + twoDigitMonth + "-" + d.getDate()+' '+ d.getHours()+':' +d.getMinutes();
        //date = new Date();
        if(comment == ''){
            return false;
        }
        $.ajax({
            url: '/AjaxTranslate/',
            type: 'POST',
            cache: false,
            async: true,
            dataType: 'json',
            data: {
                type:'addcomment',
                id:id,
                user_id: user_id,
                comment:comment
            },
            success: function (response) {
                if(response){
                    $('.lang-edit__option[data-id="'+id+'"] .lang-edit__option-comments-container').append('<div class="lang-edit__option-comment" data-comment-id=""><span class="lang-edit__option-comment-author"><span dir="auto">ID: '+user_id+', </span></span><span class="lang-edit__option-comment-text" dir="auto">'+comment+'</span></div>');
                    $('.lang-edit__option[data-id="'+id+'"] .lang-edit__option-comments-add textarea').val('');
                    count = $('.lang-edit__option[data-id="'+id+'"] .lang-edit__option-comments-stat').text();
                    console.log(count);
                    count = count*1 + 1;

                    $('.lang-edit__option-comments-stat span').text(count);
                    $('.lang-edit__option[data-id="'+id+'"] .lang-edit__option-like .key-suggestion-comment span').text(count);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error Ajax request: ' + jqXHR.responseText);
            }
        });
    });


    $(document).on("click", ".key-suggestion-comment", function () {
        id = $(this).closest(".lang-edit__option").attr('data-id');
        $(this).addClass('active');
        $('.lang-edit__option[data-id="'+id+'"] .lang-edit__option-comments-container').addClass('active');
    });


    //вызов модального окна для переводов
    $(document).on("click", ".lg-edit", function () {
        $('#popup-edit').addClass('popup_show');
        $('#content-t').html('<div class="fancybox-loading" style=""></div>');
        $('.popup__close').hide();
        var langKey = $(this).data('lang_key');
        $.ajax({
            url:'/lang/edit/' + langKey,
            type:'GET',
            success: function(data){
                $('#content-t').html(data);
                $('.popup__close').show();
            }
        });
        return false;
    });

    // Кнопка с последними событиями
    $('.notifications__toggle').click(function() {
        // Запомнить последний просмотренный ID события
        let key = $('.notifications__list').find(' > div:first-child').data('notification_time');
        if(key) {
            cookie('messageIteration', key, {expires: 2592e6});
        }
    });

    // Sockets
    eventsWebSocket();
});


function eventsWebSocket() {
    if(typeof io === 'undefined') {
        return false;
    }
    var params = {
        // Интервал вывода сообщений на экран в секундах
        delay   : 7,
        cookie: {
          // Сколько хранить куки, для итерации события(в секундах)
          expires: 2592e3,
        },
        message :
        {
            'Registration' : [
                l('ws-regLevel_0'),
                l('ws-regLevel_1'),
                l('ws-regLevel_2'),
                l('ws-regLevel_3'),
            ],
            'NewUserPlace'            : l('ws-newUserPlace'),
            'Upgrade'                 : l('ws-upgrade'),
            'Reinvest'                : l('ws-reinvest'),
            'MissedEthReceive'        : l('ws-missedEthReceive'),
            'SentExtraEthDividends'   : l('ws-sentExtraEthDividends'),
            'CannotSendMoneyEvent'    : l('ws-cannotSendMoneyEvent'),
            'leadingPartner'          : l('ws-leadingPartner'),
            'leadingPartnerToUpline'  : l('ws-leadingPartnerToUpline'),
            'leadingPlacePurchase'    : l('ws-leadingPlacePurchase'),
            'Transfer'                : l(''),
        },
        rates   : null,
        levels  : null,
        events  : null,
        messageIteration: 0,
        storage: {
            stats: {
                totalUsers: 0,
                totalUsersDay: 0,
                totalEarned: 0,
            },
            notify: {
                lastKeyXBase: 0,
                lastKeyXGold: 0,
            }
        },
        // Настройки контейнера
        container: {
            el:   $('.notifications__list'),
            cell: $('.notifications__alert'),
            btn:  $('.notifications__toggle'),
            wrapper:  $('.notifications__wrap'),
            countItems: 50,
        },
        // Иконка событий
        eventsTypeIcon: {
          'Registration'            : 'icon-user-add',
          'NewUserPlace'            : 'icon-wallet-green',
          'Upgrade'                 : 'icon-cart-yellow',
          'Reinvest'                : 'icon-cart-yellow',
          'MissedEthReceive'        : 'icon-minus icon_xs',
          'SentExtraEthDividends'   : 'icon-wallet-green',
          'CannotSendMoneyEvent'    : '',
          'leadingPartner'          : 'icon-minus icon_xs',
          'leadingPartnerToUpline'  : 'icon-minus icon_xs',
          'leadingPlacePurchase'    : 'icon-wallet-green',
          'Transfer'                : '',
        }
    };
    params.delay    *= 1000;

    var socket = io.connect('wss://trx.forsage.io:2096', {
        rejectUnauthorized: false,
        rememberTransport: false,
        secure: true,
    });

    // Статистика сайта
    socket.on('updateStats', function(data) {
        data = JSON.parse(data);
        if (!data) {
          notify('empty variable "stats"');
          return;
        }
        var a,b,c,d,e,f;
        a = data.totalUsers;
        b = data.totalUsersDay;
        c = data.totalEarnedBase.TRX + data.totalEarnedXGold.TRX;
        d = parseInt((c * config.course.TRX_USD).toFixed(0));

        if(params.storage.stats.totalUsers == 0 || params.storage.stats.totalUsers < a) {
            $('[data-stats_users]').spincrement({
                from: params.storage.stats.totalUsers,
                to: a,
                thousandSeparator: " ",
                duration: 1000,
            });
        }
        if(params.storage.stats.totalUsersDay == 0 || params.storage.stats.totalUsersDay < b) {
            $('[data-stats_users_day]').spincrement({
                from:  params.storage.stats.totalUsersDay,
                to: b,
                thousandSeparator: " ",
                duration: 1500,
            });
        }
        if(params.storage.stats.totalEarned == 0 || params.storage.stats.totalEarned < c) {
            $('[data-stats_profit_coin]').spincrement({
                from:  params.storage.stats.totalEarned,
                to: c,
                thousandSeparator: " ",
                duration: 300,
            });
            $('[data-stats_profit_fiat]').spincrement({
                from: d,
                to: d,
                thousandSeparator: " ",
                duration: 500,
            });
        }
        params.storage.stats.totalUsers = a;
        params.storage.stats.totalUsersDay = b;
        params.storage.stats.totalEarned = c;
    });

    socket.on('addEvents', function(data) {
        data = JSON.parse(data);
        if (!data.events) {
          notify('empty variable "data.events"');
          return;
        }

        params.events = data.events.reverse();

        // Запись в контейнер событий
        writeByContainer(params.events);
    });
    socket.on('resetEvents', function(status) {});
    socket.on('error', function(err) {
        notify(err);
    });

    // Вывести сообщение короткое
    alertByEvent();

    // Вывод короткого окошка о событии
    function alertByEvent() {
        setInterval(function () {
            if(params.container.wrapper.hasClass('notifications__wrap_show')) {
                return;
            }
            if (!params.events || params.events.length == 0) {
                notify('empty variable "params.events"');
                return;
            }
            // Получить с кук последний указанный ID события
            messageIteration('init');
            let event = null;
            let events = params.events.slice(-3);
            for(let e in events) {
                if(params.messageIteration < events[e].timestamp) {
                    event = events[e];
                    break;
                }
            }
            if(event) {
                let msg = createMessage(event)
                params.container.cell.html(`
                    <div class="notifications__item">
                        <div class="notifications__icon"><i class="icon ${params.eventsTypeIcon[event.eventName]}"></i></div>
                        <div class="notifications__text">
                            <div class="notifications__title">${msg}</div>
                            <div class="notifications__desc elapsedTime" data-elapse_time="${event.time}"></div>
                        </div>
                    </div>
                `);

                params.container.cell.removeClass('notifications__alert_hide');
                setTimeout(function() {
                    params.container.cell.addClass('notifications__alert_hide');
                    params.container.cell.empty();
                }, 2500);
                messageIteration('set', event.timestamp);
            }
        }, params.delay);
    }

    // Запись в контейнер событий
    function writeByContainer(events) {
        let event, msg;
        for(let i = 0; i < events.length; i++) {
            event = events[i];
            if (!event.id) {
              break;
            }
            msg = createMessage(event);

            if(((event.matrix == '1' || event.matrix == '2') && params.storage.notify.lastKeyXBase < event.id) || (event.matrix == '3' && params.storage.notify.lastKeyXGold < event.id)) {
                // Добавить запись
                params.container.el.prepend(`
                    <div class="notifications__item" data-notification_time="${event.timestamp}">
                        <div class="notifications__icon"><i class="icon ${params.eventsTypeIcon[event.eventName]}"></i></div>
                        <div class="notifications__text">
                            <div class="notifications__title">${msg}</div>
                            <div class="notifications__desc elapsedTime" data-elapse_time="${event.time}"></div>
                        </div>
                    </div>
                `);
                // Запомнить последний показанный ID транзакции
                if(event.matrix == '1' || event.matrix == '2') {
                    params.storage.notify.lastKeyXBase = event.id;
                } else if(event.matrix == '3') {
                    params.storage.notify.lastKeyXGold = event.id;
                }
                // Удалить с контейнера больше чем n записей
                for(let i = params.container.el.find(' > div').length; i > params.container.countItems; i--) {
                    params.container.el.find(' > div:last-child').remove();
                }
            }

        }
    }

    function createMessage(event) {
        let msg;
        // Тип сообщения
        msg = params.message[event.eventName];
        // Рандомизировать сообщения
        if(Array.isArray(msg)) {
            msg = msg[Math.floor(Math.random() * msg.length)];
        }
        msg = msg.replace('{referrer_id}', event.referrer_id);
        msg = msg.replace('{user_id}', event.user_id);
        msg = msg.replace('{crypto_name}', 'TRX');
        msg = msg.replace('{level}', event.level);
        if(event.matrix > 0) {
            msg = msg.replace('{price_level}', event.level_price);
            msg = msg.replace('{currency_usd}', parseFloat( config.course.TRX_USD * event.level_price ) . toFixed(2));
        }
        switch(event.matrix) {
            case '1':
                msg = msg.replace('{matrix}', 'X3');
                break;
            case '2':
                msg = msg.replace('{matrix}', 'X4');
                break;
            case '3':
                msg = msg.replace('{matrix}', 'xGold');
                break;
            default:
                msg = msg.replace('{matrix}', '?');
        }
        msg += '<a href="https://tronscan.org/#/transaction/' + event.tx + '" target="_blank" class="notifications-link__hash"><i class="fas fa-external-link-alt"></i></a>';
        return msg;
    }

    function messageIteration(action, key) {
        if (action == 'init') {
          params.messageIteration = cookie('messageIteration');
        }
        if (action == 'set') {
          params.messageIteration = key;
          cookie('messageIteration', params.messageIteration, {expires: 2592e6});
        }
    }
    // Вывод уведомлений веб сокета
    function notify(msg) {
      console.log('JS WebSocket: ', msg);
    }
}

// Подключение дополнительных скриптов, стилей
function setAssets(assets) {
    let b = $('body');
    let h = $('head');
    for(let type in assets) {
        for(i in assets[type]) {
            switch(type) {
                case 'css':
                    if(Array.isArray(assets[type][i])) {
                        h.prepend('<link rel="stylesheet" href="' + assets[type][i][0] + '">');
                    } else {
                        h.append('<link rel="stylesheet" href="' + assets[type][i] + '">');
                    }
                    break;
                case 'js':
                    if(Array.isArray(assets[type][i])) {
                        b.prepend('<script src="' + assets[type][i][0] + '"></script>');
                    } else {
                        b.append('<script src="' + assets[type][i] + '"></script>');
                    }
                    break;
            }
        }
    }
}

function storageTrigger(key, defaultValue) {
    let val = storage(key);
    if(val == '0') {
        val = '1';
    } else {
        val = '0';
    }
    return storage(key, val, defaultValue);
}

/* Cookie */
function storage(key, val, defaultValue) {
    let storage = getCookie('storage');
    if(!storage) {
        storage = {};
    } else {
        storage = JSON.parse(storage);
    }
    if(val !== undefined) {
        // Значение по умолчанию если значение еще не установленно
        if(!storage.hasOwnProperty(key)) {
            val = defaultValue ? 1 : 0;
        }
        storage[key] = val;
        setCookie(
            'storage', 
            JSON.stringify(storage),
            {
                expires: 31104000
            }
        );
        return val;
    }
    return storage.hasOwnProperty(key) ? storage[key] : null;
}

function cookie(key, val, opts) {
    if(val) {
        return setCookie(key, val, opts)
    }
    return getCookie(key);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    let defaultOptions = {
        path: '/',
    };
    options = Object.assign(defaultOptions, options);
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    } else {
        if(options.expires) {
            options.expires = new Date(Date.now() + Number.parseInt(options.expires) * 1000);
        }
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

(function() {
    'use strict';

    // Триггер значений
    $('[data-trigger_value]').click(function () {
        let el, sib, out, val, res;
        el = out = $(this);
        if(el.find('span').length) {
            out = el.find('span');
        }
        val = el.data('trigger_value').split('|');
        if(out.text() == val[0]) {
            res = val[1];
        } else {
            res = val[0];
        }
        out.text(res);

        sib = el.data('trigger_value_siblings');
        if(sib) {
            sib = $(sib);
            if(sib.find('span').length) {
                sib = sib.find('span');
            }
            sib.text(res);
        }
    });

    // Спойлер
    $('[data-spoiler]').click(function () {
        let key = $(this).data('spoiler');
        $(key).slideToggle(); 
    });

    // Translates
    window.l = function l(key) {
        if(!config.lang || !config.lang.hasOwnProperty(key)) {
            return 'no translate';
        }
        return config.lang[key];
    };

    // Copy text
    window.copyText = function(value) {
        var s = document.createElement('input');
        s.value = value;
        document.body.appendChild(s);

        if(navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            s.contentEditable = true;
            s.readOnly = false;
            var range = document.createRange();
            range.selectNodeContents(s);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            s.setSelectionRange(0, 999999);
        }
        else {
            s.select();
        }
        try {
            document.execCommand('copy');
            Notice.success(
                l('copied')
            );
        }
        catch (err) {
            Notice.error('Copied error: ' + err.message);
        }
        s.remove();
    };

    // Notices service
    class Alert {
        constructor(el, params = {}) {
            this.el = $(el);
            this.dealyAutoClose = params.dealyAutoClose || 5000;
        }
        info(subject, text, autoClose = true) {
            text = text || '';
            this.el.html(`
                <div class="alert alert_green alert_show">
                    <div class="alert__wrap row i-mid">
                        <div class="alert__icon"><i class="icon icon-check"></i></div>
                        <div class="alert__text">
                            <div class="alert__title">${subject}</div>
                            <div class="alert__desc">${text}</div>
                        </div>
                    </div>
                    <div class="alert__close" onclick="this.parentNode.remove()"><i class="icon icon-x"></i></div>
                </div>
            `);
            autoClose && this.autoClose();
        }
        success(subject, text, autoClose = true) {
            text = text || '';
            this.el.html(`
                <div class="alert alert_violet alert_show">
                    <div class="alert__wrap row i-mid">
                        <div class="alert__icon"><i class="fas fa-bell icon-bell-violet"></i></div>
                        <div class="alert__text">
                            <div class="alert__title">${subject}</div>
                            <div class="alert__desc">${text}</div>
                        </div>
                    </div>
                    <div class="alert__close" onclick="this.parentNode.remove()"><i class="icon icon-x"></i></div>
                </div>
            `);
            autoClose && this.autoClose();
        }
        error(subject, text, autoClose = true) {
            text = text || '';
            this.el.html(`
                <div class="alert alert_red alert_show">
                    <div class="alert__wrap row i-mid">
                        <div class="alert__icon"><i class="icon icon-crest"></i></div>
                        <div class="alert__text">
                            <div class="alert__title">${subject}</div>
                            <div class="alert__desc">${text}</div>
                        </div>
                    </div>
                    <div class="alert__close" onclick="this.parentNode.remove()"><i class="icon icon-x"></i></div>
                </div>
            `);
            autoClose && this.autoClose();
        }
        warning(subject, text, autoClose = true) {
            text = text || '';
            this.el.html(`
                <div class="alert alert_orange alert_show">
                    <div class="alert__wrap row i-mid">
                        <div class="alert__icon"><i class="icon icon-alert"></i></div>
                        <div class="alert__text">
                            <div class="alert__title">${subject}</div>
                            <div class="alert__desc">${text}</div>
                        </div>
                    </div>
                    <div class="alert__close" onclick="this.parentNode.remove()"><i class="icon icon-x"></i></div>
                </div>
            `);
            autoClose && this.autoClose();
        }
        autoClose() {
            setTimeout(function(that) {
                that.el.empty();
            }, this.dealyAutoClose, this);
        }
    };
    window.Notice = new Alert('#alerts');

    // Сколько прошло времени
    jQuery.fn.elapsedTime = function (selector, source, options = {}) {
        var options = jQuery.extend({
            lang: {
                years:   ['год', 'года', 'лет'],
                months:  ['месяц', 'месяца', 'месяцев'],
                days:    ['день', 'дня', 'дней'],
                hours:   ['час', 'часа', 'часов'],
                minutes: ['минута', 'минуты', 'минут'],
                seconds: ['секунда', 'секунды', 'секунд'],
                end: " назад",
                freshly: "только что",
            },
            plurar:  function(n) {
                return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
            },
            intervalUpdate: 1,
        }, options);
        options.intervalUpdate *= 1e3;

        var timeDifference = function(end, begin) {
            if (end < begin) {
                return false;
            }
            var difference = {
                seconds: [end.getSeconds() - begin.getSeconds(), 60],
                minutes: [end.getMinutes() - begin.getMinutes(), 60],
                hours:   [end.getHours()   - begin.getHours()  , 24],
                days:    [end.getDate()    - begin.getDate()   , new Date(begin.getYear(), begin.getMonth() + 1, 0).getDate()],
                months:  [end.getMonth()   - begin.getMonth()  , 12],
                years:   [end.getYear()    - begin.getYear()   , 0]
            };
            if(difference.years[0] != 0) {
                delete (difference.days);   
                delete (difference.hours);   
                delete (difference.minutes);
                delete (difference.seconds);
            }
            else if(difference.months[0] != 0) { 
                delete (difference.hours);  
                delete (difference.minutes); 
                delete (difference.seconds);
            }
            else if(difference.days[0] != 0) {
                delete (difference.minutes);
                delete (difference.seconds);
            }
            else if(difference.hours[0] != 0) {
                delete (difference.seconds);
            } 
            else if(difference.minutes[0] != 0) {
                delete (difference.seconds);
            }
            var result = new Array();
            var flag = false;
            for (let i in difference) {
                if (flag) {
                    difference[i][0]--;
                    flag = false;
                }     
                if (difference[i][0] < 0) {
                    flag = true;
                    difference[i][0] += difference[i][1];
                }
                if (!difference[i][0]) {
                    continue;
                }
                result.push(difference[i][0] + ' ' + options.lang[i][options.plurar(difference[i][0])]);
            }
            return result.reverse().join(' ');
        };
        var elapsedTime = function () {
            var need_to_time_update = $(selector);
            if(need_to_time_update.length > 0) {
                need_to_time_update.each(function(i) {
                    var date = need_to_time_update.eq(i).attr(source).toString().split(",");
                    if(!date[5]) {
                        date[5] = 0;
                    }
                    var s = timeDifference(
                        new Date(), 
                        new Date(
                            date[0],
                            date[1] - 1,
                            date[2],
                            date[3],
                            date[4],
                            date[5]
                        )
                    );
                    if (s.length) {
                        need_to_time_update.eq(i).html(s+options.lang.end);
                    }
                    else {
                        need_to_time_update.eq(i).html(options.lang.freshly);
                    }
                });
            }
        };

        elapsedTime();
        setInterval(elapsedTime, options.intervalUpdate);
    };
    $("body").elapsedTime(
        '.elapsedTime',
        'data-elapse_time',
        {
            lang: {
                years:   [
                    l('elt-years_0'), 
                    l('elt-years_1'), 
                    l('elt-years_2')
                ],
                months:  [
                    l('elt-months_0'), 
                    l('elt-months_1'), 
                    l('elt-months_2')
                ],
                days:    [
                    l('elt-days_0'),
                    l('elt-days_1'),
                    l('elt-days_2'),
                ],
                hours:   [
                    l('elt-hours_0'),
                    l('elt-hours_1'),
                    l('elt-hours_2'),
                ],
                minutes: [
                    l('elt-minutes_0'),
                    l('elt-minutes_1'),
                    l('elt-minutes_2'),
                ],
                seconds: [
                    l('elt-seconds_0'),
                    l('elt-seconds_1'),
                    l('elt-seconds_2'),
                ],
                end: l('elt-end'),
                freshly: l('elt-freshly'),
            }
        }
    );

    // Сколько осталось времени
    jQuery.fn.countdown = function (selector, source, options = {}) {
        var options = jQuery.extend({
            lang: {
                years:   ['год', 'года', 'лет'],
                months:  ['месяц', 'месяца', 'месяцев'],
                days:    ['день', 'дня', 'дней'],
                hours:   ['час', 'часа', 'часов'],
                minutes: ['минуту', 'минуты', 'минут'],
                seconds: ['секунду', 'секунды', 'секунд'],
                after: " назад",
                deadline: "только что",
            },
            plurar:  function(n) {
                return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
            },
            intervalUpdate: 1,
        }, options);
        options.intervalUpdate *= 1e3;

        var timeDifference = function(end, begin) {
            if (end > begin) {
                return false;
            }
            var difference = {
                seconds: [begin.getSeconds() - end.getSeconds(), 60],
                minutes: [begin.getMinutes() - end.getMinutes(), 60],
                hours:   [begin.getHours()   - end.getHours()  , 24],
                days:    [begin.getDate()    - end.getDate()   , new Date(begin.getYear(), begin.getMonth() + 1, 0).getDate()],
                months:  [begin.getMonth()   - end.getMonth()  , 12],
                years:   [begin.getYear()    - end.getYear()   , 0]
            };
            if(difference.years[0] != 0) {
                // delete (difference.days);   
                // delete (difference.hours);   
                delete (difference.minutes);
                delete (difference.seconds);
            }
            else if(difference.months[0] != 0) { 
                // delete (difference.hours);  
                delete (difference.minutes); 
                delete (difference.seconds);
            }
            else if(difference.days[0] != 0) {
                // delete (difference.minutes);
                delete (difference.seconds);
            }
            else if(difference.hours[0] != 0) {
                delete (difference.seconds);
            } 
            else if(difference.minutes[0] != 0) {
                // delete (difference.seconds);
            }
            var result = new Array();
            var flag = false;
            for (let i in difference) {
                if (flag) {
                    difference[i][0]--;
                    flag = false;
                }     
                if (difference[i][0] < 0) {
                    flag = true;
                    difference[i][0] += difference[i][1];
                }
                if (!difference[i][0]) {
                    continue;
                }
                result.push(difference[i][0] + ' ' + options.lang[i][options.plurar(difference[i][0])]);
            }
            return result.reverse().join(' ');
        };
        var countdown = function () {
            var need_to_time_update = $(selector);
            if(need_to_time_update.length > 0) {
                need_to_time_update.each(function(i) {
                    var date = need_to_time_update.eq(i).attr(source).toString().split(",");
                    if(!date[5]) {
                        date[5] = 0;
                    }
                    var s = timeDifference(
                        new Date(), 
                        new Date(
                            date[0],
                            date[1] - 1,
                            date[2],
                            date[3],
                            date[4],
                            date[5]
                        )
                    );
                    if (s.length) {
                        need_to_time_update.eq(i).html(options.lang.after + s);
                    }
                    else {
                        need_to_time_update.eq(i).html(options.lang.deadline);
                    }
                });
            }
        };

        countdown();
        setInterval(countdown, options.intervalUpdate);
    };
    $("body").countdown(
        '.countdown',
        'data-countdown',
        {
            lang: {
                years:   [
                    l('elt-years_0'), 
                    l('elt-years_1'), 
                    l('elt-years_2')
                ],
                months:  [
                    l('elt-months_0'), 
                    l('elt-months_1'), 
                    l('elt-months_2')
                ],
                days:    [
                    l('elt-days_0'),
                    l('elt-days_1'),
                    l('elt-days_2'),
                ],
                hours:   [
                    l('elt-hours_0'),
                    l('elt-hours_1'),
                    l('elt-hours_2'),
                ],
                minutes: [
                    l('elt-minutes_3'),
                    l('elt-minutes_1'),
                    l('elt-minutes_2'),
                ],
                seconds: [
                    l('elt-seconds_3'),
                    l('elt-seconds_1'),
                    l('elt-seconds_2'),
                ],
                after: l('elt-after'),
                deadline: l('elt-deadline'),
            }
        }
    );
})();

// Управление GET строкой
function $_GET(params, read) {
    let query = {};
    if(typeof params == 'object') {
        query = params
    }
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((val, key) => {
        if(!query.hasOwnProperty(key)) {
            query[key] = val;
        }
    });
    if (read) {
        let i = 0;
        let str = '?';
        for(key in query) {
            str += i == 0 ? `${key}=${encodeURIComponent(query[key])}` : `&${key}=${encodeURIComponent(query[key])}`;
            i++;
        }
        return str;
    } else {
        if(typeof params == 'object') {
            return query;
        } else if(typeof params == 'string') {
            return query.hasOwnProperty(params) ? query[params] : null;
        } else {
            return query;
        }
    }
}