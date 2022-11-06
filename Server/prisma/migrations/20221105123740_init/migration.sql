/*
  Warnings:

  - Added the required column `Price` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bounty` ADD COLUMN `After_pic` VARCHAR(191) NULL,
    ADD COLUMN `Before_pic` VARCHAR(191) NULL,
    ADD COLUMN `Price` INTEGER NOT NULL,
    ADD COLUMN `Success` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `city_id` INTEGER NULL,
    ADD COLUMN `location_end` VARCHAR(191) NULL,
    ADD COLUMN `radius` INTEGER NULL;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `Country` VARCHAR(191) NOT NULL DEFAULT 'Germany',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bounty` ADD CONSTRAINT `Bounty_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
