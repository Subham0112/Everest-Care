import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaEye
} from "react-icons/fa";
import TrainingForm from "./TrainingForm";

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // =========================
  // FETCH APPROVED MEMBERS
  // =========================
  const fetchApprovedMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://everesthealth.somee.com/api/Auth/approved-users"
      );
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch approved members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedMembers();
  }, []);

  // =========================
  // MODAL
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
  // SEARCH + PAGINATION
  // =========================
  const filteredMembers = members.filter((m) =>
    `${m.firstName} ${m.lastName} ${m.email} ${m.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  if (loading) {
    return <div className="text-center mt-5">Loading members...</div>;
  }

  return (
    <div className="member-approval-container">
      <div className="container-fluid px-4 py-4">

        {/* HEADER */}
        <div className="card shadow-sm mb-4 header-card">
          <div className="card-body">
            <h1 className="page-title mb-2">Approved Members</h1>
            <p className="page-subtitle mb-0">
              List of all approved members
            </p>
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
                  <th>SSN</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="text-center">Training Detail</th>
                </tr>
              </thead>
              <tbody>
                {currentMembers.length > 0 ? (
                  currentMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.firstName}</td>
                      <td>{member.lastName}</td>
                      <td className="font-monospace">{member.ssn}</td>
                      <td>
                        <span className="badge gender-badge">
                          {member.gender}
                        </span>
                      </td>
                      <td>{member.email}</td>
                      <td>{member.phone}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleOpenModal(member)}
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No approved members found
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

      {/* TRAINING DETAIL MODAL */}
      {showModal && selectedMember && (
        <>
          <div className="modal-backdrop  fade show" />
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-xl  modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Training Detail</h5>
                  <button
                    className="btn-close"
                    onClick={handleCloseModal}
                  />
                </div>

                <div className="modal-body">
                  <TrainingForm selectedMember={selectedMember} />
                </div>

                <div className="modal-footer">
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
