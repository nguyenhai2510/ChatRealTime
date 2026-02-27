import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // 1️⃣ Kiểm tra thiếu dữ liệu
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "Thiếu thông tin bắt buộc",
      });
    }

    // 2️⃣ Kiểm tra user đã tồn tại chưa
    const duplicate = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Email hoặc username đã tồn tại",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Tạo user mới
    const newUser = await User.create({
      username,
      email,
      hashedPassword,
      displayName: `${firstName} ${lastName}`,
    });

    // 5️⃣ Trả về kết quả (KHÔNG trả password)
    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Lỗi khi gọi signUp", error);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};
