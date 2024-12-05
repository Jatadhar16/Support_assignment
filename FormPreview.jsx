import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormPreview() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/forms/${formId}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };
    fetchForm();
  }, [formId]);

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/forms/${formId}/responses`, responses);
      alert('Responses submitted!');
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      {form.headerImage && <img src={form.headerImage} alt="Header" className="mb-4" />}
      {form.questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <h3>{`Question ${index + 1} (${q.type})`}</h3>
          <p>{q.text}</p>
          {q.image && <img src={q.image} alt={`Question ${index + 1}`} />}
          <input
            type="text"
            className="border rounded p-2 w-full mt-2"
            placeholder="Your response"
            onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
          />
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default FormPreview;
