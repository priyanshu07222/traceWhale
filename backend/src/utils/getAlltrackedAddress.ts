import prisma from "../db"

const getAllTrackedAddress = async (userId: number) => {

    if(!userId) {
        return null;
    }
    

    try {
        const data = await prisma.trackAccounts.findMany({
            where: {
               userId
            }
        })
    
        if(!data){
            return;
        }
    
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getAllTrackedAddress;