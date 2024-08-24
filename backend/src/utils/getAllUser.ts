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

export default getAllUserEmail;