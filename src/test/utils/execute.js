const spawn = require('child_process').spawn;
const concat = require('concat-stream');

const PROCESS_PATH = 'dist/app/index.js';

const DOWN = '\x1B\x5B\x42';
const UP = '\x1B\x5B\x41';
const ENTER = '\x0D';

function execute(inputs) {
    const childProcess = spawn('node', [PROCESS_PATH]);
    childProcess.stdin.setEncoding('utf-8');

    let currentInputTimeout;

    const loop = inputs => {
        if (!inputs.length) {
            childProcess.stdin.end();
            return;
        }

        currentInputTimeout = setTimeout(() => {
            childProcess.stdin.write(inputs[0]);
            loop(inputs.slice(1));
        }, 1000);
    };

    const promise = new Promise((resolve, reject) => {
        childProcess.stderr.once('data', err => {
            childProcess.stdin.end();

            if (currentInputTimeout) {
                clearTimeout(currentInputTimeout);
                inputs = [];
            }

            reject(err.toString());
        });
        childProcess.on('error', reject);

        loop(inputs);
        childProcess.stdout.pipe(
            concat(result => {
                resolve(result.toString());
            })
        );
    });
    return promise;
}

export { execute, DOWN, UP, ENTER };
