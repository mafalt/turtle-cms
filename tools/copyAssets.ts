import shell from 'shelljs';

console.log('Copying views...');
shell.cp("-R", "src/views", "dist/");

console.log("Copying public folder...");
shell.cp("-R", "src/public", "dist/");

/*************************************************** 
 * Add additional folders and/or files to copy
 * under this comment.
 ***************************************************/
