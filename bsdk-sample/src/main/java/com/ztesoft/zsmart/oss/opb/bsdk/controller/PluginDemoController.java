package com.ztesoft.zsmart.oss.opb.bsdk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;
import com.ztesoft.zsmart.oss.opb.bsdk.service.PluginDemoService;
import com.ztesoft.zsmart.oss.opb.plugin.PluginFactory;

@RestController
@RequestMapping("bp/plugin")
public class PluginDemoController {

    @RequestMapping(value = "queryPluginList", method = RequestMethod.GET)
    public List<PluginDemoDto> queryPluginDemoList(@RequestParam(name="argCode", required=true) String argCode, @RequestParam(name="argValue", required=true) String argValue, @RequestParam(name="compType", required=true) String compType) throws BaseAppException {
        PluginFactory pf = PluginFactory.getPluginFactory();
        Map<String, Object> map = new HashMap<>();
        map.put(argCode, argValue);
        return pf.getPlugin(map, compType, PluginDemoService.class).queryPluginDemoList();
    }

}
