
portal.define([
	"text!oss/opb/bsdk/modules/busiPackConfig/templates/dialog/BatchUnDeployDialog.html",
	"oss/opb/bsdk/modules/busiPackConfig/action/bpMakeAction",
	"i18n!oss/opb/bsdk/modules/busiPackConfig/i18n/mkBP",
	"i18n!i18n/common",
	"frm/fish-desktop/third-party/knob/fish.knob",
	"css!frm/fish-desktop/third-party/knob/knob.css"
], function(Tpl, bpMakeAction, i18nMkBP, i18nCommon) {
	return portal.CommonView.extend({
		className: "ui-dialog dialog",		
		resource: fish.extend({}, i18nCommon, i18nMkBP),		
		tpl: fish.compile(Tpl),		
		events: {
			"click #js-batch-undeploy-btn": "undeployBps", 
			"click #js-batch-undeploy-ok-btn": "onOk",
			"click #btn-bp-repo-search-by-cond": "loadGridDatas",
			"click #js-batch-undeploy-cancel-btn": "onCancel"
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
			this.$el.html(this.tpl(this.resource));
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
			 
			this.undeployGrid = this.$("#batch-undeploy-grid").jqGrid({
				 autowidth: true, 
				 height: 360,
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
			var checkRows = this.undeployGrid.jqGrid('getCheckRows');
			if(checkRows.length>0){
				
				this.$('#js-batch-undeploy-btn').attr('disabled',false); 
			}else{
				this.$('#js-batch-undeploy-btn').attr('disabled',true); 
			}
			 
		},
		
		loadGridDatas : function(){
			this.inParam.BP_NAME = this.$("#bp-sel-bp-name").val();
			bpMakeAction.qryBPInst(this.inParam,this.wrap(function(datas){
				var result = datas || [];
				this.undeployGrid.jqGrid('reloadData',result);
			}));
		},
		
		initProgressbar : function(){
			var self = this;
			this.undeployProgressbar = self.$("#undeployProgressbar").knob({ 
				width : 260,
				value : 0,
				change : function(e,ui){
					
					var checkRows = self.undeployGrid.jqGrid('getCheckRows');
					if(!self.taskStart){ 
						$(e.target).text('0/'+checkRows.length);
					}else{
						$(e.target).text((self.currentIndex+1)+"/"+checkRows.length);
					}
				}
			});
		},
		
		undeployBps : function(){
			
			this.$('#batch-undeploy-bp-select-div').css('display','none');
			this.$('#batch-undeploy-progress-bar-div').css('display','block');
			
			this.$('#js-batch-undeploy-btn').css('display','none'); 
			this.$('#js-batch-undeploy-cancel-btn').attr('disabled',true);
			
			this.initProgressbar();
			
			this.checkRows = this.undeployGrid.jqGrid('getCheckRows');
			this.oneTaskVal = 100/this.checkRows.length;
			this.currentIndex = 0;
			this.currentTask = this.checkRows[this.currentIndex]; 
			
			this.taskStart = true;
			this.undeployCallBack();
		},
		
		undeployCallBack : function(){
			
			this.$("#undeployProgressbar").text((this.currentIndex+1)+"/"+this.checkRows.length);
			this.$('#current-undeploy-bp-name').text(this.checkRows[this.currentIndex]['BP_NAME']); 
			 
			var params = {
					BP_ID : this.currentTask["BP_ID"]
			};
			bpMakeAction.uninstallPackage(params, this.wrap(function(data){
				
				var uninstallState = data["opSuccess"]; 
	        	if(uninstallState){ 
	        		this.undeployProgressbar.knob('value',(this.currentIndex+1)*this.oneTaskVal);
	        		
	        		this.currentIndex++;
	        		if(this.currentIndex < this.checkRows.length){
	        			this.currentTask = this.checkRows[this.currentIndex]; 
		        		this.undeployCallBack();
	        		}else{
	        			this.$('#js-batch-undeploy-ok-btn').css('display','inline-block');
	        			this.$('#js-batch-undeploy-cancel-btn').css('display','none');
	        		} 
	        	}else{
	        		
	        		portal.require(["oss/opb/bsdk/modules/busiPackConfig/views/dialog/PackOptionLogView"],this.wrap(function(PackOptionLogView){
	        			var options = { 
        				     needLoad : true,
           				     optionLogId :data["LOG_ID"],
							 action : "batchUndeploy",
							 logContent : data["LOG_CONTENT"]
						};
	        			var packOptionLogView = new PackOptionLogView(options);
						packOptionLogView.afterRender();
					}));
	        		this.$('#js-batch-undeploy-cancel-btn').text(this.resource.OPB_BSDK_BP_SUSPEND);
	        		this.$('#js-batch-undeploy-cancel-btn').attr('class','btn btn_minwidth btn-primary');
	        		this.$('#js-batch-undeploy-cancel-btn').attr('disabled',false);
	        	} 
        	})); 
		}, 
		onOk : function(){ 
			this.trigger('okEvent');
		},
		onCancel: function() {	 
			this.trigger('cancelEvent');
		}
	});
});
