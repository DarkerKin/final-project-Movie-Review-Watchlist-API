# This is to install all the dependencies
npm install

# This is to make migrations to the database
npx prisma migrate dev

# This is to install prisma client
npm install @prisma/client

# This is to generate the client
npx prisma generate

# This is to fill the database with data
npm run seed

# This is to launch the prisma studio to see what is in the db
npx prisma studio

# This is to run the api 
npm run dev

