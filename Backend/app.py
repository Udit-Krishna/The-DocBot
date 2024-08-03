from fastapi import FastAPI, UploadFile, File, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from langchain_huggingface import HuggingFaceEndpoint
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img,img_to_array
import logging


logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)



load_dotenv()
api_key = os.getenv('HUGGINGFACEHUB_API_TOKEN')

app = FastAPI()
Base = declarative_base()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(Base):
    __tablename__ = "users"
    unique_id = Column("unique_id", String, primary_key=True)
    name = Column("Name", String)
    gender = Column("Gender", String)
    age = Column("Age", Integer)
    height = Column("Height", Integer)
    weight = Column("Weight", Integer)

    def __init__(self, unique_id, name, gender, age, height, weight):
        self.unique_id = unique_id
        self.name = name
        self.gender = gender
        self.age = age
        self.height = height
        self.weight = weight

    def __repr__(self):
        return f"{self.unique_id},{self.name},{self.gender},{self.age},{self.height}, {self.weight}"

class Chat(Base):
    __tablename__ = "chat"
    unique_id = Column("unique_id", String, primary_key=True)
    chat_content = Column("chat_content", Text)

    def __init__(self, unique_id, chat_content):
        self.unique_id = unique_id
        self.chat_content = chat_content

    def __repr__(self):
        return f"{self.unique_id},{self.chat_content}"

DATABASE_URL = "sqlite:///test.db"
engine = create_engine(DATABASE_URL, echo=True)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()

llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Meta-Llama-3-8B-Instruct",
    task="text-generation",
    max_new_tokens=150,
    do_sample=False,
    temperature=0.1,
    token=api_key
)
template = """<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are an AI Medical Chatbot Assistant, provide informative responses to your inquiries. Do not repeat yourself in your responses and do not ask another question. Do not be verbose in your response and make it strictly around 200 words.
If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
About the suggestion to consult a doctor, always have it in one line and make it short and crisp. Don't add any note. I need only the response to the question. Suggest medications if inquired.<|eot_id|>
<|start_header_id|>user<|end_header_id|> {question} <|eot_id|><|start_header_id|>assistant<|end_header_id|>"""
prompt = PromptTemplate.from_template(template)
llm_chain = LLMChain(prompt=prompt, llm=llm)


@app.post("/add-user", description="Add User to the Database")
async def add_user(request: Request):
    data = await request.json()
    unique_id = data['unique_id']
    name = data['name']
    gender = data['gender']
    age = data['age']
    height = data['height']
    weight = data['weight']
    user =  User(unique_id, name, gender, age, height, weight)
    session.add(user)
    session.commit()
    return JSONResponse(content={"Added to the Database" : f"{unique_id}, {name}, {gender}, {age}, {height}, {weight}"}, status_code=200)


@app.post("/check-user")
async def check_user(request :Request):
    data = await request.json()
    unique_id = data['unique_id']
    results = session.query(User).filter(User.unique_id == unique_id)
    logger.debug(data)
    ans = []
    for row in results:
        ans.append(row)
    if ans != []:
        return JSONResponse(content={"Age": ans[0].age,"Height": ans[0].height,"Weight": ans[0].weight,"Gender": ans[0].gender}, status_code=200)
    else:
        return JSONResponse(content={"Instance": "Not Found"}, status_code=200)
    

@app.post("/chat-bot")
async def chat_bot(request: Request):
    data = await request.json()
    isFirst = data['isFirst']
    unique_id = data['unique_id']
    message = data['message']
    if isFirst:
        row = session.query(Chat).filter(Chat.unique_id == unique_id).first()
        if row:
            print(row)
            session.delete(row)
            session.commit()
        chat =  Chat(unique_id, " ")
        session.add(chat)
        session.commit()
        results = session.query(User).filter(User.unique_id == unique_id).first()
        message = f"I am a {results.age} years old {results.gender}. My height is {results.height}cms and my weight is {results.weight}kgs. " + message
        response = llm_chain.run(question=message)
        results = session.query(Chat).filter(Chat.unique_id == unique_id).first()
        results.chat_content += message + response
        session.commit()
        results = session.query(Chat).filter(Chat.unique_id == unique_id).first()
        return JSONResponse(content={"Response" : response, "History": f"{results.chat_content}"}, status_code=200)
    else:
        results = session.query(Chat).filter(Chat.unique_id == unique_id).first()
        chat_content = results.chat_content
        message_now = chat_content +"\n"+ message
        response = llm_chain.run(question=message_now)
        results.chat_content = message_now + response
        session.commit()
        return JSONResponse(content={"Response" : response, "History": f"{results.chat_content}"}, status_code=200)


# @app.post("/predict/lung-cancer")
# def predict_lung_cancer(file: UploadFile = File(...)):
#     model = load_model("lung_cancer.keras")
#     with open(f"{file.filename}", "wb+") as file_object:
#         file_object.write(file.file.read())
#     test_image = load_img(f'{file.filename}',target_size=(224,224))
#     test_image = img_to_array(test_image)
#     test_image = np.expand_dims(test_image,axis=0)
#     result = model.predict(test_image)
#     args = {'adenocarcinoma': 0, 'large.cell.carcinoma': 1, 'normal': 2, 'squamous.cell.carcinoma': 3}
#     print(args)
#     print(result)
#     response = [k for k,v in args.items() if v == np.argmax(result)][0]
#     return JSONResponse(content={"prediction": response}, status_code=200)

@app.post("/predict/brain-tumor")
def predict_brain_tumor(file: UploadFile = File(...)):
    model = load_model('brain_tumor.keras')
    with open(f"{file.filename}", "wb+") as file_object:
        file_object.write(file.file.read())
    test_image = load_img(f'{file.filename}',target_size=(64,64))
    test_image = img_to_array(test_image)
    test_image = np.expand_dims(test_image,axis=0)
    result = model.predict(test_image)
    print(result)
    os.remove(file.filename)
    if result[0][0]:
        tumor = True
    else:
        tumor = False
    return JSONResponse(content={"prediction": tumor}, status_code=200)






## TO RUN USE uvicorn app:app
## OPEN http://127.0.0.1:8000/docs for API Calls
## npm run dev for Frontend