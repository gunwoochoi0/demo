// database.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_db_user',
    host: 'your_db_host',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

const query = async (text, params) => {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
};

export const saveTransactionData = async (transaction) => {
    const sql = `INSERT INTO transactions (id, amount, currency, status) VALUES ($1, $2, $3, $4)`;
    const params = [transaction.id, transaction.amount, transaction.currency, transaction.status];
    await query(sql, params);
};

export const saveCustomerData = async (customer) => {
    const sql = `INSERT INTO customers (id, email) VALUES ($1, $2)`;
    const params = [customer.id, customer.email];
    await query(sql, params);
};

export const saveNotificationData = async (notification) => {
    const sql = `INSERT INTO notifications (type, recipient, message) VALUES ($1, $2, $3)`;
    const params = [notification.type, notification.recipient, notification.message];
    await query(sql, params);
};

export const logPaymentConfirmation = async (paymentId, status) => {
    const sql = `INSERT INTO payment_confirmations (payment_id, status) VALUES ($1, $2)`;
    const params = [paymentId, status];
    await query(sql, params);
};

export const recordSMSSent = async (toPhoneNumber, message, messageId) => {
    const sql = `INSERT INTO sms_logs (phone_number, message, message_id) VALUES ($1, $2, $3)`;
    const params = [toPhoneNumber, message, messageId];
    await query(sql, params);
};


module.exports = {
    query,
};