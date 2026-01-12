import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaEdit,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export default function MemberApprove() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 10;

  // =========================
  // FETCH PENDING MEMBERS
  // =========================
  const fetchPendingMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://www.everesthealth.somee.com/api/Auth/pending-users"
      );

      if (!response.ok) {
        throw new Error("Failed to load members");
      }

      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError("Unable to fetch pending members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingMembers();
  }, []);

  // =========================
  // MODAL HANDLERS
  // =========================
  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  // =========================
  // APPROVE / REJECT
  // =========================
  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `https://www.everesthealth.somee.com/api/Auth/update-status/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(status),
        }
      );

      fetchPendingMembers();
      handleCloseModal();
    } catch (error) {
      alert("Failed to update user status");
    }
  };

  // =========================
  // SEARCH + PAGINATION
  // =========================
  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName} ${member.email} ${member.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  // =========================
  // RENDER
  // =========================
  if (loading) {
    return <div className="text-center mt-5">Loading members...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="member-approval-container">
      <div className="container-fluid px-4 py-4">
        {/* HEADER */}
        <div className="card shadow-sm mb-4 header-card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="page-title mb-2">Member Approval</h1>
                <p className="page-subtitle mb-0">
                  Review and approve pending member applications
                </p>
              </div>
              <div className="col-md-4 text-md-end">
                <span className="badge pending-badge">
                  {members.length} Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
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
                    <tr key={member.id}>
                      <td>{member.firstName}</td>
                      <td>{member.lastName}</td>
                      <td>{member.email}</td>
                      <td>
                        <span className="badge gender-badge">
                          {member.gender}
                        </span>
                      </td>
                      <td className="font-monospace">{member.ssn}</td>
                      <td>{member.phone}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleOpenModal(member)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No pending members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {filteredMembers.length > 0 && (
            <div className="card-footer bg-light">
              <div className="row align-items-center">
                <div className="col-md-6 small text-muted">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredMembers.length)} of{" "}
                  {filteredMembers.length}
                </div>
                <div className="col-md-6">
                  <ul className="pagination justify-content-end mb-0">
                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                      >
                        <FaChevronLeft /> Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages && "disabled"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(p + 1, totalPages)
                          )
                        }
                      >
                        Next <FaChevronRight />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedMember && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Member Details</h5>
                  <button className="btn-close" onClick={handleCloseModal} />
                </div>

                <div className="modal-body">
                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedMember.firstName}{" "}
                    {selectedMember.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedMember.email}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedMember.gender}
                  </p>
                  <p>
                    <strong>SSN:</strong> {selectedMember.ssn}
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      updateStatus(selectedMember.id, 1)
                    }
                  >
                    <FaCheck className="me-2" /> Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      updateStatus(selectedMember.id, -1)
                    }
                  >
                    <ImCross className="me-2" /> Reject
                  </button>
                  <button
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
