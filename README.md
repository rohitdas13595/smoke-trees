This is a sample project related to one to many relationshi between the user and address.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Store environment variables in .env.local file

# Database
databaseName: users
```
create database users;
```
### Tables

```
    -- users.users definition

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `mobile` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
```

```
-- users.addresses definition

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `address1` text,
  `address2` text,
  `address3` text,
  `city` text,
  `state` text,
  `pincode` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
```






# Output
#### Fill The Mobile Number
![pic1](https://github.com/rohitdas13595/smoke-trees/blob/main/output/landing.png)
---
#### Fill the Name If Not There
![pic2](https://github.com/rohitdas13595/smoke-trees/blob/main/output/1.png)
---
#### No Data
![pic1](https://github.com/rohitdas13595/smoke-trees/blob/main/output/2.png)
---
#### Address Form
![pic1](https://github.com/rohitdas13595/smoke-trees/blob/main/output/3.png)
---
#### Address Form Filled
![pic1](https://github.com/rohitdas13595/smoke-trees/blob/main/output/4.png)
---
#### Address Visible
![pic1](https://github.com/rohitdas13595/smoke-trees/blob/main/output/5.png)
---
#### Delete Address
![pic1](https://github.com/rohitdas13595/smoke-trees/blob/main/output/6.png)
---
#### Address Deleted
![pic1](https://github.com/rohitdas13595/smoke-trees/blob/main/output/7.png)
---



