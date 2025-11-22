import React from "react";

const ContactForm = () => (
  <section className="max-w-2xl mx-auto px-4 md:px-8 py-12" id="contact">
    <h3 className="text-2xl font-bold text-green-800 mb-6">Contact Us</h3>
    <form className="bg-white rounded-xl shadow p-8 space-y-4">
      <div className="flex gap-4 flex-col md:flex-row">
        <input className="flex-1 px-4 py-2 rounded border border-green-200" placeholder="Name" required />
        <input className="flex-1 px-4 py-2 rounded border border-green-200" placeholder="Email" type="email" required />
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <input className="flex-1 px-4 py-2 rounded border border-green-200" placeholder="Phone" />
        <input className="flex-1 px-4 py-2 rounded border border-green-200" placeholder="Company/Role" />
      </div>
      <select className="w-full px-4 py-2 rounded border border-green-200" required>
        <option value="">Inquiry Type</option>
        <option>General</option>
        <option>Bulk Order</option>
        <option>Partnership</option>
        <option>Support</option>
      </select>
      <textarea className="w-full px-4 py-2 rounded border border-green-200" rows={4} placeholder="Your message..." />
      <button className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition" type="submit">
        Submit
      </button>
    </form>
  </section>
);

export default ContactForm;
