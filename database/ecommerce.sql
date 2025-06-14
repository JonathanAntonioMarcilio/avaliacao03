CREATE SCHEMA `ecommerce` DEFAULT CHARACTER SET utf8 ;
USE `ecommerce` ;

CREATE TABLE `pedido_produto`(
    `idProduct` INT UNSIGNED NOT NULL,
    `idOrder` INT UNSIGNED NOT NULL
);

CREATE TABLE `pedido`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT UNSIGNED NOT NULL,
    `products` VARCHAR(45) NOT NULL
);

CREATE TABLE `produto`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryId` INT UNSIGNED NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `price` FLOAT(53) NOT NULL
);

CREATE TABLE `usuario`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(85) NOT NULL,
    `password` VARCHAR(45) NOT NULL
);

CREATE TABLE `categoria`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(125) NOT NULL
);

ALTER TABLE
    `pedido_produto` ADD CONSTRAINT `pedido_produto_idproduct_foreign` FOREIGN KEY(`idProduct`) REFERENCES `produto`(`id`) ON DELETE CASCADE;

ALTER TABLE
    `pedido_produto` ADD CONSTRAINT `pedido_produto_idorder_foreign` FOREIGN KEY(`idOrder`) REFERENCES `pedido`(`id`) ON DELETE CASCADE;

ALTER TABLE
    `pedido` ADD CONSTRAINT `pedido_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `usuario`(`id`) ON DELETE CASCADE;

ALTER TABLE
    `produto` ADD CONSTRAINT `produto_categoryid_foreign` FOREIGN KEY(`categoryId`) REFERENCES `categoria`(`id`) ON DELETE CASCADE;
