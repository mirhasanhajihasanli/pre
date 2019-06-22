angular.module("primeapps").factory("HelpService",["$http","config","$filter","$rootScope",function(e,t,l,r){return{create:function(l){return e.post(t.apiUrl+"help/create",l)},update:function(l){return e.put(t.apiUrl+"help/update/"+l.id,l)},"delete":function(l){return e["delete"](t.apiUrl+"help/delete/"+l)},getAll:function(l){return e.get(t.apiUrl+"help/get_all?modalType="+l)},getById:function(l){return e.get(t.apiUrl+"help/get/"+l)},getByType:function(l,r,n){return r=r?r:null,n=n?n:null,e.get(t.apiUrl+"help/get_by_type?templateType="+l+"&moduleId="+r+"&route="+n)},getModuleType:function(l,r,n){return n=n?n:null,e.get(t.apiUrl+"help/get_module_type?templateType="+l+"&moduleType="+r+"&moduleId="+n)},getCustomHelp:function(l,r){return e.get(t.apiUrl+"help/get_custom_help?templateType="+l+"&customhelp="+r)},process:function(e,t,n,u){for(var p=[],i=0;i<e.length;i++){var a=e[i];if(a.binding="",a.module_id){var o=l("filter")(t,{id:a.module_id},!0)[0],d=l("filter")(u,{Name:a.module_type},!0)[0];a.binding=(o?o["label_"+r.language+"_singular"]+" (":"")+(d?d.Label+")":"")}else if(a.route_url){var g=l("filter")(n,{value:a.route_url},!0)[0];g&&(a.binding=g.name)}else a.binding=l("translate")("Setup.HelpGuide.Independent");p.push(a)}return p}}}]);