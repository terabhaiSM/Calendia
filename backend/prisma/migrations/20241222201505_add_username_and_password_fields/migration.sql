/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `CalendarOwner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `CalendarOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `CalendarOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CalendarOwner" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CalendarOwner_username_key" ON "CalendarOwner"("username");
