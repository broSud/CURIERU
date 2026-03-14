const { Client, GatewayIntentBits, EmbedBuilder, Partials, PermissionFlagsBits } = require('discord.js');

// ID-ul mesajului de regulament
const regulamentMessageId = '1482157287643807928';

// Stocare avertismente (in-memory)
const avertismente = {};

// Stocare giveaway-uri active
const giveawayuri = {};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
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
  "Coletul a fost livrat de un curier care era mai supărat pe viață decât tine. 😒📦",
  "Am vrut să-l aducem mai repede, dar am găsit un loc de parcare bun și n-am vrut să-l pierdem. 🚗🅿️",
  "Coletul tău a fost martor la 3 bătăi în trafic și o nuntă. E puțin traumatizat. 🥊👰",
  "L-am lăsat la vecinul ăla pe care îl urăști. Succes la recuperat! 🏠🐍",
  "Curierul a bătut la ușă o singură dată, la intensitatea de 0.1 decibeli, apoi a fugit. 🏃💨",
  "Garantăm că pachetul nu a fost scăpat pe jos de mai mult de 4 ori. Probabil. 📉📦",
  "Livrarea a întârziat pentru că GPS-ul ne-a trimis în 1994 și ne-a fost greu să revenim. 🕰️🚗",
  "Am deschis coletul doar ca să vedem dacă ai gusturi bune. Ne-am cam lămurit... 📦🤔",
  "Coletul a supraviețuit miraculos după ce a fost folosit drept scaun la cafeaua de dimineață. ☕💺",
];

client.once('ready', () => {
  console.log(`✅ Botul ${client.user.tag} este online!`);
});

// =====================
// MESAJ BUN VENIT
// =====================
client.on('guildMemberAdd', async (member) => {
  try {
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
        `📋 Citește regulamentul și reacționează cu 📋 pentru a primi rolul **CURIER**!\n\n` +
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
// REACTION ROLE — regulament
// =====================
client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.id !== regulamentMessageId) return;

  try {
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const rol = guild.roles.cache.find(r => r.name === 'CURIER');

    if (!rol) {
      console.log('❌ Rolul CURIER nu a fost găsit!');
      return;
    }

    await member.roles.add(rol);
    console.log(`✅ Rol CURIER adăugat la ${user.username}`);

    try {
      await user.send(`✅ Ai acceptat regulamentul și ai primit rolul **CURIER** pe server! 🚚📦`);
    } catch (e) {}

  } catch (err) {
    console.error('Eroare la reaction role:', err);
  }
});

// =====================
// GIVEAWAY — reacții
// =====================
client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  const giveaway = giveawayuri[reaction.message.id];
  if (!giveaway) return;
  if (reaction.emoji.name !== '🎉') return;

  if (!giveaway.participanti.includes(user.id)) {
    giveaway.participanti.push(user.id);
    console.log(`🎉 ${user.username} s-a înscris la giveaway`);
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
        `> \`!curier\` — Afișează acest mesaj\n` +
        `> \`!sondaj [întrebare]\` — Creează un sondaj\n` +
        `> \`!giveaway [minute] [premiu]\` — Pornește un giveaway\n\n` +
        `🏆 *Curierii sunt cei mai buni abonați din univers!*`
      )
      .setFooter({ text: 'Curierii — comunitatea oficială' })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }

  // =====================
  // COMANDA !warn (doar admini/moderatori)
  // =====================
  if (command === 'warn') {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.reply('❌ Nu ai permisiunea să avertizezi membri!');
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply('❌ Menționează un utilizator! Ex: `!warn @user motiv`');

    const motiv = args.slice(1).join(' ') || 'Fără motiv specificat';

    if (!avertismente[target.id]) avertismente[target.id] = [];
    avertismente[target.id].push({
      motiv,
      data: new Date().toLocaleDateString('ro-RO'),
      de: message.author.username,
    });

    const numar = avertismente[target.id].length;

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('⚠️ AVERTISMENT ⚠️')
      .setDescription(
        `**${target.user.username}** a primit un avertisment!\n\n` +
        `📋 **Motiv:** ${motiv}\n` +
        `👮 **De la:** ${message.author.username}\n` +
        `🔢 **Total avertismente:** ${numar}\n\n` +
        `${numar >= 3 ? '🚨 *3 avertismente — consideră să iei măsuri!*' : ''}`
      )
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });

    try {
      await target.send(`⚠️ Ai primit un avertisment pe **Stark Industries**!\n📋 Motiv: **${motiv}**\n🔢 Total: **${numar}** avertisment(e)`);
    } catch (e) {}
  }

  // =====================
  // COMANDA !warnings
  // =====================
  if (command === 'warnings') {
    const target = message.mentions.members.first() || message.member;
    const lista = avertismente[target.id];

    if (!lista || lista.length === 0) {
      return message.reply(`✅ **${target.user.username}** nu are niciun avertisment!`);
    }

    const listaText = lista.map((w, i) =>
      `**${i + 1}.** ${w.motiv} — *${w.data}* (de la ${w.de})`
    ).join('\n');

    const embed = new EmbedBuilder()
      .setColor(0xff6600)
      .setTitle(`⚠️ Avertismente pentru ${target.user.username}`)
      .setDescription(listaText)
      .setFooter({ text: `Total: ${lista.length} avertisment(e)` })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }

  // =====================
  // COMANDA !clearwarn (doar admini)
  // =====================
  if (command === 'clearwarn') {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return message.reply('❌ Doar adminii pot șterge avertismente!');
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply('❌ Menționează un utilizator!');

    avertismente[target.id] = [];
    await message.reply(`✅ Avertismentele lui **${target.user.username}** au fost șterse!`);
  }

  // =====================
  // COMANDA !sondaj
  // =====================
  if (command === 'sondaj') {
    const intrebare = args.join(' ');
    if (!intrebare) return message.reply('❌ Scrie o întrebare! Ex: `!sondaj Care e culoarea preferată?`');

    const embed = new EmbedBuilder()
      .setColor(0x9b59b6)
      .setTitle('📊 SONDAJ NOU! 📊')
      .setDescription(
        `**${intrebare}**\n\n` +
        `👍 — Da / Pentru\n` +
        `👎 — Nu / Împotrivă\n\n` +
        `*Reacționează pentru a vota!*`
      )
      .setFooter({ text: `Sondaj creat de ${message.author.username}` })
      .setTimestamp();

    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react('👍');
    await msg.react('👎');
    await message.delete().catch(() => {});
  }

  // =====================
  // COMANDA !giveaway
  // =====================
  if (command === 'giveaway') {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.reply('❌ Doar moderatorii pot porni un giveaway!');
    }

    const minute = parseInt(args[0]);
    const premiu = args.slice(1).join(' ');

    if (!minute || isNaN(minute) || !premiu) {
      return message.reply('❌ Folosește: `!giveaway [minute] [premiu]`\nEx: `!giveaway 10 un rol special`');
    }

    const embed = new EmbedBuilder()
      .setColor(0xf1c40f)
      .setTitle('🎉 GIVEAWAY! 🎉')
      .setDescription(
        `**Premiu:** ${premiu}\n\n` +
        `Reacționează cu 🎉 pentru a participa!\n\n` +
        `⏰ **Se termină în:** ${minute} minute\n` +
        `🎁 **Organizat de:** ${message.author.username}`
      )
      .setFooter({ text: `Giveaway activ — ${minute} minute` })
      .setTimestamp();

    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react('🎉');

    giveawayuri[msg.id] = {
      premiu,
      participanti: [],
      canal: message.channel.id,
    };

    // Timer pentru final giveaway
    setTimeout(async () => {
      const giveaway = giveawayuri[msg.id];
      if (!giveaway) return;

      if (giveaway.participanti.length === 0) {
        await message.channel.send('😢 Nimeni nu a participat la giveaway!');
        delete giveawayuri[msg.id];
        return;
      }

      const castigatorId = giveaway.participanti[Math.floor(Math.random() * giveaway.participanti.length)];

      const embedFinal = new EmbedBuilder()
        .setColor(0xf1c40f)
        .setTitle('🏆 GIVEAWAY ÎNCHEIAT! 🏆')
        .setDescription(
          `**Premiu:** ${giveaway.premiu}\n\n` +
          `🎉 **Câștigător:** <@${castigatorId}>\n\n` +
          `Felicitări! Contactează un admin pentru a ridica premiul!`
        )
        .setTimestamp();

      await message.channel.send({ embeds: [embedFinal] });
      delete giveawayuri[msg.id];

    }, minute * 60 * 1000);
  }
});

client.login(process.env.TOKEN);
