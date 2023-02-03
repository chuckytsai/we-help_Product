// 建立全部景點div
let startPage = 0;
let isMouseAtBotton = false;
let viewPic = document.getElementById('viewPic');

window.onload = function () {

    navBar()
    searchPage(startPage)
    // for(let x=0 ;x<=(document.cookie)/12;x++){
    //     searchPage(x)
    // }
    document.documentElement.scrollHeight=9999999
    checkProcess()
    // getScrollPosition()
};

let keyword;
async function searchPage(item) {
    let curPage = 0;
    isMouseAtBotton = true;
    src = "/api/attractions?page=";
    if (item != null & keyword != null) {
        src += `${startPage}&keyword=${keyword}`
    } else (
        src += `${startPage}`
    )
    tripName = [];
    tripMrt = [];
    tripType = [];
    tripPic = [];
    await fetch(src)
        .then(response => {
            return response.json();
        })
        .then(r => {
            nextPage = r.nextPage;
            data = r.data
            findPic(data, curPage, data.length)
        }).catch(function (error) {
            console.log(error)
            console.innerHTML = '查無資料';
        });

    function findPic(dataSurce, dataInfo, pageShow) {
        for (let n = dataInfo; n < pageShow; n++) {
            tripName.push(dataSurce[n].name); //景點name
            tripMrt.push(dataSurce[n].address); //景點捷運站
            tripType.push(dataSurce[n].category); //景點類型
            tripPic.push(dataSurce[n].images[0].split("']")[0].split("['")[1].split("',")[0]); //景點圖片

            var urla = document.createElement('a'); //建立a標籤
            var divTag = document.createElement('div'); //建立div標籤
            var imgTag = document.createElement('img'); //建立img標籤
            var h6Tag = document.createElement('h6'); //建立h6標籤
            var h2Tag = document.createElement('h2'); //建立h2標籤
            var h4Tag = document.createElement('h4'); //建立h4標籤
            var pageAdd = document.getElementsByTagName('a').length
            urla.href = "/attraction/" + (pageAdd - 5)
            var h6name = document.createTextNode(tripName[n]); //景點名稱文字放入h6標籤
            var h2name = document.createTextNode(tripMrt[n]); //景點捷運名稱文字放入h2標籤
            var h4name = document.createTextNode(tripType[n]); //景點類型名稱文字放入h4標籤
            imgTag.src = "https://" + tripPic[n]; //增加回https://

            divTag.appendChild(h6name); //把h6內容放到div
            divTag.appendChild(h2name); //把h2內容放到div
            divTag.appendChild(h4name); //把h4內容放到div

            h6Tag.appendChild(h6name); //把文字內容放到h6
            h2Tag.appendChild(h2name); //把文字內容放到h2
            h4Tag.appendChild(h4name); //把文字內容放到h4

            urla.append(divTag); //把divTag的標籤塞進a標籤
            divTag.appendChild(imgTag); //把img的標籤塞進div
            divTag.append(h6Tag); //把h6的標籤塞進div
            divTag.append(h2Tag); //把h2的標籤塞進div
            divTag.append(h4Tag); //把h4的標籤塞進div

            divTag.className = 'stills'; //替div加入一個class的屬性.並給值
            h6Tag.className = 'name'; //替h6加入一個class的屬性.並給值
            h2Tag.className = 'nameMRT'; //替h5加入一個class的屬性.並給值
            h4Tag.className = 'nameCAT2'; //替h4加入一個class的屬性.並給值

            document.getElementsByTagName('main')[0].append(urla);
            if (tripMrt[n] == "None") {
                document.getElementsByClassName('nameMRT')[pageAdd - 6].innerText = " ";
            }
        }
        isMouseAtBotton = false;
    }
}

// ======滾動滑鼠======
window.addEventListener("scroll", () => {
    if (nextPage != null) {

        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        // console.log(document.documentElement.scrollHeight)
        // console.log(document.body.scrollHeight)
        // console.log(window.scrollY)
        if (Math.ceil(scrolled) === scrollable) {

            if (isMouseAtBotton == false) {
                isMouseAtBotton = true;
                startPage = nextPage;

                searchPage(startPage)
            }
        }
    }
})

// =====搜尋關鍵字=====
document.getElementById('inquireTripNameBtn').addEventListener("click", () => {
    viewPic.innerHTML = ""
    startPage = 0
    keyword = document.getElementById('inquireTripName').value;
    searchPage(startPage)
})


document.getElementById('inquireTripNameForm').addEventListener("click", (e) => {
    viewPic.innerHTML = ""
    startPage = 0
    keyword = document.getElementById('inquireTripName').value;
    searchPage(startPage)
    e.preventDefault()
})


   //一般會在html的body標籤上加上 onload 與 onunload的事件
        //例如 onload="moveScol()" onunload="getScrollPosition()"
        function getScrollPosition()
        {
            var bodyTop = 0;
            if (typeof window.pageYOffset != "undefined")
            {
                bodyTop = window.pageYOffset;

            }
            else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat")
            {
                bodyTop = document.documentElement.scrollTop;
            }
            else if (typeof document.body != "undefined")
            {
                bodyTop = document.body.scrollTop;
            }
    
            document.cookie = bodyTop; //將Y座標位置紀錄在cookie上

        }

        function moveScol()
        {
            var scrollo_y = document.cookie.split(";")[0];
            if (scrollo_y != null) {
                window.scrollTo(100, scrollo_y);
            }
        }