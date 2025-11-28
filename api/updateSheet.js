import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { date, arabica, robusta, arecanut } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[date, arabica, robusta, arecanut]],
      },
    });

    res.status(200).json({ message: "Data added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
