(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c4cbff1"],{"43af":function(e,t,a){"use strict";a.r(t);var i,n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"omsp-eventregist",attrs:{id:"omspeventregist"}},[a("van-nav-bar",{staticClass:"omsp-nav-bar",attrs:{title:"变更登记","left-text":"返回","left-arrow":"",fixed:""},on:{"click-left":e.backToIndex}}),a("div",{staticClass:"omsp-eventregist-body"},[a("van-tabs",{attrs:{"lazy-render":!1},model:{value:e.tabNum,callback:function(t){e.tabNum=t},expression:"tabNum"}},[a("van-tab",{attrs:{title:"基本信息"}},[a("van-cell-group",[a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"变更标题",placeholder:"请输入",clickable:""},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"申请人",placeholder:"请输入",clickable:"",readonly:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"申请人电话",placeholder:"请输入",clickable:"",readonly:""},on:{click:function(t){e.showApplicantPhoneKeyboard=!0}},model:{value:e.applicant_phone,callback:function(t){e.applicant_phone=t},expression:"applicant_phone"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"变更类型",placeholder:"点击选择变更类型",clickable:"","right-icon":"arrow",readonly:""},on:{click:function(t){e.showChangeTypeSelectorFlag=!0}},model:{value:e.change_type.name,callback:function(t){e.$set(e.change_type,"name",t)},expression:"change_type.name"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"优先级",placeholder:"点击选择优先级",clickable:"","right-icon":"arrow",readonly:""},on:{click:function(t){e.showUrgencySelectorFlag=!0}},model:{value:e.urgency.name,callback:function(t){e.$set(e.urgency,"name",t)},expression:"urgency.name"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"所属部门",placeholder:"点击选择所属部门","default-index":"0",clickable:"","right-icon":"arrow",readonly:""},on:{click:function(t){e.showOriginSelectorFlag=!0}},model:{value:e.origin.name,callback:function(t){e.$set(e.origin,"name",t)},expression:"origin.name"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"所属团队",placeholder:"点击选择所属团队",clickable:"","right-icon":"arrow",readonly:""},on:{click:function(t){e.showTeamSelectorFlag=!0}},model:{value:e.team.name,callback:function(t){e.$set(e.team,"name",t)},expression:"team.name"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"所属系统",placeholder:"点击选择所属系统",clickable:"","right-icon":"arrow",readonly:""},on:{click:function(t){e.showTargetSysSelectorFlag=!0}},model:{value:e.targetSys.name,callback:function(t){e.$set(e.targetSys,"name",t)},expression:"targetSys.name"}}),a("van-field",{attrs:{"input-align":"right",required:"",clearable:"",label:"变更分类",placeholder:"点击选择变更分类",clickable:"","right-icon":"arrow",readonly:""},on:{click:function(t){e.showCategorySelectorFlag=!0}},model:{value:e.category.name,callback:function(t){e.$set(e.category,"name",t)},expression:"category.name"}}),a("van-field",{attrs:{"input-align":"right",clearable:"",label:"影响范围",placeholder:"请输入",clickable:""},model:{value:e.effect_scope,callback:function(t){e.effect_scope=t},expression:"effect_scope"}})],1),a("van-cell-group",[a("van-panel",{attrs:{title:"变更实施计划",icon:"comment"}},[a("van-field",{attrs:{"label-width":"0px",type:"textarea",placeholder:"请输入变更实施计划",rows:"2",autosize:{maxHeight:150,minHeight:50},clearable:""},model:{value:e.change_plan,callback:function(t){e.change_plan=t},expression:"change_plan"}}),a("div",{attrs:{id:"toolbar-container"}})],1)],1),a("van-cell-group",[a("van-panel",{attrs:{title:"变更描述",icon:"comment"}},[a("omsp-editor",{model:{value:e.editorData,callback:function(t){e.editorData=t},expression:"editorData"}})],1)],1)],1),a("van-tab",{attrs:{title:"附件管理"}},[a("task-file",{attrs:{bsid:e.bsid||e.$route.params.bsid,biz_code:e.biz_code}})],1)],1)],1),a("div",{staticClass:"omsp-eventregist-foot"},[a("div",{staticClass:"omsp-eventregist-foot-grid"},[a("div",{staticClass:"omsp-eventregist-foot-grid-item",staticStyle:{"background-color":"#1A88E9"}},[a("div",{staticClass:"omsp-eventregist-foot-grid-item-center",on:{click:function(t){return e.save("commit")}}},[a("span",{staticClass:"omsp-eventregist-foot-grid-item-center-text"},[e._v("提交")])])]),a("div",{staticClass:"omsp-eventregist-foot-grid-item",staticStyle:{"background-color":"#BBBCC2"}},[a("div",{staticClass:"omsp-eventregist-foot-grid-item-center",on:{click:function(t){return e.save("draft")}}},[a("span",{staticClass:"omsp-eventregist-foot-grid-item-center-text"},[e._v("存为草稿")])])])])]),a("van-number-keyboard",{attrs:{show:e.showApplicantPhoneKeyboard,theme:"custom","extra-key":".","close-button-text":"完成"},on:{blur:function(t){e.showApplicantPhoneKeyboard=!1}},model:{value:e.applicant_phone,callback:function(t){e.applicant_phone=t},expression:"applicant_phone"}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showUrgencySelectorFlag,callback:function(t){e.showUrgencySelectorFlag=t},expression:"showUrgencySelectorFlag"}},[a("van-picker",{attrs:{loading:e.urgencyLoading,columns:e.urgencySelector,"show-toolbar":"",title:"优先级"},on:{cancel:function(t){e.showUrgencySelectorFlag=!1},confirm:e.confirmUrgency}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showChangeTypeSelectorFlag,callback:function(t){e.showChangeTypeSelectorFlag=t},expression:"showChangeTypeSelectorFlag"}},[a("van-picker",{attrs:{loading:e.changeTypeLoading,columns:e.changeTypeSelector,"show-toolbar":"",title:"变更类型"},on:{cancel:function(t){e.showChangeTypeSelectorFlag=!1},confirm:e.confirmChangeType}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showOriginSelectorFlag,callback:function(t){e.showOriginSelectorFlag=t},expression:"showOriginSelectorFlag"}},[a("van-picker",{attrs:{loading:e.originLoading,columns:e.originSelector,"show-toolbar":"",title:"所属部门"},on:{cancel:function(t){e.showOriginSelectorFlag=!1},confirm:e.confirmOrigin}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showTeamSelectorFlag,callback:function(t){e.showTeamSelectorFlag=t},expression:"showTeamSelectorFlag"}},[a("van-picker",{attrs:{loading:e.teamLoading,columns:e.teamSelector,"show-toolbar":"",title:"所属团队"},on:{cancel:function(t){e.showTeamSelectorFlag=!1},confirm:e.confirmTeam}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showTargetSysSelectorFlag,callback:function(t){e.showTargetSysSelectorFlag=t},expression:"showTargetSysSelectorFlag"}},[a("van-picker",{attrs:{loading:e.targetSysLoading,columns:e.targetSysSelector,"show-toolbar":"",title:"所属系统"},on:{cancel:function(t){e.showTargetSysSelectorFlag=!1},confirm:e.confirmTargetSys}})],1),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showCategorySelectorFlag,callback:function(t){e.showCategorySelectorFlag=t},expression:"showCategorySelectorFlag"}},[a("van-picker",{attrs:{loading:e.categoryLoading,columns:e.categorySelector,"show-toolbar":"",title:"变更类型"},on:{cancel:function(t){e.showCategorySelectorFlag=!1},confirm:e.confirmCategory}})],1)],1)])},o=[],r=(a("7514"),a("47e2"),a("2241")),c=(a("6762"),a("bd86")),s=(a("558f"),a("0b33")),l=(a("8990"),a("5e46")),g=(a("d707"),a("8f80")),d=(a("a035"),a("21ab")),u=(a("4072"),a("2830")),h=(a("2a53"),a("34e9")),m=(a("3ec1"),a("7744")),p=(a("8e11"),a("f253")),f=(a("81a6"),a("7bd9")),y=(a("c625"),a("b650")),_=(a("87d0"),a("e41f")),b=(a("578d"),a("ee83")),v=(a("aa1f"),a("ea47")),S=(a("9eda"),a("565f")),L=(a("433b"),a("d399")),w=(a("da02"),a("6b41")),k=a("0ed4"),T=a("a156"),F={name:"OmspAddProblem",components:(i={},Object(c["a"])(i,w["a"].name,w["a"]),Object(c["a"])(i,L["a"].name,L["a"]),Object(c["a"])(i,S["a"].name,S["a"]),Object(c["a"])(i,v["a"].name,v["a"]),Object(c["a"])(i,b["a"].name,b["a"]),Object(c["a"])(i,_["a"].name,_["a"]),Object(c["a"])(i,y["a"].name,y["a"]),Object(c["a"])(i,f["a"].name,f["a"]),Object(c["a"])(i,p["a"].name,p["a"]),Object(c["a"])(i,m["a"].name,m["a"]),Object(c["a"])(i,h["a"].name,h["a"]),Object(c["a"])(i,u["a"].name,u["a"]),Object(c["a"])(i,d["a"].name,d["a"]),Object(c["a"])(i,g["a"].name,g["a"]),Object(c["a"])(i,l["a"].name,l["a"]),Object(c["a"])(i,s["a"].name,s["a"]),Object(c["a"])(i,"TaskFile",k["a"]),Object(c["a"])(i,"OmspEditor",T["a"]),i),data:function(){return{changeData:{},biz_code:"BG",tabNum:0,bsid:"",incident_id:"",problem_id:"",title:"",userid:"",username:"",showApplicantPhoneKeyboard:!1,applicant_phone:"",change_type:{},showChangeTypeSelectorFlag:!1,changeTypeLoading:!0,changeTypeSelector:[],changeTypeList:[],urgency:{},showUrgencySelectorFlag:!1,urgencyLoading:!0,urgencySelector:[],urgencyList:[],origin:"",showOriginSelectorFlag:!1,originLoading:!0,originSelector:[],originList:[],team:{},showTeamSelectorFlag:!1,teamLoading:!0,teamSelector:[],teamList:[],showTargetSysSelectorFlag:!1,targetSysSelector:[],targetSys:{},targetSysLoading:!0,targetSysList:[],category:{},showCategorySelectorFlag:!1,categoryLoading:!0,categorySelector:[],categoryList:[],incidentLevel:"",showIncidentLevelSelectorFlag:!1,incidentLevelLoading:!0,incidentLevelSelector:[],incidentLevelList:[],source:{},sourceList:[],wtSource:{},wtSourceList:[],sj_urgency:{},effect_scope:"",change_plan:"",editorData:"",imgPreviewList:[],imgFileList:[]}},computed:{maxPlanFinishDate:function(){var e=new Date;return e.setMonth(e.getMonth()+6),e}},mounted:function(){this.getBasicInfo()},methods:{backToIndex:function(){this.$router.slid="right",this.$router.back()},confirmChangeType:function(e,t){this.change_type=this.changeTypeList[t],this.showChangeTypeSelectorFlag=!1},confirmUrgency:function(e,t){this.urgency=this.urgencyList[t],this.showUrgencySelectorFlag=!1},confirmCategory:function(e,t){this.category=this.categoryList[t],this.showCategorySelectorFlag=!1},confirmOrigin:function(e,t){this.origin=this.originList[t],this.showOriginSelectorFlag=!1},confirmTeam:function(e,t){var a=this;this.team=this.teamList[t],this.showTeamSelectorFlag=!1,this.$OmspRequest.sendRequest({url:"/appTaskRestService/getTargetSys",data:{team_id:this.team.id}}).then((function(e){a.targetSysList=e.data.targetSysList,a.targetSysSelector=[];for(var t=0;t<a.targetSysList.length;t++)a.targetSysSelector.push(a.targetSysList[t].name);1===a.targetSysList.length&&(a.targetSys=a.targetSysList[0]),a.targetSysLoading=!1,setTimeout((function(){if(a.targetSysList)for(var e=0;e<a.targetSysList.length;e++)a.changeData.target_sys===a.targetSysList[e].id&&(a.targetSys=a.targetSysList[e])}),0)})).catch((function(e){JSON.stringify(e),Object(L["a"])("加载失败，请重新登录")})).finally((function(){}))},confirmTargetSys:function(e,t){"number"===typeof t&&(this.targetSys=this.targetSysList[t]),this.showTargetSysSelectorFlag=!1},beforeReadImg:function(e){var t=e.type,a=["image/png","image/jpeg"];return!!a.includes(t)||(L["a"].fail("请上传:png、jpeg的图片格式"),!1)},afterReadImg:function(e){return e},save:function(e){var t=this,a=this.checkForm();a.flag?r["a"].confirm({title:"通知",message:"确定这项操作吗?"}).then((function(){L["a"].loading({mask:!0,forbidClick:!0,duration:0,message:"请稍后..."});var a=t.getFormData();setTimeout((function(){t.$OmspRequest.sendRequest({url:"/appChangeRestService/saveChange",data:a}).then((function(a){L["a"].clear(),t.bsid=a.data.id,t.$nextTick((function(){t.$store.commit("page/removeCachePageName","OmspIndex"),"draft"===e?t.keepEdit():"commit"===e&&t.submit()}))})).catch((function(e){JSON.stringify(e),L["a"].fail("暂存失败")})).finally((function(){}))}),0)})).catch((function(){})):L["a"].fail(a.msg)},keepEdit:function(){var e=this;r["a"].confirm({title:"暂存成功",message:"是否继续修改？"}).then((function(){})).catch((function(){setTimeout((function(){e.$router.push({path:"index"})}))}))},submit:function(){var e=this;L["a"].loading({mask:!0,forbidClick:!0,duration:0,message:"提交中，请稍后..."});var t=this.getFormData();setTimeout((function(){e.$OmspRequest.sendRequest({url:"/appChangeRestService/submitChange",data:{id:t.id}}).then((function(t){L["a"].clear(),JSON.stringify(t),r["a"].alert({message:"提交成功，即将返回主页"}).then((function(){e.$store.commit("page/removeCachePageName","OmspIndex"),setTimeout((function(){e.$router.push({path:"index"})}))}))})).catch((function(e){JSON.stringify(e),L["a"].fail("提交失败")})).finally((function(){}))}),0)},getFormData:function(){var e={fb_team_id:"",wt_source_desc:this.wtSource.name,urgency_desc:this.urgency.name,sj_id:"",is_view:"",sj_target_sys_desc:"",fb_package_name:"",change_type:this.change_type.id,wt_target_sys:"",source:this.source.id,team_id:this.team.id,proc_inst_id_:"",wt_occur_frequency_desc:"",wt_register:"",incident_id:"",sj_category_desc:"",sj_applicant_phone:"",fb_target_sys:"",target_sys:this.targetSys.id,category_desc:this.category.name,sj_orgname:"",fb_target_server:"",id:this.bsid,change_desc:this.editorData,fb_title:"",fb_package_version:"",sj_incident_level_desc:this.incidentLevel.name,fb_orgname:"",orgid:this.origin.id,wt_registe_date:"",wt_team_id_desc:"",wt_team_id:"",wt_urgency:"",fb_id:"",org_id:"",wt_urgency_desc:"",sj_applicant:"",change_plan:this.change_plan,fb_target_sys_desc:"",sj_target_sys:"",title:this.title,sj_team_id:"",fb_release_date:"",wt_again_occur_risk:"",wt_registe_phone:"",fb_description:"",is_base:"1",orgname:"",urgency:this.urgency.id,problem_id:"",is_draft:"1",source_desc:this.source.name,sj_incident_level:this.incidentLevel.id,effect_scope:this.effect_scope,wt_title:"",fb_team_id_desc:"",sj_title:"",sj_occur_date:"",wt_category:"",fb_urgency_desc:"",sj_urgency:this.sj_urgency.id,change_type_desc:this.change_type.name,wt_category_desc:"",wt_source:this.wtSource.id,sj_urgency_desc:this.sj_urgency.name,fb_urgency:"",fb_release_user:"",pos_orgname:this.origin.orgname,sj_category:"",applicant_phone:this.applicant_phone,team_id_desc:this.team.name,applicant:this.username,wt_target_sys_desc:"",menuid:"",sj_team_id_desc:"",category:this.category.id,wt_occur_frequency:"",wt_orgname:"",target_sys_desc:this.targetSys.name,wt_id:""};return e},getBasicInfo:function(){var e=this;Object(L["a"])({type:"loading",overlay:!0,message:"加载中...",duration:0,forbidClick:!0}),setTimeout((function(){e.$OmspRequest.sendRequest({url:"/appChangeRestService/getChangeBasicInfo",data:{}}).then((function(t){L["a"].clear(),e.username=t.data.username,e.userid=t.data.userid,e.urgencyList=t.data.urgencyList,e.urgencySelector=[];for(var a=0;a<e.urgencyList.length;a++)e.urgencySelector.push(e.urgencyList[a].name);e.urgencyLoading=!1,e.changeTypeList=t.data.changeTypeList,e.changeTypeSelector=[];for(var i=0;i<e.changeTypeList.length;i++)e.changeTypeSelector.push(e.changeTypeList[i].name);e.changeTypeLoading=!1,e.categoryList=t.data.categoryList,e.categorySelector=[];for(var n=0;n<e.categoryList.length;n++)e.categorySelector.push(e.categoryList[n].name);e.categoryLoading=!1,e.originList=t.data.originList,e.originSelector=[];for(var o=0;o<e.originList.length;o++)e.originSelector.push(e.originList[o].orgname);e.originLoading=!1,1===e.originList.length&&(e.origin=e.originList[0]),e.teamList=t.data.teamList,e.teamSelector=[];for(var r=0;r<e.teamList.length;r++)e.teamSelector.push(e.teamList[r].name);e.teamLoading=!1,1===e.teamList.length&&(e.team=e.teamList[0],e.confirmTeam("",0)),e.incidentLevelList=t.data.incidentLevelList,e.incidentLevel=e.incidentLevelList.find((function(e){return"03"===e.id})),e.sourceList=t.data.changeSource,e.source=e.sourceList.find((function(e){return"03"===e.id})),e.wtSourceList=t.data.problemSource,e.wtSource=e.wtSourceList.find((function(e){return"02"===e.id})),e.sj_urgency=e.urgencyList.find((function(e){return"03"===e.id})),e.$route.query.bsid&&e.getInfoData(e.$route.query.bsid),e.$route.query.incident_id&&(e.incident_id=e.$route.query.incident_id),e.$route.query.problem_id&&(e.problem_id=e.$route.query.problem_id)})).catch((function(e){JSON.stringify(e),Object(L["a"])("加载失败，请重新登录")})).finally((function(){}))}),0)},checkForm:function(){var e={flag:!1,msg:""};return""===this.title?e.msg="请输入标题":""===this.username?e.msg="没有申请人":""===this.applicant_phone?e.msg="请输入申请人电话":""===this.change_type?e.msg="请选择变更类型":""===this.urgency?e.msg="请选择优先级":""===this.category?e.msg="请选择变更类型":""===this.origin?e.msg="所属部门为空":""===this.team?e.msg="请选择所属团队":""===this.targetSys?e.msg="请选择所属系统":""===this.editorData?e.msg="请输入问题描述":e.flag=!0,e},getInfoData:function(e){var t=this;setTimeout((function(){t.$OmspRequest.sendRequest({url:"/appChangeRestService/getChange",data:{id:e}}).then((function(e){t.changeData=JSON.parse(e.data.result),t.bsid=t.changeData.id,t.incident_id=t.changeData.incident_id,t.problem_id=t.changeData.problem_id,t.title=t.changeData.title,t.applicant_phone=t.changeData.applicant_phone;for(var a=0;a<t.categoryList.length;a++)t.changeData.category===t.categoryList[a].id&&(t.category=t.categoryList[a]);for(var i=0;i<t.urgencyList.length;i++)t.changeData.urgency===t.urgencyList[i].id&&(t.urgency=t.urgencyList[i]);for(var n=0;n<t.changeTypeList.length;n++)t.changeData.change_type===t.changeTypeList[n].id&&(t.change_type=t.changeTypeList[n]);for(var o=0;o<t.originList.length;o++)t.changeData.orgid===t.originList[o].id&&(t.origin=t.originList[o]);for(var r=0;r<t.teamList.length;r++)t.changeData.team_id===t.teamList[r].id&&t.confirmTeam("",r);t.effect_scope=t.changeData.effect_scope,t.change_plan=t.changeData.change_plan,t.editorData=t.changeData.change_desc})).catch((function(e){JSON.stringify(e),Object(L["a"])("加载失败，请重新登录")})).finally((function(){}))}),0)}}},O=F,C=(a("7e91"),a("2877")),j=Object(C["a"])(O,n,o,!1,null,null,null);t["default"]=j.exports},"7e39":function(e,t,a){},"7e91":function(e,t,a){"use strict";var i=a("7e39"),n=a.n(i);n.a},a156:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ckeditor",e._b({attrs:{editor:e.editor,config:e.editorConfig},model:{value:e.editorData,callback:function(t){e.editorData=t},expression:"editorData"}},"ckeditor",e.$attrs,!1))},n=[],o={name:"OmspEditor",components:{},props:{value:{type:String,default:""}},data:function(){return{editor:this.$OmspClassicEditor,editorData:"",editorConfig:{placeholder:"请输入······",toolbar:[]}}},watch:{value:function(e){this.editorData=e},editorData:function(e){this.$emit("input",e)}},mounted:function(){this.editorData=this.value}},r=o,c=a("2877"),s=Object(c["a"])(r,i,n,!1,null,"83061b96",null);t["a"]=s.exports}}]);