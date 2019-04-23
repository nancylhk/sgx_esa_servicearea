/**
 * Created by 陈雪颖
 */
export default {

	/*校验字符是否为空*/

	/*校验账户名*/
	isUserName: function(rule, value, callback) {
		if(!value) {
			return callback(new Error('请输入账户名'));
		}
		// const reg = /^[a-zA-Z0-9_-]{4,16}$/;
		const reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,20}$/;

		if(!reg.test(value)) {
			callback(new Error('账户名格式不正确,以字母开头,可包含“_”,长度为4-20个字符之间'));
		} else {
			callback();
		}
	},

	/*校验真实姓名*/
	isRealName: function(rule, value, callback) {
		if(!value) {
			return callback(new Error('请输入姓名'));
		}
		const reg = /^[\u4e00-\u9fa5]{2,20}$/;

		if(!reg.test(value)) {
			callback(new Error('姓名格式不正确'));
		} else {
			callback();
		}
	},

	/*校验整*/
	isInteger: function(rule, value, callback) {
		//      if (!value) {
		//        return callback(new Error('该项不能为空'));
		//      }
		const reg = /^[0-9]*[1-9][0-9]*$/;
		if(!reg.test(value)) {
			callback(new Error('请输入整数'));
		} else {
			callback();
		}
	},

	/*校验数字*/
	isNumber: function(rule, value, callback) {
		//      if (!value) {
		//        return callback(new Error('该项不能为空'));
		//      }
		const reg =  /^[0-9]+(\.[0-9]{1,2})?$/;// 
		if(!reg.test(value)) {
			callback(new Error('请输入整数或小数点后两位'));
		} else {
			callback();
		}
	},
	/* 校验名称*/

	isItemName: function(rule, value, callback) {
		if(!value) {
			return callback(new Error('请输入名称'));
		}
		const reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){3,26}$/;
		if(!reg.test(value)) {
			callback(new Error('名称长度必须为3-26个字符之间，可包含中文、英文、数字'));
		} else {
			callback();
		}
	},

	/* 校验邮箱*/
	isEmail: function(rule, value, callback) {
		const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		//		if(!value) {
		//			return callback(new Error('邮箱不能为空'));
		//		}
		if(!reg.test(value) && value) {
			callback(new Error('邮箱格式不正确'));
		} else {
			callback();
		}
	},

	/*校验手机号码*/
	isPhoneTel: function(rule, value, callback) {
		const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
		if(!value) {
			return callback(new Error('请输入手机号码'));
		}
		if(!reg.test(value)) {
			callback(new Error('手机号码格式不正确'));
		} else {
			callback();
		}
	},

	/*校验手机号码和座机*/
	isPhoneOrMobile: function(rule, value, callback) {
		const regMobile = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
		const regPhone = /^0\d{2,3}-?\d{7,8}$/;
		if(!value) {
			return callback(new Error('请输入联系电话'));
		}
		if(!regPhone.test(value) && !regMobile.test(value)) {
			callback(new Error('联系电话格式不正确'));
		} else {
			callback();
		}

	},

	/*校验身份证号码*/
	isCardNo: function(rule, value, callback) {
		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
		if(!value) {
			return callback(new Error('请输入身份证号码'));
		}
		const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		//const reg = /^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|50|51|52|53|61|62|63|64|65)\\d{15}(\\d{1}|X)$/;
		if(!reg.test(value)) {
			callback(new Error('身份证号码格式不正确'));
		} else {
			callback();
		}
	},

}