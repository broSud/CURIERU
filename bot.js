const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Lista de obiecte amuzante pentru !colet
const obiecte = [
  "o factură de gaze pe numele tău, înrămată frumos 📄🔥",
  "un set de nervi de rezervă (că ăia vechi s-au dus) 🧠💥",
  "o doză de 'Tupeu la conservă' - expirată în 2012 🥫🙄",
  "un abonament premium la 'Gura Lumii' (valabil pe tot cartierul) 🗣️📢",
  "o oglindă care îți zice adevărul chiar dacă nu l-ai cerut 🪞💀",
  "o pungă cu scuzele pe care nu le-ai folosit când trebuia 🎒🤐",
  "un GPS setat să te scoată mereu din zona de confort 📍😬",
  "o sticlă de apă sfințită pentru momentele când intri pe Twitter/X ⛪💧",
  "un manual de utilizare pentru propria viață (scris în chineză) 📖🏮",
  "o lumânare parfumată cu aromă de 'Salariu în prima zi' (dispare imediat) 🕯️💸",
  "un test de răbdare (cutia e goală, trebuie să aștepți) 📦⏳",
  "o diplomă de 'Expert în decizii proaste la 2 dimineața' 🎓🍹",
  "un voucher de 50% reducere la propria demnitate 🎫🤡",
  "o cutie cu 'Dă-te-n mă-ta' pentru momente de criză 🎁🤫",
  "o pereche de ochelari care fac toți oamenii să pară inteligenți (nu funcționează) 👓🚫",
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
  "Coletul a fost livrat de un curier care era mai supărat pe viață decât tine. 😒📦",
  "Am vrut să-l aducem mai repede, dar am găsit un loc de parcare bun și n-am vrut să-l pierdem. 🚗🅿️",
  "Coletul tău a fost martor la 3 bătăi în trafic și o nuntă. E puțin traumatizat. 🥊👰",
  "L-am lăsat la vecinul ăla pe care îl urăști. Succes la recuperat! 🏠🐍",
  "Curierul a bătut la ușă o singură dată, la intensitatea de 0.1 decibeli, apoi a fugit. 🏃💨",
  "Garantăm că pachetul nu a fost scăpat pe jos de mai mult de 4 ori. Probabil. 📉📦",
  "Livrarea a întârziat pentru că GPS-ul ne-a trimis în 1994 și ne-a fost greu să revenim. 🕰️🚗",
  "Am deschis coletul doar ca să vedem dacă ai gusturi bune. Ne-am cam lămurit... 📦🤔",
  "Coletul a supraviețuit miraculos după ce a fost folosit drept scaun la cafeaua de dimineață. ☕💺",
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
// BUN VENIT + ROL AUTOMAT
// =====================
client.on('guildMemberAdd', async (member) => {
  try {
    // Dă rolul CURIER automat
    const rol = member.guild.roles.cache.find(r => r.name === 'CURIER');
    if (rol) {
      await member.roles.add(rol);
      console.log(`✅ Rol CURIER adăugat automat la ${member.user.username}`);
    } else {
      console.log('❌ Rolul CURIER nu a fost găsit!');
    }

    // Trimite mesaj de bun venit
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
        `📦 Ai primit automat rolul **CURIER**! 🚚\n\n` +
        `> Scrie \`!curier\` ca să vezi ce poți face\n` +
        `> Scrie \`!colet\` ca să primești primul tău colet misterios 🎁\n\n` +
        `🏆 *Bucură-te de comunitatea Curierilor!*`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter({ text: 'Curierii — comunitatea oficială' })
      .setTimestamp();

    await canal.send({ embeds: [embed] });
  } catch (err) {
    console.error('Eroare la bun venit:', err);
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

