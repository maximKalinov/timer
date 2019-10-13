import { Clock } from './clock.js';
import { Tabs } from './tabs.js';
import { Stopwatch, Timer } from './stopwatchTimer.js';

new Tabs().init('timer');
new Clock().init();
new Stopwatch().init();
new Timer(300).init();