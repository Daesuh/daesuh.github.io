var clock = document.getElementById('clock');

function clockFunc() {
    var timo = new Date();
    var hours = timo.getHours();
    var minutes = timo.getMinutes();
    var seconds = timo.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + '' + ampm;
    clock.textContent = strTime;
    return strTime;
}

setInterval(clockFunc, 1000);

function deleteItem() {
    var itemTable = document.getElementById("itemTable");
    itemTable.remove(itemTable.selectedIndex);
    if (itemTable.length > 0) {
        itemTable.childNodes[1].selected = true;
    }
    itemTableSize();
    storageSave();
}

function addItem() {
    var itemTable = document.getElementById("itemTable");
    var option = document.createElement("option");
    option.text = document.getElementById("itemInput").value;
    if (option.text != "") {
        itemTable.add(option);
        itemTableSize();
        storageSave();
        document.getElementById("itemInput").value = "";
    } else {}
}

function itemTableSize() {
    var select = document.getElementById('itemTable');
    if (select.length > 0) {
        select.size = select.length;
    }
}

var audio = new Audio('https://freesound.org/data/previews/186/186724_43-lq.mp3');

function audioPlay() {
    audio.play();
    audio.loop = true;
}

function audioPause() {
    audio.pause();
    audio.loop = false;
    audio.currentTime = 0.0;
}

function startTimer(segundos, display) {
    var timer = segundos,
        minutes, seconds;
    var myTimer = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (display.id != "blink" && timer < 59) {
            display.id = "blink";
        }
        if (--timer < 0) {
            var photo = document.getElementById("timer");
            audioPlay();
            clearInterval(myTimer);
        }
        if (display.class == "stop") {
            clearInterval(myTimer);
        }
    }, 1000);
}

function timerGo(minutes) {
    var segundos = 60 * minutes,
        display = document.querySelector('#timer');
    startTimer(segundos, display);
};

function deleteTimer(o) {
    var p = o.parentNode.parentNode;
    o.parentNode.childNodes[2].class = "stop";
    p.parentNode.removeChild(p);
    audioPause();
}

function addTimer(timer) {
    var minutes = document.getElementById("minutos").value;
    var itemTable = document.getElementById("itemTable");
    var selectedItem = itemTable.options[itemTable.selectedIndex].text;
    var table = document.getElementById("tableTimers");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = '<button class="button2" onclick="deleteTimer(this)" />Stop</button>' + '&nbsp&nbsp&nbsp' + '<span id="timer" class="go"></span>' + '&nbsp&nbsp&nbsp' + selectedItem;
    timerGo(minutes);
}

function storageSave() {
    if (typeof(Storage) !== "undefined") {
        localStorage.clear();
        var mins = document.getElementById("minutos").value;
        if (mins != "...") {
            localStorage.setItem("minutosStorage", mins);
        } else {}
        var x = document.getElementById("itemTable").childElementCount;
        localStorage.setItem("childcount", x);
        for (i = 0; i < x; i++) {
            localStorage.setItem(i, document.getElementById("itemTable")[i].innerHTML);
        }
        var z = document.getElementById("numSong").innerText;
        localStorage.setItem("songStorage", z);
    } else {}
}
var sounds = ["https://freesound.org/data/previews/186/186724_43-lq.mp3", "http://freesound.org/data/previews/417/417082_4397472-lq.mp3",
    "http://freesound.org/data/previews/417/417156_757812-lq.mp3", "http://freesound.org/data/previews/7/7056_10379-lq.mp3",
    "http://freesound.org/data/previews/316/316920_4921277-lq.mp3"
];
sounds.current = 0;

function storageLoad() {
    if (typeof(Storage) !== "undefined") {
        var j = localStorage.getItem("minutosStorage");
        if (j != null) {
            document.getElementById("minutos").value = j;
        } else {}
        var z = localStorage.getItem("songStorage");
        if (z != null) {
            document.getElementById("numSong").innerText = z;
            sounds.current = z - 1;
            audio = new Audio(sounds[sounds.current]);
            audio.load();
        } else {}
        if (localStorage.getItem("childcount") != null) {
            var childcount = localStorage.getItem("childcount");
            if (childcount > 0) {
                var selec = document.getElementById("itemTable");
                for (i = 0; i < childcount; i++) {
                    var option = document.createElement("option");
                    option.text = localStorage.getItem(i);
                    if (option.text != "") {
                        selec.add(option);
                        itemTableSize();
                    }
                }
            } else {}
        } else {}
    } else {
        document.getElementById("itemTable")[0].innerHTML = "local storage error...";
    }
    document.getElementById("itemInput").addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            addItem();
        }
    });
}

Object.defineProperty(Array.prototype, "next", {
    value: function() {
        i = this.current + 1;
        if (i < this.length) {
            return this[++this.current];
        } else {
            this.current = 0;
            return this[0];
        }
    },
    enumerable: false
});

function nextSong() {
    x = document.getElementById("playButton").innerText;
    if (x == "Stop") {
        audioPause();
        audio = new Audio(sounds.next());
        audio.load();
        document.getElementById("numSong").innerText = sounds.current + 1;
        audioPlay();
    } else {
        audioPause();
        audio = new Audio(sounds.next());
        audio.load();
        document.getElementById("numSong").innerText = sounds.current + 1;
    }
    storageSave();
}

function buttonPlay() {
    x = document.getElementById("playButton").innerText;
    if (x == "Play") {
        audioPause();
        audio.load();
        audioPlay();
        document.getElementById("playButton").innerText = "Stop";
    } else {
        audioPause();
        document.getElementById("playButton").innerText = "Play";
    }
}
