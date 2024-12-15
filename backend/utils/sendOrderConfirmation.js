const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "psoni96640@gmail.com",
      pass: "ynor fmhw hgib wwxm", // Use an app password for better security
    },
  });
};

const formatProductRows = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return "<tr><td colspan='4'>No products in this order.</td></tr>";
  }

  return products
    .map(
      (product) => `
        <tr>
          <td>${product.name}</td>
          <td>₹${product.price}</td>
          <td>${product.quantity}</td>
          <td>₹${product.price * product.quantity}</td>
        </tr>
      `
    )
    .join("");
};

const generateEmailContent = (user, order) => {
  const productRows = formatProductRows(order.products);

  return `
    <h2>Order Confirmation</h2>
    <p>Dear ${user.name},</p>
    <p>Thank you for your order! Here are the details:</p>

    <h3>Order Summary</h3>
    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="background-color: #f4f4f4;">
          <th style="text-align: left;">Product Name</th>
          <th style="text-align: left;">Price</th>
          <th style="text-align: left;">Quantity</th>
          <th style="text-align: left;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${productRows}
      </tbody>
    </table>

    <h3>Customer Details</h3>
    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tr><td>Name</td><td>${order.name}</td></tr>
      <tr><td>Email</td><td>${order.email}</td></tr>
      <tr><td>Address</td><td>${order.address}</td></tr>
    </table>

    <p>If you have any questions, feel free to contact us.</p>
    <p>Best regards,<br>Customer Support Team</p>
  `;
};

const sendOrderConfirmation = async (user, order) => {
  const transporter = createTransporter();
  const emailContent = generateEmailContent(user, order);
  const mailOptions = {
    from: "psoni96640@gmail.com",
    to: user.email,
    subject: "Order Confirmation",
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendOrderConfirmation;
