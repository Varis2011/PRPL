const API_URL = 'https://prpl-production.up.railway.app/api/transactions';
;

export const getTransactions = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createTransaction = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTransaction = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
