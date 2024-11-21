import prisma from "@/utils/prisma";
import jwt from 'jsonwebtoken';

// const getUserIdFromToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded.user_id
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return null;
//   }
// };

export const createMaterialModel = async (data) => {
  // const user_id = getUserIdFromToken(token);

  // if (!user_id) {
  //   return {
  //     status: 401,
  //     message: "Unauthorized",
  //     result: null,
  //   };
  // }

  const { user_id, side, quantity, paper_type, description, file_url, total_price } = data;
  console.log(data);

  try {
    const newMaterial = await prisma.material.create({
      data: {
        user_id,
        template_id: 1,
        material_type: 1,
        file_name: "Upload",
        file_url,
        quantity,
        side,
        paper_type,
        description,
        total_price,
        material_object: {},
      },
    });

    return {
      status: 200,
      message: "Амжилттай захиалагдлаа",
      result: newMaterial,
    };
  } catch (error) {
    console.error(`Error in createMaterialModel: ${error}`);

    return {
      status: 500,
      message: "Server error",
      result: `${error.message}`,
    };
  }
};
