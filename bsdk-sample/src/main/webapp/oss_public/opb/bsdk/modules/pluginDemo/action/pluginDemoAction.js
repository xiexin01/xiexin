define(["webroot"],function(webroot) {
    return { 
    	
    	/**
	     * 获取列表
	     */
		qryBSDKCiItemsList : function(ciDetail,pageInfo,success){ 
			
			fish.get("bp/cis/page",fish.extend(ciDetail, pageInfo), success, webroot);
		},
    	
    };
});