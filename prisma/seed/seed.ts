const { PrismaClient } = require('@prisma/client');
const practiceTexts = require('../../fixtures/practiceText.json');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PracticeText database...');

  for (const text of practiceTexts) {
    await prisma.practiceText.create({
      data: {
        id: text.id,
        text: text.text,
        difficultyLevel: text.difficultyLevel,
      },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
