"use strict";angular.module("primeapps").factory("UserService",["$http","config",function(e,r){return{getUsers:function(e,r,i){var n=[];return angular.forEach(e,function(e){var t=e;angular.forEach(r,function(r){r.user_ids.indexOf(e.id)>-1&&(t.profile=r)}),angular.forEach(i,function(r){r.users.indexOf(e.id)>-1&&(t.role=r)}),n.push(t)}),n},getAllUser:function(){return e.get(r.apiUrl+"User/get_users")},sendPasswordToOfficeUser:function(i){return e.post(r.apiUrl+"messaging/send_external_email",i)},addUser:function(i){return e.post(r.apiUrl+"User/add_user",i)},getOfficeUsers:function(){return e.get(r.apiUrl+"User/get_office_users")},isAvailableToInvite:function(i,n){return e.post(r.apiUrl+"User/IsAvailableToInvite",{EMail:i,InstanceID:n})},updateActiveDirectoryEmail:function(i,n){return e.get(r.apiUrl+"User/UpdateActiveDirectoryEmail?UserId="+i+"&Email="+n)},invite:function(i,n,t,s,a,u){return e.post(r.apiUrl+"Instance/Invite",{EMail:i,InstanceID:n,ProfileID:t,RoleID:s,Culture:a,CreatedBy:u})},dismiss:function(i,n){return e.post(r.apiUrl+"Instance/Dismiss",{user_id:i.id,email:i.email,has_account:i.has_account,instance_id:n})}}}]);