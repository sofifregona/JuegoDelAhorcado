//FUEGOS ARTIFICIALES

var bits = 200;
var intensity = 5;
var speed = 15;
var colours = new Array("#FF8000", "#5FB404", "#084B8A", "#DF0101", "#FF0080", "#00ffea", "#eeff00");
var dx, xpos, ypos, bangheight;
var Xpos = new Array();
var Ypos = new Array();
var dX = new Array();
var dY = new Array();
var decay = new Array();
var colour = 0;
var swide = 1000;
var shigh = 800;
var on = false;

function write_fire() {
    if (on) {
        var b, s;
        b = document.createElement("div");
        s = b.style;
        s.position = "absolute";
        b.setAttribute("id", "bod");
        document.body.appendChild(b);
        set_scroll(); set_width();
        b.appendChild(div("lg", 3, 4));
        b.appendChild(div("tg", 2, 3));
        for (var i = 0; i < bits; i++) b.appendChild(div("bg" + i, 1, 1));
    } else {
        return "";
    }
}
function div(id, w, h) {
    if (on) {
        var d = document.createElement("div");
        d.style.position = "absolute";
        d.style.overflow = "hidden";
        d.style.width = w + "px";
        d.style.height = h + "px";
        d.setAttribute("id", id);
        return (d);
    } else {
        return "";
    }
}
function bang() {
    if (on) {
        var i, X, Y, Z, A = 0;
        for (i = 0; i < bits; i++) {
            X = Math.round(Xpos[i]); Y = Math.round(Ypos[i]);
            Z = document.getElementById("bg" + i).style;
            if ((X >= 0) && (X < swide) && (Y >= 0) && (Y < shigh)) { Z.left = X + "px"; Z.top = Y + "px"; }
            if ((decay[i] -= 1) > 14) { Z.width = "3px"; Z.height = "3px"; }
            else if (decay[i] > 7) { Z.width = "2px"; Z.height = "2px"; }
            else if (decay[i] > 3) { Z.width = "1px"; Z.height = "1px"; }
            else if (++A) Z.visibility = "hidden";
            Xpos[i] += dX[i];
            Ypos[i] += (dY[i] += 0.1 / intensity);
        }
        if (A != bits) setTimeout("bang()", speed);
    } else {
        return "";
    }
}
function stepthrough() {
    if (on) {
        var i, Z;
        var oldx = xpos;
        var oldy = ypos; xpos += dx; ypos -= 4;
        if (ypos < bangheight || xpos < 0 || xpos >= swide || ypos >= shigh) {
            for (i = 0; i < bits; i++) {
                Xpos[i] = xpos;
                Ypos[i] = ypos;
                dY[i] = (Math.random() - 0.5) * intensity;
                dX[i] = (Math.random() - 0.5) * (intensity - Math.abs(dY[i])) * 1.25;
                decay[i] = Math.floor((Math.random() * 20) + 20);
                Z = document.getElementById("bg" + i).style;
                Z.backgroundColor = colours[colour];
                Z.visibility = "visible";
            } bang(); launch();
        }
        document.getElementById("lg").style.left = xpos + "px";
        document.getElementById("lg").style.top = ypos + "px";
        document.getElementById("tg").style.left = oldx + "px";
        document.getElementById("tg").style.top = oldy + "px";
    } else {
        return "";
    }
}
function launch() {
    if (on) {
        colour = Math.floor(Math.random() * colours.length);
        xpos = Math.round((0.5 + Math.random()) * swide * 0.5);
        ypos = shigh - 5;
        dx = (Math.random() - 0.5) * 4;
        bangheight = Math.round((0.5 + Math.random()) * shigh * 0.4);
        document.getElementById("lg").style.backgroundColor = colours[colour];
        document.getElementById("tg").style.backgroundColor = colours[colour];
    } else {
        return "";
    }
}
window.onscroll = set_scroll;
function set_scroll() {
    if (on) {
        var sleft, sdown;
        if (typeof (self.pageYOffset) == "number") {
            sdown = self.pageYOffset;
            sleft = self.pageXOffset;
        }
        else if (document.body.scrollTop || document.body.scrollLeft) {
            sdown = document.body.scrollTop;
            sleft = document.body.scrollLeft;
        }
        else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            sleft = document.documentElement.scrollLeft;
            sdown = document.documentElement.scrollTop;
        }
        else { sdown = 0; sleft = 0; }
        var s = document.getElementById("bod").style;
        s.top = sdown + "px";
        s.left = sleft + "px";
    } else {
        return "";
    }
}
window.onresize = set_width;
function set_width() {
    if (on) {
        if (typeof (self.innerWidth) == "number") { swide = self.innerWidth; shigh = self.innerHeight; }
        else if (document.documentElement && document.documentElement.clientWidth) {
            swide = document.documentElement.clientWidth;
            shigh = document.documentElement.clientHeight;
        }
        else if (document.body.clientWidth) {
            swide = document.body.clientWidth;
            shigh = document.body.clientHeight;
        }
    } else {
        return "";
    }
}

function encender() {
    if (document.getElementById) {
        if (on) {
            set_width(); write_fire(); launch(); setInterval('stepthrough()', speed);
        }
    }
}

//Apagar efecto
function apagar() {
    if (on) {
        on = false;
        document.getElementById("bod").remove();
        clearInterval('stepthrough()');
    }
}