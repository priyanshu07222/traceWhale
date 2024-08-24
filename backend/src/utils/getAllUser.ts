import prisma from '../db';


const getAllUserEmail = async() => {
    try {
      const users = await prisma.user.findMany()

      

      if(!users) {
        return null;
      }
  
      const userEmail = users.map((user) => {
        return user.email
      })
      return userEmail;
    } catch (error) {
      console.log("Error while get user's email", error)
    }
}

export const getUserEmailWithUserId = async (userId: number) => {
  try {
    const users = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    if(!users) {
      return null;
    }

    const email = users.email;
    return email;
  } catch (error) {
    console.log(error)
  }
}

export default getAllUserEmail;