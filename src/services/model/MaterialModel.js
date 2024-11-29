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
   const result = await prisma.$queryRaw `
      SELECT 
        ss1.material_id,
        ss1.user_id,
        ss2.lname,
        ss2.fname,
        ss2.phone,
        ss2.email,
        case when ss1.file_name ='Upload' then 'Хэрэглэгчийн загвар' else ss1.file_name end file_name,
        to_char(ss1."createdDate", 'YYYY-MM-DD') as createdDate,
        ss1.paper_type,
        ss1.quantity,
        ss1.total_price,
        ss1.file_url,
        ss1.status,
        CASE 
          WHEN ss1.status = 'PENDING' THEN 'Илгээсэн'
          WHEN ss1.status = 'DONE' THEN 'Баталгаажсан'
          WHEN ss1.status = 'CANCELED' THEN 'Цуцалсан'
        END as status_name
      FROM "Material" ss1
      INNER JOIN "User" ss2
        ON ss1.user_id = ss2.user_id;
    `;

   return result;
 } catch (error) {
   console.error("Error executing raw query:", error);
   throw new Error("Failed to fetch material data");
 }
};

