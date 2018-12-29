//Read seed and flags from the URL in the format /?s=SEED&f=FLAGS
document.addEventListener("DOMContentLoaded", function() {
    let url = new URL(window.location.href);
    if (url.searchParams.has('s') && url.searchParams.has('f')) {
        let seed = url.searchParams.get('s');
        let flags = url.searchParams.get('f');
        //Can add addition restraints here before setting seed and flags, in case they have certain restrictions, formatting, etc.
        document.getElementById('seedNumber').value = seed;
        document.getElementById('flagSet').value = flags;
    }
});

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
    //TODO Update nameInRom with the 11 bytes from 0x134 to 0x13E in the ROM
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
        //TODO Update to proper game name
        alert('Not a ROM of Game Name'); 
        document.getElementById('randomizeRom').disabled = true;
    }
}//If you need to also restrict to a certain version, check against 0x14C in the ROM

function seedGen(custom = null) {
    //If users input a seed number
    if (custom != null) { //Probably want an additional check, to ensure the seed number matches the correct format for seed numbers
        rng.setSeed(custom);
    } else {
        //TODO Create a method for generating seed numbers; this is up to you!
        rng.setSeed(); //TODO Put the result here
        document.getElementById('seedNumber').value = rng.printSeed;
    }
}

function flagsGen(custom = null) {
    //Flags will be a string of characters, each representing an option that is enabled/selected
    //TODO include all options here
    if (custom != null) { //Probably want an additional check, to ensure the seed number matches the correct format for seed numbers
        if (custom.includes('l')) {
            doLevels = true;
        }
        if (custom.includes('e')) {
            doEnemies = true;
        }
        if (custom.includes('b')) {
            doMiniBosses = true;
        }
        if (custom.includes('B')) {
            doAllBosses = true;
        }
    } else {
        let flags = '';
        if (document.getElementById('shuffleLevels').checked) {
            doLevels = true;
            flags += 'l';
        }
        if (document.getElementById('randomEnemies').checked) {
            doEnemies = true;
            flags += 'e';
        }
        switch (document.getElementById('shuffleBosses').value) {
            case 'miniSeparate':
                doMiniBosses = true;
                flags += 'b';
                break;
            case 'allTogether':
                doAllBosses = true;
                flags += 'B';
                break;
            case default:
                break;
        }
        document.getElementById('flagSet').value = flags;
    }
}

document.getElementById('randomizeRom').addEventListener('click', function() {
    seedGen(document.getElementById('seedNumber'));
    flagsGen(document.getElementById('flagSet'));
    let file = document.getElementById('fileUpload').files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        doRandomize(reader.result);
    };
    reader.readAsArrayBuffer(file);
});

function doRandomize(buffer) {
    let rom = new Uint8Array(buffer);
    //TODO insert functions based on which options are selected
    if (doLevels) {
        //Function in randomizer.js that shuffles levels
    }
    if (doEnemies) {
        //Function in randomizer.js that randomizes enemies
    }
    if (doMiniBosses) {
        //Function in randomizer.js that shuffles bosses separately
    }
    if (doAllBosses) {
        //Function in randomizer.js that shuffles all bosses together
    }
    checksum(rom);
    //TODO Determine a file naming structure for randomized ROMs - include seed number? Flags?
    let filename = '';
    saveAs(new Blob([buffer], {type: "octet/stream"}), filename + ".gb");
}