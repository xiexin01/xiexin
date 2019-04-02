INSERT INTO `bfm_priv` (`PRIV_ID`, `PRIV_TYPE`, `PRIV_CODE`, `PRIV_NAME`, `COMMENTS`, `URL`, `STATE`, `STATE_DATE`, `PRIV_EL`) VALUES ('6008', 'M', 'bfd-plg', 'BizPackage Plugin', NULL, 'oss_public/opb/bsdk/modules/pluginDemo/views/BpPluginDemoView', 'A', NULL, '/bp');
INSERT INTO `bfm_menu` (`MENU_ID`, `ICON_URL`, `STATE`, `STATE_DATE`, `MENU_TYPE`) VALUES ('6008', '', 'A', NULL, 'S');
INSERT INTO `bfm_menu_dir` (`MENU_ID`, `DIR_ID`, `STATE`, `STATE_DATE`) VALUES ('6008', '7002', 'A', NULL);
INSERT INTO `bfm_user_priv` (`USER_ID`, `PRIV_ID`) VALUES ('1', '6008');
commit;
