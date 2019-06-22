"use strict";angular.module("primeapps").controller("LeadConvertMapController",["$rootScope","$scope","$filter","$cache","helper","ConvertMapService","ngToast",function(e,i,d,t,o,l,n){i.$parent.collapsed=!0,i.language=e.language,i.leadModule=d("filter")(e.modules,{name:"leads"},!0)[0],i.contactModule=d("filter")(e.modules,{name:"contacts"},!0)[0],i.opportunityModule=d("filter")(e.modules,{name:"opportunities"},!0)[0],i.accountModule=d("filter")(e.modules,{name:"accounts"},!0)[0];var a=function(){var e=i.leadModule.id;l.getMappings(e).then(function(e){i.accountModule.selectedFields={},i.contactModule.selectedFields={},i.opportunityModule.selectedFields={},angular.forEach(e.data,function(e){var t=d("filter")(i.accountModule.fields,{id:e.mapping_field_id},!0,i.accountModule,{id:e.mapping_module_id},!0)[0],o=d("filter")(i.contactModule.fields,{id:e.mapping_field_id},!0,i.contactModule,{id:e.mapping_module_id},!0)[0],l=d("filter")(i.opportunityModule.fields,{id:e.mapping_field_id},!0,i.opportunityModule,{id:e.mapping_module_id},!0)[0];t?i.accountModule.selectedFields[e.field_id]=t:o?i.contactModule.selectedFields[e.field_id]=o:l&&(i.opportunityModule.selectedFields[e.field_id]=l)})})["catch"](function(){n.create({content:d("translate")("Common.Error"),className:"danger"})})};a(),i.customFilter=function(e){return function(i){return"lookup"===i.data_type&&"lookup"===e.data_type?i.lookup_type===e.lookup_type?!0:!1:"picklist"===i.data_type&&"picklist"===e.data_type?i.picklist_id===e.picklist_id?!0:!1:!0}},i.mappingModuleFieldChanged=function(e,t,o){var a={};if(a.module_id=i.leadModule.id,a.mapping_module_id=e.id,a.field_id=t.id,a.mapping_field_id=null,e.selectedFields[t.id]){var c=e.selectedFields[t.id];a.mapping_field_id=c.id,l.createMapping(a).then(function(){i.showSuccessIcon={},i.showSuccessIcon[t.id]={},i.showSuccessIcon[t.id][e.id]=!0})["catch"](function(){n.create({content:d("translate")("Common.Error"),className:"danger"})})}else a.mapping_field_id=o.id,l.deleteMapping(a).then(function(){i.showSuccessIcon={},i.showSuccessIcon[t.id]=!0})["catch"](function(){n.create({content:d("translate")("Common.Error"),className:"danger"})})}}]);