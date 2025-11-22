import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SubscriberList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "subscribers"));
        const emailList = snapshot.docs.map(doc => doc.data().email);
        setEmails(emailList);
      } catch {
        setEmails([]);
      }
      setLoading(false);
    };
    fetchSubscribers();
  }, []);

  return (
    <div className="max-w-md mx-auto my-8 bg-white dark:bg-gray-900 rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Newsletter Subscribers</h2>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : emails.length === 0 ? (
        <div className="text-gray-500">No subscribers found.</div>
      ) : (
        <ul className="list-disc pl-6">
          {emails.map((email, idx) => (
            <li key={idx} className="text-gray-800 dark:text-gray-100">{email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriberList;
