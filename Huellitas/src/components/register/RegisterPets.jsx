import './RegisterPets.css'
import { ExclamationTriangle, RigthArraw } from '../Icons';
import { useId, useState } from 'react';

export function RegisterPets() {
    const [selectedRaza, setSelectedRaza] = useState('')
    const idInput = useId()
    const [error, setError] = useState({
        nombrePet: '',
        tipoPet: '',
        raza: ''
    })
    console.log(selectedRaza)
    const especies = [
        {
            tipo: "otro",
            razas: []
        },
        {
            tipo: "gato",
            razas: [
                "Mestizo (sin raza definida)",
                "Siamés",
                "Persa",
                "Maine Coon",
                "Ragdoll",
                "British Shorthair",
                "Bengalí",
                "Sphynx (sin pelo)"
            ]
        },
        {
            tipo: "perro",
            razas: [
                "Mestizo (sin raza definida)",
                "Labrador Retriever",
                "Pastor Alemán",
                "Golden Retriever",
                "Poodle (Caniche)",
                "Bulldog Francés",
                "Chihuahua",
                "Rottweiler",
                "Beagle",
                "Dóberman"
            ]
        }
    ];
    const especieSelected = especies.find(e => e.tipo === selectedRaza.toLowerCase())?.razas || [];

    const obtenerDatosInputs = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        e.target.reset()
        setSelectedRaza('')
    }

    const validaciones = {
        nombrePet: {
            minLength: 3,
            mesaje: "Debe tener más de 3 caracteres y no contener números",
            regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        const state = e.target.value
        setSelectedRaza(state)
    }

    const handleError = (e) => {
        const { name, value } = e.target
        if (validaciones[name]) {
            const { minLength, mesaje, regex } = validaciones[name];
            const isLongitud = value.length >= minLength
            const isRegex = regex ? regex.test(value) : true

            setError(prevState => ({
                ...prevState,
                [name]: (isLongitud && isRegex) ? '' : mesaje
            }))

        }
    }

    return (
        <form onSubmit={obtenerDatosInputs} className='register-form-container' action="">
            <h3>Registro de Mascotas</h3>
            <div className="input-flex-container">
                <label htmlFor="">Nombre *</label>
                <input required onChange={handleError} type="text" name="nombrePet" id={idInput} placeholder='Vex...' />
                <div className="input-flex-container-error">
                    <span className={error.nombrePet ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.nombrePet}</span>
                    <span className='description-input'>El nombre solo debe contener letras y espacios.</span>
                </div>
            </div>
            <div className="input-flex-container">
                <label htmlFor="">Tipo de mascota *</label>
                <select required onChange={handleChange} value={selectedRaza} // controlado por estado
                    className='select-pets-info' name="tipoPet" id="">
                    <option value="" disabled hidden>Seleccionar</option>
                    <option value="Gato">Gato</option>
                    <option value="Perro">Perro</option>
                    <option value="Otro">Otro</option>
                </select>
                <span className='description-input'>Campo Obligatorio.</span>
            </div>
            <div className="input-flex-container">
                <label htmlFor="">Raza / Especie *</label>
                <select required className='select-pets-info' name="raza" id="">
                    <option value="">Seleccionar</option>
                    {
                        especieSelected.map((especie, index) => (
                            <option key={index} value={especie}>{especie}</option>
                        ))
                    }
                </select>
                <span className='description-input'>Campo Obligatorio.</span>
            </div>
            <button className='btn-next-page'>
                <div className="btn-next-page-text">
                    <span>Siguiente</span>
                    <strong><RigthArraw /></strong>
                </div>
            </button>
        </form>
    )
}