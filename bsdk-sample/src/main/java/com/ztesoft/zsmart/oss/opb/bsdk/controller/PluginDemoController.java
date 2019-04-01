package com.ztesoft.zsmart.oss.opb.bsdk.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.RestController;
import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;
import com.ztesoft.zsmart.oss.opb.bsdk.service.PluginDemoService;

@RestController
@RequestMapping("bp/plugin")
public class PluginDemoController {

    @Resource(name = "pluginDemoServ")
    private PluginDemoService pluginDemoServ;

    @RequestMapping(method = RequestMethod.GET)
    public List<PluginDemoDto> queryCiVmcList() throws BaseAppException {
        return pluginDemoServ.queryPluginDemoList();
    }

}
