
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

const getMaterialHistory = async (data) => {
  const res = await fetch(`/api/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

const getMaterialList = async (data) => {
  const res = await fetch(`/api/dashboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


export {
  createMaterial,
  getMaterialHistory,
  getMaterialList
};
