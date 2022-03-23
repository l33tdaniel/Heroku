const fs = require('fs');

// this works!


// write to a new file named 2pac.txt
fs.writeFile('2pac.txt', lyrics, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Lyric saved!');
});