const getTemplates = async () => {
  const res = await fetch(`api/templates`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getTemplate = async (id) => {
  const res = await fetch(`/api/templates/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
const createTemplate = async (data) => {
  const res = await fetch(`/api/templates/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export { getTemplate, getTemplates, createTemplate };
