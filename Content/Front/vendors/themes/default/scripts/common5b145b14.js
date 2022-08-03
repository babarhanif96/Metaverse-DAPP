$(document).ready(function($) {
	var c = { // c - classes
		state: {
			active: 'active',
			filled: 'filled',
			valid: 'valid',
			error: 'error',
			focus: 'focus',
			checked: 'checked',
			required: 'required'
		},
		sElem: '__', // separator Element
		sMode: '_' // separator Modifier

	};
	var input = {
		class: {
			block: 'input',
			area: 'area'
		},
		block: null,
		placeholder: null,
		area: null,
		value: null,
		Vars: function(block){
			this.block = block.parents('.' + this.class.block);
		},
		Filled: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				this.block.addClass(this.class.block + c.sMode + c.state.filled)
			}
			else {
				this.block.removeClass(this.class.block + c.sMode + c.state.filled)
			}
		},
		OnFocus: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.focus).removeClass(this.class.block + c.sMode + c.state.error);
		},
		UnFocus: function(block){
			this.block = block.parents('.' + this.class.block);
			this.block.removeClass(this.class.block + c.sMode + c.state.focus);
		},
		EventValid: function(block){
			this.Vars(block);
			this.block.removeClass(this.class.block + c.sMode + c.state.error);
			return 0;
		},
		EventValidError: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.error);
			return 1;
		},
		Validation: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				if (this.block.hasClass(this.class.block + '_phone')){
					if (this.value.length != 18){
						return this.EventValidError(block);
					}
					else{
						return this.EventValid(block);
					}
				}
				else{
					return this.EventValid(block);
				}
			}
			else {
				return this.EventValidError(block);
			}
		},
		Init: function () {
			this.area = '.' + input.class.block + c.sElem + input.class.area;
			$(window).on('load', function () {
				$('body').find(input.area).each(function () {
					input.Filled($(this));
				})
			});
			$(this.area).on('focusin', function () {
				input.OnFocus($(this));
			});
			$(this.area).on('focusout', function () {
				input.UnFocus($(this));
			});
			$(this.area).on('keyup', function () {
				input.Filled($(this));
			});
			$('.' + this.class.block + '_phone ' + this.area).mask('+7 (000) 000-00-00'); // phone mask
		}
	};

	var textarea = {
		class: {
			block: 'textarea',
			area: 'area'
		},
		block: null,
		placeholder: null,
		area: null,
		value: null,
		Vars: function(block){
			this.block = block.parents('.' + this.class.block);
		},
		Filled: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				this.block.addClass(this.class.block + c.sMode + c.state.filled)
			}
			else {
				this.block.removeClass(this.class.block + c.sMode + c.state.filled)
			}
		},
		OnFocus: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.focus).removeClass(this.class.block + c.sMode + c.state.error);
		},
		UnFocus: function(block){
			this.block = block.parents('.' + this.class.block);
			this.block.removeClass(this.class.block + c.sMode + c.state.focus);
		},
		EventValid: function(block){
			this.Vars(block);
			this.block.removeClass(this.class.block + c.sMode + c.state.error);
			return 0;
		},
		EventValidError: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.error);
			return 1;
		},
		Validation: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				return this.EventValid(block);
			}
			else {
				return this.EventValidError(block);
			}
		},
		Init: function () {
			this.area = '.' + textarea.class.block + c.sElem + textarea.class.area;
			$(window).on('load', function () {
				$('body').find(textarea.area).each(function () {
					textarea.Filled($(this));
				})
			});
			$(this.area).on('focusin', function () {
				textarea.OnFocus($(this));
			});
			$(this.area).on('focusout', function () {
				textarea.UnFocus($(this));
			});
			$(this.area).on('keyup', function () {
				textarea.Filled($(this));
			});
		}
	};

	var checkbox = {
		class: {
			block: 'checkbox',
			input: 'input'
		},
		block: null,
		input: null,
		value: null,
		name: null,
		status: null,
		Vars: function(block){
			this.block = block;
			this.input = this.block.find('.' + this.class.block + c.sElem + this.class.input);
			this.name = this.input.attr('name');
			this.status = this.input.attr('checked');
			this.value = this.input.val();
		},
		Filled: function(block){
			this.Vars(block);
			if (this.status == c.state.checked){
				this.block.addClass(this.class.block + c.sMode + c.state.checked)
			}
		},
		Click: function (block) {
			this.Vars(block);
			if(this.status == undefined || this.status == ''){
				this.input.attr(c.state.checked, c.state.checked);
				this.block.addClass(this.class.block + c.sMode + c.state.checked);
			}
			else {
				this.input.removeAttr(c.state.checked);
				this.block.removeClass(this.class.block + c.sMode + c.state.checked);
			}

		},
		Validation: function(block){
			var blocksLength = block.find('.' + this.class.block + c.sMode + c.state.checked).length;
			if (blocksLength == 0){
				return 1;
			} else{
				return 0;
			}


		},
		Init: function () {
			this.input = '.' + checkbox.class.block + c.sElem + checkbox.class.input;
			$(window).on('load', function () {
				$('body').find('.' + checkbox.class.block).each(function () {
					checkbox.Filled($(this));
				})
			});
			$('.' + checkbox.class.block).on('click', function () {
				checkbox.Click($(this));
			});
		}
	};

	var radio = {
		class: {
			block: 'radio',
			input: 'input'
		},
		block: null,
		input: null,
		value: null,
		name: null,
		status: null,
		radios: null,
		Vars: function(block){
			this.block = block;
			this.input = this.block.find('.' + this.class.block + c.sElem + this.class.input);
			this.name = this.input.attr('name');
			this.status = this.input.attr('checked');
			this.value = this.input.val();
		},
		Filled: function(block){
			this.Vars(block);
			if (this.status == c.state.checked){
				this.block.addClass(this.class.block + c.sMode + c.state.checked)
			}
		},
		Click: function (block) {
			this.Vars(block);
			if(this.status == undefined || this.status == ''){
				this.radios = this.block.parents('body').find('input[name = ' + this.name + ']');
				this.radios.each(function () {
					var input = $(this).parents('.' + radio.class.block);
					$(this).removeAttr('checked');
					input.removeClass(radio.class.block + c.sMode + c.state.checked);
				});
				this.input.attr(c.state.checked, c.state.checked);
				this.block.addClass(this.class.block + c.sMode + c.state.checked);
			}
		},
		Validation: function(block){
			var blocksLength = block.find('.' + this.class.block + c.sMode + c.state.checked).length;
			if (blocksLength == 0){
				return 1;
			} else{
				return 0;
			}
		},
		Init: function () {
			this.input = '.' + radio.class.block + c.sElem + radio.class.input;
			$(window).on('load', function () {
				$('body').find('.' + radio.class.block).each(function () {
					radio.Filled($(this));
				})
			});
			$('.' + radio.class.block).on('click', function () {
				radio.Click($(this));
			});
		}
	};

	var select = {
		case: null,
		item: null,
		wrap: null,
		text: null,
		placeholder: null,
		placeholderValue: null,
		Vars: function(){

		},
		ClickItem: function(block){
			select.case = block.parents('.select');
			select.wrap = select.case.find('.select__wrap');
			select.item = block.attr('data-value');

			select.item = select.wrap.find('option[value = ' + select.item + ']');
			if (!select.item.prop('selected')) {
				select.text.attr('style', '');
				select.text = select.case.find('.select__text');
				select.wrap.find('option').removeAttr('selected');
				select.item.attr('selected', 'selected');
				block.siblings('.select__item').removeClass('select__item_selected');
				block.addClass('select__item_selected');
				if (block.attr('style')) {
					select.text.attr('style', block.attr('style'));
				}
				select.text.text(select.item.text());
			}

		},
		Init: function(){
			$('.select').each(function(index, el) {
				select.wrap = $(this).find('.select__wrap');
				select.text = $(this).find('.select__text');
				select.placeholder = $(this).attr('data-placeholder');
				select.placeholderValue = select.placeholder;
				if (select.wrap.find('option[selected]').length > 0) {
					var selectedItem = select.wrap.find('option[selected]');
				} else {
					var selectedItem = select.wrap.find('option:first-child');
				}
				selectedItem.attr('selected', 'selected');
				select.placeholderValue = selectedItem.text();
				select.text.text(select.placeholderValue);
			});
			$('.select__item').on('click', function(event) {
				select.ClickItem($(this));
			});
			$('.select').on('click', function(event) {
				$(this).toggleClass('select_open');
			});
			$(document).mouseup(function (e){
				var div = $('.select');
				if (!div.is(e.target)
						&& div.has(e.target).length === 0) {
					div.removeClass('select_open');
				}
			});
		}
	}

	function valueElementForm(nameElement, nameBlock) {
		var newNameElement = '.' + nameElement;
			element = $(newNameElement);
		element.each(function(index, el) {
			var elementInput = $(this).find($(nameBlock)),
				elementLabel = $(this).find($('label')),
				elementValue = index + 1;
			elementInput.attr('id', nameElement + '-' + elementValue);
			elementLabel.attr('for', nameElement + '-' + elementValue);
		});
		
	}
	valueElementForm('input', 'input');
	valueElementForm('textarea', 'textarea');
	

	input.Init();
	textarea.Init();
	checkbox.Init();
	radio.Init();
	select.Init();



	$('.currents__list').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		dots: true
	});


	$('.cp-btn').on('click', function(event) {
		var input = $(this).parents('.cp-wrap').find('.cp-target');
		input.select();
		document.execCommand("copy");
	});

	$('.drop').on('click', function(){
		var block = $(this).parents('.drop-wrap'),
				target = block.find('.drop-target');

		block.toggleClass('drop-wrap_open');
		if (block.hasClass('drop-wrap_open')) {
			target.slideDown(300);
		} else {
			target.slideUp(300);
		}
	});


	$('.table thead th').each(function(indexTh, th) {
		var index = indexTh + 1;
		if ($(this).hasClass('c')) {
			$(this).parents('.table').find('tbody tr').each(function(indexTr, tr) {
				$(this).find('td:nth-of-type(' + index + ')').addClass('c');
			});	
		}
		if ($(this).hasClass('col-turquoise')) {
			$(this).parents('.table').find('tbody tr').each(function(indexTr, tr) {
				$(this).find('td:nth-of-type(' + index + ')').addClass('col-turquoise');
			});
		}
		if ($(this).hasClass('col-blue')) {
			$(this).parents('.table').find('tbody tr').each(function(indexTr, tr) {
				$(this).find('td:nth-of-type(' + index + ')').addClass('col-blue');
			});
		}
	});

	$('.upgrage__slider-list').slick({
		vertical: true,
		appendArrows: $('.upgrage__slider-arrows')
	});

	



  $('.notifications__toggle').on('click', function(event) {
  	$('.notifications__wrap').addClass('notifications__wrap_show');
  });
  $(document).mouseup(function (e){
		var div = $('.notifications__wrap');
		if (!div.is(e.target)
				&& div.has(e.target).length === 0) {
			div.removeClass('notifications__wrap_show');
		}
	});

  setTimeout(function(){
  	$('.notifications__alert').addClass('notifications__alert_hide');
  }, 3500);


  $('.cls-btn').on('click', function(event) {
  	$('.popup').removeClass('popup_show')
  });


  var hum = $('.hum'),
  		humClass = 'hum_toggle',
  		nav = $('.m-nav'),
  		navClass = 'm-nav_toggle';

  hum.on('click', function () {
  	hum.toggleClass(humClass);
  	nav.toggleClass(navClass);
  	if (hum.hasClass(humClass)) {
  		$('html, body').css('overflow', 'hidden');
  	} else{
  		$('html, body').removeAttr('style');
  	}
  })



  $(window).on('scroll', function(event) {
  	if(hum.hasClass(humClass)){
  		$(window).scrollTop(0);
  		event.preventDefault();
  	}
  });


  $('.alert__close').on('click', function(event) {
  	$(this).parents('.alert').slideUp(300);
  });

  $('.answer__close').on('click', function(event) {
  	$(this).parents('.answer').slideUp(300);
  });
});
