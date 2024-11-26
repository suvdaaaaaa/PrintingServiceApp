import prisma from "@/utils/prisma";

export const createMaterialModel = async (data) => {
  const { user_id, side, quantity, paper_type, description, file_url, total_price } = data;

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

export const getMaterialModel = async () => {
  try {
    const orders = await prisma.material.findMany({});
    return orders;
  } catch (error) {
    console.error("Error in get templates model:", error);
    throw new Error("Failed to fetch templates");
  }
};
