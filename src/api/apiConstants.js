// export const IDTY_PROD_HOST_URI = "http://localhost:807/api";
// export const ENGT_PROD_BASE_URI = "http://localhost:815/api";
// export const REPT_PROD_HOST_URI = 'http://localhost:818/api';
// export const TENT_PROD_HOST_URI = 'http://localhost:880/api';

export const IDTY_PROD_HOST_URI = "https://frg6g6wml9.execute-api.ap-south-1.amazonaws.com/Prod/api";
export const ENGT_PROD_BASE_URI = 'https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api';
export const REPT_PROD_HOST_URI = 'https://wehmutx1th.execute-api.ap-south-1.amazonaws.com/Prod/api';
export const TENT_PROD_HOST_URI = 'https://i5dwhd96xi.execute-api.ap-south-1.amazonaws.com/Prod/api';


export const SOMETHING_WENT_WRONG='Successfully Deleted';

export const serverResponse={
     SUCCESS:1,
     USER_EMAIL_NOT_FOUND:2,
     INVALID_TOKEN:3,
     USER_ALREADY_EXISTS:4,
}

export const EMAIL = 'Email'
export const DEFAULT_FILTER_DAYS = 7;
export const DEFAULT_FILTER_MONTHS = 2;
export const JWT_TOKEN = 'JwtToken'
export const REFRESH_TOKEN = 'RefreshToken'
export const DUMM_TENANT_KEY = "BLAASH-SYS-2021";

export const USER_BY_FILTERS = "/idty/userbyfilter?pagesize=";
export const USER_BY_MAIL = "/idty/isemailexists?email=";
export const INVITE_USER = "/idty/admin/inviteuser";
export const UPDATE_USER = "/idty/updateuser";
export const DELETE_USER = "/idty/deleteuser?user_id=";
export const GROUP_ADDEDIT = "/idty/groupaddedit";
export const GROUP_ALL = "/idty/group/all";
export const USER_DATA_GROUP_PERMISSIONS = "/idty/userDataAndGroupPermissions?email=";
export const PERMISSION_ALL = "/idty/permission/all";
export const PERMISSION_BY_GROUP = '/idty/permissionsbygroup?group_id=';
export const ADD_USER_TO_GROUP = "/idty/addusertogroup";
export const REMOVE_USER_TO_GROUP = "/idty/removeusertogroup";
export const USER_BY_USERNAME = "/idty/userbyusername?user_name=";
export const GET_GROUPS = "/idty/getgroups";
export const ADD_NEWGROUP = "/idty/addnewgroup";
export const UPDATE_GROUP = '/idty/updategroup';
export const DELETE_GROUP = "/idty/deletegroup?group_id=";
export const GROUP_BY_GROUPNAME = "/idty/groupbygroupname?group_name=";

export const ENGAGEMENTS_BY_FILTERS = "/engt/engagementbyfilters";
export const CUSTOMERS_BY_FILTERS = "/engt/customersbyfilters";
export const REWARD_BY_FILTERS = "/engt/rewardbyfilters";
export const REWARD_TYPES = "/engt/rewardtypes";
export const REWARDS_BY_REWARD_TYPE = "/engt/rewardByRewardType?reward_type_id=";
export const JOURNEY_BY_FILTERS = "/engt/journeybyfilters";
export const SAVE_ENGAGEMENT = "/engt/saveengagement";
export const DELETE_ENGAGEMENT = "/engt/deleteengagement?engagement_id=";
export const UPDATE_ENGAGEMENT_STATUS = "/engt/updateengagementstatus";
export const ENGAGEMENTS_BY_STATUS = "/engt/engagementsbystatus";
export const ENGAGEMENTS_BY_ID = '/engt/engagementbyid?engagement_id=';
export const ENGAGEMENTS_DETAILS_BY_ID = '/engt/engagementdetailsbyid?engagement_id=';
export const ENGAGEMENT_UPDATE_STATUS = '/engt/updateengagementstatus?engagement_id=';
export const ENGAGEMENT_BY_STATUS_ID = '/engt/engagementsbystatus?engagement_status_id=';
export const JOURNEYS = '/engt/AllJourneys'
export const JOURNEY_TASKS = '/engt/journeyTasks'
export const ADD_JOURNEY_DETAILS = '/engt/addjourneydetails';
export const UPDATE_JOURNEY_DETAILS = '/engt/updatejourneydetails';
export const DELETE_JOURNEY_DETAILS = '/engt/deletejourney?journey_id=';
export const JOURNEYS_BY_SEARCH = '/engt/JourneysByName?journey_name=';
export const MASTER_REWARDS='/engt/masterRewards';
export const CREATE_REWARD_MASTER='/engt/CreateRewardMaster';
export const UPDATE_REWARD_MATER='/engt/updateRewardMaster';
export const MASTER_CATEGORIES='/engt/masterCategories';
export const UPDATE_REWARD_MASTER_STATUS_BY_ID='/engt/updateRewardStatus?reward_master_id=';


export const CONSOLIDATION_SUMMARY_BY_FILTER = '/rept/consolidationSummaryByFilter';
export const DAY_WISE_SALES_BY_FILTER = '/rept/dayWiseSalesByFilter';
export const DAY_WISE_ACTIVE_ENGAGED_USERS = '/rept/dayWiseActiveAndEngagedUsers';
export const MONTH_WISE_ACTIVE_ENGAGED_USERS = '/rept/monthWiseActiveAndEngagedUsers';
export const CONSOLIDATED_BRAND_HEALTH = '/rept/conslidatedBrandHealth';
export const CONSOLIDATED_INCREMENTAL_SALES = '/rept/consolidatedIncrementalSales';
export const DAY_WISE_BRAND_HEALTH_DATA = '/rept/dayWiseBrandHealthData';
export const ENGAGEMENT_STATISTICS='/rept/engagementStatistics';

export const SETTINGS_TEMPLATE='/tenm/settingsTemplate';
export const GET_TENANT_SETTINGS='/tenm/getTenantSettings';
export const SAVE_TENANT_SETTINGS='/tenm/saveTenantSettings';