import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

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

export const SignIn = async (req, res) => {
  try {
    // 1 lấy input
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Thiếu username hoặc password.",
      });
    }

    // 2 tìm user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Thiếu username hoặc password.",
      });
    }

    // 3 so sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "Sai username hoặc password.",
      });
    }

    // 4 Tạo Access token với JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // 5 tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // 6 tạo session mới để lưu refresh token
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // 7 lưu refresh token trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none", // backend, frontend  deploy rieng
      maxAge: REFRESH_TOKEN_TTL,
    });

    // 8 trả access token
    return res.status(200).json({
      message: "Đăng nhập thành công.",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({
      message: "Lỗi hệ thống.",
    });
  }
};
