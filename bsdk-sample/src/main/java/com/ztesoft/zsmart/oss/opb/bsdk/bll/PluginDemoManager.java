package com.ztesoft.zsmart.oss.opb.bsdk.bll;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.core.log.ZSmartLogger;
import com.ztesoft.zsmart.oss.opb.base.jdbc.GeneralDAOFactory;
import com.ztesoft.zsmart.oss.opb.base.jdbc.JdbcUtil;
import com.ztesoft.zsmart.oss.opb.bsdk.dao.PluginDemoDAO;
import com.ztesoft.zsmart.oss.opb.bsdk.dto.PluginDemoDto;

/**
 * <Description> <br>
 * 
 * @author xiexin<br>
 * @version 9.0.2<br>
 * @CreateDate 2019-04-01<br>
 */
@Component
public class PluginDemoManager {
    /**
     * log
     */
    ZSmartLogger log = ZSmartLogger.getLogger(PluginDemoManager.class);

    /**
     * ciVmcDAO
     */
    private static volatile PluginDemoManager instance;

    /**
     * Description: 获取CiVmcManager实例<br>
     * 
     * @return <br>
     * @throws BaseAppException <br>
     */
    public static PluginDemoManager getInstance() throws BaseAppException {
        if (instance == null) {
            synchronized (PluginDemoManager.class) {
                if (instance == null) {
                    instance = new PluginDemoManager();
                }
            }
        }
        return instance;
    }

    /**
     * Description: 获取CiVmcDAO实例<br>
     * 
     * @return <br>
     * @throws BaseAppException <br>
     */
    public PluginDemoDAO getPluginDemoDAO() throws BaseAppException {
        return (PluginDemoDAO) GeneralDAOFactory.create(PluginDemoDAO.class, JdbcUtil.OSS_BSDK);
    }

    /**
     * Description:获取列表 <br>
     * 
     * @param aDict <br>
     * @throws BaseAppException <br>
     */
    public List<PluginDemoDto> getPluginDemoList() throws BaseAppException {
        List<PluginDemoDto> list = getPluginDemoDAO().getPluginDemoList();
        return list;
    }


}
