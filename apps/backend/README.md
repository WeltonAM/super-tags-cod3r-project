Copy and paste .env.example file
Set:

DATABASE_URL="postgresql://user:password@localhost:5432/super-tags-cod3r?schema=public"
API_PORT=4000

On terminal to generate a jwt secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=bc9e1d700a81d379a72c638ac4dc008e0a8c91d70e66c0ea4d887cbedf12f7aa

Run:
npx prisma generate
npm run dev
npx prisma db seed

Access the APP with:
Email: admin@formacao.dev
Senha: #Senha123
