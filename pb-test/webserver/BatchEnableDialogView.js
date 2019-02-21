
portal.define([
	"text!oss/opb/bsdk/modules/busiPackConfig/templates/dialog/BatchEnableDialog.html",
	"oss/opb/bsdk/modules/busiPackConfig/action/bpMakeAction",
	"i18n!oss/opb/bsdk/modules/busiPackConfig/i18n/mkBP",
	"i18n!i18n/common"
], function(Template, bpMakeAction, i18nMkBP, i18nCommon) {
	return portal.CommonView.extend({
		className: "ui-dialog dialog",		
		resource: fish.extend({}, i18nCommon, i18nMkBP),		
		template: fish.compile(Template),		
		events: {
			"click #js-batch-enable-btn": "batchEnable",
			"click #btn-bp-repo-search-by-cond": "loadGridDatas",
			"click #js-batch-enable-cancel-btn": "onCancel"
		},		
		
		initialize: function(inParam) {
			this.inParam = inParam;
			this.colModel = [{
				name: 'BP_ID',
				label: this.resource.OPB_BSDK_BP_ID,
				sortable : false 
			},{
				name: 'BP_NAME',
				label: this.resource.OPB_BSDK_BP_NAME,
				sortable : false 
			},{
				name : 'BPV_VERSION',
				label: this.resource.OPB_BSDK_BP_VERSION,
				sortable : false 
			}]; 
		},
		
		render: function() {
			this.$el.html(this.template(this.resource));
			this.$el.appendTo('body');
			return this;
		},
		
		afterRender: function() {
			this.$el.dialog({
				height: 490,
				width: 850,
				modal:true,
				close:this.wrap(function(event) { 
					 this.remove();
					 this.trigger('close');
				})
			});
			this.enableGrid = this.$("#batch-enable-grid").jqGrid({
				 autowidth: true, 
				 height: 350,
				 colModel: this.colModel,
				 multiselect : true,
				 onSelectRow : this.wrap(this.onRowSelectCallback),
				 onSelectAll : this.wrap(this.onRowSelectCallback)
			});
			
			var $this = this;
			this.wsCombox = this.$("#bp-sel-ws-id").combobox({
				dataTextField :  "NAME",
				dataValueField : 'ID',
				dataSource : [{
					ID : "10",
					NAME:this.resource.OPB_BSDK_BP_OPEN_DOMAIN
					
				},{
					ID : "11",	
					NAME:this.resource.OPB_BSDK_BP_SECURITY_DOMAIN 
				}],
				 change : function(e){
					var val = $this.wsCombox.combobox('value');
   	            	if(val){
   	            		$this.inParam.WS_ID = val;
   	            	}else{
   	            		$this.inParam.WS_ID = null;
   	            	}
   	            	$this.loadGridDatas();
				 }
			});
		    var cookieWorkspaceId = fish.cookies.get('bsdkWorkspaceSelectId');
		    if(cookieWorkspaceId) {
		    	this.wsCombox.combobox("value",cookieWorkspaceId);
		    }else {
		    	this.wsCombox.combobox("value",10);
		    }
		    
		    this.bpTypeCombo = this.$('#bp-sel-bp-type').combobox({
         		 dataTextField: 'name',
         	     dataValueField: 'value',
     	         dataSource: [
     	            {   name: this.resource.OPB_BSDK_BP_TYPE_SP,
     	                value: 'SP'
     	            },{
     	            	name: this.resource.OPB_BSDK_BP_TYPE_NP, 
     	            	value: 'NP'
     	            },{
     	            	name: this.resource.OPB_BSDK_BP_TYPE_AP, 
     	            	value: 'AP'
     	            },{
     	            	name: this.resource.OPB_BSDK_BP_TYPE_PP, 
     	            	value: 'PP'
     	            }],
     	            change : function(e){
   					var val = $this.inParam.BP_TYPE=$this.bpTypeCombo.combobox('value');
		            	if(val){
		            		$this.inParam.BP_TYPE = val;
		            	}else{
		            		$this.inParam.BP_TYPE = null;
		            	}
		            	$this.loadGridDatas();
     	            }
         	});
//			this.loadGridDatas();
			return this;
		},
		onRowSelectCallback : function(e, rowid, state, checked){
			var checkRows = this.enableGrid.jqGrid('getCheckRows');
			if(checkRows.length>0){
				
				this.$('#js-batch-enable-btn').attr('disabled',false);
			}else{
				this.$('#js-batch-enable-btn').attr('disabled',true);
			}
			 
		}, 
		loadGridDatas : function(){
			this.inParam.BP_NAME = this.$("#bp-sel-bp-name").val();
			bpMakeAction.qryBPInst(this.inParam,this.wrap(function(datas){
				var result = datas || [];
				this.enableGrid.jqGrid('reloadData',result);
			}));
		},
		batchEnable :function(){
			var param = {
					BP_ID : this.getCheckBPIdStr()
			};
			bpMakeAction.reusingPackage(param,this.wrap(function(data){ 
				fish.success(this.resource.OPB_BSDK_BP_SRART_USING_SUCCESS);
				this.trigger('batchEnableEvent');
			}));
		},
		getCheckBPIdStr : function(){
			var bpIdStr = "";
			var checkRows = this.enableGrid.jqGrid('getCheckRows');
			$.each(checkRows,function(i,rowData){
				bpIdStr += rowData['BP_ID'] + ',';
			});
			
			if(bpIdStr.length>0){
				bpIdStr = bpIdStr.substring(0,bpIdStr.length-1);
			}
			return bpIdStr;
		},
		onCancel: function() {			
			this.$el.dialog("close"); 
		}
	});
});
