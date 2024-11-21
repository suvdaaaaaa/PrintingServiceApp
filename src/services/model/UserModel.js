import prisma from "@/utils/prisma";
import { hash } from "bcryptjs";
import * as bcrypt from "bcryptjs";

export const getUsersModel = async () => {
  try {
    const users = await prisma.user.findMany({});
    return users;
  } catch (error) {
    console.error("Error in get users model:", error);
    throw new Error("Failed to fetch users");
  }
};

export const getUserByIdModel = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      select: {
        user_id: true,
        fname: true,
        lname: true,
        email: true,
        phone: true,
        role: true,
      },
      where: {
        user_id: id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error in getUserByIdModel:", error);
    throw new Error("Failed to fetch user one");
  }
};

export const createUserModel = async (data) => {
  const { fname, email, phone, password } = data;
  const hashedPassword = await hash(password, 10);

  const userCheck = await prisma.user.findUnique({
    select: {
      email: true,
    },
    where: {
      email,
    },
  });

  if (userCheck) {
    return {
      status: 409,
      message: "Бүртгэлтэй хэрэглэгч байна",
      result: null,
    };
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        fname,
        lname: '',
        email,
        phone,
        password: hashedPassword,
        address: '',
        role: 2,
      },
    });

    console.log("newUser", newUser);

    return {
      status: 200,
      message: "Амжилттай бүртгэгдлээ",
      result: newUser,
    };
  } catch (error) {
    console.error(`Error in createUserModel: ${error}`);

    return {
      status: 500,
      message: "Server error",
      result: `${error.message}`,
    };
  }
};

export const loginUserModel = async (email, pwd) => {
  try {
    const user = await prisma.user.findUnique({
      select: {
        user_id: true,
        fname: true,
        email: true,
        phone: true,
        role: true,
        password: true,
      },
      where: {
        email,
      },
    });

    if (!user) {
      return {
        status: 404,
        message: "Бүртгэлгүй хэрэглэгч байна",
        result: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(pwd, user.password);

    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Нэвтрэх нэр эсвэл нууц үг буруу байна!",
        result: null,
      };
    }

    const { password, ...userData } = user;
    return {
      status: 200,
      message: "Амжилттай нэвтэрлээ",
      result: userData,
    };
  } catch (error) {
    console.error("Error in loginUserModel:", error);
    return {
      status: 500,
      message: "Нэвтрэхэд алдаа гарлаа",
      result: null,
    };
  }
};


