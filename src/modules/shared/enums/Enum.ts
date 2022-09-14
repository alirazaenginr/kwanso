export enum Database {
  NOW = "NOW()",
  HASH = "hash",
  BTREE = "btree",
  UUID = "UUID()",
  CREATED_AT = NOW,
  NULL = "SET NULL",
  CASCADE = "CASCADE",
  RESTRICT = "RESTRICT",
  UPDATED_AT = "NOW() ON UPDATE NOW()",
  ONE_YEAR_INTERAL = "DATE_ADD(NOW(), INTERVAL 1 YEAR)",
  TWO_YEAR_INTERAL = "DATE_ADD(NOW(), INTERVAL 2 YEAR)",
  THREE_YEAR_INTERAL = "DATE_ADD(NOW(), INTERVAL 3 YEAR)",
  ONE_MONTH_INTERVAL = "DATE_ADD(NOW(), INTERVAL 1 MONTH)",
  ENABLE_FOREIGN_KEY_CHECK = "SET FOREIGN_KEY_CHECKS = 1",
  DISABLE_FOREIGN_KEY_CHECK = "SET FOREIGN_KEY_CHECKS = 0",
}

export enum ENV {
  Development = "development",
  Production = "production"
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export enum SystemEvent {
  EXIT = "exit",
}
