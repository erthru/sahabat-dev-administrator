/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usedTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "usedTag" DROP CONSTRAINT "usedTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "usedTag" DROP CONSTRAINT "usedTag_tagId_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "usedTag";
