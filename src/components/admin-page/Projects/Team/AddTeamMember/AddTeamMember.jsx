import TeamForm from "../TeamForm/TeamForm";

export default function AddTeamMember({hendleCancel}) {
const roles =  [
    {
        "name": {
            "en": "Back-end",
            "pl": "Back-end",
            "ua": "Бек-енд"
        },
        "_id": "66c3071850455c07796f26db",
        "__v": 0
    },
    {
        "name": {
            "en": "Business Analyst",
            "pl": "Analityk biznesowy",
            "ua": "Бізнес-аналітик"
        },
        "_id": "66c3068950455c07796f26d9",
        "__v": 0
    },
    {
        "name": {
            "en": "Product Owner",
            "pl": "Właściciel produktu",
            "ua": "Власник продукту"
        },
        "_id": "66c3072050455c07796f26dd",
        "__v": 0
    },
    {
        "name": {
            "en": "Design",
            "pl": "Projektowanie",
            "ua": "Дизайн"
        },
        "_id": "66c3072950455c07796f26df",
        "__v": 0
    },
    {
        "name": {
            "en": "Quality Assurance",
            "pl": "Zapewnienie jakości",
            "ua": "Забезпечення якості"
        },
        "_id": "66c3073350455c07796f26e1",
        "__v": 0
    },
    {
        "name": {
            "en": "Project Manager",
            "pl": "Kierownik projektu",
            "ua": "Менеджер проекту"
        },
        "_id": "66c3073e50455c07796f26e3",
        "__v": 0
    },
    {
        "name": {
            "en": "Business Analyst Mentor",
            "pl": "Mentor analityka biznesowego",
            "ua": "Ментор бізнес-аналітика"
        },
        "_id": "66c3074950455c07796f26e5",
        "__v": 0
    },
    {
        "name": {
            "en": "Project Manager Mentor",
            "pl": "Mentor menadżera projektu",
            "ua": "Ментор менеджера проекту"
        },
        "_id": "66c3075850455c07796f26e7",
        "__v": 0
    },
    {
        "name": {
            "en": "Front-end",
            "pl": "Front-end",
            "ua": "Фронт-енд"
        },
        "_id": "66c3076250455c07796f26e9",
        "__v": 0
    },
    {
        "name": {
            "en": "Full Stack",
            "pl": "Pełny stos",
            "ua": "Фул стек"
        },
        "_id": "66c3076a50455c07796f26eb",
        "__v": 0
    }
]

  return(
    <TeamForm hendleCancel={hendleCancel} roles={roles}/>
  )
}