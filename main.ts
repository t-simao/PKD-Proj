import { main_menu } from './input/user_input';


async function start(): Promise<void> {
    process.stdout.write('\x1Bc');

    await main_menu()
}

start()