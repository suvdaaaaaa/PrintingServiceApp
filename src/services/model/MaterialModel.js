import prisma from "@/utils/prisma";

export const createMaterialModel = async (data) => {
  const {
    user_id,
    template_id, 
    material_type,
    side,
    quantity,
    paper_type,
    description,
    file_name,
    file_url,
    total_price,
    status,
  } = data;

  try {
    const newMaterial = await prisma.material.create({
      data: {
        user_id,
        template_id,
        material_type,
        file_name,
        file_url,
        quantity,
        side,
        paper_type,
        description,
        total_price,
        status,
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
