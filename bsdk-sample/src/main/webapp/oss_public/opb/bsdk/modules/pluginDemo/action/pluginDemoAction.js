define(["webroot"],function(webroot) {
    return { 
    	
    	/**
	     * 获取列表
	     */
		qryBSDKCiItemsList : function(params, success){ 
			
			fish.get("bp/plugin/queryPluginList", params, success, webroot);
		},
    	
    };
});