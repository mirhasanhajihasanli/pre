"use strict";angular.module("primeapps").controller("SingleSMSController",["$rootScope","$scope","ngToast","$filter","helper","$location","$state","$stateParams","$q","$window","$localStorage","$cache","config","ModuleService",function(e,t,n,a,r,l,o,s,c,i,S,d,u,p){function $(e){switch(!1){case null==e.match(f):return T;case null==e.match(x):return E;default:return I}}function M(e){var t,n;return n=function(){var n,a,r;for(r=[],n=0,a=e.length;a>n;n++)t=e[n],null!=t.match(v)&&r.push(t);return r}.call(this),n.length}function m(e){if(t.txtSMS){t.txtSMS=t.txtSMS.replace(/(\r\n|\n|\r)/gm," ");var n,a,r,l;return n=$(e),a=e.length,n===E&&(a+=M(e)),l=_[n],a>l&&(l=F[n]),r=Math.ceil(a/l)}}var g="@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\\\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà",h="\\^{}\\\\\\[~\\]|€",f=RegExp("^["+g+"]*$"),x=RegExp("^["+g+h+"]*$"),v=RegExp("^[\\"+h+"]*$"),T="GSM_7BIT",E="GSM_7BIT_EX",I="UTF16",_={GSM_7BIT:160,GSM_7BIT_EX:160,UTF16:70},F={GSM_7BIT:153,GSM_7BIT_EX:153,UTF16:67};t.loadingModal=!1,t.txtSMS="",t.totalSMS=0,t.addCustomField=function(e,n){t.txtSMS+="{"+n.name+"}"},t.calculateSMS=function(){t.totalSMS=m(t.txtSMS)},t.filterKey=function(e){var t=new RegExp("^[^\n\r]*$"),n=String.fromCharCode(e.which),a=angular.element(e.srcElement).val();t.test(n)&&t.test(a)||event.preventDefault()},t.phoneField=a("filter")(t.$parent.$parent.allFields,{name:"mobile"})[0],t.submitSMS=function(){t.smsModalForm.$valid&&(t.selectedIds=[],t.selectedIds.push(t.$parent.$parent.record.id),t.submittingModal=!0,p.sendSMS(t.$parent.$parent.module.id,t.selectedIds,angular.toJson(t.$parent.$parent.findRequest),t.$parent.$parent.isAllSelected,t.txtSMS.replace(/(\r\n|\n|\r)/gm," "),t.phoneField.name).then(function(){t.submittingModal=!1,t.smsModal.hide(),t.$parent.$parent.isAllSelected=!1,t.$parent.$parent.selectedRows=[],n.create({content:a("translate")("SMS.MessageQueued"),className:"success"})})["catch"](function(){t.submittingModal=!1,t.smsModal.hide(),t.$parent.$parent.isAllSelected=!1,t.$parent.$parent.selectedRows=[],n.create({content:a("translate")("Common.Error"),className:"danger"})}))}}]);