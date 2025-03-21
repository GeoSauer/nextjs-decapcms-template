// pages/api/submit-form.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { formData } = req.body;

      const emailData = new FormData();
      Object.entries(formData).forEach(([key, value]) => emailData.append(key, value));

      emailData.append("access_key", process.env.WEB3FORMS_API_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: emailData,
      });

      const result = await response.json();

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(500).json({ error: "Error sending email" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to submit form" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
