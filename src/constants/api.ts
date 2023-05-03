import { GetServerSidePropsContext } from 'next'

const API_VERSION = 'api/v1'

export function getApiBaseURL (req?: GetServerSidePropsContext['req']): string {
  const host = typeof window === 'undefined'
    ? req ? req.headers.host : ''
    : window.location.host

  const isDev = process.env.NODE_ENV === 'development'
  const isStaging = host.includes('staging')

  const stagingApi = `${process.env.NEXT_PUBLIC_STAGING_API_URL}/${API_VERSION}/`
  const prodApi = `${process.env.NEXT_PUBLIC_API_URL}/${API_VERSION}/`

  if (isStaging || isDev) return stagingApi

  return prodApi
}

const USER = 'user'
export const SIGN_UP_INDIVIDUAL = `/${USER}/signup_individual/`
export const SIGN_UP_ENTITY = `/${USER}/signup_entity/`
export const SEND_CODE = `/${USER}/send_sms/`
export const VERIFY_CODE = `/${USER}/verify_code/`
export const VERIFY_EMAIL = `/${USER}/verify_email_code/`
export const CHECK_EMAIL = `/${USER}/email_check/`
export const UPDATE_PROFILE = `/${USER}/update_profile/`

export const SHOWCASE_USER_DETAIL = `/${USER}/show_case/%s/`
export const USERS_REPUTATION_LIST = `/${USER}/reputation/`

const PRODUCT_GROUP_CLASS = 'commodity_gr_class'
export const PRODUCT_GROUP_CLASS_LIST = `/${PRODUCT_GROUP_CLASS}/`
export const PRODUCT_SELECT_LIST = `/${PRODUCT_GROUP_CLASS}/select/`
export const PRODUCT_TRADE_COUNTRY_LIST = `/${PRODUCT_GROUP_CLASS}/trade_country/`
export const PRODUCT_TRADE_REGION_LIST = `/${PRODUCT_GROUP_CLASS}/market_region/`
export const PRODUCT_TRADE_SUPER_MARKET_LIST = `/${PRODUCT_GROUP_CLASS}/super_markets/`
export const PRODUCT_TRADE_SELECT_LIST = `/${PRODUCT_GROUP_CLASS}/trade_product/`
export const PRODUCT_TRADE_MARKET_SELECT_LIST = `/${PRODUCT_GROUP_CLASS}/market_product/`
export const PRODUCT_TRADE_SUPER_MARKET_SELECT_LIST = `/${PRODUCT_GROUP_CLASS}/super_market_product/`
export const PRODUCT_GROUP_POPULAR = `/${PRODUCT_GROUP_CLASS}/popular/`

const PRODUCT_GROUP_ATTRIBUTES = 'commodity_attribute/values'
export const PRODUCT_GROUP_ATTRIBUTES_LIST = `/${PRODUCT_GROUP_ATTRIBUTES}/%s/`

export const LOGIN = `/${USER}/login/`
export const LOGIN_WITH_ONE_ID = `/${USER}/login_with_one_id/`
export const LOGOUT = `/${USER}/logout/`
export const ME = `/${USER}/me/`
export const CHECK_TOKEN = `/${USER}/check_token/`
export const RESET_PASSWORD = `/${USER}/reset_password/`
export const RESET_PASSWORD_SAVE = `/${USER}/reset_password_save/`

// Misc
const FILE = 'file'
export const FILE_CREATE = `/${FILE}/`

const COUNTRY = 'country'
export const COUNTRY_LIST = `/${COUNTRY}/`

export const QUALITY_STANDARD = 'quality_standard'
export const QUALITY_STANDARD_LIST = `/${QUALITY_STANDARD}/`

const REGION = 'region'
export const REGION_LIST = `/${REGION}/`

const DISTRICT = 'district'
export const DISTRICT_LIST = `/${DISTRICT}/`

const EXCHANGE_RATE = 'course'
export const EXCHANGE_RATE_LIST = `/${EXCHANGE_RATE}/`

const PROJECT_CONFIG = 'project_config'
export const PROJECT_CONFIG_LIST = `/${PROJECT_CONFIG}/`

const MEASUREMENT = 'measurement'
export const MEASUREMENT_LIST = `/${MEASUREMENT}/`

const CURRENCY = 'currencies'
export const CURRENCY_LIST = `/${CURRENCY}/`

// Page APIs
const NEWS = 'news'
export const NEWS_LIST = `/${NEWS}/`
export const NEWS_DETAIL = `/${NEWS}/%s/`
export const NEWS_CATEGORY_LIST = `/${NEWS}/category/`

const FAQ_CATEGORY = 'faq'
export const FAQ_CATEGORY_LIST = `/${FAQ_CATEGORY}/grouped/`

const REPORT = 'report'
export const REPORT_LIST = `/${REPORT}/`
export const REPORT_DETAIL = `/${REPORT}/%s/`
export const REPORT_PURCHASE = `/${REPORT}/%s/buy/`
export const REPORT_DOWNLOAD_FILE = `/${REPORT}/%s/get_file/`
export const REPORT_DOWNLOAD_PREVIEW_FILE = `/${REPORT}/%s/get_preview_file/`

const STATISTICS = 'statistics'
export const STATISTICS_TRADE = '/bargain/sales_statistics/'
export const STATISTICS_EXPORT = '/commodity_gr_class/trade_stat/'
export const STATISTICS_BY_COUNTRY = `/${PRODUCT_GROUP_CLASS}/trade_stat/by_country/`
export const STATISTICS_BY_REGION = `/${PRODUCT_GROUP_CLASS}/trade_stat/by_region/`
export const STATISTICS_BY_PRODUCT = `/${PRODUCT_GROUP_CLASS}/trade_stat/by_product/`
export const STATISTICS_MARKET_BY_PERIOD = `/${PRODUCT_GROUP_CLASS}/market_stat/by_period/`
export const STATISTICS_MARKET_BY_PRODUCT = `/${PRODUCT_GROUP_CLASS}/market_stat/by_product/`
export const STATISTICS_BY_SUPER_MARKET = `/${PRODUCT_GROUP_CLASS}/super_market_stat/by_super_market/`
export const STATISTICS_PRODUCTS_BY_SUPER_MARKET = `/${PRODUCT_GROUP_CLASS}/super_market_stat/by_product/`
export const STATISTICS_SUPER_MARKET_BY_PERIOD = `/${PRODUCT_GROUP_CLASS}/super_market_stat/by_period/`
export const STATISTICS_BY_PERIOD = `/${PRODUCT_GROUP_CLASS}/trade_stat/by_period/`

const FEEDBACK = 'feedback'
export const FEEDBACK_CREATE = `/${FEEDBACK}/`
export const FEEDBACK_DETAIL = `/${FEEDBACK}/%s/`

const SERVICE = 'service'
export const SERVICE_LIST = `/${SERVICE}/`
export const SERVICE_DETAIL = `/${SERVICE}/%s/`

const SERVICE_CATEGORY = `${SERVICE}/category`
export const SERVICE_CATEGORY_LIST = `/${SERVICE_CATEGORY}/`
export const SERVICE_CATEGORY_DETAIL = `/${SERVICE_CATEGORY}/%s/`

const TRADE = 'bargain'
export const TRADE_PUBLIC_LIST = `/${TRADE}/list/`
export const TRADE_DETAIL = `/${TRADE}/%s/`
export const TRADE_ORGANIZER_DETAIL = `/${TRADE}/organizer/%s/`
export const TRADE_DETAIL_STATUS_FAKTURA = `/${TRADE}/status_faktura/%s/`
export const TRADE_CREATE = `/${TRADE}/`
export const TRADE_UPDATE = `/${TRADE}/%s/`
export const TRADE_DELETE = `/${TRADE}/%s/`
export const TRADE_CREATE_DRAFT = `/${TRADE}/draft/`
export const TRADE_UPDATE_DRAFT = `/${TRADE}/draft/%s/`
export const TRADE_PARTICIPATE = `/${TRADE}/to_accept/`
export const TRADE_CREATE_REVIEW = `/${TRADE}/add_review/`
export const TRADE_UPLOAD_CONTRACT = `/${TRADE}/contract/`
export const TRADE_PARTICIPANTS_LIST = `/${TRADE}/participants/`
export const TRADE_CHOOSE_WINNER = `/${TRADE}/choose_winner/`
export const TRADE_USER_REVIEWS = `/${TRADE}/review/`
export const TRADE_STATS = `/${TRADE}/statistics/`
export const TRADE_MAX_PRICE = `/${TRADE}/max_price/`
export const TRADE_CONTRACT_TEMPLATE_LIST = `/${TRADE}/contract-template/`

export const FAVOURITE_CREATE = `/${TRADE}/favourite/`
export const BANNER_LIST = `/${TRADE}/list/banner_list/`
export const BANNER_PRODUCTS_LIST = `/${TRADE}/list/hot_list/`

const STATIC_PAGE = 'static_page'
export const STATIC_PAGE_LIST = `/${STATIC_PAGE}/`
export const STATIC_PAGE_DETAIL = `/${STATIC_PAGE}/get_key/%s/`

// Account APIs
const ACCREDITATION = 'accreditation'
export const ACCREDITATION_REQUEST = `/${ACCREDITATION}/accreditation_request/`

const BALANCE_INVOICE = 'invoice'
const BALANCE_TRANSACTION = 'transaction'
export const TOP_UP_BALANCE = `/${USER}/top_up_balance/`
export const BALANCE_INVOICE_LIST = `/${BALANCE_INVOICE}/`
export const BALANCE_TRANSACTION_LIST = `/${BALANCE_TRANSACTION}/`
export const BALANCE_INVOICE_PAY = `/${BALANCE_TRANSACTION}/pay_pending/`

export const CHANGE_AVATAR = `/${USER}/edit_avatar/`
export const CHANGE_PASSWORD = `/${USER}/edit_password/`
export const CHANGE_USERNAME_CHECK = `/${USER}/username_change_send_code/`
export const CHANGE_USERNAME = `/${USER}/username_change/`

export const USER_REPORT = `${USER}/my_report`
export const USER_REPORT_LIST = `/${USER_REPORT}/`

export const USER_TRADE_LIST = `/${USER}/my_bargain/`
export const USER_TRADE_PARTICIPATE_LIST = `/${USER}/bargain_participating_and_invited/`

const NOTIFICATION = 'notification'
export const NOTIFICATION_LIST = `/${NOTIFICATION}/`
export const NOTIFICATION_COUNT = `/${NOTIFICATION}/count/`
export const NOTIFICATION_FIREBASE = `/${NOTIFICATION}/firebase/`

const USER_FEEDBACK = `${FEEDBACK}/recipient`
export const USER_FEEDBACK_LIST = `/${USER_FEEDBACK}/`
export const USER_FEEDBACK_RESPOND = `/${USER_FEEDBACK}/%s/set_answer/`

const USER_SERVICE = `${SERVICE}/my`
export const USER_SERVICE_LIST = `/${USER_SERVICE}/`

const MAILING_PRODUCT = `${NOTIFICATION}/notify_cgc`
export const MAILING_PRODUCT_LIST = `/${MAILING_PRODUCT}/`
export const MAILING_PRODUCT_CREATE = `/${MAILING_PRODUCT}/`
export const MAILING_PRODUCT_LIST_UPDATE = `/${MAILING_PRODUCT}/change/`

const MAILING_EMAIL = `${USER}/email_notify`
export const MAILING_EMAIL_LIST = `/${MAILING_EMAIL}/`
export const MAILING_EMAIL_CREATE = `/${MAILING_EMAIL}/`
