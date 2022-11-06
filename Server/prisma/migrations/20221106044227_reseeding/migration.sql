/*
  Warnings:

  - You are about to drop the column `Report` on the `Bounty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Bounty` DROP COLUMN `Report`,
    MODIFY `Price` DECIMAL(65, 30) NOT NULL,
    MODIFY `Success` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `Tree` MODIFY `price` DECIMAL(65, 30) NOT NULL;
