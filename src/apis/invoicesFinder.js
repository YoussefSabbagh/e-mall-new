const invoicesFinder = {};
const URL = process.env.REACT_APP_URL_SERVER + "invoices/";

// find all invoice to confirm invoice_status = 0
invoicesFinder.toConfirm = async () => {
  const response = await fetch(URL + "toconfirm", {
    method: "GET",
    headers: { "Content-Type": "application/json", token: localStorage.token },
  });
  return await response.json();
};

// find all invoice with payment confirm
invoicesFinder.paymentsConfirm = async () => {
  const response = await fetch(URL + "paymentconfirm", {
    method: "GET",
    headers: { "Content-Type": "application/json", token: localStorage.token },
  });
  return await response.json();
};

// find all invoice paid between date1 and date2
invoicesFinder.paidBetween = async (date1, date2) => {
  try {
    const response = await fetch(`${URL}payment/${date1}&${date2}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    return await response.json();
  } catch (error) {}
};

// Count invoices paid by Method in a year
invoicesFinder.paidByMethod = async (year) => {
  try {
    const response = await fetch(`${URL}paymentbymethod/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    return await response.json();
  } catch (error) {}
};

// Past Due Balance
invoicesFinder.pastDue = async () => {
  try {
    const response = await fetch(`${URL}pastdue/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    return await response.json();
  } catch (error) {}
};

// Count invoices paid by month
invoicesFinder.paidByMonth = async (year) => {
  try {
    const response = await fetch(`${URL}paymentbymonth/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    return await response.json();
  } catch (error) {}
};

// find all invoice for a particular user
invoicesFinder.all = async (user) => {
  const response = await fetch(`${URL}balance/${user}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", token: localStorage.token },
  });
  return await response.json();
};

// find all pendig invoice for a particular user
invoicesFinder.pending = async (user) => {
  const response = await fetch(`${URL}pending/${user}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", token: localStorage.token },
  });
  return await response.json();
};

// change invoice status with zelle method
invoicesFinder.zelle = async (invoices, reference, method) => {
  const data = new FormData();
  const file = reference.photo;

  const name = JSON.stringify({ invoices, reference, method });
  data.append("name", name);
  data.append("file", file);
  const response = await fetch(URL + "payment/zelle", {
    method: "PUT",
    headers: {
      token: localStorage.token,
    },
    body: data,
  });
  return await response.json();
};

// change invoice status with tranfer y/o deposit method
invoicesFinder.transfer = async (invoices, reference, method) => {
  const response = await fetch(URL + "payment/transfer", {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: localStorage.token },
    body: JSON.stringify({ invoices, reference, method }),
  });
  return await response.json();
};

// change invoice status with tranfer y/o deposit method
invoicesFinder.pagoMovil = async (
  invoices,
  playerId,
  phoneNumber,
  bankFrom,
  reference,
  date,
  amount,
  method
) => {
  const response = await fetch(URL + "payment/pagomovil", {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: localStorage.token },
    body: JSON.stringify({
      invoices,
      playerId,
      phoneNumber,
      bankFrom,
      reference,
      date,
      amount,
      method,
    }),
  });
  return await response.json();
};

// change payment_to_confirm invoice status of 0 to 1 (payment confirm)
invoicesFinder.confirm = async (invoices) => {
  const response = await fetch(URL + "payment/confirm", {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: localStorage.token },
    body: JSON.stringify({ invoices }),
  });
  return await response.json();
};

invoicesFinder.allById = async (user) => {
  const response = await fetch(URL + "pending", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: localStorage.token },
    body: JSON.stringify({ ...user }),
  });
  return await response.json();
};

// find all invoice with payment confirm
invoicesFinder.paymentsConfirm = async () => {
  const response = await fetch(URL + "paymentconfirm", {
    method: "GET",
    headers: { "Content-Type": "application/json", token: localStorage.token },
  });
  return await response.json();
};

export default invoicesFinder;
