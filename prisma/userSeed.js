const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const prisma = require('./client');

const saltRounds = 10; // Adjust the salt rounds for hashing

async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  const users = [];
  const roles = ['student', 'teacher', 'parent', 'admin']; // Define your roles

  for (let i = 1; i <= 50; i++) {
    const password = '12345678'; // Password to hash

    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await hashPassword(password), // Hash the password
      role: roles[Math.floor(Math.random() * roles.length)], // Randomly assign a role
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    console.log("#######################");
    console.log('user', user);
    console.log("#######################");
    users.push(user);
  }

  await prisma.user.createMany({
    data: users,
  });

  console.log('User seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
