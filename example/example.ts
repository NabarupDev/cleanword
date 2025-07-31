import { cleanText } from '../index';

interface CleanTextOptions {
  language: string[];
  grawlixChar: string;
  alwaysAllow: string[];
  alwaysBlock: string[];
}

const options: CleanTextOptions = {
  language: ['english', 'hindi'],
  grawlixChar: '@',
  alwaysAllow: ['kutto'],
  alwaysBlock: ['test', 'what'],
};

const cleaned: string = cleanText('This is a test sentence with kutto and what.', options);
console.log(cleaned); // This is a @@@@ sentence with kutto and @@@@. 
