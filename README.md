# Game Boy Randomizer Template (JavaScript)
A template for JavaScript-based Game Boy randomizers, which could be adapted to other consoles. Based on my first [randomizer](https://github.com/slashinfty/sml2randomizer), but with improved code (since it was my JavaScript project ever).

# Using The Template
Please feel free to fork this project, as it is covered by the [GNU General Public License v3.0](https://github.com/slashinfty/gb-rando-js-template/blob/master/LICENSE). I do ask that you make your project open source as well if you are using this project as your base.

# The Structure
There is an `index.html` page with a very basic layout. It has a title, subtitle, a file upload button, two text inputs (one for seed number, and another for flags), a couple buttons and an option select, and a button for randomization (initially disabled).

There is an `index.css` file in the css folder with very little styling.

There are two JavaScript files in the js folder: `randomizer.js` and `logistics.js`. The former includes the random number generator and checksum generator, while the latter contains functions to read files, set seeds and flags, get seeds and flags from the URL, and go through the randomization and eventually save the file.

# Things TODO
There are plenty of comments describing what everything is, including some TODO's which you can specifically search for. Obviously you will need to include all of the randomization code for your game, plus how you want to generate seed numbers and all of the options for flags.

The checksum generator included is specifically for Game Boy, and there is a ROM verifying function to enable the randomize button which is also specifically set up for Game Boy. These can be modified for any console with proper knowledge.

# Questions and More
If you find any problems or have any suggestions, please [file an issue](https://github.com/slashinfty/gb-rando-js-template/issues) on GitHub. If you have a question, you can find me on [Twitter](https://twitter.com/_dadinfinitum).