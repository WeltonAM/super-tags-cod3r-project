node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

DATABASE_URL="postgresql://user:password@localhost:5432/super-tags-cod3r?schema=public"
API_PORT=4000
JWT_SECRET=bc9e1d700a81d379a72c638ac4dc008e0a8c91d70e66c0ea4d887cbedf12f7aa

npx prisma generate
npx prisma db seed
