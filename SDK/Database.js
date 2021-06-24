import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';

import CONFIG from '../config';


class Database{
    
    mDatabasePtr = null;
    mCurrentDBFile = '';
    mOpened = false;

    constructor(){
    }

    setDatabase(pDBFile)
    {
      this.mCurrentDBFile = pDBFile;
    }

    open() {
        this.mDatabasePtr = SQLite.openDatabase(this.mCurrentDBFile);

        if(this.mDatabasePtr)
          this.mOpened = true;
    }

    close() {

      if(this.mOpened)
        this.mDatabasePtr._db.close();
        
    }

    query(pQuery, pBind= []) {

      
        if(!pQuery)
          return;

        if(!this.mDatabasePtr)
        {
          console.log("REOPEN DATABASE : ", this.mCurrentDBFile);
          this.open(this.mCurrentDBFile);
        }

        var lPromise = new Promise( (pResolve, pReject) => {

            this.mDatabasePtr.transaction(
                tx => {
                  console.log("This is printed");
                  tx.executeSql(
                    pQuery,
                    pBind,
                    (tx, results) => {
                      pResolve({ rows : results.rows, count : results.length});
                    },
                    (tx, error) => {
                      console.log("query : ", pQuery);
                      console.log(error);
                      //alert(error);
                    }
                  );
                },
                error => {
                  console.log("query :", pQuery);
                  console.log("ERROR :", error);
                  //alert(error);
                },
                () => {
                  console.log("Transaction done");
                }
              );
        });

        return lPromise;        
    }
}

export default Database;