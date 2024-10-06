const { PrismaClient } = require('@prisma/client');
const practiceTexts = require('./practiceText.json');
const countries = require('./countries.json');

const prisma = new PrismaClient();


type PracticeText = {
  id: number;
  text: string;
  difficultyLevel: string;
}

type Country = {
  code: string;
  name: string;
}

async function main() {
  console.log('Seeding PracticeText database...');

  await prisma.practiceText.createMany({
    data: practiceTexts.map((text: PracticeText) => ({
      id: text.id,
      text: text.text,
      difficultyLevel: text.difficultyLevel,
    })),
  });

  console.log('Seeding Country database...');

  await prisma.country.createMany({
    data: countries.map((country: Country) => ({
      code: country.code,
      name: country.name,
    })),
  });

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
