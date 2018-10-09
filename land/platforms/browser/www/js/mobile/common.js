//ajax调用
function myAjax(type, url, cb, data) {
    $.ajax({
        type: type,
        url: config.ajax_url + url,
        data: data,
        dataType: "json",
        beforeSend: function (req) {
            if (window.localStorage.token) {
                req.setRequestHeader("token", window.localStorage.token);
            }
            if (window.localStorage.body) {
                req.setRequestHeader("body", window.localStorage.body);
            }
        },
        success: function (res) {
            if (res) {
                cb(res);
            }
        },
        error: function (xhr, status) {
            //请求来自首页, token失效，跳转到登录页
            if (url == "/v1/api/land" && window.location.href.indexOf("home.html") > -1) {
                window.location.href = "./index.html";

            } else if (url == "/v1/api/land") {
                //请求来自登录页
                $("#yz_FailBox").show();
                getImgCode();
            }
            // alert(url)
        }
    });
}
// 横屏竖屏
function compatibleScreen() {
    window.addEventListener('resize', function () {
        // 设置地图的高度
        $(".map").height(document.body.clientHeight*0.7);
        //控制html标签的font-size
        var base_fontsize = document.documentElement.clientWidth / 3.75;
        base_fontsize = base_fontsize > 110 ? 110 : base_fontsize;
        document.documentElement.style.fontSize = base_fontsize + 'px';
        temp = 0;
        tempLine = 0;
        //初始化图件的位置
        $('.imageShowed').css({
            "transform":  "translate(0,0)",
        });
    },false);

    window.addEventListener("orientationChange", function () {
        // 设置地图的高度
        $(".map").height(document.body.clientHeight*0.7);
        //控制html标签的font-size
        var base_fontsize = document.documentElement.clientWidth / 3.75;
        base_fontsize = base_fontsize > 110 ? 110 : base_fontsize;
        document.documentElement.style.fontSize = base_fontsize + 'px';
        temp = 0;
        tempLine = 0;
        //初始化图件的位置
        $('.imageShowed').css({
            "transform":  "translate(0,0)",
        });
    }, false);
}
compatibleScreen();
//获取验证码
function getImgCode() {
    myAjax("GET", "/v1/api/captcha", function (res) {
        $("#img_code").prop("src", res.captcha);
        config.id = res.id;
    });

}
//校验权证号码位数
function checkQZHM(identity) {
    var reg = /^[0-9a-zA-Z]{19}$/;
    return reg.test(identity);
}
//返回主页
$("#home_it").prop("href", config.home_url);

// 将键值转换为大写
function toUpperCase(obj, data) {
    data = data || {};
    for (var key in obj) {
        if (Object.prototype.toString.call(obj[key]) == "[object Object]") {
            data[key.toUpperCase()] = {};
            toUpperCase(obj[key], data[key.toUpperCase()]);

        } else if (Object.prototype.toString.call(obj[key]) == "[object Array]") {
            data[key.toUpperCase()] = [];
            toUpperCase(obj[key], data[key.toUpperCase()]);

        } else {
           data[key.toUpperCase()] = obj[key];
        }
    }
    return data;
}
//判断承包经营权取得方式
function cbjyq_way(item) {
    switch(item) {
        case '100':
            item = '承包';
            break;
        case '110':
            item = '家庭承包';
            break;
        case '120':
            item = '其他方式承包';
            break;
        case '121':
            item = '招标';
            break;
        case '122':
            item = '拍卖';
            break;
        case '123':
            item = '公开协商';
            break;
        case '129':
            item = '其他方式';
            break;
        case '200':
            item = '转让';
            break;
        case '300':
            item = '互换';
            break;
        case '900':
            item = '其他方式';
            break;
    }
    return item;
}
//与户主关系
function memberRelation(item) {
    switch (item) {
        case '01':
            item = '本人';
            break;
        case '02':
            item = '户主';
            break;
        case '10':
            item = '配偶';
            break;
        case '11':
            item = '夫';
            break;
        case '12':
            item = '妻';
            break;
        case '20':
            item = '子';
            break;
        case '21':
            item = '独生子';
            break;
        case '22':
            item = '长子';
            break;
        case '23':
            item = '次子';
            break;
        case '24':
            item = '三子';
            break;
        case '25':
            item = '四子';
            break;
        case '26':
            item = '五子';
            break;
        case '27':
            item = '养子或继子';
            break;
        case '28':
            item = '女婿';
            break;
        case '29':
            item = '其他儿子';
            break;
        case '30':
            item = '女';
            break;
        case '31':
            item = '独生女';
            break;
        case '32':
            item = '长女';
            break;
        case '33':
            item = '次女';
            break;
        case '34':
            item = '三女';
            break;
        case '35':
            item = '四女';
            break;
        case '36':
            item = '五女';
            break;
        case '37':
            item = '养女或继女';
            break;
        case '38':
            item = '儿媳';
            break;
        case '39':
            item = '其他女儿';
            break;
        case '40':
            item = '孙子、孙女或外孙子、外孙女';
            break;
        case '41':
            item = '孙子';
            break;
        case '42':
            item = '孙女';
            break;
        case '43':
            item = '外孙子';
            break;
        case '44':
            item = '外孙女';
            break;
        case '45':
            item = '孙媳妇或外孙媳妇';
            break;
        case '46':
            item = '孙女婿或外孙女婿';
            break;
        case '47':
            item = '曾孙子或外曾孙子';
            break;
        case '48':
            item = '曾孙女或外曾孙女';
            break;
        case '49':
            item = '其他孙子、孙女或外孙子、外孙女';
            break;
        case '50':
            item = '父母';
            break;
        case '51':
            item = '父亲';
            break;
        case '52':
            item = '母亲';
            break;
        case '53':
            item = '公公';
            break;
        case '54':
            item = "婆婆";
            break;
        case '55':
            item = "岳父";
            break;
        case '56':
            item = "岳母";
            break;
        case '57':
            item = "继父或养父";
            break;
        case '58':
            item = "继母或养母";
            break;
        case '59':
            item = "其他父母关系";
            break;
        case '60':
            item = "祖父母或外祖父母";
            break;
        case '61':
            item = "祖父";
            break;
        case '62':
            item = "祖母";
            break;
        case '63':
            item = "外祖父";
            break;
        case '64':
            item = "外祖母";
            break;
        case '65':
            item = "配偶的祖父母或外祖父母";
            break;
        case '66':
            item = "曾祖父";
            break;
        case '67':
            item = "曾祖母";
            break;
        case '68':
            item = "配偶的曾祖父母或外曾祖父母";
            break;
        case '69':
            item = "其他祖父母或外祖父母关系";
            break;
        case '70':
            item = "兄弟姐妹";
            break;
        case '71':
            item = "兄";
            break;
        case '72':
            item = "嫂";
            break;
        case '73':
            item = "弟";
            break;
        case '74':
            item = "弟媳";
            break;
        case '75':
            item = "姐姐";
            break;
        case '76':
            item = "姐夫";
            break;
        case '77':
            item = "妹妹";
            break;
        case '78':
            item = "妹夫";
            break;
        case '79':
            item = "其他兄弟姐妹";
            break;
        case '80':
            item = "其他";
            break;
        case '81':
            item = "伯父";
            break;
        case '82':
            item = "伯母";
            break;
        case '83':
            item = "叔父";
            break;
        case '84':
            item = "婶母";
            break;
        case '85':
            item = "舅父";
            break;
        case '86':
            item = "舅母";
            break;
        case '87':
            item = "姨父";
            break;
        case '88':
            item = "姨母";
            break;
        case '89':
            item = "姑父";
            break;
        case '90':
            item = "姑母";
            break;
        case '91':
            item = "堂兄弟、堂姐妹";
            break;
        case '92':
            item = "表兄弟、表姐妹";
            break;
        case '93':
            item = "侄子";
            break;
        case '94':
            item = "侄女";
            break;
        case '95':
            item = "外甥";
            break;
        case '96':
            item = "外甥女";
            break;
        case '97':
            item = "其他亲属";
            break;
        // case '98':
        //     item = "";
        //     break;
        case '99':
            item = "非亲属";
            break;
    }
    return item;
}
//家庭成员备注
function memberBz(item) {
    switch (item) { //成员备注判断
        case '1':
            item = '外嫁女';
            break;
        case '2':
            item = '入赘男';
            break;
        case '3':
            item = '在校大学生';
            break;
        case '4':
            item = '国家公职人员';
            break;
        case '5':
            item = '军人（军官、士兵）';
            break;
        case '6':
            item = '新生儿';
            break;
        case '7':
            item = '去世';
            break;
        case '9':
            item = '其他备注';
            break;
    }
    return item;
}
function Base64() {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };

    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }
}

Date.prototype.pattern = function (fmt) {
    var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};