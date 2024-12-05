import React, { useState } from 'react';
import axios from 'axios';

function FormEditor() {
  const [formTitle, setFormTitle] = useState('');
  const [headerImage, setHeaderImage] = useState(null);
  const [questions, setQuestions] = useState([]);

  const addQuestion = (type) => {
    setQuestions([...questions, { id: Date.now(), type, text: '', image: null }]);
  };

  const handleSaveForm = async () => {
    const formData = {
      title: formTitle,
      headerImage,
      questions,
    };
    try {
      const response = await axios.post('/api/forms', formData);
      alert(`Form saved! Preview link: /preview/${response.data.formId}`);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

      {/* Form Header */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Form Title"
          className="border rounded p-2 w-full"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <input
          type="file"
          className="mt-2"
          onChange={(e) => setHeaderImage(URL.createObjectURL(e.target.files[0]))}
        />
      </div>

      {/* Questions Section */}
      <div>
        {questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <h3>{`Question ${index + 1} (${q.type})`}</h3>
            <input
              type="text"
              placeholder="Enter question text"
              className="border rounded p-2 w-full"
              value={q.text}
              onChange={(e) =>
                setQuestions(
                  questions.map((item) =>
                    item.id === q.id ? { ...item, text: e.target.value } : item
                  )
                )
              }
            />
            <input
              type="file"
              className="mt-2"
              onChange={(e) =>
                setQuestions(
                  questions.map((item) =>
                    item.id === q.id ? { ...item, image: URL.createObjectURL(e.target.files[0]) } : item
                  )
                )
              }
            />
          </div>
        ))}
      </div>

      {/* Add Question Buttons */}
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addQuestion('Categorize')}>
          Add Categorize Question
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2" onClick={() => addQuestion('Cloze')}>
          Add Cloze Question
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded ml-2" onClick={() => addQuestion('Comprehension')}>
          Add Comprehension Question
        </button>
      </div>

      {/* Save Button */}
      <button className="bg-purple-500 text-white px-4 py-2 rounded mt-4" onClick={handleSaveForm}>
        Save Form
      </button>
    </div>
  );
}

export default FormEditor;
