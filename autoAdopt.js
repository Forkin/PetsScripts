function process_adoption(namepet) {
    // process the adoption
    var request = new Object;
    request.url = '/pound/process_adopt.phtml';
    request.method = 'POST';
    request.args = 'pet_name=' + namepet;
    request.onSuccess = function (response) {
        console.log("Adopted: " + namepet);
    }
    request.onFailure = function () {
        alert(translated_data(6, name));
    }

    ajaxRequest(request);
}

//get 3 pets for adoption
function get_adoption() {
    var request = new Object;
    var cache_buster;
    cache_buster = Math.ceil(Math.random() * 9999999);

    request.url = '/pound/get_adopt.phtml?r=' + cache_buster;
    request.method = 'GET';
    request.onSuccess = function (response) {
        var Response = eval('(' + response + ')');

        console.log(Response);

        for (var i = 0; i < Response.length; i++) {
            if (Response[i]) {
                //set the colors and species that you want
                if (Response[i].color == "Maraquan"
                    || Response[i].color == "Plushie"
                    || Response[i].color == "Fairy"
                    || Response[i].color == "Msp"
                    || Response[i].color == "Dimensional"
                    || Response[i].species == "Cybunny"
                    || Response[i].species == "Draik") {
                    process_adoption(Response[i].name);
                }

                if (Response[i].color == "Chocolate"
                    && Response[i].color == "Kacheek") {
                    process_adoption(Response[i].name);
                }

                if (Response[i].color == "Darigan"
                    && Response[i].color == "Hissi") {
                    process_adoption(Response[i].name);
                }

                if (Response[i].color != "Blue" && Response[i].color != "Red" && Response[i].color != "Green" && Response[i].color != "Yellow") {
                    console.log("Name: " + Response[i].name);
                    console.log("Rare Color: " + Response[i].color);
                    console.log("Species: " + Response[i].species);
                    console.log(new Date());
                }
            }
        }
    }

    ajaxRequest(request);
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function loop() {
    for (var i = 0; i < 10000; i++) {
        get_adoption();
        //set the delay
        await timer(1600);
    }
}

//starts the loop
loop();
