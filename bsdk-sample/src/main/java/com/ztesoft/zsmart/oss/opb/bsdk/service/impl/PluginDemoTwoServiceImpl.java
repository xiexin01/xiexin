package com.ztesoft.zsmart.oss.opb.bsdk.service.impl;

import java.util.List;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.bsdk.bll.PluginDemoManager;
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;
import com.ztesoft.zsmart.oss.opb.bsdk.service.PluginDemoService;

public class PluginDemoTwoServiceImpl implements PluginDemoService {

    @Override
    public List<PluginDemoDto> queryPluginDemoList(String userId) throws BaseAppException {
        return PluginDemoManager.getInstance().getPluginDemoNoEqualList(userId);
    }

}
