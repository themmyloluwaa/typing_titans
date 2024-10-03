-- CreateTable
CREATE TABLE "Country" (
    "code" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT auth.uid(),
    "email" TEXT NOT NULL,
    "username" TEXT,
    "country_code" VARCHAR(2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_sessions" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "level" INTEGER NOT NULL,
    "wpm" INTEGER NOT NULL,
    "accuracy" DECIMAL(5,2) NOT NULL,
    "time_taken" DECIMAL(8,2) NOT NULL,
    "score" INTEGER NOT NULL,
    "text_practiced" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stats" (
    "user_id" UUID NOT NULL,
    "highest_level" INTEGER NOT NULL DEFAULT 1,
    "total_score" BIGINT NOT NULL DEFAULT 0,
    "average_wpm" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "average_accuracy" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "total_practice_time" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_stats_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "practice_texts" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "difficulty_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_texts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "Country"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
