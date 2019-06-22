"use strict";angular.module("primeapps").controller("QuoteProductsController",["$rootScope","$scope","$state","config","ngToast","$localStorage","$filter","ngTableParams","$stateParams","helper","QuoteProductsService","ModuleService","$popover",function(r,e,t,n,c,a,u,o,p,d,i,l){if("quotes"==e.$parent.$parent.type){if(e.isMobile=!1,("undefined"!=typeof window.orientation||window.innerWidth<=500)&&(e.isMobile=!0),e.quoteProductModule=u("filter")(r.modules,{name:"quote_products"},!0)[0],!e.quoteProductModule)return c.create({content:u("translate")("Common.NotFound"),className:"warning"}),void t.go("app.dashboard");e.fields=[],e.quoteProductModule.fields.forEach(function(r){e.fields[r.name]=r}),e.quoteFields=[],e.quoteModule=u("filter")(r.modules,{name:"quotes"},!0)[0],e.quoteModule.fields.forEach(function(r){e.quoteFields[r.name]=r}),e.productField=u("filter")(e.quoteProductModule.fields,{name:"product"},!0)[0],e.productModule=u("filter")(r.modules,{name:"products"},!0)[0],e.productField.lookupModulePrimaryField=u("filter")(e.productModule.fields,{name:"name"},!0)[0],e.productFields=[],angular.forEach(e.productModule.fields,function(r){e.productFields[r.name]=r}),l.getPicklists(e.quoteProductModule).then(function(t){e.picklistsModule=t,e.usageUnitList=e.picklistsModule[e.fields.usage_unit.picklist_id],e.currencyList=e.picklistsModule[e.fields.currency.picklist_id],e.defaultCurrency=u("filter")(e.currencyList,{value:r.currencySymbol})[0]}),l.getPicklists(e.productModule).then(function(r){e.productModulePicklists=r}),e.setCurrentLookupProduct=function(r,t){e.currentLookupProduct=r,e.productSelected=!0,t.special_type="quate_products",t.currentproduct=r,t.selectProduct=e.selectProduct,(t.currentproduct.defaultCurrency||t.currentproduct.currencyConvertList)&&(delete t.currentproduct.defaultCurrency,delete t.currentproduct.currencyConvertList),e.$parent.setCurrentLookupField(t)};var s=["unit_price","usage_unit","vat_percent"];e.fields.purchase_price&&s.push("purchase_price"),e.fields.currency&&s.push("currency"),e.lookup=function(r){return l.lookup(r,e.productField,e.currentLookupProduct,s)},e.addQuoteProduct=function(r){var t={};t.id=0,t.discount_type="percent",r&&(t.separator="",t.product={});var n=[];angular.forEach(e.$parent.$parent.quoteProducts,function(r){n.push(r.order)}),t.order=Math.max.apply(null,n)+1,(!t.order||t.order<1)&&(t.order=1),e.$parent.$parent.quoteProducts.push(t)},e.currencyConvert=function(r,t){var n=[];switch(r.defaultCurrency){case"₺":n.$=t*e.$parent.$parent.record.exchange_rate_usd_try,n["€"]=t*e.$parent.$parent.record.exchange_rate_eur_try,n["₺"]=t;break;case"$":n["₺"]=t*e.$parent.$parent.record.exchange_rate_try_usd,n["€"]=t*e.$parent.$parent.record.exchange_rate_eur_usd,n.$=t;break;case"€":n["₺"]=t*e.$parent.$parent.record.exchange_rate_try_eur,n.$=t*e.$parent.$parent.record.exchange_rate_usd_eur,n["€"]=t}return n},e.setVat=function(r){void 0!=r.product.vat_percent&&(r.vat_percent=r.product.vat_percent)},e.selectProduct=function(t){if(t.product){t.defaultCurrency?t.product.unit_price=t.currencyConvertList[t.product.currency?t.product.currency.value:r.currencySymbol]:(t.defaultCurrency=t.product.currency?t.product.currency.value:r.currencySymbol,t.currencyConvertList=e.currencyConvert(t,t.product.unit_price));var n=parseFloat(t.product.unit_price);t.quantity||(t.quantity=1),t.unit_price=n,t.amount=n,t.product.usage_unit&&(angular.isObject(t.product.usage_unit)?t.usage_unit=t.product.usage_unit:e.usageUnitList.forEach(function(r){t.product.usage_unit===r.labelStr&&(t.product.usage_unit=r)})),t.product.currency?t.currency=t.product.currency:(t.currency=e.defaultCurrency,t.product.currency=e.defaultCurrency),e.calculate(t)}},e.$parent.$parent.id||(e.$parent.$parent.record.total=0,e.$parent.$parent.record.vat_total=0,e.$parent.$parent.record.grand_total=0,e.$parent.$parent.record.discount_type="percent"),e.$parent.$parent.isDetail&&(e.readonly=!0),e.calculate=function(t){var n=0,c=0;switch(isNaN(t.quantity)||(n=angular.copy(t.quantity)),isNaN(t.unit_price)||(c=angular.copy(t.unit_price)),e.fields.no&&(t.no=0),t.amount=n*c,t.discount_type){case"percent":e.$parent.$parent.record.contact&&e.$parent.$parent.record.contact.discount&&void 0===t.discount_percent&&null!==t.discount_percent&&(t.discount_percent=angular.isObject(e.$parent.$parent.record.contact.discount)?e.$parent.$parent.record.contact.discount.value:e.$parent.$parent.record.contact.discount),e.$parent.$parent.record.account&&e.$parent.$parent.record.account.discount&&void 0===t.discount_percent&&null!==t.discount_percent&&(t.discount_percent=angular.isObject(e.$parent.$parent.record.account.discount)?e.$parent.$parent.record.account.discount.value:e.$parent.$parent.record.account.discount),void 0==t.discount_percent||null==t.discount_percent||isNaN(t.discount_percent)||(t.discount_percent<0&&(t.discount_percent=0),t.discount_percent>100&&(t.discount_percent=100),t.amount-=t.amount*t.discount_percent/100),t.discount_amount=c*n*t.discount_percent/100,e.fields.unit_amount&&(t.unit_amount=t.amount/n);break;case"amount":void 0==t.discount_amount||null==t.discount_amount||isNaN(t.discount_amount)||(t.discount_amount>t.unit_price,t.amount-=t.discount_amount,t.discount_percent=100/(c*n)*t.discount_amount),e.fields.unit_amount&&(t.unit_amount=t.amount/n)}e.fields.purchase_price&&(t.purchase_price=!t.product.purchase_price||void 0!==t.purchase_price&&null!==t.purchase_price?e.currencyConvert(t,t.product.purchase_price)[t.product.currency?t.product.currency.value:r.currencySymbol]:e.currencyConvert(t,t.product.purchase_price)[t.product.currency.value]),(void 0!=t.purchase_price||null!=t.purchase_price)&&(t.profit_amount=t.amount-t.purchase_price*n,t.profit_percent=(t.amount-n*t.purchase_price)/(n*t.purchase_price)*100);var a=parseFloat(t.product.vat_percent||0);t.vat=t.amount*a/100,e.calculateAll()},e.calculateAll=function(){var r=0,t=0,n=0,c=[];e.$parent.$parent.currencyField&&e.$parent.$parent.record.currency&&(e.$parent.$parent.currencyField.validation||(e.$parent.$parent.currencyField.validation={}),e.$parent.$parent.currencyField.validation.readonly=!0);var a=0;if(angular.forEach(e.$parent.$parent.quoteProducts,function(n){if(n.amount&&!n.deleted){a++,n.quantity<0&&(n.quantity=0),n.unit_price<0&&(n.unit_price=0),n.unit_price>1e12&&(n.unit_price=1e12);var o=angular.copy(n.amount),p=angular.copy(n.vat)||0;if(n.product.currency&&e.$parent.$parent.record.currency&&n.product.currency.value&&e.$parent.$parent.record.currency.value&&n.product.currency.value!=e.$parent.$parent.record.currency.value)switch(e.$parent.$parent.record.currency.value){case"₺":"$"===n.product.currency.value?(o*=e.$parent.$parent.record.exchange_rate_try_usd,p*=e.$parent.$parent.record.exchange_rate_try_usd):"€"===n.product.currency.value&&(o*=e.$parent.$parent.record.exchange_rate_try_eur,p*=e.$parent.$parent.record.exchange_rate_try_eur);break;case"$":"₺"===n.product.currency.value?(o*=e.$parent.$parent.record.exchange_rate_usd_try,p*=e.$parent.$parent.record.exchange_rate_usd_try):"€"===n.product.currency.value&&(o*=e.$parent.$parent.record.exchange_rate_usd_eur,p*=e.$parent.$parent.record.exchange_rate_usd_eur);break;case"€":"₺"===n.product.currency.value?(o*=e.$parent.$parent.record.exchange_rate_eur_try,p*=e.$parent.$parent.record.exchange_rate_eur_try):"$"===n.product.currency.value&&(o*=e.$parent.$parent.record.exchange_rate_eur_usd,p*=e.$parent.$parent.record.exchange_rate_eur_usd)}r+=o,t+=p;var d=u("filter")(c,{percent:n.product.vat_percent},!0)[0];d?d.total+=p||0:(d={},d.percent=parseFloat(n.product.vat_percent||0),d.total=p,p&&c.push(d))}}),e.$parent.$parent.currencyField&&e.$parent.$parent.record.currency&&1>a&&(e.$parent.$parent.currencyField.validation||(e.$parent.$parent.currencyField.validation={}),e.$parent.$parent.currencyField.validation.readonly=!1),e.$parent.$parent.record.discount_percent||e.$parent.$parent.record.discount_amount)switch(e.$parent.$parent.record.discount_type){case"percent":void 0==e.$parent.$parent.record.discount_percent||null==e.$parent.$parent.record.discount_percent||isNaN(e.$parent.$parent.record.discount_percent)||(e.$parent.$parent.record.discount_percent>100&&(e.$parent.$parent.record.discount_percent=100),n=r*e.$parent.$parent.record.discount_percent/100,t-=t*e.$parent.$parent.record.discount_percent/100,angular.forEach(c,function(r){r.total-=r.total*e.$parent.$parent.record.discount_percent/100})),e.$parent.$parent.record.discount_amount=null;break;case"amount":if(void 0!=e.$parent.$parent.record.discount_amount&&null!=e.$parent.$parent.record.discount_amount&&!isNaN(e.$parent.$parent.record.discount_amount)){n=e.$parent.$parent.record.discount_amount;var o=100*e.$parent.$parent.record.discount_amount/r;t-=t*o/100,angular.forEach(c,function(r){r.total-=r.total*o/100})}e.$parent.$parent.record.discount_percent=null}e.$parent.$parent.record.total=r,e.$parent.$parent.record.discounted_total=n?r-n:void 0,e.$parent.$parent.record.vat_total=t,e.$parent.$parent.record.grand_total=r-n+t,e.$parent.$parent.record.vat_list=e.prepareVatList(c),e.$parent.$parent.vatList=c},e["delete"]=function(r){r.deleted=!0,e.calculateAll()},e.prepareVatList=function(r){if(r){var e="";return angular.forEach(r,function(r){e+=r.percent+";"+r.total+"|"}),e.slice(0,-1)}},e.up=function(r,t){var n=u("filter")(e.$parent.$parent.quoteProducts,{deleted:!1});n=u("orderBy")(e.$parent.$parent.quoteProducts,"order");var c=angular.copy(n[r-1]);n[r].order=c.order,n[r-1].order=angular.copy(t)},e.down=function(r,t){var n=u("filter")(e.$parent.$parent.quoteProducts,{deleted:!1});n=u("orderBy")(e.$parent.$parent.quoteProducts,"order");var c=angular.copy(n[r+1]);n[r].order=c.order,n[r+1].order=angular.copy(t)},e.productInfo=function(r){e.currentProduct=r}}}]);