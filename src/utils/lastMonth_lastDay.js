export default {
    lastDay:function() {
        var myDate = new Date;
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        var today = myDate.getDate() ;
        today = (today < 10 ? "0" + today : today);
        //上个月的年份
        var lastMonth_year = (month - 1 == 0 ? year - 1 : year);
        //上个月的月份
        var lastMonth = (month - 1 == 0 ? 12 : (month - 1));
        lastMonth = (lastMonth < 10 ? "0" + lastMonth : lastMonth);
        //上个月的最后一天
        var lastMonth_lastDate;
        if(lastMonth == 1 || lastMonth == 3 || lastMonth == 5 || lastMonth == 7 || lastMonth == 8 || lastMonth == 10 || lastMonth == 12) {
            lastMonth_lastDate = 31;
        } else if(lastMonth == 4 || lastMonth == 6 || lastMonth == 9 || lastMonth == 11) {
            lastMonth_lastDate = 30;
        } else if(lastMonth == 2) {
            var cond1 = lastMonth_year % 4 == 0; //条件1：年份必须要能被4整除
            var cond2 = lastMonth_year % 100 != 0; //条件2：年份不能是整百数
            var cond3 = lastMonth_year % 400 == 0; //条件3：年份是400的倍数
            var cond = cond1 && cond2 || cond3;
            if(cond) {
                lastMonth_lastDate = 29
            } else {
                lastMonth_lastDate = 28
            }
        }
        var lastMonth_lastDay_date = lastMonth_year + '-' + lastMonth + '-' + lastMonth_lastDate;
        var lastDay = lastMonth_year + '-' + lastMonth; //2019-01
        function day() {
            return lastMonth_lastDay_date
        }
        function lastMonth() {
            return lastMonth
        }
    }
}