import './RegisterForm.css'
import miImagen from '../../assets/aver.png';
import { useState } from 'react';
import { RegisterUserForm } from './RegisterUserForm';
import { RegisterPets } from './RegisterPets';
import { RegisterEmpresa } from './RegisterEmpresa';

export function RegisterForm() {
    const [formActive, setFormActive] = useState('User')
    const [showForm, setShowForm] = useState(false)
    const isShowForm = showForm ? 'opt-active' : 'opt'
    const manejarDatosDelFormulario = (datos) => {
        console.log(datos)
    };
    const showFormPets = () => {
        setFormActive('Pets')
    }
    return (

        <div className="container-form-register">

            <div className="main-form">
                <div className="img-for-register">
                    <strong className='register-form-title'>Formulario de registro</strong>
                </div>
                <div className="register-form">
                    <img className='img-pets' src={miImagen} alt="" />
                    <div className="switch-from">
                        <span className={isShowForm}></span>

                        <div className="container-swicth">
                            <span
                                onClick={() => setShowForm(true)}
                                className={showForm == true ? 'active' : undefined}
                            >Empresas
                            </span>
                            <span
                                onClick={() => setShowForm(false)}
                                className={showForm == false ? 'active' : undefined}>
                                Usuarios</span>
                        </div>
                    </div>
                    {
                        !showForm ?
                            formActive === 'User' ?
                                <RegisterUserForm onSubmit={manejarDatosDelFormulario} nextForm={showFormPets} />
                                :
                                <RegisterPets />
                            :
                            <RegisterEmpresa onSubmit={manejarDatosDelFormulario} />
                    }
                </div>
            </div>
        </div>
    )
}