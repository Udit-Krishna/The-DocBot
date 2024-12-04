# The DocBot: AI-Powered Medical Assistant  

The **DocBot** is an AI-powered medical assistant designed to provide accurate and contextually relevant medical assistance in response to user queries. This project integrates advanced natural language processing (NLP) techniques with a user-friendly frontend to deliver a seamless experience.

---

## Features  

### 1. **Advanced AI Chatbot**  
- Built using **Mistral-Nemo-Instruct-2407**, deployed through the HuggingFace Inference API.  
- Offers precise and informed responses to medical-related queries.

### 2. **Comprehensive Medical Knowledge Base**  
- Integrated **5 volumes of medical encyclopedias** with over **2,500 pages** of content.  
- Utilizes **FAISS vector database** to enable **Retrieval-Augmented Generation (RAG)** for high-quality answers.

### 3. **User-Friendly Interface**  
- **ReactJS frontend** for an intuitive user experience.  
- **Google Authentication** for secure user access and profile management.  

### 4. **Personalized Responses**  
- Stores user profiles in a database to enhance chatbot response quality by tailoring answers to user-specific needs.

---

## Technologies Used  

- **AI Model**: Mistral-Nemo-Instruct-2407 via HuggingFace Inference API  
- **Database**: FAISS (Facebook AI Similarity Search)  
- **Frontend**: ReactJS  
- **Authentication**: Google Authentication  
- **Backend**: FastAPI, SQLite db for user profile storage  

---

## How to Use  

1. Clone the repository.  
   ```bash
   git clone https://github.com/Udit-Krishna/The-DocBot.git
   ```
2. Install dependencies for the Backend
   ```bash
   cd Backend
   python -m venv <venv name>
   .\<venv name>\Scripts\activate
   pip install -r requirements.txt
   ```
3. Start the backend server.
  ```bash
  uvicorn app:app
  ```
4. Install dependencies for the frontend.  
   ```bash
    cd Frontend
    npm install
   ```
5. Start the backend server.
  ```bash
    uvicorn app:app
  ```
5. Start the frontend.  
   ```bash
   npm run dev
   ```
5. Configure the backend with appropriate API keys and database credentials.  

---

Feel free to reach out if you have any questions or suggestions!
