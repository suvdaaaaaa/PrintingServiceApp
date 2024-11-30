
const createMaterial = async (data) => {
  const res = await fetch(`/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

const getMaterialHistory = async () => {
  const res = await fetch(`/api/history`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getMaterialList = async () => {
  const res = await fetch(`/api/dashboard`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const updateMaterialList = async (material_id, status) => {
  const res = await fetch(`/api/dashboard`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({material_id, status}),
  });

  return res;
};

export {
  createMaterial,
  getMaterialHistory,
  getMaterialList,
  updateMaterialList
};

