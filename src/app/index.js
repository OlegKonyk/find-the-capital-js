/**
 * index.js is the main file of CLI application.
 * Command line prompt is being initiated on file load.
 */

import { PromptInputService } from './promptInputService';

new PromptInputService().init();
