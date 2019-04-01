package com.ztesoft.zsmart.oss.opb.bsdk.dto;

import com.ztesoft.zsmart.oss.opb.base.dto.OpbBaseDto;

/**
 * PluginDemo
 * 
 * @author xiexin<br>
 * @version 9.0.2<br>
 * @CreateDate 2019-04-01<br>
 */
public class PluginDemoDto extends OpbBaseDto {
    /**
     * serialVersionUID <br>
     */
    private static final long serialVersionUID = -8650986893706545352L;

    private Long userId;
    
    private String userName;
    
    private String phone;
    
    private String userCode;
    
    private String state;
    
    private Long portalId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getPortalId() {
        return portalId;
    }

    public void setPortalId(Long portalId) {
        this.portalId = portalId;
    }

}
