import './RegisterEmpresa.css'
import { ExclamationTriangle, RigthArraw } from '../Icons';
import { useId, useState } from 'react';

export function RegisterEmpresa({ onSubmit, nextForm }) {
    const [error, setError] = useState({
        nombre_em: '',
        nit: '',
        email_em: '',
        contraseña_em: '',
        direccion: ''
    })

    let hayErrores = Object.values(error).some(msg => msg && msg.length > 0);

    const nombre_emId = useId()
    const nitId = useId()
    const email_emId = useId()
    const contraseña_emId = useId()
    const direccion = useId()


    const envioForm = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const datos = Object.fromEntries(formData.entries());

        // Validar antes de enviar
        const nuevosErrores = {}
        for (const campo in camposValidables) {
            const { minLength, regex } = camposValidables[campo]
            const valor = datos[campo] || ''
            const isValidLength = valor.length > minLength
            const esValidoRegex = regex ? regex.test(valor) : true;

            if (!isValidLength || !esValidoRegex) {
                nuevosErrores[campo] = "Este campo es obligatorio"
            }
        }

        // Si hay errores, los seteamos y no continuamos
        if (Object.keys(nuevosErrores).length > 0) {
            setError(prev => ({ ...prev, ...nuevosErrores }))
            return
        }

        // Si no hay errores, enviar
        onSubmit(datos)
        e.target.reset()
        nextForm()
    }

    const camposValidables = {
        nombre_em: {
            minLength: 3,
            mesaje: "Debe tener más de 3 caracteres y no contener números",
            regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/
        },
        nit: {
            minLength: 3,
            mesaje: "Debe tener más de 3 caracteres y no contener números",
            regex: /^\d{9}-\d{1}$/
        },
        email_em: {
            minLength: 3,
            mesaje: "Debe tener más de 3 caracteres y contener un @algo.",
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        contraseña_em: {
            minLength: 7,
            mesaje: "Tu contraseña no cumple con los criterios minimos.",
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
        },
        direccion: {
            minLength: 5,
            mesaje: "Ingresa una dirección valida.",
            regex: /^[A-Za-z0-9ÁÉÍÓÚÑáéíóúñ#\-\.\,\s]{5,100}$/
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (camposValidables[name]) {
            const { minLength, mesaje, regex } = camposValidables[name];
            const isValidLength = value.length > minLength
            const esValidoRegex = regex ? regex.test(value) : true;

            setError(prevState => ({
                ...prevState,
                [name]: (isValidLength && esValidoRegex) ? '' : mesaje
            }));
        }
    };

    return (
        <form onSubmit={envioForm} className='register-form-container'>
            <h3>Registro de Empresas</h3>
            <div className="input-flex-container">
                <label htmlFor="nombre_em">Nombre de la empresa *</label>
                <input style={{ border: error.nombre_em ? '1px solid red' : '' }} type="text" name="nombre_em" id={nombre_emId} onChange={handleChange} placeholder='Huellitas...' />
                <div className="input-flex-container-error">
                    <span className={error.nombre_em ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.nombre_em}</span>
                    <span className='description-input'>El nombre solo debe contener letras y espacios.</span>
                </div>
            </div>
            <div className="input-flex-container">
                <label htmlFor="nit">Nit *</label>
                <input style={{ border: error.nit ? '1px solid red' : '' }} type="text" name="nit" id={nitId} onChange={handleChange} placeholder='900123456-7...' />
                <div className="input-flex-container-error">
                    <span className={error.nit ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.nit}</span>
                    <span className='description-input'>El NIT debe contener 9 dígitos seguidos de un guion y un dígito verificador.</span>
                </div>
            </div>
            <div className="input-flex-container">
                <label htmlFor="email_em">Email *</label>
                <input style={{ border: error.email_em ? '1px solid red' : '' }} type="email" name="email_em" id={email_emId} onChange={handleChange} placeholder='algo@gmail.com...' />
                <span className={error.email_em ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.email_em}</span>

            </div>
            <div className="input-flex-container">
                <label htmlFor="contraseña_em">Contraseña *</label>
                <input style={{ border: error.contraseña_em ? '1px solid red' : '' }} type="password" name="contraseña_em" id={contraseña_emId} onChange={handleChange} placeholder='PassSecure12!...' />
                <div className="input-flex-container-error">
                    <span className={error.contraseña_em ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.contraseña_em}</span>
                    <span className='description-input'>Tu contraseña Debe tener al menos 8 caracteres e incluir una mayúscula, una minúscula, un número y un símbolo especial (como !, @, #, $...)</span>
                </div>
            </div>
            <div className="input-flex-container">
                <label htmlFor="direccion">Dirección *</label>
                <input style={{ border: error.direccion ? '1px solid red' : '' }} type="text" name="direccion" id={direccion} onChange={handleChange} placeholder='Calle 44 #58-45...' />
                <div className="input-flex-container-error">
                    <span className={error.direccion ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.direccion}</span>
                    <span className='description-input'>La dirección puede contener numeros, letras y caracteres especiales.</span>
                </div>
            </div>
            <button disabled={hayErrores} className='btn-next-page'>
                <div className="btn-next-page-text">
                    <span>Siguiente</span>
                    <strong><RigthArraw /></strong>
                </div>
            </button>
        </form>
    )
}