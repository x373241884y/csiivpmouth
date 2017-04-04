#csiivpmouth
  Usage: vpm [options] <file> [yearmonth]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -c,--config <file>      set config file of login vp system,default in package root config.json
    -M,--yearmonth [value]  set pull which year and which month vp data(抓取数据201703)
    -s,--send               does need send to email (是否发送邮件)
    
    config in config.json
    {
      "username": "xuxihai@csii.com.cn",
      "password": "csii2015",
      "emailpwd": "xxxxx",
      "emailto":"xuxihai@csii.com.cn"
    }
