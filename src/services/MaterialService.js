
const createMaterial = async (data) => {
  const res = await fetch(`/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


export { createMaterial };
