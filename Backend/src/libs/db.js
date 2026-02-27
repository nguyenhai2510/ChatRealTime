import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Liên kết thành công với CSDL")
  } catch (error) {
    console.log("Lỗi kết nối CSDL: ", error)
    process.exit(1);
  }
};