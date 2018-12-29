//A list of all options, which will be true or undefined
var doLevels, doEnemies, doMiniBosses, doAllBosses;

//Adapted from https://github.com/bit101/lcg
//JavaScript's random does not allow seeding, so we make our own random number generator
var rng = {
    a: 1664525,
    c: 1013904223,
    m: Math.pow(2, 32),
    printSeed: "",
    seed: 0,
    setSeed: function(seed) {
        this.printSeed = seed;
        this.seed = parseInt(this.printSeed); //Change this depending on how seeds are made, like hexadecimal
    },
    nextPrng: function() {
        this.seed = (this.seed * this.a +this.c) % this.m;
        return this.seed;
    },
    nextFloat: function() {
        //range [0, 1)
        return this.nextPrng() / this.m;
    },
    nextInt: function(lim) {
        //range [0, lim)
        return Math.floor(this.nextFloat() * lim);
    },
    nextBool: function() {
        //0.5 probability of true
        return this.nextFloat() < 0.5;
    }
};

//Adapted from https://github.com/vhelin/wla-dx/blob/master/wlalink/compute.c
//Fixes the checksum for Game Boy games after bytes are changed
function checksum(rom) {
    let csum = 0;
    let comp = 0;
    for (let i = 0x00; i < 0x14E; i++) {
        csum += rom[i];
    }
    for (let j = 0x150; i <= 0x7FFFF; i++) {
        csum += rom[i];
    }
    rom[0x14E] = (csum >> 8) & 0xFF;
    rom[0x14F] = csum & 0xFF;
    for (let k = 0x134; i <= 0x14C; i++) {
        comp += rom[i];
    }
    comp += 25;
    rom[0x14D] = 0 - (comp & 0xFF);
}

//Functions that randomize the game should be included here