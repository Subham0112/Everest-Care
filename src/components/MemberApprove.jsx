// MemberApprove.jsx
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFilter, FaSearch, FaEdit } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import { FaCheck } from 'react-icons/fa';

export default function MemberApprove() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const itemsPerPage = 10;

  // Sample data - replace with your actual data
  const [members, setMembers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      ssn: '***-**-1234',
      phone: '+1 (555) 123-4567',
      status: 'pending'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      gender: 'Female',
      ssn: '***-**-5678',
      phone: '+1 (555) 234-5678',
      status: 'pending'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.j@example.com',
      gender: 'Male',
      ssn: '***-**-9012',
      phone: '+1 (555) 345-6789',
      status: 'pending'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      gender: 'Female',
      ssn: '***-**-3456',
      phone: '+1 (555) 456-7890',
      status: 'pending'
    },
    {
      id: 5,
      firstName: 'Robert',
      lastName: 'Wilson',
      email: 'robert.w@example.com',
      gender: 'Male',
      ssn: '***-**-7890',
      phone: '+1 (555) 567-8901',
      status: 'pending'
    },
    {
      id: 6,
      firstName: 'Sarah',
      lastName: 'Brown',
      email: 'sarah.brown@example.com',
      gender: 'Female',
      ssn: '***-**-2345',
      phone: '+1 (555) 678-9012',
      status: 'pending'
    },
    {
      id: 7,
      firstName: 'David',
      lastName: 'Martinez',
      email: 'david.m@example.com',
      gender: 'Male',
      ssn: '***-**-6789',
      phone: '+1 (555) 789-0123',
      status: 'pending'
    },
    {
      id: 8,
      firstName: 'Lisa',
      lastName: 'Anderson',
      email: 'lisa.anderson@example.com',
      gender: 'Female',
      ssn: '***-**-0123',
      phone: '+1 (555) 890-1234',
      status: 'pending'
    }
  ]);

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleApprove = (id) => {
    const updatedMembers = members.map(member => {
      if (member.id === id) {
        return { ...member, status: 'approved' };
      }
      return member;
    });
    setMembers(updatedMembers);
    handleCloseModal();
    // Add your approval logic here
  };

  const handleReject = (id) => {
    const updatedMembers = members.map(member => {
      if (member.id === id) {
        return { ...member, status: 'rejected' };
      }
      return member;
    });
    setMembers(updatedMembers);
    handleCloseModal();
  };

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  return (
    <div className="member-approval-container">
      <div className="container-fluid px-4 py-4">
        {/* Header */}
        <div className="card shadow-sm mb-4 header-card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="page-title mb-2">Member Approval</h1>
                <p className="page-subtitle mb-0">Review and approve pending member applications</p>
              </div>
              <div className="col-md-4 text-md-end">
                <span className="badge pending-badge">
                  {members.filter(member => member.status === 'pending').length} Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="search-wrapper">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0 member-table">
              <thead className="table-header">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>SSN</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentMembers.length > 0 ? (
                  currentMembers.map((member) => (
                    <tr key={member.id} className="table-row">
                      <td className="fw-semibold">{member.firstName}</td>
                      <td className="fw-semibold">{member.lastName}</td>
                      <td className="text-muted">{member.email}</td>
                      <td>
                        <span className="badge gender-badge">{member.gender}</span>
                      </td>
                      <td className="font-monospace text-muted">{member.ssn}</td>
                      <td className="text-muted">{member.phone}</td>
                      <td>
                        <span className={`badge ${
                          member.status === 'approved' ? 'bg-success' : 
                          member.status === 'rejected' ? 'bg-danger' : 
                          'bg-warning text-dark'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={() => handleOpenModal(member)}
                            className="btn btn-primary btn-sm edit-icon-btn"
                            title="View Details"
                          >
                            <FaEdit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="empty-state">
                        <FaSearch size={48} className="text-muted mb-3" />
                        <h5 className="text-muted">No members found</h5>
                        <p className="text-muted small">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredMembers.length > 0 && (
            <div className="card-footer bg-light">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="mb-0 text-muted small">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredMembers.length)} of {filteredMembers.length} entries
                  </p>
                </div>
                <div className="col-md-6">
                  <nav>
                    <ul className="pagination justify-content-md-end mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <FaChevronLeft size={16} />
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <FaChevronRight size={16} />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedMember && (
        <>
          <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Member Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="member-details">
                    <div className="detail-row mb-3">
                      <label className="detail-label">Full Name:</label>
                      <p className="detail-value">{selectedMember.firstName} {selectedMember.lastName}</p>
                    </div>
                    <div className="detail-row mb-3">
                      <label className="detail-label">Gender:</label>
                      <p className="detail-value">
                        <span className="badge gender-badge">{selectedMember.gender}</span>
                      </p>
                    </div>
                    <div className="detail-row mb-3">
                      <label className="detail-label">SSN:</label>
                      <p className="detail-value font-monospace">{selectedMember.ssn}</p>
                    </div>
                    <div className="detail-row mb-3">
                      <label className="detail-label">Email:</label>
                      <p className="detail-value">{selectedMember.email}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success action-btn approve-btn"
                    onClick={() => handleApprove(selectedMember.id)}
                    disabled={selectedMember.status !== 'pending'}
                  >
                    <FaCheck size={16} className="me-2" />
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger action-btn reject-btn"
                    onClick={() => handleReject(selectedMember.id)}
                    disabled={selectedMember.status !== 'pending'}
                  >
                    <ImCross size={16} className="me-2" />
                    Reject
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}