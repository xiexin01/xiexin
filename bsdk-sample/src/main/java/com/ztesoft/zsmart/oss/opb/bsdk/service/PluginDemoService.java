package com.ztesoft.zsmart.oss.opb.bsdk.service;

import java.util.List;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;

/**
 * PluginDemoService
 * 
 * @author xiexin<br>
 * @version 9.0.2<br>
 * @CreateDate 2019-04-01<br>
 */
public interface PluginDemoService {

    public List<PluginDemoDto> queryPluginDemoList() throws BaseAppException;

}
