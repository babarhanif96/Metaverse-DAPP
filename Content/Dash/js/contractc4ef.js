"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONTRACT_ADDRESS        = "TREbha3Jj6TrpT7e6Z5ukh3NRhyxHsmMug";
var CONTRACT_XGOLD_ADDRESS  = "TJerYvH86GNEPsH8yf22X6rkdKqY7TWXQQ";
var CONTRACT_FORK_XGOLD_ADDRESS  = "TA6p1BnBf2HJgc77Zk8BHmHoiJzquLCKWb";

var CONTRACT_TOKEN_FRS      = 'TKRrSDRjfmDKTKGgDmpevADQ9dGNqBRRxb';
var CONTRACT_TOKEN_FRX      = 'TSuYFTeGjuKy3HxLdwAueSFk48ezJdvJPK';
var CONTRACT_TOKEN_EXCHANGE = 'TVS9P31uRERqgaP4MqeCtwb1tLFbR2sV1m';

var DEFAULT_UPLINE          = "TQ6h72361iKuQehPKhaPzV8h98RotWNJXg";
var MATRIX_PRICE            = 200;
var DEFAULT_FEE             = 15e9;
var DEFAULT_FEE_LIMIT       = 300000000;
var COOKIE_AUTH_NAME        = 'auth';

var Tron = /*#__PURE__*/function () {
  function Tron(contractInstance) {
    _classCallCheck(this, Tron);
    this.contractInstance = contractInstance || 'default';
  }

  _createClass(Tron, [{
    key: "contract",
    value: async function contract(response) {
      if (!this.getConfig.installed) {
        this.notify.warning('notDetectedWallet');
        return response('required install tron wallet');
      }

      if (!this.getConfig.loggedIn) {
        this.notify.warning('unblockWallet');
        return response('required unblock wallet');
      }

      var contract;
      try {
        switch(this.contractInstance) {
          case 'XGold':
            contract = await window.tronWeb.contract().at(CONTRACT_XGOLD_ADDRESS);
            break;
          case 'Fork.XGold':
            contract = await window.tronWeb.contract().at(CONTRACT_FORK_XGOLD_ADDRESS);
            break;
          case 'Token.FRS':
            contract = await window.tronWeb.contract().at(CONTRACT_TOKEN_FRS);
            break;
          case 'Token.FRX':
            contract = await window.tronWeb.contract().at(CONTRACT_TOKEN_FRX);
            break;
          case 'Token.Exchange':
            contract = await window.tronWeb.contract().at(CONTRACT_TOKEN_EXCHANGE);
            break;
          default: 
            contract = await window.tronWeb.contract().at(CONTRACT_ADDRESS);
            break;
        }
        return response(false, contract); 
      } catch (error) {
        return response('error init contract: ' + error);
      }
    }
  }, {
    key: "buyNewLevel",
    value: function buyNewLevel(matrix, level, price) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          if (err) {
            return rejected(err);
          }

          instanse.buyNewLevel(matrix, level).send({
            feeLimit: DEFAULT_FEE_LIMIT,
            callValue: price * 1000000 // shouldPollResponse: true,

          }).then(function (result) {
            that.notify.success('transactionSend');
            resolve(result);
          }, function (error) {
            if (error.message) {
              that.notify.error(error.message, false);
            }

            rejected(error);
          });
        });
      });
    }
  },{
    key: "buyNewLevelXGold",
    value: function buyNewLevelXGold(level, price) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          if (err) {
            return rejected(err);
          }

          instanse.buyNewLevel(level).send({
            feeLimit: DEFAULT_FEE_LIMIT,
            callValue: price * 1000000 // shouldPollResponse: true,

          }).then(function (result) {
            that.notify.success('transactionSend');
            resolve(result);
          }, function (error) {
            if (error.message) {
              that.notify.error(error.message, false);
            }

            rejected(error);
          });
        });
      });
    }
  }, {
    key: "registration",
    value: function registration(userId, callback) {
      var that = this;
      that.idToAddress(userId).then(function (userAddress) {
        that.registrationExt(userAddress).then(function (tx) {
          callback(false, tx);
        }, function (error) {
          callback(error);
          console.log('Error[registrationExt]: ', error);
        });
      }, function (error) {
        console.log('Error[idToAddress]: ', error);
      });
    }
  }, {
    key: "registrationExt",
    value: function registrationExt(uplineAddress) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          if (err) {
            return rejected(err);
          }

          instanse.registrationExt(uplineAddress).send({
            feeLimit: DEFAULT_FEE_LIMIT,
            callValue: MATRIX_PRICE * 1000000 // shouldPollResponse: true,

          }).then(function (result) {
            that.notify.success('transactionSend');
            resolve(result);
          }, function (error) {
            if (error.message) {
              that.notify.error(error.message, false);
            } else {
              that.notify.error('errorSendingTransaction');
            }
            rejected(error);
          });
        });
      });
    }
  }, {
    key: "registrationXGold",
    value: function registrationXGold(callback) {
      var that = this;
      that.registrationExtXGold().then(function (tx) {
        callback(false, tx);
      }, function (error) {
        callback(error);
        console.log('Error[registrationExtXGold]: ', error);
      });
    }
  },{
    key: "registrationExtXGold",
    value: function registrationExtXGold() {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          if (err) {
            return rejected(err);
          }
          instanse.registrationExt().send({
            feeLimit: DEFAULT_FEE_LIMIT,
            callValue: MATRIX_PRICE * 1000000 // shouldPollResponse: true,

          }).then(function (result) {
            that.notify.success('transactionSend');
            resolve(result);
          }, function (error) {
            if (error.message) {
              that.notify.error(error.message, false);
            } else {
              that.notify.error('errorSendingTransaction');
            }
            rejected(error);
          });
        });
      });
    }
  }, {
    key: "idToAddress",
    value: function idToAddress(userId) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          if (err) {
            return rejected(err);
          }

          instanse.idToAddress(userId).call().then(function (userAddress) {
            if (!userAddress) {
              rejected('Error: "idToAddress"');
              return false;
            }

            userAddress = '0x' + userAddress.substr(2);

            if (userAddress == '0x0000000000000000000000000000000000000000') {
              rejected('User not exist');
              return false;
            }

            resolve(userAddress);
          }, function (error) {
            if (error.message) {
              that.notify.error(error.message, false);
            }

            rejected(error);
          });
        });
      });
    }
  }, {
    key: "userExists",
    value: function userExists(userAddress) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          if (err) {
            return rejected(err);
          }

          instanse.isUserExists(userAddress).call().then(function (isExists) {
            if (isExists) {
              resolve(isExists);
            } else {
              rejected('User not exist');
            }
          }, function (error) {
            if (error.message) {
              that.notify.error(error.message, false);
            }

            rejected(error);
          });
        });
      });
    }
  }, {
    key: "usersActiveX6Levels",
    value: function usersActiveX6Levels(userAddress, level) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          if (err) {
            return rejected(err);
          }
          instanse.usersActiveX6Levels(userAddress, level).call().then(function (response) {
            resolve(response);
          }, function (error) {
            if (error.message) {
              that.notify.error(error.message, false);
            }
            rejected(error);
          });
        });
      });
    }
  }, {
    key: "sign",
    value: function sign(signMessage) {
      var that = this;
      return new Promise(function (resolve, rejected) {
        window.tronWeb.trx.sign(signMessage).then(function (sign) {
          resolve(sign);
        }).catch(function (error) {
          rejected(error);
        });
      });
    }
  }, {
    key: "getTransaction",
    value: function getTransaction(tx, callback) {
      var that = this;
      that.getTransactionInfo(tx).then(function (info) {
        if ((info || {}).receipt) {
          callback({
            isSuccess: info.receipt.result == 'SUCCESS' ? true : false,
            blockNumber: info.blockNumber,
            tx: info.id,
            countConfirmation: 0,
            fee: info.receipt.energy_fee,
            fee_usage: info.receipt.energy_usage_total,
            timestamp: info.blockTimeStamp,
            response: info
          });
        }
      }, function (error) {
        callback(false, error);
      });
    }
  }, {
    key: "getTransactionInfo",
    value: function getTransactionInfo(tx) {
      var that = this;
      return new Promise(function (resolve, rejected) {
        if(!window.tronWeb) {
          rejected('error not found tronWeb');
          return false;
        }
        window.tronWeb.trx.getTransactionInfo(tx).then(function (info) {
          resolve(info);
        }).catch(function (error) {
          rejected(error);
        });
      });
    }
  }, {
    key: "FRSApprove",
    value: function FRSApprove(amount) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          instanse.approve(CONTRACT_TOKEN_EXCHANGE, amount).send({
            feeLimit: DEFAULT_FEE_LIMIT,
          }).then(function(result) {
            resolve(result);
          }, function (error) {
            rejected(error);
          });
        });
      });
    }
  }, {
    key: "exchangeFRS_FRX",
    value: function exchangeFRSToFRX(amount) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          instanse.exchange(amount).send({
            feeLimit: DEFAULT_FEE_LIMIT,
          }).then(function(result) {
            resolve(result);
          }, function (error) {
            rejected(error);
          });
        });
      });
    }
  }, {
    key: "FRSBalance",
    value: function FRSBalance(userAddress) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          userAddress = userAddress || that.getConfig.addressBase58;
          instanse.balanceOf(userAddress).call().then(function(result) {
            var amount = null;
            if(result._hex) {
              amount = parseInt(result._hex, 16);
            }
            if(typeof amount != 'number') {
              rejected('error get token balance');
              return;
            }
            resolve(amount);
          }, function (error) {
            rejected(error);
          });
        });
      });
    }
  }, {
    key: "FRXBalance",
    value: function FRXBalance(userAddress) {
      var that = this;
      return this.contract(function (err, instanse) {
        return new Promise(function (resolve, rejected) {
          userAddress = userAddress || that.getConfig.addressBase58;
          instanse.balanceOf(userAddress).call().then(function(result) {
            var amount = null;
            if(result._hex) {
              amount = parseInt(result._hex, 16);
            }
            if(typeof amount != 'number') {
              rejected('error get token balance');
              return;
            }
            resolve(amount);
          }, function (error) {
            rejected(error);
          });
        });
      });
    }
  }, {
    key: "getConfig",
    get: function get() {
      var params = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready && window.tronWeb.fullNode.host != 'http://127.0.0.1',
        address: null,
        addressBase58: null,
        currentNetwork: null
      };

      if (params.loggedIn) {
        params.address = window.tronWeb.defaultAddress;
        params.addressBase58 = window.tronWeb.defaultAddress.base58;
        params.currentNetwork = window.tronWeb.fullNode.host;
      }

      return params;
    }
  }, {
    key: "notify",
    get: function get() {
      return {
        error: function error(message) {
          var needTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          Notice.error(needTranslate ? l(message) : message);
        },
        warning: function warning(message) {
          var needTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          Notice.warning(needTranslate ? l(message) : message);
        },
        success: function success(message) {
          var needTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          Notice.success(needTranslate ? l(message) : message);
        },
        alert: function alert(message) {
          var needTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          Notice.alert(needTranslate ? l(message) : message);
        },
        info: function info(message) {
          var needTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          Notice.info(needTranslate ? l(message) : message);
        }
      };
    }
  }]);

  return Tron;
}();

var Contract = /*#__PURE__*/function (_Tron) {
  _inherits(Contract, _Tron);

  var _super = _createSuper(Contract);

  function Contract() {
    _classCallCheck(this, Contract);
    return _super.apply(this, arguments);
  }

  _createClass(Contract, [{
    key: "autoLogin",
    value: function autoLogin(callback) {
      var _this = this;
      var that = this;

      if (config.locked.authorization) {
        alert(config.locked.authorization);
        return false;
      }
      if(!storage('welcomeWindow') && (getCookie('lang') == 'ru' || document.documentElement.lang == 'ru')) {
        storage('welcomeWindow', 0);
      }      
      var userAddress = _get(_getPrototypeOf(Contract.prototype), "getConfig", this).addressBase58;
      if(!userAddress) {
        that.notify.warning("Error get userAddress", false);
        return false;
      }

      var hash;
      if(config && config.user && config.user.sid) {
        hash = config.user.sid;
      } else {
        hash = 'unknown';
      }

      _get(_getPrototypeOf(Contract.prototype), "userExists", this).call(this, userAddress).then(function (isExists) {
        if (!isExists) {
          callback('notExistUser', userAddress);
          return false;
        }

        _get(_getPrototypeOf(Contract.prototype), "sign", _this).call(_this, hash).then(function (sign) {
          if(!hash) {
            that.notify.warning("Error create signature", false);
            return false;
          }
          $.ajax({
            url: '/ajax/auth/',
            type: 'POST',
            cache: false,
            async: true,
            dataType: 'json',
            data: {
              userAddress: userAddress,
              sign: sign,
              hash: hash
            },
            success: function success(val, status) {
              if (val.status == 'success') {
                that.notify.success(val.message, false);
                var redirect = val.params.hash ? '/?' + val.params.key + '=' + val.params.hash : config.previousUrl;
                setTimeout(function () {
                  /*****update token balance frx *****/
                  var contract = new Contract('Token.FRX');
                  contract.FRXBalance().then(function(amount) {
                      if(amount > 0) {
                          amount = amount / 1000000;
                          amount = amount.toFixed(2);
                      }
                      cookie('balance_frx', amount, {expires: 31104000}); // 360 days
                      window.location.href = redirect;
                  }, function(error) {
                      cookie('balance_frx', 0, {expires: 31104000}); // 360 days
                      window.location.href = redirect;
                  });
                  /**********/
                }, 2500);
                callback(isExists, userAddress);
              } else if (status != 'success') {
                console.log('Unsuccessful  Ajax request: ' + jqXHR.responseText);
                that.notify.warning(jqXHR.responseText, false);
              } else {
                that.notify.warning(val.message, false);
              }
            },
            error: function error(jqXHR, textStatus, errorThrown) {
              console.log('Error Ajax request: ' + jqXHR.responseText);
              that.notify.warning(jqXHR.responseText, false);
            }
          });
        }, function (error) {
          _get(_getPrototypeOf(Contract.prototype), "notify", _this).warning(error, false);
        });
      }, function (error) {
        _get(_getPrototypeOf(Contract.prototype), "notify", _this).warning(error, false);

        console.log('Error[userExists]: ', error);
      });
    }
  }, {
    key: "buyLevel",
    value: function buyLevel(matrix, level, price, callback) {
      _get(_getPrototypeOf(Contract.prototype), "buyNewLevel", this).call(this, matrix, level, price).then(function (tx) {
        callback(tx);
      }, function (error) {
        callback();
        console.log('Error[buyNewLevel]: ', error);
      });
    }
  }, {
    key: "buyLevelXGold",
    value: function buyLevelXGold(level, price, callback) {
      _get(_getPrototypeOf(Contract.prototype), "buyNewLevelXGold", this).call(this, level, price).then(function (tx) {
        callback(tx);
      }, function (error) {
        callback();
        console.log('Error[buyNewLevelXGold]: ', error);
      });
    }
  } ,{
    key: "pageReg",
    value: function pageReg() {
      var that = this;
      var i = 0;
      var btn = $('.reg-form__btn');
      var btnLoad = $('.reg-form__btn-load'); // Регистрация

      var repeat = setInterval(function () {
        if (window.tronWeb) {
          btnLoad.remove();
          btn.removeClass('disabled');
          clearInterval(repeat);
          btn.click(function () {
            var upline = $('input[name="upline"]').val();
            that.registration(upline, function (err, tx) {
              if (!tx) {
                return;
              }
              that.ga(0, 1, MATRIX_PRICE, tx, {
                upline: upline
              });
              setTimeout(function () {
                document.location = '/auth/status/' + tx + '/';
              }, 2500);
            });
          });
        } else {
          if (++i > 15) {
            clearInterval(repeat);
            btnLoad.remove();
            btn.removeClass('disabled');
            btn.addClass('bg-danger');
            btn.click(function () {
              if (config.isMobile) {
                $('#popup-tron').addClass('popup_show');
              } else {
                $('#popup-tron').addClass('popup_show');
              }
            });
          }
        }
      }, 500); // Показать ссылку для перехода на главную страницу
    }
  }, {
    key: "pageRegXGold",
    value: function pageRegXGold() {
      var that = this;
      var i = 0;
      var btn = $('.registration-xGold__available');
      var btnLoad = $('.registration-xGold__load'); // Регистрация

      var repeat = setInterval(function () {
        if (window.tronWeb) {
          btnLoad.remove();
          btn.removeClass('disabled');
          clearInterval(repeat);
          btn.click(function () {
            var upline = $('input[name="upline"]').val();
            that.registrationXGold(function (err, tx) {
              if (err) {
                that.notify.success(err, false);
                return;
              }
              that.ga(3, 1, MATRIX_PRICE, tx, {
                upline: upline
              });
              that.notify.success('confirmRegistration');
              setTimeout(function () {
                  var userAddress = _get(_getPrototypeOf(Contract.prototype), "getConfig", this).addressBase58;
                  setCookie(
                    COOKIE_AUTH_NAME, 
                    userAddress
                  );
                  document.location = '/';
              }, 2500);
            });
          });
        } else {
          if (++i > 15) {
            clearInterval(repeat);
            btnLoad.remove();
            btn.removeClass('disabled');
            btn.addClass('bg-danger');
            btn.click(function () {
              if (config.isMobile) {
                $('#popup-tron').addClass('popup_show');
              } else {
                $('#popup-tron').addClass('popup_show');
              }
            });
          }
        }
      }, 500); // Показать ссылку для перехода на главную страницу
    }
  }, {
    key: "pageAuth",
    value: function pageAuth() {
      var that = this;
      var i = 0;
      var btn = $('.auth-sign__btn');
      var btnLoad = $('.auth-sign__btn-load');
      var repeat = setInterval(function () {
        if (window.tronWeb) {
          btnLoad.remove();
          btn.removeClass('disabled');
          clearInterval(repeat);
          btn.click(function () {
            that.autoLogin(function (isUserExists, userAddress) {
              if (!isUserExists) {
                $('#address').val(userAddress);
                $('#auth-form').submit();
              }
            });
          });
        } else {
          if (++i > 15) {
            clearInterval(repeat);
            btnLoad.remove();
            btn.removeClass('disabled');
            btn.addClass('bg-danger');
            btn.click(function () {
              if (config.isMobile) {
                $('#popup-tron').addClass('popup_show');
              } else {
                $('#popup-tron').addClass('popup_show');
              }
            });
          }
        }
      }, 500);
    }
  }, {
    key: 'upgrade',
    value: function(matrix, level, price) {
      var that = this;

      that.buyLevel(matrix, level, price, function (tx) {
          if(tx) {
            that.ga(matrix, level, price, tx, {
              upline: null,
            });
            var repeat = setInterval(function () {
              that.getTransaction(tx, function (info) {
                if(!info.isSuccess) {
                  return false;
                }
                // Синхронизация с сервером форсаж
                $.get('/service/tx/' + info.tx + '/?type=upgrade', function (data) {
                  if(data.length == 0) {
                    console.log(data, info.tx);
                    return false;
                  }
                  // Ожидании синхронизации с сервером 
                  if(!data.id) {
                  } else {
                    setTimeout(function () {
                        document.location.reload();
                    }, 2000);
                    clearInterval(repeat);
                  }
                });
              });
            }, 1500);
          }
      });
    }
  }, {
    key: 'upgradeXGold',
    value: function(level, price) {
      var that = this;
      that.buyLevelXGold(level, price, function (tx) {
          if(!tx) {
            that.notify.warning('errorSendingTransaction');
          }
          that.ga(3, level, price, tx, {
            upline: null,
          });
          var el = $('[data-upgrade_level="' + level +'"] .upgrade-status__spinner');
          el.show();
          var repeat = setInterval(function () {
            if(tx == 'undefined') {
              return;
            }
            // Синхронизация с сервером форсаж
            $.get('/service/tx/' + tx + '/?type=upgradeXGold', function (data) {
              if(data.length == 0) {
                return false;
              }
              // Ожидании синхронизации с сервером 
              if(data.id) {
                el.hide();
                document.location.reload();
                clearInterval(repeat);
              }
            });
        }, 1500);
      });
    }
  }, {
    key: 'isActiveXGoldLevel',
    value: function(userAddress, level, callback) {
      var that = this;
      that.usersActiveX6Levels(userAddress, level).then(result => {
        callback(false, result);
      } , error => {
        callback(true, error);
      });
    }
  }, {
    key: 'gaAssociationTransactionHash',
    value: function (tx) {
      var that = this;
      var cid = cookie('cid');
      $.ajax({
        url: '/ajax/ga/',
        type: 'POST',
        cache: false,
        async: true,
        dataType: 'json',
        data: {
          cid: cid,
          tx: tx
        },
        success: function success(val, status) {
          // if (val.status == 'success') {
            // console.log('gaAssociationTransactionHash: ', val);
          // }
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          console.log('Error Ajax request: ' + jqXHR.responseText, jqXHR);
        }
      });
    }
  }, {
    key: 'ga',
    value: function (matrix, level, price, tx, params) {
      var that = this;
      if(typeof ga !== 'function') {
        return false;
      }
      if(!params) {
        params = {};
      }
      if(!params.upline) {
        params.upline = {};
      }

      var coinName = 'TRX';

      var uplineId = '';
      if(params.upline === null) {
        if(config && config.user && config.user.referrerId) {
          params.upline = config.user.referrerId;
        }
      }

      var matrixTitle = '';
      switch(matrix) {
        case 0:
          matrixTitle = 'X3X4';
          break;
        case 1:
          matrixTitle = 'X3';
          break;
        case 2:
          matrixTitle = 'X4';
          break;
        case 3:
          matrixTitle = 'XGold';
          break;
        default:
          matrixTitle = 'MT';
          break;
      }

      var eventName = '';
      var eventType = '';
      if(price == 0) {
        eventName = 'REACTIVATION';
      } else {
        if(matrix == 3 && price == MATRIX_PRICE) {
          eventName = 'REGISTRATION';
          eventType = 'REG';
        } else if(matrix == 0) {
          eventName = 'REGISTRATION';
          eventType = 'REG';
        } else {
          eventName = 'UPGRADE';
          eventType = 'BUY';
        }
      }

      var userId = '?';
      if(typeof config.user.id !== "undefined") {
          userId = config.user.id;
      }

      ga('create',  'UA-171694820-1', 'auto');
      ga('require', 'ec');
      // ga('set',     '&uid', userId);
      // ga('set',     'dimension2', userId);
      ga('set',     'currencyCode', 'USD');
      ga('set',     'nonInteraction', true);
      ga('ec:addProduct', {
        id        : `${matrixTitle}_${level}_${coinName}`,
        name      : `${eventType}_${matrixTitle}_${level}_${coinName}`,
        category  : eventName,
        brand     : coinName,
        variant   : coinName,
        price     : price,
        quantity  : 1
      });
      ga('ec:setAction', 'purchase', {
        id            : tx,
        affiliation   : params.upline,
        revenue       : price,
      });
      ga('send', {
        hitType         : 'event',
        eventCategory   : eventName,
        eventAction     : `${matrixTitle}_${level}_${coinName}`,
        eventLabel      : coinName
      });

      // Yandex Analytics
      dataLayer.push({
        "ecommerce": {
          "purchase": {
              "actionField": {
                "id" : `TRX${userId}`
              },
              "products": [
                {
                  "id": `ID${userId}`,
                  "name": `${eventType}_${matrixTitle}_${level}_${coinName}`,
                  "price": price,
                  "brand": coinName,
                  "variant": coinName,
                  "category": eventName,
                  "quantity": 1
                },
              ]
            }
          }
      });
      return true;
    }
  }
  ]);

  return Contract;
}(Tron);

// (new Contract).getTransaction('', function(a) {console.log(':', a)})