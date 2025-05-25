import React, { useState } from 'react';
import "../style/Contact.css"
import { toast } from "react-toastify";
import { motion } from "motion/react";



const Contact = ({contact_key}) => {
 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    //email message
    const [result, setResult] = React.useState("");
    const onSubmit = async (event) => {
       
        event.preventDefault();
    
        setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", contact_key);
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        const data = await response.json();

    if (data.success) {
      setResult("");
      setFormData({ name: "", email: "", message: "" }); 
      toast.success("Form Submitted Successfully")
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message)
      setResult("");
    }
  };
    return (
        <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 3 }}
        whileInView={{ opacity: 1, }}
        viewport={{ once: false }}
        className='contactBox' id='contactUs'>
            <div className="clientText">
                <h1 className='FirstText'>Contact</h1> <h1 className='secondText'>Us</h1>
            </div>
            <p className='conatactLine'>Ready to Make a Move? Let’s Build Your Future Together</p>


            <div className="form-container">
                <form onSubmit={onSubmit} className="contact-form">
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Your Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            placeholder="Enter Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">
                        Send Message
                    </button>
                </form>
                <span>{result}</span>
            </div>


        </motion.div>
    );
}

export default Contact;