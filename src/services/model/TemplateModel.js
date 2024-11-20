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
      select: {
        template_id: true,
        template_name: true,
        price: true
      },
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
  const { template_id, template_name, price, image_url, design_object } = data;

  const now = new Date();
  const created_date = now.toISOString();
  const updated_date = now.toISOString();

  try {
    const temp = await prisma.templates.create({
      data: {
        template_id,
        template_name,
        price,
        image_url,
        design_object: JSON.parse(JSON.stringify(design_object)),
        // created_date,
        // updated_date
      },
    });
    return temp;
  } catch (error) {
    console.error("Error in createTemplateModel:", error);
    throw new Error("Failed to fetch create template");
  }
};
