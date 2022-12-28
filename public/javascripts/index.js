$(document).ready(function () {

    submitAndRefreshData();

    $("#chat").click(function () {
        submitDialogue();
    });
    $("#say").keyup(function (event) {
        if ($("#say").is(":focus") && event.key == "Enter") {
            submitDialogue();
        }
    });
    $("#refresh").click(function () {
        $("#user").val("");
        $("#say").val("");
        submitAndRefreshData();
    });
    $("#clear").click(function () {
        clearAndRefreshData();
    });
    $("#save").click(function () {
        saveChatRecords();
    });
    $("#load").click(function () {
        $("#user").val("");
        $("#say").val("");
        reloadChatRecords();
    });
});

function submitDialogue() {
    let position = $("#dialogue").scrollTop();
    submitAndRefreshData();
    $("#dialogue").scrollTop(position);
}

function submitAndRefreshData() {
    $("#dialogue").scrollTop(0);
    console.log("chat");
    $.post("/chat", { user: $("#user").val(), say: $("#say").val() }, function (res) {
        console.log(res.data);
        let content = "";
        let obj = JSON.parse(res.data);
        for(let i=0; i<obj.length; i++){
            content += `<span class='user'>${obj[i].name}</span><span class='verb'>說</span> ${obj[i].say} (<span class='time'>${obj[i].date}</span>)<br>`;
        }
        $("#dialogue").html(content);
    });
}

function clearAndRefreshData() {
    $.get("/chat/clear", function (res) {
        $("#dialogue").empty();
    });
}

function saveChatRecords() {
    $.get("/chat/save", function (res) {
        alert("Saving data to Atlas!");
        console.log(JSON.stringify(res));
    });
}

function reloadChatRecords() {
    $.get("/chat/reload", function (res) {
        console.log(res.data);
        let content = "";
        let obj = JSON.parse(res.data);
        for(let i=0; i<obj.length; i++){
            content += `<span class='user'>${obj[i].name}</span><span class='verb'>說</span> ${obj[i].say} (<span class='time'>${obj[i].date}</span>)<br>`;
        }
        $("#dialogue").html(content);
    });
}