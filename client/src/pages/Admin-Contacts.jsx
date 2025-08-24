import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const { authorizationToken } = useAuth();

  const getAllContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users${data}`);
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   delete the contacts on delete button

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // if condition isliliye taki page ko refresh na karna pade user delete show ho jayega.
      if (response.ok) {
        getAllContactsData();
        toast.success("Contact Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

//useEffect is an array dependency which ensures that this code only run ones when user login.
  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Contacts Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.message}</td>
                    <td>
                      <button onClick={() => deleteContact(curUser._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
