import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    date: "",
    arabica: "",
    robusta: "",
    arecanut: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/updateSheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update Google Sheet</h1>
      <input name="date" placeholder="Date" onChange={handleChange} />
      <input name="arabica" placeholder="Arabica" onChange={handleChange} />
      <input name="robusta" placeholder="Robusta" onChange={handleChange} />
      <input name="arecanut" placeholder="Arecanut" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
