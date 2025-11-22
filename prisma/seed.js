import prisma from '../src/config/db.js';

async function seed() {

  // This will remove all the data from the table when you seed it so be CAREFUL!!!!!
  await prisma.$transaction([
    prisma.watchlist.deleteMany(),
    prisma.review.deleteMany(),
    prisma.movie.deleteMany(),
    prisma.genre.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Users
  const alice = await prisma.user.create({
    data: {
      username: "alice",
      email: "alice@example.com",
      password: "hashed_pass_1",
      role: "USER",
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: "bob",
      email: "bob@example.com",
      password: "hashed_pass_2",
      role: "ADMIN",
    },
  });

  // Genres
  const action = await prisma.genre.create({ data: { name: "Action" } });
  const drama = await prisma.genre.create({ data: { name: "Drama" } });
  const comedy = await prisma.genre.create({ data: { name: "Comedy" } });
  const thriller = await prisma.genre.create({ data: { name: "Thriller" } });

  // Movies

  const inception = await prisma.movie.create({
    data: {
      title: "Inception",
      releaseYear: 2010,
      description: "A thief enters dreams to steal secrets.",
      genre: {
        connect: [{ id: action.id }, { id: thriller.id }],
      },
    },
  });

  const darkKnight = await prisma.movie.create({
    data: {
      title: "The Dark Knight",
      releaseYear: 2008,
      description: "A vigilante fights crime in Gotham.",
      genre: {
        connect: [{ id: action.id }, { id: thriller.id }],
      },
    },
  });

  const happiness = await prisma.movie.create({
    data: {
      title: "The Pursuit of Happyness",
      releaseYear: 2006,
      description: "A man struggles to build a better life.",
      genre: {
        connect: [{ id: drama.id }],
      },
    },
  });

  // Reviews
  await prisma.review.create({
    data: {
      userId: alice.id,
      movieId: inception.id,
      rating: 5,
      comment: "Excellent",
    },
  });

  await prisma.review.create({
    data: {
      userId: bob.id,
      movieId: darkKnight.id,
      rating: 4,
      comment: "Great watch",
    },
  });

  await prisma.review.create({
    data: {
      userId: alice.id,
      movieId: happiness.id,
      rating: 5,
      comment: "Inspiring",
    },
  });

  // Watchlist
  await prisma.watchlist.create({
    data: {
      userId: alice.id,
      movieId: inception.id,
    },
  });

  await prisma.watchlist.create({
    data: {
      userId: alice.id,
      movieId: happiness.id,
    },
  });

  await prisma.watchlist.create({
    data: {
      userId: bob.id,
      movieId: darkKnight.id,
    },
  });
}

seed()
  .then(() => {
    console.log("Seed complete");
    return prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
