function searchPlayers(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;

  fetch(`/players?username=${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Player not found');
      }
      return response.json();
    })
    .then(data => {
      displayPlayers(data);
    })
    .catch(error => {
      console.error('Error searching players:', error);
      displayMessage('Error searching players.', 'error');
    });
}

function displayPlayers(players) {
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Group ID</th>
        <th>Email</th>
        <th>Password</th>
        <th>Salt</th>
        <th>Combat</th>
        <th>Skill Total</th>
        <th>X</th>
        <th>Y</th>
        <th>Fatigue</th>
        <th>Combat Style</th>
        <th>Block Chat</th>
        <th>Block Private</th>
        <th>Block Trade</th>
        <th>Block Duel</th>
        <th>Camera Auto</th>
        <th>One Mouse</th>
        <th>Sound Off</th>
        <th>Hair Colour</th>
        <th>Top Colour</th>
        <th>Trouser Colour</th>
        <th>Skin Colour</th>
        <th>Head Sprite</th>
        <th>Body Sprite</th>
        <th>Male</th>
        <th>Creation Date</th>
        <th>Creation IP</th>
        <th>Login Date</th>
        <th>Login IP</th>
        <th>Banned</th>
        <th>Offences</th>
        <th>Muted</th>
        <th>Kills</th>
        <th>NPC Kills</th>
        <th>Deaths</th>
        <th>Online</th>
        <th>Quest Points</th>
        <th>Bank Size</th>
        <th>Last Recovery Try ID</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${players.map(player => `
        <tr data-playerid="${player.id}">
          <td>${player.id}</td>
          <td>${player.username}</td>
          <td>${player.group_id}</td>
          <td>${player.email}</td>
          <td>${player.pass}</td>
          <td>${player.salt}</td>
          <td>${player.combat}</td>
          <td>${player.skill_total}</td>
          <td>${player.x}</td>
          <td>${player.y}</td>
          <td>${player.fatigue}</td>
          <td>${player.combatstyle}</td>
          <td>${player.block_chat}</td>
          <td>${player.block_private}</td>
          <td>${player.block_trade}</td>
          <td>${player.block_duel}</td>
          <td>${player.cameraauto}</td>
          <td>${player.onemouse}</td>
          <td>${player.soundoff}</td>
          <td>${player.haircolour}</td>
          <td>${player.topcolour}</td>
          <td>${player.trousercolour}</td>
          <td>${player.skincolour}</td>
          <td>${player.headsprite}</td>
          <td>${player.bodysprite}</td>
          <td>${player.male}</td>
          <td>${player.creation_date}</td>
          <td>${player.creation_ip}</td>
          <td>${player.login_date}</td>
          <td>${player.login_ip}</td>
          <td>${player.banned}</td>
          <td>${player.offences}</td>
          <td>${player.muted}</td>
          <td>${player.kills}</td>
          <td>${player.npc_kills}</td>
          <td>${player.deaths}</td>
          <td>${player.online}</td>
          <td>${player.quest_points}</td>
          <td>${player.bank_size}</td>
          <td>${player.lastRecoveryTryId}</td>
          <td><button onclick="editPlayer(${player.id})">Edit</button></td>
        </tr>
      `).join('')}
    </tbody>
  `;
  document.getElementById('playerTable').innerHTML = '';
  document.getElementById('playerTable').appendChild(table);
}

async function editPlayer(playerId) {
  try {
    const response = await fetch(`/players/${playerId}`);
    if (!response.ok) {
      throw new Error('Player not found');
    }
    const player = await response.json();
    populateForm(player);
  } catch (error) {
    console.error('Error fetching player data:', error);
    displayMessage('Error fetching player data.', 'error');
  }
}

function populateForm(player) {
  document.getElementById('playerId').value = player.id;
  document.getElementById('username').value = player.username;
  document.getElementById('email').value = player.email;
  document.getElementById('groupId').value = player.group_id;
  document.getElementById('pass').value = player.pass;
  document.getElementById('salt').value = player.salt;
  document.getElementById('combat').value = player.combat;
  document.getElementById('skillTotal').value = player.skill_total;
  document.getElementById('x').value = player.x;
  document.getElementById('y').value = player.y;
  document.getElementById('fatigue').value = player.fatigue;
  document.getElementById('combatStyle').value = player.combatstyle;
  document.getElementById('blockChat').value = player.block_chat;
  document.getElementById('blockPrivate').value = player.block_private;
  document.getElementById('blockTrade').value = player.block_trade;
  document.getElementById('blockDuel').value = player.block_duel;
  document.getElementById('cameraAuto').value = player.cameraauto;
  document.getElementById('oneMouse').value = player.onemouse;
  document.getElementById('soundOff').value = player.soundoff;
  document.getElementById('hairColour').value = player.haircolour;
  document.getElementById('topColour').value = player.topcolour;
  document.getElementById('trouserColour').value = player.trousercolour;
  document.getElementById('skinColour').value = player.skincolour;
  document.getElementById('headSprite').value = player.headsprite;
  document.getElementById('bodySprite').value = player.bodysprite;
  document.getElementById('male').value = player.male;
  document.getElementById('creationDate').value = player.creation_date;
  document.getElementById('creationIp').value = player.creation_ip;
  document.getElementById('loginDate').value = player.login_date;
  document.getElementById('loginIp').value = player.login_ip;
  document.getElementById('banned').value = player.banned;
  document.getElementById('offences').value = player.offences;
  document.getElementById('muted').value = player.muted;
  document.getElementById('kills').value = player.kills;
  document.getElementById('npcKills').value = player.npc_kills;
  document.getElementById('deaths').value = player.deaths;
  document.getElementById('online').value = player.online;
  document.getElementById('questPoints').value = player.quest_points;
  document.getElementById('bankSize').value = player.bank_size;
  document.getElementById('lastRecoveryTryId').value = player.lastRecoveryTryId;
}

async function updatePlayer(event) {
  event.preventDefault();
  const playerId = document.getElementById('playerId').value;
  const updatedPlayer = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    group_id: document.getElementById('groupId').value,
    pass: document.getElementById('pass').value,
    salt: document.getElementById('salt').value,
    combat: document.getElementById('combat').value,
    skill_total: document.getElementById('skillTotal').value,
    x: document.getElementById('x').value,
    y: document.getElementById('y').value,
    fatigue: document.getElementById('fatigue').value,
    combatstyle: document.getElementById('combatStyle').value,
    block_chat: document.getElementById('blockChat').value,
    block_private: document.getElementById('blockPrivate').value,
    block_trade: document.getElementById('blockTrade').value,
    block_duel: document.getElementById('blockDuel').value,
    cameraauto: document.getElementById('cameraAuto').value,
    onemouse: document.getElementById('oneMouse').value,
    soundoff: document.getElementById('soundOff').value,
    haircolour: document.getElementById('hairColour').value,
    topcolour: document.getElementById('topColour').value,
    trousercolour: document.getElementById('trouserColour').value,
    skincolour: document.getElementById('skinColour').value,
    headsprite: document.getElementById('headSprite').value,
    bodysprite: document.getElementById('bodySprite').value,
    male: document.getElementById('male').value,
    creation_date: document.getElementById('creationDate').value,
    creation_ip: document.getElementById('creationIp').value,
    login_date: document.getElementById('loginDate').value,
    login_ip: document.getElementById('loginIp').value,
    banned: document.getElementById('banned').value,
    offences: document.getElementById('offences').value,
    muted: document.getElementById('muted').value,
    kills: document.getElementById('kills').value,
    npc_kills: document.getElementById('npcKills').value,
    deaths: document.getElementById('deaths').value,
    online: document.getElementById('online').value,
    quest_points: document.getElementById('questPoints').value,
    bank_size: document.getElementById('bankSize').value,
    lastRecoveryTryId: document.getElementById('lastRecoveryTryId').value,
  };

  try {
    const response = await fetch(`/players/${playerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayer),
    });
    if (!response.ok) {
      throw new Error('Failed to update player.');
    }
    displayMessage('Player updated successfully.', 'success');
    clearForm(); // Optional: Clear form fields after successful update
    searchPlayers(new Event('submit')); // Refresh player list after update
  } catch (error) {
    console.error('Error updating player:', error);
    displayMessage('Error updating player.', 'error');
  }
}

function clearForm() {
  document.getElementById('playerId').value = '';
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('groupId').value = '';
  document.getElementById('pass').value = '';
  document.getElementById('salt').value = '';
  document.getElementById('combat').value = '';
  document.getElementById('skillTotal').value = '';
  document.getElementById('x').value = '';
  document.getElementById('y').value = '';
  document.getElementById('fatigue').value = '';
  document.getElementById('combatStyle').value = '';
  document.getElementById('blockChat').value = '';
  document.getElementById('blockPrivate').value = '';
  document.getElementById('blockTrade').value = '';
  document.getElementById('blockDuel').value = '';
  document.getElementById('cameraAuto').value = '';
  document.getElementById('oneMouse').value = '';
  document.getElementById('soundOff').value = '';
  document.getElementById('hairColour').value = '';
  document.getElementById('topColour').value = '';
  document.getElementById('trouserColour').
