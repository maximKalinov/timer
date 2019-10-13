import { Clock } from './clock.js';
import { Tabs } from './tabs.js';
import { StopwatchTimer } from './stopwatchTimer.js';

new Tabs().init('timer');
new Clock().init();
new StopwatchTimer('timer', 300);
new StopwatchTimer('stopwatch', 0);