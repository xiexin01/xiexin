package com.ztesoft.zsmart.oss.opb.bsdk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.bsdk.bll.PluginDemoManager;
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;
import com.ztesoft.zsmart.oss.opb.bsdk.service.PluginDemoService;

@Service("pluginDemoServ")
public class PluginDemoServiceImpl implements PluginDemoService {

    @Autowired
    private PluginDemoManager pluginDemoManager;

    @Override
    public List<PluginDemoDto> queryPluginDemoList() throws BaseAppException {

        return pluginDemoManager.getPluginDemoList();
    }

}
