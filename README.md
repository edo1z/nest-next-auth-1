# nest-next-auth-1

NestJS + Next.js + NextAuth + Prisma + SQLite

## NestJS

### Create App

```
npm i -g @nestjs/cli
nest new backend
```

### Setting Prisma

```
npm i -D prisma
npx prisma init --datasource-provider sqlite
```

### Create Model

`backend/prisma/schema.prisma` にモデルを追加します。今回は認証を試すので User モデルを作成します。

```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  profile   String?
  url       String?
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

尚、VSCode で schema.prisma のフォーマットを有効にするには、[Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)という拡張をインストールしたら出来ました。

### Migrate

```
npx prisma migrate dev --name init
```

- SQLite の中身を VSCode で確認するには、[Database Client](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2)という拡張を使うと出来ました。
- SQLite の中身を CLI で確認するには、sqlite をインストールして使います。下記は ArchLinux の場合です。

```
sudo pacman -S sqlite
sqlite3 backend/prisma/dev.db
sqlite> .tables
sqlite> .schema User
sqlite> .quit
```

### nestjs-prisma を入れる

```
nest add nestjs-prisma
```

- [notiz-dev/nestjs-prisma](https://github.com/notiz-dev/nestjs-prisma)

### Setting GraphQL

## Next.js

### Create App

```
npx create-next-app@latest --typescript
```
