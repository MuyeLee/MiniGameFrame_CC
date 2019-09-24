namespace NetStat{
    /** 
	* 数据错误
	*/ 
    export const DATAERROR = -1;

    /** 
	* 连接服务器失败
	*/ 
    export const CONNECTERR = 0;
    
    /** 
	* 操作成功
	*/ 
    export const SUCCESS = 1;

    /** 
	* 和数据库中数据不同，如:帐号密码错误
	*/ 
    export const FAILED = 2;

    /** 
	* 和数据库中无此数据
	*/ 
    export const NONEDATA = 3;

    /** 
	* 操作数据库失败，如:操作数据库是报错
	*/ 
    export const DBERROR = 4;
    
    /**
     * 访问的方法不存在
     */
    export const LOGICNONENTITY = 5;
}
