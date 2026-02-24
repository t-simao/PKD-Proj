import { make_map } from './lib/building';
import { main_menu } from './user_input';

process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
let map = make_map();

main_menu(map);
process.stdout.write('\x1Bc'); //CLEARS THE TERMINAL LIKE CONSOLE.CLEAR()
