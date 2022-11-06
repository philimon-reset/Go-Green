/*
  Warnings:

  - You are about to drop the column `radius` on the `Bounty` table. All the data in the column will be lost.
  - You are about to alter the column `Price` on the `Bounty` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price` on the `Tree` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the `_BountyToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bounty` DROP FOREIGN KEY `Bounty_sponsorId_fkey`;

-- DropForeignKey
ALTER TABLE `Bounty` DROP FOREIGN KEY `Bounty_treeId_fkey`;

-- DropForeignKey
ALTER TABLE `_BountyToUser` DROP FOREIGN KEY `_BountyToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BountyToUser` DROP FOREIGN KEY `_BountyToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Bounty` DROP COLUMN `radius`,
    ADD COLUMN `Report` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `Price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Tree` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `wallet` INTEGER NOT NULL DEFAULT 500,
    MODIFY `PayPal` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_BountyToUser`;

-- CreateTable
CREATE TABLE `Claims` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `bountyId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `bountyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bounty` ADD CONSTRAINT `Bounty_sponsorId_fkey` FOREIGN KEY (`sponsorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bounty` ADD CONSTRAINT `Bounty_treeId_fkey` FOREIGN KEY (`treeId`) REFERENCES `Tree`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_bountyId_fkey` FOREIGN KEY (`bountyId`) REFERENCES `Bounty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
