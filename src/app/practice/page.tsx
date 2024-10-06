import { PrismaClient } from '@prisma/client';
import Practice from '@/app/components/Practice';
import Header from '@/app/components/Header';

const prisma = new PrismaClient();

export default async function PracticePage() {
  const practiceTexts = await prisma.practiceText.findMany();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Practice practiceTexts={practiceTexts} />
    </div>
  );
}
