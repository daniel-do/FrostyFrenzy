// Daniel Do
// Created: 5/22/2024
// Phaser: 3.70.0
//
// Frosty Frenzy (CMPM 120 Gallery Shooter Project)
//
// A snowball fight shoot em up game made with Phaser
//
// Uses code borrowed from Jim Whitehead
// 
// All assets from Kenny Assets:
// Tiny Ski: https://kenney.nl/assets/tiny-ski
// Tiny Dungeon: https://kenney.nl/assets/tiny-dungeon
// Rolling Ball Assets: https://kenney.nl/assets/rolling-ball-assets
// Cursor Pack: https://kenney.nl/assets/cursor-pack
// Impact Sounds: https://kenney.nl/assets/impact-sounds
// UI Audio: https://kenney.nl/assets/ui-audio
// Music Jingles: https://kenney.nl/assets/music-jingles 
// Interface Sounds: https://kenney.nl/assets/interface-sounds

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
    width: 960,
    height: 640,
    scene: [Boot, Menu, Controls, Credits, Play, NextWave, Gameover]
}

// Global variable to hold sprites
var my = {sprite: {}};
let score = 0;
let moveSpeed = 10;
let ballSpeed = 500;
let gameover = false;
let wave = 1;
let shootDelay = 3000;
let lives = 3;

const game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyW, keyS, keyA, keyD, keySPACE;