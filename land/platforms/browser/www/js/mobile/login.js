$(function () {
    config.id = "";
    //清理信息
    function clearInfo() {
        window.localStorage.clear();
    }
    clearInfo();

    getImgCode();
    //单击验证码刷新
    $("#img_code").click(function () {
        getImgCode();
    });

    //校验必选项，校验成功，返回输入的验证码
    function checkItems() {
        var b = new Base64(),
            str = "",
            name = $("#name").val().trim(),
            idcard_type = $("#idcard_type").val(),        //证件类型
            idcard = $("#idcard").val().trim(),           //证件号码
            qzcard = $("#qzcard").val().trim(),
            input_code = $("#input_code").val().trim();   //验证码
        var errorInfo = "", //错误信息
            nullArr = [];   //空值判断

        //空值判断 start
        if (!!!name) {
            nullArr.push("姓名");

        }
        if (!!!idcard) {
            nullArr.push("证件号码");

        }
        if (!!!qzcard) {
            nullArr.push("承包经营权证号码");

        }
        if (!!!input_code) {
            nullArr.push("验证码")
        }
        if (nullArr.length) {
            errorInfo = "输入信息缺少以下内容：<br/>";
            errorInfo += nullArr.join("，");
            $("#null_error").html(errorInfo);
            $("#null_Tipbox").show();
            return false;
        }
        // 空值判断 end
        // 格式判断 start
        if (!checkQZHM(qzcard)) {
            errorInfo = "权证号码格式不正确";
            $("#null_error").html(errorInfo);
            $("#null_Tipbox").show();
            return false;
        }
        // 格式判断 end
        str = name + "&" + idcard_type + "&" + idcard + "&" + qzcard;
        str = b.encode(str);
        window.localStorage.body = str;
        return input_code;
    }
    function getLandInfo() {
        //验证失败，在error中提示
        myAjax("GET", "/v1/api/land", function (res) {
            $("#yz_SuccessBox").show();
            window.localStorage.cbhtbm = $("#qzcard").val().trim();
            window.localStorage.res = JSON.stringify(toUpperCase(res));
            window.localStorage.loginTime = new Date().getTime();
            setTimeout(function () {
                window.location.href = './home.html'; //转到首页
            }, 1000)
        });
    }
    //校验验证码, 成功后获取承包信息
    function verifyCode(input_code) {
        var data = {"id": config.id, "code": input_code};

        myAjax("POST", "/v1/api/captcha", function (res) {
            if (res.pass) {
                window.localStorage.token = res.token;
                //如果验证码校验成功，查询承包信息，跳转
                    //*需验证码填写正确，获取token
                    //*必填项转base64位码, 获取body
                getLandInfo();
            } else {
                $("#null_error").html("验证码不正确，请重新输入");
                $("#null_Tipbox").show();
                getImgCode(); //刷新验证码
            }
        }, data);

    }
    //登录
    function login() {
        //对必选项的校验
        var input_code = checkItems();
        //对验证码的校验
        if (input_code && input_code !== false) {
            verifyCode(input_code);
        }
    }
    $("#login").click(function () {
        login();
    });

});