const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Database Configuration
const db = mysql.createConnection({
    host: 'localhost', // database address
    user: 'databaseusername', // database username
    password: 'databasepassword', // database password
    database: 'databasename' // database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to your database:', err);
        throw err;
    }
    console.log('Successfully connected to your database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/players', (req, res) => {
    const { username } = req.query;
    let sql = 'SELECT * FROM players';

    if (username) {
        sql += ` WHERE username LIKE '%${username}%'`;
    }

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error searching players:', err);
            return res.status(500).json({ error: 'Error searching players' });
        }
        res.json(results);
    });
});

app.get('/players/:id', (req, res) => {
    const playerId = req.params.id;
    const sql = 'SELECT * FROM players WHERE id = ?';

    db.query(sql, [playerId], (err, results) => {
        if (err) {
            console.error('Error fetching player:', err);
            return res.status(500).json({ error: 'Error fetching player' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json(results[0]);
    });
});

app.put('/players/:id', (req, res) => {
    const playerId = req.params.id;
    const {
        username, email, group_id, pass, salt, combat, skill_total,
        x, y, fatigue, combatstyle, block_chat, block_private, block_trade,
        block_duel, cameraauto, onemouse, soundoff, haircolour, topcolour,
        trousercolour, skincolour, headsprite, bodysprite, male,
        creation_date, creation_ip, login_date, login_ip, banned, offences,
        muted, kills, npc_kills, deaths, online, quest_points, bank_size,
        lastRecoveryTryId
    } = req.body;

    const updates = [];
    const params = [];

    if (username) {
        updates.push('username = ?');
        params.push(username);
    }
    if (email) {
        updates.push('email = ?');
        params.push(email);
    }
    if (group_id) {
        updates.push('group_id = ?');
        params.push(group_id);
    }
    if (pass) {
        updates.push('pass = ?');
        params.push(pass);
    }
    if (salt) {
        updates.push('salt = ?');
        params.push(salt);
    }
    if (combat) {
        updates.push('combat = ?');
        params.push(combat);
    }
    if (skill_total) {
        updates.push('skill_total = ?');
        params.push(skill_total);
    }
    if (x !== undefined && y !== undefined) {
        updates.push('x = ?, y = ?');
        params.push(x, y);
    }
    if (fatigue) {
        updates.push('fatigue = ?');
        params.push(fatigue);
    }
    if (combatstyle) {
        updates.push('combatstyle = ?');
        params.push(combatstyle);
    }
    if (block_chat) {
        updates.push('block_chat = ?');
        params.push(block_chat);
    }
    if (block_private) {
        updates.push('block_private = ?');
        params.push(block_private);
    }
    if (block_trade) {
        updates.push('block_trade = ?');
        params.push(block_trade);
    }
    if (block_duel) {
        updates.push('block_duel = ?');
        params.push(block_duel);
    }
    if (cameraauto) {
        updates.push('cameraauto = ?');
        params.push(cameraauto);
    }
    if (onemouse) {
        updates.push('onemouse = ?');
        params.push(onemouse);
    }
    if (soundoff) {
        updates.push('soundoff = ?');
        params.push(soundoff);
    }
    if (haircolour) {
        updates.push('haircolour = ?');
        params.push(haircolour);
    }
    if (topcolour) {
        updates.push('topcolour = ?');
        params.push(topcolour);
    }
    if (trousercolour) {
        updates.push('trousercolour = ?');
        params.push(trousercolour);
    }
    if (skincolour) {
        updates.push('skincolour = ?');
        params.push(skincolour);
    }
    if (headsprite) {
        updates.push('headsprite = ?');
        params.push(headsprite);
    }
    if (bodysprite) {
        updates.push('bodysprite = ?');
        params.push(bodysprite);
    }
    if (male) {
        updates.push('male = ?');
        params.push(male);
    }
    if (creation_date) {
        updates.push('creation_date = ?');
        params.push(creation_date);
    }
    if (creation_ip) {
        updates.push('creation_ip = ?');
        params.push(creation_ip);
    }
    if (login_date) {
        updates.push('login_date = ?');
        params.push(login_date);
    }
    if (login_ip) {
        updates.push('login_ip = ?');
        params.push(login_ip);
    }
    if (banned) {
        updates.push('banned = ?');
        params.push(banned);
    }
    if (offences) {
        updates.push('offences = ?');
        params.push(offences);
    }
    if (muted) {
        updates.push('muted = ?');
        params.push(muted);
    }
    if (kills) {
        updates.push('kills = ?');
        params.push(kills);
    }
    if (npc_kills) {
        updates.push('npc_kills = ?');
        params.push(npc_kills);
    }
    if (deaths) {
        updates.push('deaths = ?');
        params.push(deaths);
    }
    if (online) {
        updates.push('online = ?');
        params.push(online);
    }
    if (quest_points) {
        updates.push('quest_points = ?');
        params.push(quest_points);
    }
    if (bank_size) {
        updates.push('bank_size = ?');
        params.push(bank_size);
    }
    if (lastRecoveryTryId) {
        updates.push('lastRecoveryTryId = ?');
        params.push(lastRecoveryTryId);
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
    }

    params.push(playerId);

    const sql = `UPDATE players SET ${updates.join(', ')} WHERE id = ?`;

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating player:', err);
            return res.status(500).json({ error: 'Error updating player' });
        }
        res.json({ message: 'Player updated successfully' });
    });
});

app.put('/edit-database.html', (req, res) => {
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
