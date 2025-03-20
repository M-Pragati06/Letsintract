import React, { useState } from 'react';

const Enquiry = () => {
  // Dummy data for registered members
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      mobileNumber: '1234567890',
      email: 'john@example.com',
      address: '123 Main St, City, Country',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobileNumber: '0987654321',
      email: 'jane@example.com',
      address: '456 Elm St, Town, Country',
      status: 'In Progress',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      mobileNumber: '5555555555',
      email: 'alice@example.com',
      address: '789 Oak St, Village, Country',
      status: 'Pending',
    },
  ]);

  // Function to handle the "Done" action
  const handleDone = (id) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, status: 'Done' } : member
      )
    );
  };

  return (
    <div
      className='mt-10'
      style={{
        padding: '20px',
        fontFamily: 'Poppins, sans-serif',
        minHeight: '100vh',
      }}
    >
      <h1 className="text-3xl font-bold text-center text-[#640D5F] mb-6" style={{ textShadow: "3px 3px 10px rgba(100, 13, 95, 0.7)" }}
      >
        Registered Members
      </h1>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr className='bg-[#ab19a3] text-white'
            >
              <th style={{ padding: '16px', textAlign: 'center' }}>Name</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Mobile Number</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Email</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Address</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                style={{
                  borderBottom: '1px solid #eee',
                  transition: 'background 0.3s ease',
                  ':hover': {
                    backgroundColor: '#f9f9f9',
                  },
                }}
              >
                <td style={{ padding: '16px', color: '#333' , textAlign: 'center' }}>{member.name}</td>
                <td style={{ padding: '16px', color: '#555' , textAlign: 'center' }}>{member.mobileNumber}</td>
                <td style={{ padding: '16px', color: '#555' , textAlign: 'center' }}>{member.email}</td>
                <td style={{ padding: '16px', color: '#555' , textAlign: 'center' }}>{member.address}</td>
                <td style={{ padding: '16px', color: '#555' , textAlign: 'center' }}>{member.status}</td>
                <td style={{ padding: '16px' }}>
                  {member.status !== 'Done' && (
                    <button
                      onClick={() => handleDone(member.id)}
                      className='ml-8'
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#6c5ce7',
                        color: '#fff',
                        textAlign: 'center',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease',
                        ':hover': {
                          backgroundColor: '#5a4dbf',
                        },
                      }}
                    >
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiry;