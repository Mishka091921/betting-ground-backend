-- CreateTable
CREATE TABLE `Account` (
    `id` CHAR(36) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,
    `type` ENUM('admin', 'player', 'developer') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastLogin` DATETIME(3) NULL,
    `playerLevel` INTEGER NOT NULL DEFAULT 1,
    `contact` VARCHAR(191) NOT NULL,
    `birthdate` VARCHAR(191) NOT NULL,
    `lastLoginIp` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'suspended', 'pending') NOT NULL,

    UNIQUE INDEX `Account_username_key`(`username`),
    UNIQUE INDEX `Account_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
