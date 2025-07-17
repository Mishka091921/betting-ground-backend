-- AlterTable
ALTER TABLE `Account` MODIFY `type` ENUM('general_admin', 'super_admin', 'admin', 'player', 'developer') NOT NULL;
