window.onload = function () {
    navBar()
    checkProcess()
};


async function confirmationProcess(orderNumber) {
    await fetch("/api/order/" + `${orderNumber}`)
        .then(response => {
            return response.json();
        }).then(res => {
            console.log(res)
            if (res.error == true) {
                window.location = '/'
            } else {
                document.getElementById("date").innerHTML = res.data.date
                document.getElementById("time").innerHTML = res.data.time
                document.getElementById("address").innerHTML = res.data.trip.address
            }
        })
}
