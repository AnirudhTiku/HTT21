window.addEventListener("keydown", (event) => {
    console.log(event);

    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    console.log(time);

}
)
