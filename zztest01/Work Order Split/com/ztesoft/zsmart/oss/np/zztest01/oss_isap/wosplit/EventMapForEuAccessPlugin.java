/**************************************************************************************** 
 Copyright © 2003-2012 ZTEsoft Corporation. All rights reserved. Reproduction or       <br>
 transmission in whole or in part, in any form or by any means, electronic, mechanical <br>
 or otherwise, is prohibited without the prior written consent of the copyright owner. <br>
 ****************************************************************************************/
package com.ztesoft.zsmart.oss.np.zztest01.oss_isap.wosplit;

import java.util.HashMap;
import java.util.List;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.core.exception.ExceptionHandler;
import com.ztesoft.zsmart.oss.core.im.dto.FeasiCheckResultDto;
import com.ztesoft.zsmart.oss.core.im.dto.FeasiCheckResultItemDto;
import com.ztesoft.zsmart.oss.core.om.itf.IConditionComponent;
import com.ztesoft.zsmart.oss.ic.im.ro.feasibility.ICCheckRecorder;

/**
 * <Description> <br>
 * 
 * @author XXX<br>
 * @version 1.0<br>
 * @taskId <br>
 * @CreateDate 2016年10月21日 <br>
 * @since V7.3<br>
 * @see com.ztesoft.zsmart.oss.core.om.plugin.so <br>
 */

public class EventMapForEuAccessPlugin implements IConditionComponent {

    @Override
    public HashMap<String, Object> execute(String custorderNo, String productOrderNo, HashMap<String, Object> extParams)
        throws BaseAppException {

        HashMap<String, Object> map = new HashMap<String, Object>();

        String prequalId = (String) extParams.get("PREQUAL_ID");
        if ("".equals(prequalId)) {
            ExceptionHandler.publish("OM-OD-000000", "Prequal ID is null");
        }
        String isToModify = "Y";
        String prequalResultCode = "";
        String prequalResultValue = "";
        // 根据prequalId到im_feas_check_item表中获取回填属性
        FeasiCheckResultDto resultDto = ICCheckRecorder.queryFeasiCheckResultById(prequalId);
        List<FeasiCheckResultItemDto> dtoList = resultDto.getCheckItems();
        if (null != dtoList) {
            for (int i = 0; i < dtoList.size(); i++) {
                String code = dtoList.get(i).getItemCode();
                String value = dtoList.get(i).getItemVal();
                if ("euAccessDualStack".equals(code)) {
                    prequalResultCode = code;
                    prequalResultValue = value;
                }

            }
        }

        if ("".equals(prequalResultCode)) {
            ExceptionHandler.publish(null, "euAccessDualStack is not exist");

        }
        if ("".equals(prequalResultValue)) {
            ExceptionHandler.publish(null, "euAccessDualStack value is null");

        }
        if ("Y".equals(prequalResultValue)) {
            isToModify = "N";
        }
        map.put("IS_MODIFY_EA", isToModify);
        return map;
    }

}
