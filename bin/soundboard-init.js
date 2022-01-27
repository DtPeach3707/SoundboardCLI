#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');
const path = require('path');

const options = yargs
    .usage("Usage: -d <Directory name>")
    .option("d", { alias: "directory", describe: "Name of soundboard directory", type: "string", demandOption: true })
    .argv;

// Making directories

fs.mkdirSync(`./${options.directory}`,
{ recursive: true }, (err) => {
    if (err) {
       return console.error(err);
    }
    console.log('Soundboard directory created!');
});

fs.mkdirSync(`./${options.directory}/audio`,
{ recursive: true }, (err) => {
    if (err) {
       return console.error(err);
    }
    console.log('Audio directory created!');
});

// Making initial python script

const file_content = 
`
from pygame import mixer
from pynput import keyboard


class Stop(Exception):
    pass


def play(file):
    sound = mixer.Sound(file)
    mixer.find_channel(True).play(sound)


def on_press(key):
    if key == keyboard.Key.esc:
        raise Stop
    try:  # Add soundboard audio keybinds here
        if key == keyboard.Key.f15:
            print('You pressed F15')
    except AttributeError:
        pass


max_channels = 20

mixer.init()
mixer.set_num_channels(max_channels)
with keyboard.Listener(on_press=on_press) as listener:
    try:
        listener.join()
    except Stop:
        print("Thank you for using this mock GoXLR")
`;

try
{
    fs.writeFileSync(`./${options.directory}/soundboard.py`, file_content)
}
catch(err)
{
    console.log(err);
}



