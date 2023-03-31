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


            console.log("CURRENT REQUEST : " +pQuery);

            this.mDatabasePtr.transaction((pTransaction) => {
              
              pTransaction.executeSql(pQuery, pBind, (pTransaction, pResults) => 
              {
                  pResolve({ rows : pResults.rows, count : pResults.length});

              }, (pTransaction, pError) => {
                  console.log("ERROR : " + pError);
                  pReject();
                  return;
              });

            }, () => {}, () => {
              console.log("Transaction done");
            })

        });

        return lPromise;        
    }
}

export default Database;