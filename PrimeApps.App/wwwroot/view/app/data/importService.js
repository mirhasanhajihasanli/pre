"use strict";angular.module("primeapps").factory("ImportService",["$http","$filter","config",function(t,p,r){return{getLookupIds:function(p){return t.post(r.apiUrl+"record/get_lookup_ids",p)},"import":function(p,a){return t.post(r.apiUrl+"data/import/"+a,p)},getMapping:function(p){return t.post(r.apiUrl+"data/import_get_mapping",p)},getAllMapping:function(p){return t.get(r.apiUrl+"data/import_get_all_mappings/"+p)},saveMapping:function(p){return t.post(r.apiUrl+"data/import_mapping_save",p)},updateMapping:function(p,a){return t.post(r.apiUrl+"data/import_mapping_update/"+p,a)},deleteMapping:function(p){return t.post(r.apiUrl+"data/import_mapping_delete",p)}}}]);