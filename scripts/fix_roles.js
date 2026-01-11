#!/usr/bin/env node
const { User } = require("../models/models");

async function main() {
  try {
    console.log("Loading all users...");
    const users = await User.findAll();
    for (const u of users) {
      const username = (u.username || '').toString();
      if (username.startsWith('instructor')) {
        if (u.role !== 'instructor') {
          u.role = 'instructor';
          await u.save();
          console.log(`Updated ${u.username} -> instructor`);
        }
        continue;
      }

      if (!u.role || u.role === 'default' || u.role === '') {
        u.role = 'user';
        await u.save();
        console.log(`Updated ${u.username} -> user`);
      }
    }

    console.log('Role update complete.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
