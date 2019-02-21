
portal.define([
	"text!oss/opb/bsdk/modules/busiPackConfig/templates/dialog/BatchValidateDialog.html",
	"oss/opb/bsdk/modules/busiPackConfig/action/bpMakeAction",
	"i18n!oss/opb/bsdk/modules/busiPackConfig/i18n/mkBP",
	"i18n!i18n/common",
	"frm/fish-desktop/third-party/knob/fish.knob",
	"css!frm/fish-desktop/third-party/knob/knob.css"
], function(BatchValidateDialog, bpMakeAction, i18nMkBP, i18nCommon) {
	return portal.CommonView.extend({
		className: "ui-dialog dialog",		
		resource: fish.extend({}, i18nCommon, i18nMkBP),		
		batchValidateDialog: fish.compile(BatchValidateDialog),		
		events: {
			"click #js-batch-validate-pass-btn": "validatePass",
			"click #js-batch-validate-no-pass-btn": "validateNoPass",
			"click #btn-bp-repo-search-by-cond": "loadGridDatas",
			"click #js-batch-validate-ok-btn": "onOk",
			"click #js-batch-validate-cancel-btn": "onCancel"
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
			this.$el.html(this.batchValidateDialog(this.resource));
			this.$el.appendTo('body');
			return this;
		},
		
		afterRender: function() {
			this.$el.dialog({
				height: 535,
				width: 850,
				modal:true,
				close:this.wrap(function(event) { 
					 this.remove();
					 this.trigger('close');
				})
			});
			this.form = this.$("#js-batch-validate-result-form").form();
			this.form.form('value',this.inParam);
			
			this.validateGrid = this.$("#batch-validate-grid").jqGrid({
				 autowidth: true, 
				 height: 270,
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
			var checkRows = this.validateGrid.jqGrid('getCheckRows');
			if(checkRows.length>0){
				
				this.$('#js-batch-validate-pass-btn').attr('disabled',false);
				this.$('#js-batch-validate-no-pass-btn').attr('disabled',false);
			}else{
				this.$('#js-batch-validate-pass-btn').attr('disabled',true);
				this.$('#js-batch-validate-no-pass-btn').attr('disabled',true);
			}
			 
		},
		loadGridDatas : function(){
			this.inParam.BP_NAME = this.$("#bp-sel-bp-name").val();
			bpMakeAction.qryBPInst(this.inParam,this.wrap(function(datas){
				var result = datas || [];
				this.validateGrid.jqGrid('reloadData',result);
			}));
		},
		validatePass : function(){
			if (!this.form.isValid()) {
				return false;
			}
			var formValue = this.form.form("value");
			var params = {
				BP_ID : this.getCheckBPIdStr(),
				BPT_DESC : formValue["BPT_DESC"],
				BPT_CLEAR_DATA : formValue["BPT_CLEAR_DATA"] ? "1":"0",
				BPT_RESULT : '1'
			}; 
			 
			bpMakeAction.addValidResult(params, this.wrap(function(data){
				this.trigger("batchValidatePass");
				this.$el.dialog("close");
        	}));  
		},
		validateNoPass : function(){ 
			if (!this.form.isValid()) {
				return false;
			}
			
			this.$('#batch-validate-detail-div').css('display','none');
			this.$('#batch-validate-no-pass-rollback-div').css('display','block');
			this.$('#js-batch-validate-pass-btn').css('display','none');
			this.$('#js-batch-validate-no-pass-btn').css('display','none');
			this.$('#js-batch-validate-cancel-btn').attr('disabled',true);
			
			this.initProgressbar();
			this.bpsNoPassRollback(); 
		},
		
		bpsNoPassRollback : function(){ 
			this.checkRows = this.validateGrid.jqGrid('getCheckRows');
			this.oneTaskVal = 100/this.checkRows.length;
			this.currentIndex = 0;
			this.currentTask = this.checkRows[this.currentIndex]; 
			
			this.taskStart = true;
			this.noPassRollback();
		},
		
		noPassRollback : function(){
			this.$("#installProgressbar").text((this.currentIndex+1)+"/"+this.checkRows.length);
			this.$('#current-rollback-bp-name').text(this.checkRows[this.currentIndex]['BP_NAME']);
			
			var formValue = this.form.form("value");
			var params = {
				BP_ID : this.currentTask['BP_ID'],
				BPT_DESC : formValue["BPT_DESC"],
				BPT_CLEAR_DATA : formValue["BPT_CLEAR_DATA"] ? "1":"0",
				BPT_RESULT : '0'
			}; 
			bpMakeAction.addValidResult(params, this.wrap(function(data){
	        	var validateState = data["opSuccess"]; 
	        	if(validateState){ 
	        		this.installProgressbar.knob('value',(this.currentIndex+1)*this.oneTaskVal);
	        		
	        		this.currentIndex++;
	        		if(this.currentIndex < this.checkRows.length){
	        			this.currentTask = this.checkRows[this.currentIndex]; 
		        		this.noPassRollback();
	        		}else{
	        			this.$('#js-batch-validate-ok-btn').css('display','inline-block');
	        			this.$('#js-batch-validate-cancel-btn').css('display','none');
	        		} 
	        	}else{
	        		portal.require(["oss/opb/bsdk/modules/busiPackConfig/views/dialog/PackOptionLogView"],this.wrap(function(PackOptionLogView){
	        			var options = { 
	        				 needLoad : true,
	           				 optionLogId :data["LOG_ID"],
								 action : "batchValidate",
								 logContent : data["LOG_CONTENT"]
							};
	        			var packOptionLogView = new PackOptionLogView(options);
						packOptionLogView.afterRender();
						 
					}));
	        		this.$('#js-batch-validate-cancel-btn').text(this.resource.OPB_BSDK_BP_SUSPEND);
	        		this.$('#js-batch-validate-cancel-btn').attr('class','btn btn_minwidth btn-primary');
	        		this.$('#js-batch-validate-cancel-btn').attr('disabled',false);
	        	} 
        	}));
		},
		
		initProgressbar : function(){
			var self = this;
			this.installProgressbar = self.$("#installProgressbar").knob({ 
				width : 260,
				value : 0,
				change : function(e,ui){
					
					var checkRows = self.validateGrid.jqGrid('getCheckRows');
					if(!self.taskStart){ 
						$(e.target).text('0/'+checkRows.length);
					}else{
						$(e.target).text((self.currentIndex+1)+"/"+checkRows.length);
					}
				}
			});
		},
		getCheckBPIdStr : function(){
			var bpIdStr = "";
			var checkRows = this.validateGrid.jqGrid('getCheckRows');
			$.each(checkRows,function(i,rowData){
				bpIdStr += rowData['BP_ID'] + ',';
			});
			
			if(bpIdStr.length>0){
				bpIdStr = bpIdStr.substring(0,bpIdStr.length-1);
			}
			return bpIdStr;
		},
		onOk : function(){
			this.$el.dialog("close");
			this.trigger('batchValidateNoPass');
		},
		onCancel: function() {			
			this.$el.dialog("close");
			this.trigger('batchValidateNoPass');
		}
	});
});
