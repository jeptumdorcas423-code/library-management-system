import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genreNames = [
    'Fiction',
    'Technology',
    'Science',
    'History',
  ];

  const genres = await Promise.all(
    genreNames.map((name) =>
      prisma.genre.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const genreMap = Object.fromEntries(
    genres.map((genre) => [genre.name, genre.id]),
  );

  const books = [
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780435905255',
      genreId: genreMap['Fiction'],
    },
    {
      title: 'The River Between',
      author: 'Ngugi wa Thiong’o',
      isbn: '9780435905483',
      genreId: genreMap['Fiction'],
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      genreId: genreMap['Fiction'],
    },
    {
      title: 'Purple Hibiscus',
      author: 'Chimamanda Ngozi Adichie',
      isbn: '9781616202415',
      genreId: genreMap['Fiction'],
    },
    {
      title: 'Half of a Yellow Sun',
      author: 'Chimamanda Ngozi Adichie',
      isbn: '9781400095209',
      genreId: genreMap['Fiction'],
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      genreId: genreMap['Technology'],
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '9780135957059',
      genreId: genreMap['Technology'],
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '9780262046305',
      genreId: genreMap['Technology'],
    },
    {
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      isbn: '9780596517748',
      genreId: genreMap['Technology'],
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      isbn: '9780198788607',
      genreId: genreMap['Science'],
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      genreId: genreMap['Science'],
    },
    {
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '9780345539434',
      genreId: genreMap['Science'],
    },
    {
      title: 'The Origin of Species',
      author: 'Charles Darwin',
      isbn: '9781509827695',
      genreId: genreMap['Science'],
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '9780062316097',
      genreId: genreMap['History'],
    },
    {
      title: 'Long Walk to Freedom',
      author: 'Nelson Mandela',
      isbn: '9780316548182',
      genreId: genreMap['History'],
    },
  ];

  await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

  console.log('Database seeded successfully!');
  console.log(`Genres: ${genres.length}`);
  console.log(`Books added: ${books.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });