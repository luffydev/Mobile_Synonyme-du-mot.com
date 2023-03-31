import * as FileSystem from 'expo-file-system';

class DownloadManager
{
    constructor()
    {
    }

    async fileExist(pURI)
    {
        var lFolder = FileSystem.documentDirectory + 'SQLite/';
        var lFolderExist = await FileSystem.getInfoAsync(lFolder);

        if(!('exists' in lFolderExist) || !lFolderExist.exists && !lFolderExist.isDirectory)
        {
            await FileSystem.makeDirectoryAsync(lFolder, {intermediates: true});
        }

        return FileSystem.getInfoAsync(lFolder +  pURI, { md5: true, size: true });
    }

    async downloadFile(pURL, pLocalName, pPtr = null, pSize = 0, pCallback = () => {})
    {
		console.log("start");
        
            
            const lCallback = pDownloadProgress => {

                if(pSize === 0)
                    pSize = pDownloadProgress.totalBytesExpectedToWrite;
    
                const lPercent = pDownloadProgress.totalBytesWritten / pSize;
                
    
                if(pPtr != null)
                    pPtr.updateProgress(lPercent);
            }
			
			console.log(pURL);
            console.log(FileSystem.documentDirectory + 'SQLite/' + pLocalName);
    
            const lDownloadResumable = FileSystem.createDownloadResumable(pURL,
            FileSystem.documentDirectory + 'SQLite/' + pLocalName, {}, lCallback);
    
            try {
                const { uri } = await lDownloadResumable.downloadAsync();
                console.log('Finished downloading to ', uri);

                global.DatabaseHandler.open();
    
                pCallback();
              } catch (e) {
                console.error("ERROR : ", e);
            } 
    }

    cleanOldDatabases()
    {
        var lPromise = new Promise((pResolve, pReject) => {

            FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'SQLite/').then( async (pList) =>
            {

                console.log(pList);
                
                pList.forEach(async pFile => {
                    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/' + pFile);
                });               

                pResolve();
            });            

        });
        
        return lPromise;
    }
}

export default DownloadManager;