from typing import List, Optional
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

class ParticipanteBase(SQLModel):
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    nivel: str
    aceptaTerminos: bool

class Participante(ParticipanteBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tecnologias_str: str = Field(default="[]")

class ParticipanteRead(ParticipanteBase):
    id: int
    tecnologias: List[str]

class ParticipanteCreate(ParticipanteBase):
    tecnologias: List[str]

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

def get_session():
    with Session(engine) as session:
        yield session

@app.get("/participantes", response_model=List[ParticipanteRead])
def get_participantes(session: Session = Depends(get_session)):
    participantes = session.exec(select(Participante)).all()
    res = []
    for p in participantes:
        p_dict = p.model_dump()
        p_dict["tecnologias"] = json.loads(p.tecnologias_str)
        res.append(ParticipanteRead(**p_dict))
    return res

@app.post("/participantes", response_model=ParticipanteRead)
def create_participante(participante: ParticipanteCreate, session: Session = Depends(get_session)):
    db_participante = Participante(
        nombre=participante.nombre,
        email=participante.email,
        edad=participante.edad,
        pais=participante.pais,
        modalidad=participante.modalidad,
        nivel=participante.nivel,
        aceptaTerminos=participante.aceptaTerminos,
        tecnologias_str=json.dumps(participante.tecnologias)
    )
    session.add(db_participante)
    session.commit()
    session.refresh(db_participante)
    
    p_dict = db_participante.model_dump()
    p_dict["tecnologias"] = json.loads(db_participante.tecnologias_str)
    return ParticipanteRead(**p_dict)

@app.put("/participantes/{id}", response_model=ParticipanteRead)
def update_participante(id: int, participante: ParticipanteCreate, session: Session = Depends(get_session)):
    db_participante = session.get(Participante, id)
    if not db_participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    
    db_participante.nombre = participante.nombre
    db_participante.email = participante.email
    db_participante.edad = participante.edad
    db_participante.pais = participante.pais
    db_participante.modalidad = participante.modalidad
    db_participante.nivel = participante.nivel
    db_participante.aceptaTerminos = participante.aceptaTerminos
    db_participante.tecnologias_str = json.dumps(participante.tecnologias)
    
    session.add(db_participante)
    session.commit()
    session.refresh(db_participante)
    
    p_dict = db_participante.model_dump()
    p_dict["tecnologias"] = json.loads(db_participante.tecnologias_str)
    return ParticipanteRead(**p_dict)
@app.delete("/participantes/{id}")
def delete_participante(id: int, session: Session = Depends(get_session)):
    participante = session.get(Participante, id)
    if not participante:
        raise HTTPException(status_code=404, detail="Participante no encontrado")
    session.delete(participante)
    session.commit()
    return {"ok": True}
