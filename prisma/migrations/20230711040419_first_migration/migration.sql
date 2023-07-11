-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "postInfo" TEXT,
    "imagelink" TEXT,
    "like" JSON,
    "bookmark" JSON,
    "user_id" UUID,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "username" TEXT,
    "full_name" TEXT,
    "avatar_url" TEXT,
    "website" TEXT,
    "description" TEXT,
    "likedposts" UUID[],
    "bookmarkPosts" UUID[],

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_info" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "Followers" BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    "Following" BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    "description" TEXT,

    CONSTRAINT "users_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_info_username_key" ON "users_info"("username");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
