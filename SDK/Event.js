
class Event
{
    mEventList = {};

    listenEvent(pID, pCallback)
    {
        if(!(pID in this.mEventList))
            this.mEventList[pID] = {func : pCallback};
    }

    triggerEvent(pID, pData)
    {
        if(pID in this.mEventList)
        {
            if('func' in this.mEventList[pID])
            {
                this.mEventList[pID].func(pData)
            }
        }
    }
}

export default Event;