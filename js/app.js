var clock = document.getElementById('clock');
/* var hexColor = document.getElementById('hex-color');
document.body.style.backgroundColor = '#052433'; */

function hexClock() {
    var time = new Date();
    var hours = (time.getHours() % 12).toString();
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();

    if (hours.length < 2) {
        hours = '0' + hours;
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }
    var clockStr = hours + ' : ' + minutes + ' : ' + seconds;
    //var hexColorStr = '#' + hours + minutes + seconds;
    clock.textContent = clockStr;
    //hexColor.textContent = hexColorStr;
    //document.body.style.backgroundColor = hexColorStr;
}

hexClock();
setInterval(hexClock, 1000);

function myFunctionDel() {
    var x = document.getElementById("selectobjetos");
    x.remove(x.selectedIndex);
	if (x.childElementCount>0){
		x.childNodes[1].selected=true;
	}
	console.log(x);
    mySelectSize();
	storageguardar();
}

function myFunctionAdd() {
    var x = document.getElementById("selectobjetos");
    var option = document.createElement("option");
    option.text = document.getElementById("listaid").value;
    if (option.text != "") {
        x.add(option);
        mySelectSize();
        storageguardar();
		document.getElementById("listaid").value="...";
    } else {}
}

function mySelectSize() {
    var select = document.getElementById('selectobjetos');
	if(select.length>0){
		select.size = select.length;
	}
}
var audio = new Audio('https://freesound.org/data/previews/186/186724_43-lq.mp3');

function audioplay() {
    audio.play();
    audio.loop = true;
}

function audiopause() {
    audio.pause();
    audio.currentTime = 0.0;
    audio.loop = false;
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
            audioplay();
            clearInterval(myTimer);
        }
        if (display.class == "stop") {
            clearInterval(myTimer);
        }
    }, 1000);
}

function timergo(minutes) {
    var segundos = 60 * minutes,
        display = document.querySelector('#timer');
    startTimer(segundos, display);
};

function seladd() {
    var x = document.getElementById("listaid");
    var option = document.createElement("option");
    option.text = '<span id="time">04:00</span> minutes!</div></body>';
    x.add(option);
    mySelectSize();
}

function bottondelete(o) {
    var p = o.parentNode.parentNode;
	o.parentNode.childNodes[2].class="stop";
    p.parentNode.removeChild(p);
    audiopause();
}

function addrow(timer) {
    var minutes = document.getElementById("minutos").value;
    var tutu = document.getElementById("selectobjetos");
    var objeto = tutu.options[tutu.selectedIndex].text;
    var table = document.getElementById("tabletimers");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = '<button type="button" value="Delete" onclick="bottondelete(this)" />Delete</button>' + '&nbsp&nbsp&nbsp' + '<span id="timer" class="go">' + 'EMPEZANDO...' + '</span>' + '&nbsp&nbsp&nbsp' + objeto;
    timergo(minutes);
}

function storageguardar() {
    if (typeof(Storage) !== "undefined") {
        localStorage.clear();
        var x = document.getElementById("selectobjetos").childElementCount;
        localStorage.setItem("childcount", x);
        for (i = 0; i < x; i++) {
            localStorage.setItem(i, document.getElementById("selectobjetos")[i].innerHTML);
        }
    } else {
        document.getElementById("selectobjetos")[0].innerHTML = "Problemas local storage...";
    }
}

function storagecargar() {
    if (typeof(Storage) !== "undefined") {
        // Retrieve
        if (localStorage.getItem("childcount") != null) {
            var x = localStorage.getItem("childcount");
            if (x > 0) {
                var selec = document.getElementById("selectobjetos");
                for (i = 0; i < x; i++) {
                    var option = document.createElement("option");
                    option.text = localStorage.getItem(i);
                    if (option.text != "") {
                        selec.add(option);
                        mySelectSize();
                    }
                }
            } else {}
        } else {}

    } else {
        document.getElementById("selectobjetos")[0].innerHTML = "Problemas local storage...";
    }
}

function storageborrar() {
    localStorage.clear();
}

function debug() {
	storagecargar();
/*     var c = document.getElementById("selectobjetos");
    console.log(c);
    var x = document.getElementById("selectobjetos").childElementCount;
    console.log(x);
    var z = document.getElementById("selectobjetos")[0].innerHTML;
    console.log(z); */
}






