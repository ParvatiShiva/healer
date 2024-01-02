"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import styles from '../styles/styles.module.css';
import Cstyle from './contact.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxOUeRz7XTfO79gYr4XI79X4W34zkn78YeUmYQziGlPVS_ROSEi1R_B7QZ4dv7-fSla/exec';
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(e.target)
      });
      if (response.ok) {
        alert('Your Attendance Has Been Submitted. Thank You!!');
        setFormData({
          name: '',
          email: '',
          subject: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error!', error.message);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <Sidebar />
      <div className={styles.pageContent}>
        <div className={Cstyle.contactform}>
          <form onSubmit={handleSubmit} name="google-sheet">
            <h1 className={Cstyle.heading}>Time to be Healthy and Strong with <br />finding Your inner fitness instinct.</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter Name Here" value={formData.name} onChange={handleChange} required  style={{border: '.1rem solid #ddd', borderRadius: '4px', padding: '10px'}}/>
              <label htmlFor= "email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Enter Your Email Here" value={formData.email} onChange={handleChange} required  style={{border: '.1rem solid #ddd', borderRadius: '4px', padding: '10px'}}/ >
              <label htmlFor="subject">Summary</label>
              <textarea id="subject" placeholder="write your today's work report here ..." name="subject" value={formData.subject} onChange={handleChange} required style={{border: '.1rem solid #ddd', borderRadius: '4px', padding: '10px',height: '100px'}}></textarea>
              <button type="submit" className={Cstyle.submitBtn}>Submit Attendance</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Contact;
