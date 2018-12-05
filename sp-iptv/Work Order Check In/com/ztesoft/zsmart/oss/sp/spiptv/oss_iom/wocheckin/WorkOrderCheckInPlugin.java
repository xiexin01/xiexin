package com.ztesoft.zsmart.oss.sp.spiptv.oss_iom.wocheckin;

import java.util.HashMap;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.core.service.DynamicDict;
import com.ztesoft.zsmart.core.service.ServiceFlow;
import com.ztesoft.zsmart.oss.core.om.itf.ITaskOperationComponent;

public class WorkOrderCheckInPlugin implements ITaskOperationComponent {

	private void assignWorkorder(String var1, HashMap<String, Object> var2) throws BaseAppException {
		String var3 = var2.get("FUN_ID").toString();
		String var4 = var2.get("FUN_NAME").toString();
		String var5 = var2.get("NOTES").toString();
		String var6 = var2.get("ORG_ID").toString();
		String var7 = var2.get("STAFF_ID").toString();
		DynamicDict var8 = new DynamicDict();
		var8.serviceName = "MOM_WORKORDER_ASSIGN";
		var8.setValueByName("FUN_ID", var3);
		var8.setValueByName("FUN_NAME", var4);
		var8.setValueByName("WO_NO", var1);
		var8.setValueByName("NOTES", var5);
		var8.setValueByName("ORG_ID", var6);
		var8.setValueByName("STAFF_ID", var7);
		var8.setValueByName("EXT_PARAMS", var2);
		ServiceFlow.callService(var8);
	}
	
	@Override
	public void execute(String arg0, HashMap<String, Object> arg1) throws BaseAppException {
		// TODO Auto-generated method stub

	}
	
}
