package com.ztesoft.zsmart.oss.opb.bsdk.dao;

 
import java.util.List;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.base.jdbc.GeneralDAO; 
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;
 

/**
 * PluginDemoDAO
 * 
 * @author xiexin<br>
 * @version 9.0.2<br>
 * @CreateDate 2019-04-01<br>
 */
public abstract class PluginDemoDAO extends GeneralDAO<PluginDemoDto> {
    
    
    /**
     * 
     */
    private static final long serialVersionUID = -7831204509116014679L;

    public abstract List<PluginDemoDto> getPluginDemoList() throws BaseAppException;
}
