import { stdin, stdout } from 'process';
import { Transform } from 'stream';

class ReverseString extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, _encoding, callback) {
    this.push(chunk.toString().split('').reverse().join(''));

    callback();
  }

  _flush(callback) {
    callback();
  }
}

const reversing = new ReverseString();

stdin.pipe(reversing).pipe(stdout);