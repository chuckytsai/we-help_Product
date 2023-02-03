// 預設預購時間與價格
var selectTime = "早上 9 點到下午 4 點";
var pay = "2000";


// 該網頁的網址擷取
pageId = (location.href.split('/attraction/')[1]);

src = "/api/attraction/"
src = src + pageId

window.onload = function () {
    navBar()
    welcomeDiv()
    checkProcess()
};

// =======================景點照片,訂購,各類資訊建構======================
async function welcomeDiv() {
    // fetch資訊
    await fetch(src)
        .then(response => {
            return response.json();
        })
        .then(r => {
            imgsSS = (r.data[0].images.split("']")[0].split("['")[1].split("', '"));
            // console.log(imgsSS[0])
            TaipeiTrip(r, imgsSS)
        }).catch(function (error) {
            console.log(error)
            console.innerHTML = '查無資料';
        });

    function TaipeiTrip(y, imgsSS) {
        var findTrip = document.createElement('main'); //建立findTrip的main標籤
        var monBanner = document.createElement('div'); //建立monBanner的div標籤
        var bannerLeft = document.createElement('div'); //建立bannerLeft的div標籤
        var preview = document.createElement('div'); //建立preview的div標籤
        var dotSS = document.createElement('div'); //建立dotSS的div標籤
        var returnBtn = document.createElement('span'); //建立returnBtn的span標籤
        var nextBtn = document.createElement('span'); //建立nextBtn的span標籤
        var previewPic1 = document.createElement('img'); //建立previewPic1的img標籤
        var previewPic2 = document.createElement('img'); //建立previewPic2的img標籤
        var previewPic3 = document.createElement('img'); //建立previewPic3的img標籤
        var previewPic4 = document.createElement('img'); //建立previewPic4的img標籤
        var previewPic5 = document.createElement('img'); //建立previewPic5的img標籤
        var previewPic6 = document.createElement('img'); //建立previewPic6的img標籤
        var previewPic7 = document.createElement('img'); //建立previewPic7的img標籤
        var previewPic8 = document.createElement('img'); //建立previewPic8的img標籤
        var bannerRright = document.createElement('div'); //建立bannerLeft的div標籤
        var name = document.createElement('h6'); //建立name的h6標籤
        var nameContene = document.createTextNode(y.data[0].name);//景點名稱文字
        var catAndMrt = document.createElement('div');//建立catAndMrt的div標籤
        var typeh6 = document.createElement('h6');//建立景點類型的h6標籤
        var mrth6 = document.createElement('h6');//建立景點捷運的h6標籤
        var typeContene = document.createTextNode(y.data[0].category);//景點類型文字
        var mrtContene = document.createTextNode('at ' + y.data[0].address);//景點捷運文字
        var tripOrder = document.createElement('div'); //建立tripOrder的div標籤
        var buyH5 = document.createElement('h5');//建立訂購導覽行程的h5標籤
        var buyH5Contene = document.createTextNode('訂購導覽行程');//訂購導覽行程文字
        var buyH6 = document.createElement('h6');//建立訂購導覽行程的h5標籤
        var buyStoryContene = document.createTextNode('以此景點為中心的一日行程，帶您探索城市角落故事');//以此景點為中心的一日行程，帶您探索城市角落故事文字
        var dataSelect = document.createElement('h5');//建立訂購導覽行程的h5標籤
        var dataSelectText = document.createTextNode('選擇日期 : ');//選擇日期文字
        var selectDateInput = document.createElement('input');//建立選擇日期行程的input標籤
        selectDateInput.type = "date";
        var selectTime = document.createElement('h5');//建立選擇時間的h5標籤
        var selectTimeContene = document.createTextNode('選擇時間 : ');//選擇時間文字
        var selecTime = document.createElement('div');//建立選擇時段的div標籤
        var selectAM = document.createElement('span');//建立上午時段的span標籤
        var selectAMText = document.createTextNode('上半天');//上午時間文字
        var selectPM = document.createElement('span');//建立下午時段的span標籤
        var selectPMText = document.createTextNode('下半天');//下午時間文字
        var selectPM = document.createElement('span');//建立下午時段的span標籤
        var guidebook = document.createElement('h5')//建立導覽費用的h5
        var guidebookText = document.createTextNode('導覽費用 : ');//導覽費用 : 文字
        var tripPay = document.createElement('div')//建立費用文字的div
        var tripPayText = document.createTextNode('2000元');//費用數字文字
        var buyButton = document.createElement('button')//開始預訂行程的button標籤
        var buyButtonText = document.createTextNode('開始預訂行程');//費用數字文字
        var hr = document.createElement('hr');//中線
        var taipeiText = document.createElement('div');//建立taipeiText的div
        var Introduction = document.createElement('h6');//建立景點介紹的h6標籤
        var taipeiText = document.createElement('div');//建立taipeiText的div
        var Introduction = document.createElement('h6');//建立景點介紹的h6標籤
        var taipeiText = document.createElement('div');//建立taipeiText的div
        var Introduction = document.createElement('h6');//建立景點介紹的h6標籤
        var taipeiText = document.createElement('div');//建立taipeiText的div
        var Introduction = document.createElement('h6');//建立景點介紹的h6標籤
        var IntroductionText = document.createTextNode(y.data[0].description);//景點介紹文字
        var addressTitle = document.createElement('h5');//建立景點地址標題的h5標籤
        var addressTitleText = document.createTextNode('景點地址 : ');//景點地址標題文字
        var address = document.createElement('h6');//建立景點地址的h6標籤
        var addressText = document.createTextNode(y.data[0].transport);//景點地址文字
        var traffic = document.createElement('h5');//建立交通方式標題的h5標籤
        var trafficText = document.createTextNode('交通方式 : ');//景點介紹文字
        var bus = document.createElement('h6');//建立景點介紹的h6標籤
        var busText = document.createTextNode(y.data[0].mrt);//交通方式文字

        findTrip.appendChild(monBanner); //把建立monBanner的div塞進findTrip
        monBanner.appendChild(bannerLeft); //把建立bannerLeft的div塞進monBanner
        bannerLeft.appendChild(preview); //把建立preview的div塞進monBanner
        preview.appendChild(returnBtn); //把建立returnBtn的div塞進preview
        preview.appendChild(nextBtn); //把建立nextBtn的div塞進preview
        preview.appendChild(previewPic1); //把建立previewPic1的img塞進preview
        preview.appendChild(previewPic2); //把建立previewPic2的img塞進preview
        preview.appendChild(previewPic3); //把建立previewPic3的img塞進preview
        preview.appendChild(previewPic4); //把建立previewPic4的img塞進preview
        preview.appendChild(previewPic5); //把建立previewPic5的img塞進preview
        preview.appendChild(previewPic6); //把建立previewPic6的img塞進preview
        preview.appendChild(previewPic7); //把建立previewPic7的img塞進preview
        preview.appendChild(previewPic8); //把建立previewPic8的img塞進preview
        monBanner.appendChild(bannerRright); //把建立bannerRright的div塞進monBanner
        bannerRright.appendChild(name); //把建立name的h6塞進bannerRright
        name.appendChild(nameContene); //把nameContene的內容塞進name的h6標籤
        bannerRright.appendChild(catAndMrt); //把建立catAndMrt的div塞進bannerRright
        catAndMrt.appendChild(typeh6); //把建立typeh6的h6塞進catAndMrt
        catAndMrt.appendChild(mrth6); //把建立mrth6的h6塞進catAndMrt
        typeh6.appendChild(typeContene); //把typeContene的內容塞進typeh6的h6標籤
        mrth6.appendChild(mrtContene); //把mrtContene的內容塞進mrth6的h6標籤
        bannerRright.appendChild(tripOrder); //把建立tripOrder的div塞進bannerRright
        tripOrder.appendChild(buyH5); //把建立buyH5的h5塞進tripOrder
        buyH5.appendChild(buyH5Contene); //把buyH5Contene的內容塞進buyH5的h5標籤
        tripOrder.appendChild(buyH6); //把建立buyStory的h6塞進tripOrder
        buyH6.appendChild(buyStoryContene); //把buyStoryContene的內容塞進buyStory的h6標籤
        tripOrder.appendChild(dataSelect); //把建立dataSelect的h5塞進tripOrder
        dataSelect.appendChild(dataSelectText); //把dataSelectText的內容塞進buyStory的h5標籤
        tripOrder.appendChild(selectDateInput); //把建立input塞進tripOrder
        tripOrder.appendChild(selectTime); //把建立selectTime的h5塞進tripOrder
        selectTime.appendChild(selectTimeContene); //把dataSelectText的內容塞進buyStory的h5標籤
        tripOrder.appendChild(selecTime); //把建立selecTime的div塞進tripOrder
        selecTime.appendChild(selectAM); //把建立selectAM的span塞進selecTime
        selecTime.appendChild(selectAMText); //把selectAM的內容塞進buyStory的h5標籤
        selecTime.appendChild(selectPM); //把建立selectPM的span塞進selecTime
        selecTime.appendChild(selectPMText); //把selectPM的內容塞進buyStory的h5標籤
        tripOrder.appendChild(guidebook); //把建立guidebook的h5塞進tripOrder
        guidebook.appendChild(guidebookText); //把guidebookText的內容塞進guidebook的h5標籤
        tripOrder.appendChild(tripPay); //把建立tripPay的div塞進tripOrder
        tripPay.appendChild(tripPayText); //把tripPayText的內容塞進tripPay的div標籤
        tripOrder.appendChild(buyButton); //把建立buyButton的button塞進tripOrder
        buyButton.appendChild(buyButtonText); //把buyButtonTtxt的內容塞進buyButton的div標籤
        findTrip.appendChild(hr); //把hr塞進findTrip
        findTrip.appendChild(taipeiText); //把建立taipeiText的div塞進findTrip
        taipeiText.appendChild(Introduction); //把建立Introduction的div塞進taipeiText
        Introduction.appendChild(IntroductionText); //把IntroductionText的內容塞進Introduction的h6標籤
        taipeiText.appendChild(addressTitle); //把建立address的div塞進taipeiText
        addressTitle.appendChild(addressTitleText); //把address的內容塞進address的h6標籤
        taipeiText.appendChild(address); //把建立addressTitle的div塞進taipeiText
        address.appendChild(addressText); //把addressTitleText的內容塞進addressTitle的h6標籤
        taipeiText.appendChild(traffic); //把建立traffic的h5塞進taipeiText
        traffic.appendChild(trafficText); //把trafficText的內容塞進traffic的h6標籤
        taipeiText.appendChild(bus); //把建立交通方式的h5塞進taipeiText
        preview.appendChild(dotSS); //把dotSS塞進preview
        bus.appendChild(busText); //把交通方式的內容塞進bus的h6標籤
        previewPic1.src = 'https://' + imgsSS[0];
        previewPic2.src = 'https://' + imgsSS[1];
        previewPic3.src = 'https://' + imgsSS[2];
        previewPic4.src = 'https://' + imgsSS[3];
        previewPic5.src = 'https://' + imgsSS[4];
        previewPic6.src = 'https://' + imgsSS[5];
        previewPic7.src = 'https://' + imgsSS[6];
        previewPic8.src = 'https://' + imgsSS[7];
        document.getElementById('OnedayTrip').append(findTrip);

        //  =====class & id 命名======
        findTrip.id = "findTrip";
        monBanner.id = 'monBanner';
        bannerLeft.className = "bannerLeft";
        preview.id = "preview";
        returnBtn.id = "returnBtn";
        nextBtn.id = "nextBtn";
        previewPic1.className = "previewPic previewPicNone";
        previewPic2.className = "previewPic previewPicNone";
        previewPic3.className = "previewPic previewPicNone";
        previewPic4.className = "previewPic previewPicNone";
        previewPic5.className = "previewPic previewPicNone";
        previewPic6.className = "previewPic previewPicNone";
        previewPic7.className = "previewPic previewPicNone";
        previewPic8.className = "previewPic previewPicNone";
        bannerRright.className = "bannerRright";
        name.className = "name";
        catAndMrt.className = "catAndMrt";
        tripOrder.className = "tripOrder"
        buyH6.className = "buyStory";
        dataSelect.className = "buyH5";
        selectDateInput.className = "selectDate";
        selectDateInput.name = "selectDate";
        selectDateInput.id = "selectDate";
        selectTime.className = "buyH5";
        selecTime.className = "selecTime";
        selectAM.id = "selectAM";
        selectAM.className = "selectPointBlue";
        selectPM.id = "selectPM";
        selectPM.className = "selectPoint";
        guidebook.className = "buyH5";
        tripPay.id = "tripPay";
        tripPay.className = "tripPay";
        buyButton.id = "buyButton";
        buyButton.className = "buyButton";
        taipeiText.className = "taipeiText";
        Introduction.className = "tripStory"
        addressTitle.className = "TripH5";
        address.className = "tripStory";
        traffic.className = "TripH5";
        bus.className = "tripStory";
        dotSS.className = "dots";


        // 開始預購行程執行
        buyButton.onclick = function () {
            bookingIng(y.data[0].name, y.data[0].transport, 'https://' + imgsSS[0])
        }

        // ======================白天與夜晚價格變化======================
        var selectAM = document.getElementById("selectAM");
        var selectPM = document.getElementById("selectPM");
        var tripPay = document.getElementById("tripPay");

        selectAM.onclick = function () {
            selectAM.className = 'selectPointBlue';
            selectPM.className = 'selectPoint';
            tripPay.innerHTML = "2000元";
            selectTime = "早上 9 點到下午 4 點";
            pay = "2000";
        }

        selectPM.onclick = function () {
            selectPM.className = 'selectPointBlue';
            selectAM.className = 'selectPoint';
            tripPay.innerHTML = "2500元";
            selectTime = "下午 2 點到晚上 9 點";
            pay = "2500";
        }

        // ======================判別圖片是否存在======================
        if (previewPic2.src == "https://undefined/") {
            preview.removeChild(previewPic2);
        }
        if (previewPic3.src == "https://undefined/") {
            preview.removeChild(previewPic3);
        }
        if (previewPic4.src == "https://undefined/") {
            preview.removeChild(previewPic4);
        }
        if (previewPic5.src == "https://undefined/") {
            preview.removeChild(previewPic5);
        }
        if (previewPic6.src == "https://undefined/") {
            preview.removeChild(previewPic6);
        }
        if (previewPic7.src == "https://undefined/") {
            preview.removeChild(previewPic7);
        }
        if (previewPic8.src == "https://undefined/") {
            preview.removeChild(previewPic8);
        }

        // ===========================製作白色dot===========================
        var cost = document.querySelectorAll(".previewPic");

        // ======================選取圖片的白點======================
        function dots() {
            for (var i = 0; i < cost.length; i++) {
                var dot = document.createElement('li'); //建立dot的li標籤
                dotSS.appendChild(dot); //把建立dot塞進findTrip
                dot.setAttribute("data", i);
                dot.className = "dot";
            }

        }
        dots()
        //獲取左右button
        var oLeft = document.getElementById("returnBtn");
        var oRight = document.getElementById("nextBtn");
        //獲取全部圖片的集合
        var aImages = document.querySelectorAll('.previewPicNone');
        //獲取全部li的集合
        var aTab = document.querySelectorAll('.dot');

        // 預設第一張圖 % dot效果
        aImages[0].className = "previewPic";
        aTab[0].style.backgroundColor = "#666666";

        index = 0,//當前索引下標
            lastIndex = 0;//上一次圖片的下標

        //點選小圓點
        for (var i = 0; i < aTab.length; i++) {
            aTab[i].index = i;
            aTab[i].onclick = function () {
                var This = this.index;//this作用域
                change(function () {
                    index = This;
                });
            }
        }

        //左單擊事件
        oLeft.onclick = function () {
            change(function () {
                index--;
                if (index < 0) {
                    index = aImages.length - 1;
                }
            });
        }

        //右單擊事件
        oRight.onclick = rightButton;
        function rightButton() {
            change(function () {
                index++;
                index %= aImages.length;//迴圈
            });
        }

        // 自動輪撥
        function doStuff() {
            rightButton();
            setTimeout(doStuff, 5000);
        }
        setTimeout(doStuff, 5000);

        //變換函式
        function change(callback) {
            aImages[lastIndex].className = 'previewPicNone';//清除上一次
            aTab[lastIndex].style.backgroundColor = "";
            callback();//回撥函式
            aImages[index].className = 'previewPic';
            aTab[index].style.backgroundColor = "#666666";
            lastIndex = index;
        }
    }
};


// 預約行程
function bookingStroke(tripName, tripAdress, tripImg) {
    let dataSelect = document.getElementById('selectDate').value
    let Today = new Date();
    Today = (Today.getFullYear() + "-" + (Today.getMonth() + 1 < 10 ? '0' : '') + (Today.getMonth() + 1) + "-" + (Today.getDate() + 1 < 10 ? '0' : '') + (Today.getDate() + 1));

    if (dataSelect != "") {
        if (dataSelect.split('-')[1] >= Today.split('-')[1] & dataSelect.split('-')[2] > Today.split('-')[2]) {
            fetch("/api/booking", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    attractionid: pageId,
                    name: tripName,
                    address: tripAdress,
                    imges: tripImg,
                    date: dataSelect,
                    time: selectTime,
                    price: pay,
                    payMoney: 'no'
                }),
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data['error'])
                    if (data['error'] == true) {
                        document.getElementById("memberError").style.display = "block";
                        document.getElementById("memberErrorBox").innerHTML = "該景點，您已經預約過了";
                    }
                    else {
                        location = "/booking";
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            document.getElementById("memberError").style.display = "block";
            document.getElementById("memberErrorBox").innerHTML = "日期必須是今天過後";
        }

    }
    else {
        document.getElementById("memberError").style.display = "block";
        document.getElementById("memberErrorBox").innerHTML = "請選擇日期";
    }
}

async function checkBookingProcess() {
    await fetch("/api/user", { method: "GET" })
        .then(response => {
            return response.json()
        })
        .then(res => {
            console.log(res)
            if (res.data == true) {
                location = "/booking"
            } else {
                memberBoxLogin.style.display = "block";
            }
        })
}

async function bookingIng(tripName, tripAdress, tripImg) {
    await fetch("/api/user", { method: "GET" })
        .then(response => {
            return response.json()
        })
        .then(res => {
            if (res.data == true) {
                bookingStroke(tripName, tripAdress, tripImg)
            } else {
                document.getElementById("memberBoxLogin").style.display = "block";
            }
        })
}
