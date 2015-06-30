// load map
function loadMap() {
    var g = google.maps;

    var opts_map = {
        center: companylocation,
        zoom: 11,
        mapTypeId: g.MapTypeId.ROADMAP,
        streetViewControl: false,
        //styles: styleArray,
        panControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_RIGHT,
            mapTypeIds: [g.MapTypeId.ROADMAP, g.MapTypeId.SATELLITE, g.MapTypeId.TERRAIN, g.MapTypeId.HYBRID]
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
        }
    }

    map = new g.Map(document.getElementById("map_canvas"), opts_map);

    createSidebar();
} //done loading

function toggleKML(checked, id) {
    if (checked) {
        kml[id].obj = new google.maps.KmlLayer(kml[id].url, {
                preserveViewport: true
            }
        );
        kml[id].obj.setMap(map);
    } else {
        kml[id].obj.setMap(null);
        delete kml[id].obj;
    }
}

function zoomToOverlay(nr, id) {
    if (document.forms["f"].elements["box"][nr].checked) {
        map.fitBounds(kml[id].bounds);
    }
    else {
        document.forms["f"].elements["box"][nr].click();
    }
}

function highlight(box, listitem) {
    var selected = 'selected';
    var normal = '';
    document.getElementById(listitem).className = (box.checked ? selected: normal);
}

function removeAll() {
    for (var prop in kml) {
        if (kml[prop].obj) {
            kml[prop].obj.setMap(null);
            delete kml[prop].obj;
        }

    }

    var boxes = document.getElementsByName("box");
    for (var i = 0, m; m = boxes[i]; i++) {
        m.checked = false;
    }

    for (var i = 0, m; m = 'selector' + i; i++) {
        if (document.getElementById(m).className != null) {
            document.getElementById(m).className = document.getElementById(m).className.replace(/(?:^|\s)selected(?!\S)/, '');
        }

    }

}

function createSidebar() {
    var html = "<form><ul>";
    for (var prop in kml) {
        html += "<li id=\"selector-" + prop + "\"><input type='checkbox' id='" + prop + "'" +
        " onclick='highlight(this, \"selector-" + prop + "\"); toggleKML(this.checked, this.id)' \/>" +
        kml[prop].name + "<\/li>";
    }
    html += "<li class='control'><a href='#' onclick='removeAll();return false;'>" +
    "Remove all layers<\/a><\/li>" +
    "<\/ul><\/form>";

    document.getElementById("mapcontrolbox").innerHTML = html;
}

function startup() {
    loadMap();
    var checkit = document.getElementById('a');
    checkit.checked = true;
    toggleKML(checkit, 'a');
    highlight(checkit, 'selector-a');

    var checkit0 = document.getElementById('b');
    checkit0.checked = true;
    toggleKML(checkit0, 'b');
    highlight(checkit0, 'selector-b');

    var checkit1 = document.getElementById('c');
    checkit1.checked = true;
    toggleKML(checkit1, 'c');
    highlight(checkit1, 'selector-c');
}


google.maps.event.addDomListener(window, 'load', startup);
