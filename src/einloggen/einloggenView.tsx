import React from 'react';


  interface einloggen {

    einmelden: (e: React.ChangeEvent<HTMLInputElement>) => void;
    verify: (e: React.FormEvent<HTMLFormElement>) => void
 }

const EinloggenView: React.FC<einloggen> = ({einmelden, verify}) => {



    return (
        <div className='container col d-flex justify-content-center align-items-center'>
        <div className='col-auto'>
            <div className='border p-5 rounded'>
            <form onSubmit={verify}>

                <label  className="form-label">Passwort</label>

                <input onChange={einmelden} name='password'  type='password' className='form-control' />
                <div className='text-center mt-4'>
                <button type='submit' className='btn btn-danger rounded-4'>einloggen</button>
                </div>
            </form>
            </div>
        </div>

        </div>
    )
}


export default EinloggenView;