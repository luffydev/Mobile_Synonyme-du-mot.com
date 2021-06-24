
const CONFIG = {

    // Define application title on the appbar
    APP_TITLE      : 'Synonyme-du-mot.com',

    /* ************* */
    /*   Ads Config  */
    /* ************* */

    ADS_IOS_UNIT_ID       : 'ca-app-pub-3940256099942544/2934735716',
    ADS_ANDROID_UNIT_ID   : 'ca-app-pub-1842226795073288/1845330219',

    /* *************  */
    /* Contact Config */
    /* *************  */

    CONTACT_EMAIL         : 'app@synonyme-du-mot.com',
    CONTACT_SUBJECT       : 'Information a propos de l\'application Synonyme-du-mot.com',
    CONTACT_CONTENT       : 'J\'ai une question a propos de l\'application Synonyme-du-mot.com',

    /* ************* */
    /* Share Config  */
    /* ************* */

    SHARE_MESSAGE  : 'Je te partage cette application Synonyme du mot : dictionnaire des synonymes et antonymes https://www.synonyme-du-mot.com/app',
    SHARE_TITLE    : 'Partager', 
    SHARE_SUBJECT  : 'Partager l\'application', 

    /* ************* */
    /* Remote Config */
    /* ************* */
    
    // Base remote protocol (http or https)
    BASE_PROTOCOL : 'https',

    // URL of remote server
    BASE_URL : 'app.synonyme-du-mot.com',

    // Name of remote DB file
    DATABASE_DIST_FILENAME : 'database.db',

    // Not used yet ( maybe deleted later )
    DATABASE_LOCAL_HASH     : '',

    // Local DB name
    DATABASE_LOCAL_FILENAME : 'database.db',

    // SQL Query for create favorite table if not exist
    DATABASE_FAVORITE_TABLE_SQL : 'CREATE TABLE IF NOT EXISTS "favorite"( "id" INTEGER NOT NULL UNIQUE, "word" TEXT NOT NULL, PRIMARY KEY("id" AUTOINCREMENT));'
}

export default CONFIG;