$(function () {
    //返回主页
    $("#home_it").prop("href", config.home_url);
    // 显示全部的承包经营权证代码
    $("#cbjyqzbm").click(function (e) {
        if (e.target.id == 'cbjyqzbm_part' || e.target.className=='star_hide') {
            $('#cbjyqzbm_part').hide();
            $("#cbjyqzbm_all").show();
        } else {
            $('#cbjyqzbm_all').hide();
            $("#cbjyqzbm_part").show();
        }
    });
    // 显示全部的合同代码
    $("#htdm").click(function (e) {
        if (e.target.id == 'htdm_part' || e.target.className=='star_hide') {
            $('#htdm_part').hide();
            $("#htdm_all").show();
        } else {
            $('#htdm_all').hide();
            $("#htdm_part").show();
        }
    });

    //根据行政区划代码，获取省市
    function getRegion(data, xzcode, secondCode) {
        var regionObj = {};
        for (var i = 0, len=data.length; i<len; i++) {
            regionObj[data[i].F_CODE] = data[i];
        }
        var provincesCode = xzcode.substring(0, 2) + '0000',   //省
            cityCode = xzcode.substring(0, 4) + '00';          //市
        // 读取网络位置: tdqq.9000.com上的图件 start
        if (secondCode) {
            //eg: file://tdqq.9000.com/public01/数管文件库/410000河南省/410103二七区/
            return config.file_image_url + provincesCode + regionObj[provincesCode].F_NAME + '/' + secondCode + regionObj[secondCode].F_NAME + "/";
        // 读取网络位置: tdqq.9000.com上的图件 end
        } else {
            return regionObj[provincesCode].F_NAME + regionObj[cityCode].F_NAME;
        }
    }


    function getLandInfo() {
        // myAjax("GET", "/v1/api/land", function (res) {
            res = window.localStorage.res ? JSON.parse(window.localStorage.res) : "";
            res = toUpperCase(res);
            // 承包基本信息 start
            var cbhtbm = res.CBHT.CBHTBM,
                xzcode = cbhtbm.substring(0, 6),
                provinceAndCity = getRegion(region, xzcode),
                cbfzjhm = res.CBF.CBFZJHM,
                cbqxq = new Date(res.CBJYQZDJB.CBQXQ).pattern("yyyy-MM-dd"),
                cbqxz = new Date(res.CBJYQZDJB.CBQXZ).pattern("yyyy-MM-dd");
            $("#currentUser").html(res.CBF.CBFMC);
            var cbjyqzbm_tag = "";
                cbjyqzbm_tag += "<a id='cbjyqzbm_part' title='显示全文'>"+ cbhtbm.substring(0, 5) + "<span class='star_hide'>********</span>" + cbhtbm.substring(cbhtbm.length - 5) +"</a>";
                cbjyqzbm_tag += "<a id='cbjyqzbm_all' title='隐藏' style='display:none'>" + cbhtbm + "</a>";
            $("#cbjyqzbm").html(cbjyqzbm_tag);

            $("#fbfqc").html(provinceAndCity + res.FBF.FBFMC);
            $("#cbfdb").html(res.CBF.CBFMC);
            $("#sfzh").html(cbfzjhm.substring(0, 4) + "********" + cbfzjhm.substring(cbfzjhm.length - 5));
            $("#cbfs").html(cbjyq_way(res.CBJYQZDJB.CBFS));

            var htdm_tag = "";
                htdm_tag += "<a id='htdm_part' title='显示全文'>"+ cbhtbm.substring(0, 5) + "<span class='star_hide'>********</span>" + cbhtbm.substring(cbhtbm.length - 5) +"</a>";
                htdm_tag += "<a id='htdm_all' title='隐藏' style='display:none'>" + cbhtbm + "</a>";
            $("#htdm").html(htdm_tag);

            $("#cbqx").html(cbqxq + "&nbsp;至&nbsp;" + cbqxz);
            // 承包基本信息 end
            // 承包方家庭成员 start
            var jtcy_str = "";
            for (var i=0, len=res.CBF_JTCY.length; i<len; i++) {
                jtcy_str += "<tr>";
                    jtcy_str += "<td>";
                    jtcy_str += i + 1;
                    jtcy_str += "</td>";
                    jtcy_str += "<td>";
                    jtcy_str += res.CBF_JTCY[i].CYXM;
                    jtcy_str += "</td>";
                    jtcy_str += "<td>";
                    jtcy_str += memberRelation(res.CBF_JTCY[i].YHZGX);
                    jtcy_str += "</td>";
                    jtcy_str += "<td>";
                    jtcy_str += memberBz(res.CBF_JTCY[i].CYBZ);
                    jtcy_str += "</td>";
                jtcy_str += "</tr>";
            }
            $("#cbfjtcy").html(jtcy_str);
            // 承包方家庭成员 end
            // 承包地块信息 start
            $("#qqzmjm").html((res.CBHT.HTZMJM).toFixed(2));
            $("#cbdkzs").html(res.CBHT.CBDKZS);
            var cbdkxx_str = "";
            for (var i=0, len=res.DK.length;i<len; i++) {
                cbdkxx_str += "<tr>";
                    cbdkxx_str += "<td>";
                        cbdkxx_str += i+1;
                    cbdkxx_str += "</td>";
                    cbdkxx_str += "<td>";
                        cbdkxx_str += res.DK[i].DKBM;
                    cbdkxx_str += "</td>";
                    cbdkxx_str += "<td>";
                        cbdkxx_str += '<div class="tl"><span class="label-to">东至：</span>'+ res.DK[i].DKDZ +'</div>';
                        cbdkxx_str += '<div class="tl"><span class="label-to">西至：</span>'+ res.DK[i].DKXZ +'</div>';
                        cbdkxx_str += '<div class="tl"><span class="label-to">南至：</span>'+ res.DK[i].DKNZ +'</div>';
                        cbdkxx_str += '<div class="tl"><span class="label-to">北至：</span>'+ res.DK[i].DKBZ +'</div>';
                    cbdkxx_str += "</td>";
                    cbdkxx_str += "<td>";
                        cbdkxx_str += res.DK[i].HTMJM;
                    cbdkxx_str += "</td>";
                    cbdkxx_str += "<td>";
                        cbdkxx_str += (res.DK[i].SFJBNT == '1' ? '是':'否');
                    cbdkxx_str += "</td>";
                    cbdkxx_str += "<td>";
                        cbdkxx_str += res.DK[i].DKBZXX;
                    cbdkxx_str += "</td>";
                cbdkxx_str += "</tr>";
            }

            $("#cbdkxx_body").html(cbdkxx_str);
            // 承包地块信息 end
            // 权证信息 start
            var fzrq = new Date(res.CBJYQZ.FZRQ).pattern("yyyy-MM-dd"),
                lqrzjhm = res.CBJYQZ.QZLQRZJHM;
            $("#qzlsh").html(res.CBJYQZDJB.CBJYQZLSH);
            $("#fzrq").html(fzrq);
            $("#fzjg").html(res.CBJYQZ.FZJG);
            $("#lqrxm").html(res.CBJYQZ.QZLQRXM);
            $("#lqrzjh").html(lqrzjhm.substring(0,5) + "********" +lqrzjhm.substring(lqrzjhm.length-5));
            $("#qzsflq").html(res.CBJYQZ.QZSFLQ == '1' ? '是': '否');
            // 权证信息 end
            // 汇交入库日期
            $("#import_date").html(new Date(res.CBHT.IMPORT_DATE).pattern("yyyy-MM-dd"));
            //是否确权确股
            if (res.DK[0].SFQQQG == '1') {
                $("#qqqg").show();
            } else if (res.DK[0].SFQQQG == '2') {
                $("#qqqg").hide();
            }
        // });
    }

    //移动端展示pdf
    function showPdfFile(data) {
        var fileContent = window.atob(data);
        PDFJS.getDocument({data:fileContent}).then(function getPdfHelloWorld(pdf) {

            pdf.getPage(1).then(function (page) {
                var scale = 1.8,
                    viewport = page.getViewport(scale),
                    canvas = document.getElementById("squirrelP"),
                    context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                }
                page.render(renderContext)

            })
        })
    }

    //文件系统读取图件
    var imgElement = document.getElementById('squirrel'),
        iframeElement = document.getElementById('squirrelP');
    if (config.closeS3 === true) {
            //获取文件系统-地块示意图 start
        //"图件\\51132210120301\\DKSYT511322101203010120J1.JPG"
        var xurl = config.image_url + "/ndrestful/api/cbjyqz/completeinfo?diccode=1&cbjyqzbm=" + window.localStorage.cbhtbm;
        $.ajax({
            type: "get",
            url: xurl,
            dataType: "json",
            success: function (res) {
                                console.log(res);
            },
            error: function (a) {
                // MOCK START
                if (config.env != "development") {
                    var result=JSON.parse(a.responseText.substring(5,a.responseText.length-1));
                } else {
                    var result=JSON.parse(a.responseText);
                }
                // MOCK END
                // 地块示意图 start
                var imgURL = result.data[0].cbdkfbt_url[0];

                if(imgURL.substring(imgURL.length-3, imgURL.length)=="pdf"){
                    showPdfFile(result.data[0].cbdkfbt_base64s[0]);
                    iframeElement.style.display="block";
                    imgElement.style.display="none";
                    $(iframeElement).addClass("imageShowed");
                    $(imgElement).removeClass("imageShowed");
                } else {
                    imgElement.src='data:image/jpg;base64,'+result.data[0].cbdkfbt_base64s[0];
                    iframeElement.style.display="none";
                    imgElement.style.display="inline-block";
                    $(imgElement).addClass("imageShowed");
                    $(iframeElement).removeClass("imageShowed");
                }
                //地块示意图end
            }
        });
        //获取文件系统-地块示意图 end
    } else {
        //对象存储
        if (window.localStorage.res) {
            var cbjyqzdjb = (JSON.parse(window.localStorage.res)).CBJYQZDJB;
            var dksyt = cbjyqzdjb.DKSYT;
            if (dksyt.substring(dksyt.length - 3, dksyt.length) === "pdf") {
                iframeElement.src = config.ajax_url + "/v1/api/photo?path="+ dksyt +"&isZip=true";

                iframeElement.style.display = "block";
                imgElement.style.display = "none";
                $(iframeElement).addClass("imageShowed");
                $(imgElement).removeClass("imageShowed");
            } else {
                imgElement.src = config.ajax_url + "/v1/api/photo?path="+ dksyt +"&isZip=true";
                iframeElement.style.display = "none";
                imgElement.style.display = "inline-block";
                $(imgElement).addClass("imageShowed");
                $(iframeElement).removeClass("imageShowed");
            }
        }

    }



    getLandInfo();

});