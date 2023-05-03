export enum Locales {
  RU = 'ru',
  EN = 'en',
  UZ = 'uz',
}

export enum UserTypes {
  PROVIDER = 'provider',
  INDIVIDUAL = 'individual',
  ENTITY = 'entity'
}
export enum UploadFileTypes {
  WORD = '.doc, .docx, application/msword',
  EXCEL = '.xls, .xlsx, application/vnd.ms-excel',
  POWER_POINT = '.ppt, .pptx, application/vnd.ms-powerpoint',
  TEXT = 'text/plain',
  PDF = 'application/pdf',
  IMAGES = 'image/*'
}

export enum FeedbackTypes {
  BACK_CALL = 'back_call',
  FAQ = 'faq',
  PARTNER = 'partner',
  REPORT_ORDER = 'report_order',
  SHOW_CASE = 'show_case'
}

export enum ResetPasswordTypes {
  EMAIL = 'email',
  PHONE = 'phone'
}

export enum ReportCategories {
  ANALYTICAL = 'analytical',
  STATISTICAL = 'statistical'
}

export enum InvoiceStatuses {
  PAID = 'paid',
  PENDING = 'pending',
  CANCEL = 'cancel'
}

export enum TradeStatuses {
  ACTIVE = 'active',
  CLOSED = 'closed',
  CANCELED = 'canceled',
  DRAFT = 'draft'
}

export enum StatisticsTypes {
  EXPORT = 'export',
  IMPORT = 'import'
}

export enum StatisticsPeriodTypes {
  YEAR = 'year',
  MONTH = 'month'
}

export enum StatisticsCategoryTypes {
  EXPORT = 'export',
  IMPORT = 'import',
  SUPERMARKET = 'super_market',
  BOZOR = 'market'
}

export enum StatisticsCompareTypes {
  COUNTRY = 'country',
  REGION = 'region',
  SUPERMARKETS = 'superMarket',

  PRODUCTS = 'products',
  BAZAR_PRODUCTS = 'bazarProducts',
  SUPER_MARKET_PRODUCTS = 'superMarketProducts',

  PERIOD = 'period',
}

export enum TradeKinds {
  AUCTION = 'auction',
  COMPETITION = 'competition'
}

export enum TradePositions {
  UP = 'up',
  DOWN = 'down'
}

export enum TradeTypes {
  SALE = 'sale',
  PURCHASE = 'purchase'
}

export enum TradePrivacies {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export enum AccreditationStatuses {
  NEW = 'new',
  IN_PROCESS = 'in_process',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum BalanceTypes {
  INVOICE = 'invoice',
  TRANSACTIONS = 'transactions'
}

export enum BalancePaymentTypes {
  PAYME = 'payme',
  CLICK = 'click'
}

export enum MailingTypes {
  EMAIL = 'email',
  PRODUCTS = 'products'
}

export enum SecurityTypes {
  PASSWORD = 'password',
  EMAIL = 'email',
  PHONE = 'phone'
}

export enum ReportCoverages {
  WORLD = 'world',
  COUNTRY = 'country',
  REGION = 'region'
}

export enum RatingDesignations {
  A = 'A',
  AA = 'AA',
  AAA = 'AAA',
  B = 'B',
  B_ = 'B-',
  DEL = 'DEL',
}
