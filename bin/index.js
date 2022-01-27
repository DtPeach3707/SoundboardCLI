#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');
const ytdl = require('ytdl-core');


const options = yargs
    .usage("Usage: -u <url> -d <Soundboard directory> -f <file name> -k <Keybind>")
    .option("u", { alias: "url", describe: "a youtube link for a video", type: "string", demandOption: true })
    .option("d", { alias: "directory", describe: "Soundboard directory", type: "string", demandOption: true })
    .option("f", { alias: "filename", describe: "file name", type: "string", demandOption: true })
    .option("k", { alias: "keybind", describe: "Keybind", type: "string", demandOption: true })
    .argv;

// Outputs

ytdl(`${options.url}`, {filter: "audioonly", quality: "highestaudio"}).pipe(fs.createWriteStream(`${options.directory}/audio/${options.filename}`));

console.log(
`
Add this snippet to your soundboard.py to the end of the section that starts in line 17 of your soundboard script:

elif key == keyboard.Keycode.from_char('${options.keybind}'):
    play('audio/${options.filename}.mp3')

(if you key is alphanumeric)

OR

elif key == keyboard.Key.${options.keybind}):
    play('audio/${options.filename}')

(if your key isn't alphanumeric. Look up keyboard.Key documentation for how pynput expresses the keybind you want in this case)
`
);
