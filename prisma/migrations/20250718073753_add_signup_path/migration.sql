-- DropIndex
DROP INDEX `Account_nickname_key` ON `Account`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `signupPath` VARCHAR(191) NULL;
