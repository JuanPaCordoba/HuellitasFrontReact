import './RegisterUserForm.css'
import { ExclamationTriangle, RigthArraw } from '../Icons';
import { useId, useState } from 'react';

export function RegisterUserForm({ onSubmit, nextForm }) {
    const [error, setError] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        contraseña: '',
    })

    let hayErrores = Object.values(error).some(msg => msg && msg.length > 0);

    const nombreId = useId()
    const apellidoId = useId()
    const emailId = useId()
    const contraseñaId = useId()

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
        nombres: {
            minLength: 3,
            mesaje: "Debe tener más de 3 caracteres y no contener números",
            regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/
        },
        apellidos: {
            minLength: 3,
            mesaje: "Debe tener más de 3 caracteres y no contener números",
            regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/
        },
        email: {
            minLength: 3,
            mesaje: "Debe tener más de 3 caracteres y contener un @algo.",
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        contraseña: {
            minLength: 7,
            mesaje: "Tu contraseña no cumple con los criterios minimos.",
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
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
            <h3>Registro de Usuarios</h3>
            <div className="input-flex-container">
                <label htmlFor="nombres">Nombres *</label>
                <input style={{ border: error.nombres ? '1px solid red' : '' }} type="text" name="nombres" id={nombreId} onChange={handleChange} placeholder='Juan Miguel...' />
                <div className="input-flex-container-error">
                    <span className={error.nombres ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.nombres}</span>
                    <span className='description-input'>El nombre solo debe contener letras y espacios.</span>
                </div>
            </div>
            <div className="input-flex-container">
                <label htmlFor="apellidos">Apellidos *</label>
                <input style={{ border: error.apellidos ? '1px solid red' : '' }} type="text" name="apellidos" id={apellidoId} onChange={handleChange} placeholder='Perez Acosta...' />
                <div className="input-flex-container-error">
                    <span className={error.apellidos ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.apellidos}</span>
                    <span className='description-input'>El nombre solo debe contener letras y espacios.</span>
                </div>
            </div>
            <div className="input-flex-container">
                <label htmlFor="email">Email *</label>
                <input style={{ border: error.email ? '1px solid red' : '' }} type="email" name="email" id={emailId} onChange={handleChange} placeholder='algo@gmail.com...' />
                <span className={error.email ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.email}</span>

            </div>
            <div className="input-flex-container">
                <label htmlFor="contraseña">Contraseña *</label>
                <input style={{ border: error.contraseña ? '1px solid red' : '' }} type="password" name="contraseña" id={contraseñaId} onChange={handleChange} placeholder='Contraseña' />
                <div className="input-flex-container-error">
                    <span className={error.contraseña ? 'error-input' : 'error-input-active'}><ExclamationTriangle />{error.contraseña}</span>
                    <span className='description-input'>Tu contraseña debe ser más segura: usa mayúsculas, minúsculas, números y símbolos como !@#...</span>
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