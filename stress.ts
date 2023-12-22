import axios from 'axios';
import yargs from 'yargs';
import http from 'http';
import { SingleBar, Presets } from 'cli-progress';

const keepAliveAgent = new http.Agent({ keepAlive: true });
const axiosClient = axios.create({ httpAgent: keepAliveAgent });
const argv = yargs
    .option('n', {
        alias: 'requests',
        default: 1,
        type: 'number',
    })
    .option('d', {
        alias: 'delay',
        default: 10,
        type: 'number',
    }).argv;

const sendRequests = async (n: number, delay: number) => {
    const progressBar = new SingleBar({}, Presets.shades_classic);

    progressBar.start(n, 0);

    for (let i = 0; i < n; i++) {
        try {
            await axiosClient.get('http://127.0.0.1:3000');
            progressBar.update(i + 1);
        } catch (error) {
            console.error(`Request ${i + 1} failed: ${error.message}`);
        }

        if (i < n - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    progressBar.stop();
};

const main = () => {
    const requests = argv.requests;
    const delay = argv.delay;
    sendRequests(requests, delay).catch((error) => {
        console.error('Error:', error.message);
        process.exit(1);
    });
};

main();
