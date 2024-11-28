import prisma from "@/utils/prisma";

export const getTemplatesModel = async () => {
  try {
    const templates = await prisma.templates.findMany({});
    return templates;
  } catch (error) {
    console.error("Error in get templates model:", error);
    throw new Error("Failed to fetch templates");
  }
};

export const getTemplateByIdModel = async (id) => {
  try {
    const template = await prisma.templates.findUnique({
      where: {
        template_id: id,
      },
    });

    return template;
  } catch (error) {
    console.error("Error in getTemplateByModel:", error);
    throw new Error("Failed to fetch template one");
  }
};
export const createTemplateModel = async (data) => {
  const { template_name, price, image_url, design_object } = data;

  try {
    const temp = await prisma.templates.create({
      data: {
        template_name,
        price,
        image_url,
        design_object,
      },
    });
   return {
     status: 200,
     message: "Амжилттай хадгаллаа",
     result: temp,
   };
  } catch (error) {
    console.error("Error in createTemplateModel:", `${error}`);
    return {
      status: 500,
      message: "Server error",
      result: `${error.message}`,
    };
  }
};

export const updateTemplateModel = async (data) => {
  const { template_id, template_name, price, image_url, design_object } = data;

  try {
    const temp = await prisma.templates.update({
      where: {
        template_id,
      },
      data: {
        template_name,
        price,
        image_url,
        design_object,
      },
    });
    return {
      status: 200,
      message: "Амжилттай хадгаллаа",
      result: temp,
    };
  } catch (error) {
    console.error("Error in updateTemplateModel:", `${error}`);
    return {
      status: 500,
      message: "Server error",
      result: `${error.message}`,
    };
  }
};
