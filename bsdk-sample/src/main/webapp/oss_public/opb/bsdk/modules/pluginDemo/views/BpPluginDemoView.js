/**
 *  产品仓库
 */
define([
	"text!oss_public/opb/bsdk/modules/pluginDemo/templates/BpPluginDemoTemplate.html",  
	"oss_public/opb/bsdk/modules/pluginDemo/action/pluginDemoAction",
	"i18n!oss_public/opb/bsdk/modules/pluginDemo/i18n/pluginDemo"
], function(BpPluginDemoTemplate,pluginDemoAction,i18nPluginDemo) {
	return portal.BaseView.extend({ 
		resource: fish.extend({}, i18nPluginDemo),
		bpPluginDemoTemplate: fish.compile(BpPluginDemoTemplate), 
		initialize: function() { 
			var $this = this;
			this.qryParam = {};
			this.qryParam.argCode = "USER_ID";
			this.qryParam.argValue = "1";
			this.qryParam.compType = "USE_DEMO";
			this.taskListGridColModel = [{
				name : "userId",
				label : '',
				key : true,
				hidden : true
			},{
				name : "userName",
				label : this.resource.OPB_BSDK_USER_NAME,
				sortable : false
			},{
				name: 'phone',
				label: this.resource.OPB_BSDK_PHONE,
				sortable : false  
			},{
				name: 'userCode',
				label:this.resource.OPB_BSDK_USER_CODE,
				sortable : false   
			},{
				name: 'state',
				label:this.resource.OPB_BSDK_STATE,
				sortable : false
			}];
		}, 
		
		render: function() {
			this.$el.html(this.bpPluginDemoTemplate(this.resource)); 
			return this;
		},
		
		afterRender: function() {  
		 
			this.bpTaskListGrid  = this.$("#pkg-def-cust-item-grid").jqGrid({
        		autowidth: true,
				colModel : this.taskListGridColModel, 
				multiselect : true,
				onSelectRow : function(e,rowid, state){
					this.onBpTaskGridRowSelectedCallBack(e,rowid, state);
				}.bind(this)
        	}); 
			 
			this.loadBpData(); 
			return this;
		},
		
		loadBpData: function() {
			var self = this;
			pluginDemoAction.qryBSDKCiItemsList(this.qryParam, function(datas){
        		datas = datas || [];        		      		
        		self.bpTaskListGrid.jqGrid("reloadData", {
					'rows' : datas
				});
        		
        	}.bind(this));
		},
		
		resize : function(delta){  
			var itemGrid = this.$el.height() - this.$(".container_left").height() - 2;
			var itemGrids = itemGrid + this.$("#pkg-def-cust-item-grid").outerHeight(true);
			this.$("#pkg-def-cust-item-grid").outerHeight(itemGrids);
			portal.utils.gridIncHeight(this.$("#pkg-def-cust-item-grid"), itemGrid); 
		}
  
	});
	
});
