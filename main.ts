import promptSync from 'prompt-sync';
const prompt = promptSync();

import { make_map } from './lib/building';
import { main_menu } from './user_input';


async function start(): Promise<void> {
    process.stdout.write('\x1Bc');

    await main_menu()
}

start()