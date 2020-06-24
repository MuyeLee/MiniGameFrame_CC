const { ccclass, property } = cc._decorator;

@ccclass
export default class ArrayTools {

    /**
     * 数组转字符串
     * @param arr 数组(一维数组)
     * @param delimit 分隔符
     */
    public static ArrayToString<T>(arr: Array<T>, delimit: string): string {
        if(arr.length == 1){
            return arr[0]+'';
        }
        return arr.join(delimit);
    }

    public static StringToNumberArray(str: string, delimit: string): Array<number> {
        if (str != "" && str != undefined) {
            let arr_str: Array<string> = str.split(delimit);
            let arr_num: Array<number> = new Array<number>();
            for (let i = 0; i < arr_str.length; i++) {
                arr_num.push(parseInt(arr_str[i]));
            }
            return arr_num;
        }
        return new Array<number>();
    }

    public static StringToStringArray(str: string, delimit: string): Array<string> {
        if (str == "") return new Array<string>();
        let arr_str: Array<string> = str.split(delimit);
        return arr_str;
    }
}
