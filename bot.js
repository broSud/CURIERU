const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// ID-ul mesajului de reaction role — fix, nu se pierde la restart
const reactionMessageId = '1482200272313913384';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

// Lista de obiecte amuzante pentru !colet
const obiecte = [
  "o pereche de șosete cu pisici 🐱🧦",
  "o găleată plină cu confetti 🎊",
  "un pinguin de cauciuc care scârțâie 🐧",
  "o umbrelă care cântă opera ☂️🎵",
  "un manual de dans pentru cartofi 🥔💃",
  "o pălărie invizibilă (cutia e goală???) 🎩✨",
  "un borcan cu aer proaspăt din 2007 🫙",
  "o sabie făcută din tăiței fierți 🍜⚔️",
  "un dicționar klingonian 📖👽",
  "o pereche de ochelari cu ochi desenați 👀",
  "un cactus care zâmbește 🌵😊",
  "o cutie cu 47 de agrafe și un bilet care zice 'ai nevoie de ele' 📎",
  "un GPS care te duce mereu acasă la mama 🗺️👩",
  "o piatra norocoasă cu față desenată 🪨😐",
  "un set de instrucțiuni pentru a respira manual 📄😮‍💨",
  "o ciocolată cu aromă de pizza 🍫🍕",
  "un fluier care scoate sunet de modem vechi 📡",
  "o pungă cu aer de munte... din Ploiești 🏔️",
  "un ceas care merge înapoi ⏰⬅️",
  "o hartă spre comoara ta interioară 🗺️❤️",
];

// Mesaje amuzante pentru !livrare
const livrari = [
  "Curierii noștri au traversat 3 oceane, 2 deșerturi și un Kaufland pentru tine! 🌊🏜️🛒",
  "Coletul a fost purtat pe mâini, nu s-a pus jos NICIODATĂ... aproape. 🤲",
  "Livrare în 3-5 zile lucrătoare sau în 3-5 ani, depinde de trafic. 🚗💨",
  "Curierii noștri nu dorm, nu mănâncă, nu se odihnesc. Dar cer bacșiș. 💸",
  "Atenție: coletul a fost miros... verificat de 3 câini înainte de livrare. 🐕🐕🐕",
  "Garantăm că nu am deschis coletul. (Nu garantăm.) 📦👀",
  "Livrat cu dragoste, cu grija și cu mașina unui vecin. 🚙❤️",
];

client.once('ready', () => {
  console.log(`✅ Botul ${client.user.tag} este online!`);
});

// =====================
// MESAJ BUN VENIT
// =====================
client.on('guildMemberAdd', async (member) => {
  const canal = member.guild.channels.cache.find(c => c.name === 'bun-venit');
  if (!canal) return;

  const mesaje = [
    "A sosit un pachet nou! 📦",
    "Soneria a sunat! 🔔",
    "Un curier nou a bătut la ușă! 🚪",
    "Livrare nouă a sosit! 🚚",
  ];

  const mesajRandom = mesaje[Math.floor(Math.random() * mesaje.length)];

  const embed = new EmbedBuilder()
    .setColor(0xf4a300)
    .setTitle(`📬 ${mesajRandom}`)
    .setDescription(
      `Bine ai venit pe server, **${member.user.username}**! 🎉\n\n` +
      `📦 Ești acum un **Curier Oficial**!\n\n` +
      `> Scrie \`!curier\` ca să vezi ce poți face\n` +
      `> Scrie \`!colet\` ca să primești primul tău colet misterios 🎁\n\n` +
      `🏆 *Bucură-te de comunitatea Curierilor!*`
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: 'Curierii — comunitatea oficială' })
    .setTimestamp();

  await canal.send({ embeds: [embed] });
});

// =====================
// REACTION ROLE — adaugă rol
// =====================
client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.id !== reactionMessageId) return;
  if (reaction.emoji.name !== '🚚') return;

  try {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const rol = guild.roles.cache.find(r => r.name === 'CURIER');

    if (!rol) {
      console.log('❌ Rolul CURIER nu a fost găsit!');
      return;
    }

    await member.roles.add(rol);
    console.log(`✅ Rol CURIER adăugat la ${user.username}`);
  } catch (err) {
    console.error('Eroare la adăugarea rolului:', err);
  }
});

// =====================
// REACTION ROLE — scoate rol
// =====================
client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.id !== reactionMessageId) return;
  if (reaction.emoji.name !== '🚚') return;

  try {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const rol = guild.roles.cache.find(r => r.name === 'CURIER');

    if (!rol) return;

    await member.roles.remove(rol);
    console.log(`❌ Rol CURIER scos de la ${user.username}`);
  } catch (err) {
    console.error('Eroare la scoaterea rolului:', err);
  }
});

// =====================
// COMENZI
// =====================
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // =====================
  // COMANDA !colet
  // =====================
  if (command === 'colet') {
    const obiectRandom = obiecte[Math.floor(Math.random() * obiecte.length)];

    const embed = new EmbedBuilder()
      .setColor(0xf4a300)
      .setTitle('📦 UN CURIER A BĂTUT LA UȘĂ! 📦')
      .setDescription(
        `**${message.author.username}** a primit coletul și l-a deschis cu tremur în mâini...\n\n` +
        `🎁 **Înăuntru ai găsit:**\n` +
        `> **${obiectRandom}**\n\n` +
        `📬 *Livrare oficială asigurată de Curierii de Elită!*`
      )
      .setFooter({ text: 'Curierii — canalul oficial de livrări amuzante' })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }

  // =====================
  // COMANDA !livrare
  // =====================
  if (command === 'livrare') {
    const mesajRandom = livrari[Math.floor(Math.random() * livrari.length)];

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle('🚚 ACTUALIZARE LIVRARE 🚚')
      .setDescription(
        `📋 **Status colet pentru ${message.author.username}:**\n\n` +
        `> ${mesajRandom}\n\n` +
        `✅ *Mulțumim că ești un Curier de încredere!*`
      )
      .setFooter({ text: 'Serviciul Clienți — Curierii' })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }

  // =====================
  // COMANDA !curier
  // =====================
  if (command === 'curier') {
    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setTitle('📮 BINE AI VENIT, CURIER! 📮')
      .setDescription(
        `Salut **${message.author.username}**! 👋\n\n` +
        `Ești un **Curier Oficial** al acestui server!\n\n` +
        `📦 **Comenzi disponibile:**\n` +
        `> \`!colet\` — Deschide un colet misterios\n` +
        `> \`!livrare\` — Verifică statusul livrării tale\n` +
        `> \`!curier\` — Afișează acest mesaj\n\n` +
        `🏆 *Curierii sunt cei mai buni abonați din univers!*`
      )
      .setFooter({ text: 'Curierii — comunitatea oficială' })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
