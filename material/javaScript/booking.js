window.onload = function () {
    navBar()
    checkProcess()
    bookingStroke()
};

function backIndex(){
setTimeout(function () {
    window.location = '/';
}, 1500);
}

document.getElementById("deleteStroke").onclick = function () {
    DeleteProcess()

}

async function DeleteProcess() {
    await fetch("/api/booking", { method: "DELETE" })
        .then(response => {
            return response.json()
        })
        .then(res => {
            document.getElementById("memberError").style.display = "block";
            document.getElementById("memberErrorBox").innerHTML = "已刪除該行程";
            backIndex();
        })
}

function bookingStroke() {
    fetch("/api/booking", {
        method: "POST",
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data['message'] == '目前沒有預約任何行程') {
                document.getElementById('wantBooking').style.display = 'none';
                document.getElementById('noBooking').style.display = 'block';
                document.getElementById('indexFooter').style.height = '1150px';
                document.getElementById('indexFooter').style.marginTop = '20px';
                document.getElementById('hello').append('您好，' + data['user'] + '，待預訂的行程如下：');
            }
            else {
                if (data["yetPay"] == undefined) {
                    window.location = '/'
                } else {
                    document.getElementById('bookingUser').append("您好，" + data["yetPay"][8] + "，待預訂的行程如下：");
                    document.getElementById('bookingImg').src = data["yetPay"][3];
                    document.getElementById('bookingDate').append((data["yetPay"][4]));
                    document.getElementById('bookingName').append("台北一日遊：" + data["yetPay"][1]);
                    document.getElementById('bookingPrice').append("費用：新台幣 " + data["yetPay"][6] + " 元");
                    document.getElementById('bookingAd').append(data["yetPay"][2]);
                    document.getElementById('bookingAddPrice').append("總價：新台幣 " + data["yetPay"][6] + " 元");
                }
            }
        }
        )
        .catch(function (error) {
            console.log(error)
        });
}
