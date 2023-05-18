import React, {useState} from 'react';

export const RegistrationForm = () => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password,setPassword] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "username"){
            setUsername(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit  = async (e) => {
        e.preventDefault();
        try {console.log(JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password, 
        }))
            let response = await fetch('http://localhost:8000/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password, 
                }),
            });
            console.log(response);
            if (response.status === 201){
                setFirstName("");
                setLastName("");
                setUsername("");
                setPassword("");
                alert("New User Added");
            }else {
                alert("Internal server error")
            }
        } catch(error) {
            console.log(error);
        } 
    }


    return(
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">First Name </label>
                  <input className="form__input" type="text" id="firstName" value={firstName} onChange={(e) => handleInputChange(e)} placeholder="First Name"/>
              </div>
              <div className="lastname">
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName" value={lastName} onChange = {(e) => handleInputChange(e)} className="form__input"placeholder="LastName"/>
              </div>
              <div className="username">
                  <label className="form__label" for="username">Username </label>
                  <input  type="text" name="" id="username" value={username} onChange = {(e) => handleInputChange(e)} className="form__input"placeholder="Username"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
              </div>
          </div>
          <div className="footer">
              <button type="submit" class="btn">Register</button>
          </div>
          </form>
      </div>      
    )       
}