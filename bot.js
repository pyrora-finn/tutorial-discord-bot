// Lade Umgebungsvariablen aus der .env-Datei
require('dotenv').config();

// Importiere die Discord.js-Bibliothek
const { Client, GatewayIntentBits } = require('discord.js');

// Erstelle einen neuen Discord-Client mit den nötigen Berechtigungen
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Präfix für Befehle
const PREFIX = "!";

// Logge den Bot ein und gebe eine Nachricht in die Konsole aus
client.once('ready', () => {
    console.log(`Bot ist als ${client.user.tag} eingeloggt!`);
});

// Event-Handler für neue Nachrichten
client.on('messageCreate', message => {
    // Ignoriere Nachrichten vom Bot selbst, um Endlosschleifen zu vermeiden
    if (message.author.bot) return;

    // Überprüfe, ob die Nachricht das definierte Präfix hat
    if (!message.content.startsWith(PREFIX)) return;

    // Nachricht in Befehls- und Argumentteile aufteilen
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Befehle und ihre Aktionen
    if (command === 'hallo') {
        message.channel.send(`Hallo, ${message.author.username}! Schön, dass du da bist.`);
    } 
    else if (command === 'info') {
        // Serverinformationen senden
        message.channel.send(`Servername: ${message.guild.name}\nMitgliederzahl: ${message.guild.memberCount}`);
    } 
    else if (command === 'add') {
        // Überprüfen, ob zwei Argumente vorhanden sind
        if (args.length < 2) {
            return message.channel.send("Bitte gib zwei Zahlen an, z. B. `!add 5 10`.");
        }
        
        // Zahlen parsen und addieren
        const num1 = parseFloat(args[0]);
        const num2 = parseFloat(args[1]);

        // Überprüfen, ob beide Argumente Zahlen sind
        if (isNaN(num1) || isNaN(num2)) {
            return message.channel.send("Beide Argumente müssen Zahlen sein.");
        }

        const sum = num1 + num2;
        message.channel.send(`Das Ergebnis von ${num1} + ${num2} ist ${sum}.`);
    } 
    else {
        // Wenn der Befehl unbekannt ist
        message.channel.send("Unbekannter Befehl. Verfügbare Befehle sind: `!hallo`, `!info`, `!add`.");
    }
});

// Fehlerbehandlung
client.on('error', (error) => {
    console.error("Fehler:", error);
});

// Melde den Bot mit dem Token an, der in der .env-Datei gespeichert ist
client.login(process.env.DISCORD_TOKEN);
