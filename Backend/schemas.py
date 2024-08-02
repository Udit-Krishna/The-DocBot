from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy.orm as orm

Base = declarative_base()
DATABASE_URL = "sqlite:///test.db"
engine = create_engine(DATABASE_URL, echo=True)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()
class Chat(Base):
    __tablename__ = "chat"
    unique_id = Column("unique_id", String, primary_key=True)
    chat_content = Column("chat_content", Text)

    def __init__(self, unique_id, chat_content):
        self.unique_id = unique_id
        self.chat_content = chat_content

    def __repr__(self):
        return f"{self.unique_id},{self.chat_content}"
    
class User(Base):
    __tablename__ = "users"
    unique_id = Column("unique_id", String, primary_key=True)
    name = Column("Name", String)
    gender = Column("Gender", String)
    age = Column("Age", String)
    height = Column("Height", String)
    weight = Column("Weight", String)

    def __init__(self, unique_id, name, gender, age, height, weight):
        self.unique_id = unique_id
        self.name = name
        self.gender = gender
        self.age = age
        self.height = height
        self.weight = weight

    def __repr__(self):
        return f"{self.unique_id},{self.name},{self.gender},{self.age},{self.height}, {self.weight}"
