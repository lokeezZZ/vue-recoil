const fs = require('fs');
// const {exec} = require('child_process');

function logErrors(err) {
  if (err) {
    throw err;
  }
}

console.log('Copying index.d.ts for TypeScript support...');
fs.copyFile('./src/interface.ts', './index.d.ts', logErrors);
