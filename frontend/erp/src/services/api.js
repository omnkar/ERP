const API_BASE_URL = "http://localhost:5000/api";

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: "include", // Ensures cookies are sent
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

export const createData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(`Error creating ${endpoint}:`, error);
  }
};
export const updateData = async (endpoint, id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error updating ${endpoint}/${id}:`, error);
  }
};

export const deleteData = async (endpoint, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error(`Error deleting ${endpoint}/${id}:`, error);
  }
};