package com.ztesoft.zsmart.oss.opb.bsdk.dao.oracle;

import java.util.List;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.bsdk.dao.PluginDemoDAO;
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;

/**
 * PluginDemoDAOOracleImpl
 * 
 * @author xiexin<br>
 * @version 9.0.2<br>
 * @CreateDate 2019-04-01<br>
 */
public class PluginDemoDAOOracleImpl extends PluginDemoDAO {

    /**
     * serialVersionUID <br>
     */
    private static final long serialVersionUID = -2451851442076469043L;


    @Override
    public List<PluginDemoDto> getPluginDemoList() throws BaseAppException {
        String sql = "SELECT USER_ID,USER_NAME,PHONE,USER_CODE,STATE, PORTAL_ID ORDER BY USER_ID DESC";
        return queryForList(sql, new Object[] {});
    }

}
