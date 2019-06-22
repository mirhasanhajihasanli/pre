"use strict";angular.module("primeapps").factory("WorkflowService",["$rootScope","$http","config","$filter","operators","helper","ModuleService",function(e,a,t,i,l,n,o){return{get:function(e){return a.get(t.apiUrl+"workflow/get/"+e)},getAll:function(){return a.get(t.apiUrl+"workflow/get_all")},create:function(e){return a.post(t.apiUrl+"workflow/create",e)},update:function(e){return a.put(t.apiUrl+"workflow/update/"+e.id,e)},"delete":function(e){return a["delete"](t.apiUrl+"workflow/delete/"+e)},process:function(a){return angular.forEach(a,function(a){var t=i("filter")(e.modules,{id:a.module_id},!0)[0];if(t){a.moduleStr=t["label_"+e.language+"_singular"],a.statusStr=i("translate")(a.active?"Common.Yes":"Common.No"),a.operationsStr="";var l=a.operations.split(",");angular.forEach(l,function(e){a.operationsStr+=i("translate")("Setup.Workflow.RuleTriggers."+e)+", "}),a.operationsStr=a.operationsStr.slice(0,-2)}}),a},getScheduleItems:function(){var e=[],a={};a.label=i("translate")("Setup.Workflow.ScheduleItem0"),a.value="now",e.push(a);var t={};t.label=i("translate")("Setup.Workflow.ScheduleItem1"),t.value=1,e.push(t);for(var l=2;181>l;l++){var n={};n.label=i("translate")("Setup.Workflow.ScheduleItemMany",{day:l}),n.value=l,e.push(n)}return e},getDueDateItems:function(){var e=[],a={};a.label=i("translate")("Setup.Workflow.DueDateItem0"),a.value="now",e.push(a);var t={};t.label=i("translate")("Setup.Workflow.DueDateItem1"),t.value=1,e.push(t);for(var l=2;31>l;l++){var n={};n.label=i("translate")("Setup.Workflow.DueDateItemMany",{day:l}),n.value=l,e.push(n)}return e},getFields:function(a){var t=angular.copy(a.fields),l=[];t=i("filter")(t,{display_list:!0,lookup_type:"!relation"},!0);var n={};n.name="seperator-main",n.label="tr"===e.language?a.label_tr_singular:a.label_en_singular,n.order=0,n.seperator=!0,t.push(n);var d=0;return angular.forEach(t,function(a){if("lookup"===a.data_type&&"relation"!=a.lookup_type){var l=angular.copy(i("filter")(e.modules,{name:a.lookup_type},!0)[0]);if(d+=100,null===l||void 0===l)return;var n={};n.name="seperator-"+l.name,n.order=d,n.seperator=!0,n.label="tr"===e.language?l.label_tr_singular+" ("+a.label_tr+")":l.label_en_singular+" ("+a.label_en+")",t.push(n);var o=angular.copy(l.fields);o=i("filter")(o,{display_list:!0},!0),angular.forEach(o,function(i){"lookup"!==i.data_type&&(i.label="tr"===e.language?i.label_tr:i.label_en,i.labelExt="("+a.label+")",i.name=a.name+"."+i.name,i.order=parseInt(i.order)+d,i.parent_type=a.lookup_type,t.push(i))})}}),angular.forEach(t,function(e){if(!e.deleted&&o.hasFieldDisplayPermission(e)&&e.name&&"lookup"!=e.data_type){var a={};a.name=e.name,a.label=e.label,a.labelExt=e.labelExt,a.order=e.order,a.lookup_type=e.lookup_type,a.seperator=e.seperator,a.multiline_type=e.multiline_type,a.data_type=e.data_type,a.parent_type=e.parent_type,l.push(a)}}),l=i("orderBy")(l,"order")},processWorkflow:function(a,t,n,d,s,u,r,c,m,f,_){var p={};if(p.id=a.id,p.created_by=a.created_by,p.updated_by=a.updated_by,p.created_at=a.created_at,p.updated_at=a.updated_at,p.deleted=a.deleted,p.name=a.name,p.module=t,p.active=a.active,p.delete_logs=a.delete_logs,p.processFilter=a.process_filter,p.frequency=a.frequency||"one_time",a.changed_field&&(p.changed_field_checkbox=!0,p.changed_field=i("filter")(t.fields,{name:a.changed_field},!0)[0]),p.operation={},angular.forEach(a.operations_array,function(e){p.operation[e]=!0}),a.filters){a.filters=i("orderBy")(a.filters,"no");for(var k=0;k<a.filters.length;k++){var g=a.filters[k],v=i("filter")(p.module.fields,{name:g.field},!0)[0],y=null;if(!v)return;switch(v.data_type){case"picklist":y=i("filter")(n[v.picklist_id],{labelStr:g.value},!0)[0];break;case"multiselect":var b=g.value.split("|");y=[],angular.forEach(b,function(e){var a=i("filter")(n[v.picklist_id],{labelStr:e},!0)[0];a&&y.push(a)});break;case"tag":var h=g.value.split("|");y=[],angular.forEach(h,function(e){y.push(e)});break;case"lookup":"users"===v.lookup_type?(y=null,g.valueState=angular.copy(g.value)):y=g.value;break;case"checkbox":y=i("filter")(n.yes_no,{system_code:g.value})[0];break;default:y=g.value}g.field=v,g.operator=l[g.operator],g.value=y,"lookup"===v.data_type&&(v.operators=[],v.operators.push(l.equals),v.operators.push(l.not_equal),v.operators.push(l.empty),v.operators.push(l.not_empty)),d[k]=g}}if(a.send_notification&&(p.send_notification={},p.send_notification.subject=a.send_notification.subject,p.send_notification.message=a.send_notification.message,p.send_notification.recipients=[],p.send_notification.cc=[],p.send_notification.bcc=[],a.send_notification.recipients_array&&angular.forEach(a.send_notification.recipients_array,function(t){var l={};if("[owner]"===t){var n={};n.module=i("filter")(e.modules,{name:"users"},!0)[0],n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!1,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_module=n,l.id=0,l.email="[owner]",l.full_name=i("translate")("Common.RecordOwner"),p.send_notification.recipients.push(l)}else{var n={};if(t.indexOf("@")>-1){n.module=i("filter")(e.modules,{name:"users"},!0)[0],n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!1,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_module=n;var o=i("filter")(a.send_notification.recipient_list,{email:t},!0)[0];l.id=o.id,l.email=o.email,l.full_name=o.full_name,p.send_notification.recipients.push(l)}else if(t.indexOf(".")>-1){var d=t.split("."),s=i("filter")(p.module.fields,{name:d[0]},!0)[0],u=i("filter")(e.modules,{name:s.lookup_type},!0)[0],r=i("filter")(f,{systemName:d[0]},!0)[0];n.module=u,n.name=s["label_"+e.language]+" ("+n.module["label_"+e.language+"_singular"]+")",n.isSameModule=r.isSameModule,n.systemName=d[0],n.id=r.id,p.send_notification_module=n,p.send_notification.customRecipient=i("filter")(u.fields,{name:d[1]},!0)[0]}else n.module=a.module,n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!0,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_module=n,p.send_notification.customRecipient=i("filter")(a.module.fields,{name:t},!0)[0]}}),a.send_notification.cc_array&&angular.forEach(a.send_notification.cc_array,function(t){var l={};if("[owner]"===t){var n={};n.module=i("filter")(e.modules,{name:"users"},!0)[0],n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!1,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_ccmodule=n,l.id=0,l.email="[owner]",l.full_name=i("translate")("Common.RecordOwner"),p.send_notification.cc.push(l)}else{var n={};if(t.indexOf("@")>-1){n.module=i("filter")(e.modules,{name:"users"},!0)[0],n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!1,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_ccmodule=n;var o=i("filter")(a.send_notification.cc_list,{email:t},!0)[0];l.id=o.id,l.email=o.email,l.full_name=o.full_name,p.send_notification.cc.push(l)}else if(t.indexOf(".")>-1){var d=t.split("."),s=i("filter")(p.module.fields,{name:d[0]},!0)[0],u=i("filter")(e.modules,{name:s.lookup_type},!0)[0],r=i("filter")(f,{systemName:d[0]},!0)[0];n.module=u,n.name=s["label_"+e.language]+" ("+n.module["label_"+e.language+"_singular"]+")",n.isSameModule=r.isSameModule,n.systemName=d[0],n.id=r.id,p.send_notification_ccmodule=n,p.send_notification.customCC=i("filter")(u.fields,{name:d[1]},!0)[0]}else n.module=a.module,n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!0,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_ccmodule=n,p.send_notification.customCC=i("filter")(a.module.fields,{name:t},!0)[0]}}),a.send_notification.bcc_array&&angular.forEach(a.send_notification.bcc_array,function(t){var l={};if("[owner]"===t){var n={};n.module=i("filter")(e.modules,{name:"users"},!0)[0],n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!1,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_bccmodule=n,l.id=0,l.email="[owner]",l.full_name=i("translate")("Common.RecordOwner"),p.send_notification.bcc.push(l)}else{var n={};if(t.indexOf("@")>-1){n.module=i("filter")(e.modules,{name:"users"},!0)[0],n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!1,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_bccmodule=n;var o=i("filter")(a.send_notification.bcc_list,{email:t},!0)[0];l.id=o.id,l.email=o.email,l.full_name=o.full_name,p.send_notification.bcc.push(l)}else if(t.indexOf(".")>-1){var d=t.split("."),s=i("filter")(p.module.fields,{name:d[0]},!0)[0],u=i("filter")(e.modules,{name:s.lookup_type},!0)[0],r=i("filter")(f,{systemName:d[0]},!0)[0];n.module=u,n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=r.isSameModule,n.systemName=r.systemName,n.id=r.id,p.send_notification_bccmodule=n,p.send_notification.customBcc=i("filter")(u.fields,{name:d[1]},!0)[0]}else n.module=a.module,n.name=n.module["label_"+e.language+"_singular"],n.isSameModule=!0,n.systemName=null,n.id=i("filter")(f,{name:n.name},!0)[0].id,p.send_notification_bccmodule=n,p.send_notification.customBcc=i("filter")(a.module.fields,{name:t},!0)[0]}}),null!=a.send_notification.schedule||void 0!=a.send_notification.schedule)){var w=angular.copy(a.send_notification.schedule);0===a.send_notification.schedule&&(w="now"),p.send_notification.schedule=i("filter")(s,{value:w},!0)[0]}if(a.create_task){p.create_task={},p.create_task.owner=[],p.create_task.subject=a.create_task.subject;var S=angular.copy(a.create_task.task_due_date);if(0===a.create_task.owner){var M={};M.id=0,M.email="[owner]",M.full_name=i("translate")("Common.RecordOwner"),p.create_task.owner.push(M)}else p.create_task.owner.push(a.create_task.owner_user);0===a.create_task.task_due_date&&(S="now"),p.create_task.task_due_date=i("filter")(u,{value:S},!0)[0],a.create_task.task_status&&(p.create_task.task_status=i("filter")(r[c.task_status.picklist_id],{id:a.create_task.task_status},!0)[0]),a.create_task.task_priority&&(p.create_task.task_priority=i("filter")(r[c.task_priority.picklist_id],{id:a.create_task.task_priority},!0)[0]),a.create_task.task_notification&&(p.create_task.task_notification=i("filter")(r.yes_no,{id:a.create_task.task_notification},!0)[0]),a.create_task.description&&(p.create_task.description=a.create_task.description)}if(a.field_update)if(p.field_update={},a.field_update.module.split(",").length>1){p.field_update.updateOption="2";var N=a.field_update.module.split(",")[0],E=a.field_update.module.split(",")[1],C={},x={};if(N===t.name)C.module=t,C.name=C.module["label_"+e.language+"_singular"],C.isSameModule=!0,C.systemName=N,C.id=i("filter")(f,{name:C.name},!0)[0].id;else{var O=i("filter")(p.module.fields,{name:N},!0)[0],D=i("filter")(e.modules,{name:O.lookup_type},!0)[0],R=i("filter")(_,{systemName:N},!0)[0];C.module=D,C.name=O["label_"+e.language]+" ("+C.module["label_"+e.language+"_singular"]+")",C.isSameModule=R.isSameModule,C.systemName=N,C.id=R.id}if(E===t.name)x.module=t,x.name=x.module["label_"+e.language+"_singular"],x.isSameModule=!0,x.systemName=E,x.id=i("filter")(f,{name:x.name},!0)[0].id;else{var W=i("filter")(p.module.fields,{name:E},!0)[0],I=i("filter")(e.modules,{name:W.lookup_type},!0)[0],j=i("filter")(_,{systemName:E},!0)[0];x.module=I,x.name=W["label_"+e.language]+" ("+x.module["label_"+e.language+"_singular"]+")",x.isSameModule=j.isSameModule,x.systemName=E,x.id=j.id}p.field_update.firstModule=C,p.field_update.first_field=i("filter")(C.module.fields,{name:a.field_update.value},!0)[0],p.field_update.secondModule=x,p.field_update.second_field=i("filter")(x.module.fields,{name:a.field_update.field},!0)[0]}else{if(p.field_update.updateOption="1",p.field_update.module=i("filter")(e.modules,{name:a.field_update.module},!0)[0],p.field_update.field=i("filter")(p.field_update.module.fields,{name:a.field_update.field},!0)[0],"multiselect"===p.field_update.field.data_type){var b=a.field_update.value.split("|");a.field_update.value=[],angular.forEach(b,function(e){var t=i("filter")(n[p.field_update.field.picklist_id],{labelStr:e},!0)[0];t&&a.field_update.value.push(t.labelStr)})}if("tag"===p.field_update.field.data_type){var B=a.field_update.value.split("|");a.field_update.value=[],angular.forEach(B,function(e){a.field_update.value.push(e)})}var H={};H[a.field_update.field]=a.field_update.value,o.processRecordField(H,p.field_update.field,m),p.field_update.value=H[a.field_update.field],"lookup"===p.field_update.field.data_type&&(p.field_update.value=a.field_update.value)}return a.web_hook&&(p.webHook={},p.webHook.callbackUrl=a.web_hook.callback_url,p.webHook.methodType=a.web_hook.method_type,p.webHook.parameters=a.web_hook.parameters),p},prepareWorkflow:function(e,a,t){var l={};if(l.module_id=e.module.id,l.name=e.name,l.frequency=e.frequency,l.active=e.active,l.delete_logs=e.delete_logs,l.process_filter=e.processFilter,l.changed_field=e.changed_field?e.changed_field.name:null,l.operations=[],angular.forEach(e.operation,function(e,a){e&&l.operations.push(a)}),a&&a.length&&(l.filters=[],angular.forEach(a,function(e){if(e.field&&e.operator&&("empty"===e.operator.name||"not_empty"===e.operator.name||null!=e.value&&void 0!=e.value)){var a=e.field,t={};if(t.field=a.name,t.operator=e.operator.name,t.value=e.value,t.no=e.no,"empty"!==e.operator.name&&"not_empty"!==e.operator.name){if(("date"===a.data_type||"date_time"===a.data_type||"time"===a.data_type)&&(t.value=new Date(t.value).getTime()),"picklist"===a.data_type&&(t.value=t.value.id),"multiselect"===a.data_type){var i="";angular.forEach(t.value,function(e){i+=e.id+","}),t.value=i.slice(0,-1)}if("tag"===a.data_type){var i="";angular.forEach(t.value,function(e){i+=e.text+","})}if("lookup"===a.data_type&&"users"!=a.lookup_type&&(t.value=t.value.id),"lookup"===a.data_type&&"users"===a.lookup_type&&(t.value=t.value[0].id),"checkbox"===a.data_type&&(t.value=t.value.system_code),"date"===a.data_type){if(void 0===t.value||null===t.value)return;t.value=new Date(t.value)}}else t.value="-";l.filters.push(t)}})),l.actions={},e.send_notification){var n={};if(n.subject=e.send_notification.subject,n.message=e.send_notification.message,n.cc=[],e.send_notification.cc)angular.forEach(e.send_notification.cc,function(e){n.cc.push(e.email)});else if(e.send_notification_ccmodule&&e.send_notification.customCC)if(e.send_notification_ccmodule.module.name===e.module.name&&e.send_notification_ccmodule.isSameModule)n.cc.push(e.send_notification.customCC.name);else if(e.send_notification_ccmodule.module.name!==e.module.name||e.send_notification_ccmodule.isSameModule){var o=i("filter")(e.module.fields,{lookup_type:e.send_notification_ccmodule.module.name},!0);n.cc.push(i("filter")(o,{name:e.send_notification_ccmodule.systemName},!0)[0].name+"."+e.send_notification.customCC.name)}else{var d=i("filter")(e.module.fields,{lookup_type:e.send_notification_ccmodule.module.name},!0);n.cc.push(i("filter")(d,{name:e.send_notification_ccmodule.systemName},!0)[0].name+"."+e.send_notification.customCC.name)}if(n.bcc=[],e.send_notification.bcc)angular.forEach(e.send_notification.bcc,function(e){n.bcc.push(e.email)});else if(e.send_notification_bccmodule&&e.send_notification.customBcc)if(e.send_notification_bccmodule.module.name===e.module.name&&e.send_notification_bccmodule.isSameModule)n.bcc.push(e.send_notification.customBcc.name);else if(e.send_notification_bccmodule.module.name!==e.module.name||e.send_notification_bccmodule.isSameModule){var s=i("filter")(e.module.fields,{lookup_type:e.send_notification_bccmodule.module.name},!0);n.bcc.push(i("filter")(s,{name:e.send_notification_bccmodule.systemName},!0)[0].name+"."+e.send_notification.customBcc.name)}else{var u=i("filter")(e.module.fields,{lookup_type:e.send_notification_bccmodule.module.name},!0);n.bcc.push(i("filter")(u,{name:e.send_notification_bccmodule.systemName},!0)[0].name+"."+e.send_notification.customBcc.name)}if(n.recipients=[],e.send_notification.recipients)angular.forEach(e.send_notification.recipients,function(e){n.recipients.push(e.email)});else if(e.send_notification_module.module.name===e.module.name&&e.send_notification_module.isSameModule)n.recipients.push(e.send_notification.customRecipient.name);else if(e.send_notification_module.module.name!==e.module.name||e.send_notification_module.isSameModule){var r=i("filter")(e.module.fields,{lookup_type:e.send_notification_module.module.name},!0);n.recipients.push(i("filter")(r,{name:e.send_notification_module.systemName},!0)[0].name+"."+e.send_notification.customRecipient.name)}else{var c=i("filter")(e.module.fields,{lookup_type:e.send_notification_module.module.name},!0);n.recipients.push(i("filter")(c,{name:e.send_notification_module.systemName},!0)[0].name+"."+e.send_notification.customRecipient.name)}e.send_notification.schedule&&(n.schedule="now"===e.send_notification.schedule.value?0:e.send_notification.schedule.value),l.actions.send_notification=n}if(e.create_task){var m={};m.owner=e.create_task.owner[0].id,m.subject=e.create_task.subject,m.task_due_date="now"===e.create_task.task_due_date.value?0:e.create_task.task_due_date.value,e.create_task.task_status&&(m.task_status=e.create_task.task_status.id),e.create_task.task_priority&&(m.task_priority=e.create_task.task_priority.id),e.create_task.task_notification&&(m.task_notification=e.create_task.task_notification.id),e.create_task.description&&(m.description=e.create_task.description),l.actions.create_task=m}if(e.field_update){var f={};"1"===e.field_update.updateOption?(f.module=e.field_update.module.name,f.field=e.field_update.field.name,f.value=t):(f.module=e.field_update.firstModule.systemName+","+e.field_update.secondModule.systemName,f.field=e.field_update.second_field.name,f.value=e.field_update.first_field.name),l.actions.field_update=f}if(e.webHook){var _={};_.callback_url=e.webHook.callbackUrl,_.method_type=e.webHook.methodType;var p=[];angular.forEach(e.webHook.hookParameters,function(a){var t;t=e.module.name!=a.selectedModule.name?i("filter")(e.module.fields,{lookup_type:a.selectedModule.name},!0)[0].name:a.selectedModule.name;var l=a.parameterName+"|"+t+"|"+a.selectedField.name;p.push(l)}),p.length>0&&(_.parameters=p.toString()),l.actions.web_hook=_}return l}}}]);