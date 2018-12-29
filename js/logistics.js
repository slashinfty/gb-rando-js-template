//When a ROM is uploaded, run the verification function
document.getElementById('fileUpload').addEventListener('change', function() {
    let file = document.getElementById('fileUpload').files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        let arrayBuffer = reader.result;
        romVerify(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);    
});

function romVerify(buffer) {
    let tempRom = new Uint8Array(buffer);
    //Update nameInRom with the 11 bytes from 0x134 to 0x13E in the ROM
    //This is the name of the game, and is unique to the ROM
    let nameInRom = [];
    let verification = 11;
    nameInRom.forEach((element, index) => {
        if (tempRom[0x134 + index] == element) {
            verification--;
        }
    });
    if (verification === 0) {
        //Unlock the randomize button when a proper ROM is uploaded
        document.getElementById('randomizeRom').disabled = false;
    } else {
        //Update to proper game name
        alert('Not a ROM of Game Name'); 
        document.getElementById('randomizeRom').disabled = true;
    }
}//If you need to also restrict to a certain version, check against 0x14C in the ROM