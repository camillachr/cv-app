import { useState } from "react";
import { useParams } from "react-router-dom";

// PersonalInfo skal ta inn delen av CV som er personalinfo: {name:"", email:"", phone:""} og skills ["", ""]
const PersonalInfo = () => {
  const { id } = useParams();
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
  });

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div>
      <h2>Personal Info</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="phone" id="phone" name="phone" />
        </div>

        <div>
          <h3>Skills</h3>
          <input type="text" id="skills" name="skills" />
          <button>+ Add skill</button>
        </div>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default PersonalInfo;
