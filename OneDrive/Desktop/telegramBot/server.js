const TelegramBot = require('node-telegram-bot-api');

const token = '7208174014:AAFz4DwAGI_vZd0ZIqRQtb-bRLHqY_FZMJU';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Send me a number and I will provide all prime numbers up to that number.');
});

bot.onText(/\/primes (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const number = parseInt(match[1], 10);

    if (isNaN(number) || number <= 1) {
        bot.sendMessage(chatId, 'Please provide a valid number greater than 1.');
        return;
    }

    const primes = getPrimesUpTo(number);
    bot.sendMessage(chatId, `Prime numbers up to ${number}: ${primes.join(', ')}`);
});

function getPrimesUpTo(max) {
    const primes = [];
    for (let num = 2; num <= max; num++) {
        if (isPrime(num)) {
            primes.push(num);
        }
    }
    return primes;
}
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}