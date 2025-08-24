import { useState } from "react"; //useState is a hook which save the data enterd by user until we connect it to the database.
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone:"",
    password: "",
  });

  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();

  // handling the input values
  const handleInput = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
  

  setUser({
    ...user,   //spread operator sirf targeted value ko change karwata hee baaki remain same.
    [name]:value,
  });
  };

  // handling the form submit
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // alert(user);
    console.log(user);
    try {
       const response = await fetch(`http://localhost:5000/api/auth/register`,{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(user),
    });
    //extra part hee agar resposne true hota he means agar user succesfully create hota hee
    //to register page ke saare blocks emty kardo aur login pe redirect ya navigate kardo.  
    const res_data = await response.json();
   console.log("response from server",res_data.extraDetails);

    if (response.ok) {
      toast.success("Registeration Successfull");
      //store the token in local storage
      storeTokenInLS(res_data.token);

      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
      navigate("/");
    }else{
      toast.error(res_data.extraDetails?res_data.extraDetails:res_data.msg);
    }
    
     } 
     catch (error) {
      console.log("register",error);
      
    }
    
  };
  
  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/Images/register.png"
                alt="a registration form is given"
                width="300"
                height="280"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">registration form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="phone"
                    id="phone"
                    required
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>

                <br />
                <button type="submit" className="btn btn-submit">Register Now</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
