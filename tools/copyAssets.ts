import shell from 'shelljs';

console.log('Copying views...');
shell.cp("-R", "src/views", "dist/");

console.log("Copying public folder...");
shell.cp("-R", "src/public", "dist/");

/*************************************************** 
 * Add additional folders and/or files to copy
 * under this comment.
 ***************************************************/

console.log('Copying bootstrap to public folder...');
shell.cp('-R', 'node_modules/bootstrap/dist', 'dist/public/bootstrap');

console.log('Copying jQuery...');
shell.cp('-R', 'node_modules/jquery/dist/', 'dist/public/jquery');

console.log('Copying popper.js...');
shell.cp('-R', 'node_modules/popper.js/dist/', 'dist/public/popper.js');
