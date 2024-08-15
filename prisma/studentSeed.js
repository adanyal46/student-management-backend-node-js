const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  // Fetch user IDs from the User table
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  if (users.length < 50) {
    throw new Error('Not enough users in the User table to assign to students.');
  }

  // Extract user IDs and shuffle them
  const userIds = users.map(user => user.id);
  userIds.sort(() => Math.random() - 0.5); // Shuffle array

  // Create 50 students with unique user IDs from the User table
  const students = [];
  for (let i = 0; i < 50; i++) {
    const student = {
      userId: userIds[i], // Use a unique user ID for each student
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.between({ from: new Date(2000, 0, 1), to: new Date(2005, 11, 31) }),
      class: `Class${Math.floor(Math.random() * 10) + 1}`,
      guardianName: faker.person.fullName(),
      guardianContact: faker.phone.number(),
    };
    console.log("#######################");
    console.log('student', student);
    console.log("#######################");
    students.push(student);
  }

  await prisma.student.createMany({
    data: students,
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
