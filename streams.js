const fs = require('fs')

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./docs/blog4.txt')

/* readStream.on('data', (chunk) => {
    console.log('---new chunk---')
    console.group(chunk)
    writeStream.write('\n NEW CHUNK \n')
    writeStream.write(chunk)
}) */

readStream.pipe(writeStream)