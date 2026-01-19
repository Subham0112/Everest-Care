import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../assets/css/policy.css'
import policyIcon from '../assets/img/policy=pic.png';
import policyIcon2 from '../assets/img/policy-img2.png';


const Policy = () => {
  const agencies = [
    {
      id: 1,
      title: 'The Bureau of Equal Opportunity',
      address: 'P.O. Box 2675',
      address2: 'Room 223 Health and Welfare Building',
      city: 'Harrisburg, PA 17105-2675',
      phone: '(717) 787-1127 (VOICE)',
      fax: '(717) 772-4366 412-881-7125',
      tty: 'TTY: 1-800-654-5484'
    },
    {
      id: 2,
      title: 'The Pennsylvania Human Relations Commission',
      address: 'PA Human Relations Commission',
      address2: '301 Chestnut Street, Suite 300',
      city: 'Harrisburg, PA 17101-1702',
      phone: '(717) 787-4410',
      fax: '(717) 787-4087 TTY users only',
      email: 'phrc@state.pa.us',
      web: 'www.phrc.state.pa.us',
      website: 'https://www.phrc.pa.gov/File-A-Complaint/ComplaintForms/Pages/default.aspx'
    },
    {
      id: 3,
      title: 'The Pennsylvania Department of Health, Division of Home Health',
      address: '555 Walnut Street, 7th Floor, Suite 701',
      city: 'Harrisburg PA 17101',
      phone: 'Phone: 717-783-1379',
      fax: 'Fax: 717-772-0232',
      hotline: 'Complaint Hotline: 1-800-254-5164',
      website2: 'http://apps.health.pa.gov/default.aspx'
    }
  ];

  return (
    <div className='policy-page'>
      <Navbar />
      <div className='policy-content'>
        <div className='container-fluid policy-header d-flex justify-content-center align-items-center'>
          <div className="policy-title d-flex">
            <img src={policyIcon} alt="Policy Icon" className='mb-3 policy-icon' style={{width: '80px', height: '80px'}}/>  
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
              <h3 className=''>Everest Home Care</h3>
              <h1 className=''>Non-Descrimination Policy</h1>
            </div>
          </div>
        </div>

        <div className='container policy-body mt-3 px-4'>
          <div className='py-2'>
            <h2>Introduction</h2>
          </div>
          <div className='py-2'>
            Everest Home Care is an equal opportunity company and it does not exclude, deny benefits to, orotherwise discriminate against any person on the grounds of race, color, or national origin or on the basisof disability , age or sexual orientation, in admission to, participation in or receipt of the services andbenefits of any of its programs and activities, making referrals for services whether carried out by thisAgency directly or through a contractor of any other entity with whom the Agency arranges to carry outits programs and activities.
          </div>
          <div className='py-2'>
           Everest Home Care is also an equal opportunity employer, and it doesn't discriminate against any personon the basis of race, color, national origin, age, sexual orientation, or disability. All employment actionsincluding recruitment, hiring, training, placement, upgrading, promotion, demotions, transfers, layoffs,terminations will be taken based on merit.
          </div>
          <div className='py-2'>
            This statement is in accordance with the provisions of Title VI of the Civil Rights Act of 1964, Section504 of the Rehabilitation Act of 1973, the Age Discrimination Act of 1975, and Regulations of the U.S.Department of Health and Human Services issued pursuant to the Acts, Title 45 Code of federalRegulations Part 80, 84, 91. (Other Federal Laws and Regulations provide similar protection againstdiscrimination on grounds of sex and creed.)
          </div>

          <div className='py-2'>
            <h3>AMERICANS WITH DISABILITIES ACT</h3>
          </div>
          <div className='py-2'>
            Our Company is also committed to follow the Americans with Disabilities Act as it relates to providingreasonable accommodations to consumers and employees, where appropriate. We ask you to notify us ofyour disability and we will take every reasonable measure to make sure your needs are accommodated,and you are not discriminated in any way, unless making such an accommodation puts undue hardship on the Agency.
          </div>
          <div className='py-4'>
            In case of questions concerning this policy, or in the event of a desire to file a complaint alleging violations of the above, please contact:
          </div>
          <div className='pb-4'>________, CEO EVEREST HOME CARE</div>
        </div>

        <div className='container policy-contact mt-3 px-4 pb-5'>
          <div className='py-3 text-center'>
            <p className='h5 bg-secondary bg-opacity-25 d-inline-block px-4 py-3 rounded shadow-sm'>
              Complaints of discrimination may also be made to the following agencies:
            </p>
          </div>

          <div className='row g-4 mt-2'>
            {agencies.map((agency) => (
              <div key={agency.id} className='col-12 col-md-6 col-lg-4'>
                <div className='card h-100 shadow-lg border-0 hover-card' style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  borderLeft: '4px solid #0d6efd',
                  transition: 'all 0.3s ease'
                }}>
                  <div className='card-body p-4'>
                    <div className='d-flex align-items-start mb-4'>
                      <h5 className='card-title fw-bold text-dark mb-0' style={{lineHeight: '1.3'}}>
                        {agency.title}
                      </h5>
                    </div>
                    
                    <div className='contact-info' style={{fontSize: '0.9rem'}}>
                      <div className='d-flex align-items-start mb-3 p-2 rounded' style={{background: '#f8f9fa'}}>
                        <i className='bi bi-geo-alt-fill me-2 mt-1' style={{color: '#0d6efd', fontSize: '1.1rem'}}></i>
                        <div className='text-muted'>
                          <p className='mb-0'>{agency.address}</p>
                          {agency.address2 && <p className='mb-0'>{agency.address2}</p>}
                          <p className='mb-0 fw-semibold'>{agency.city}</p>
                        </div>
                      </div>
                      
                      <div className='d-flex align-items-center mb-2 p-2 rounded' style={{background: '#f8f9fa'}}>
                        <i className='bi bi-telephone-fill me-2' style={{color: '#0d6efd', fontSize: '1rem'}}></i>
                        <span className='text-muted'>{agency.phone}</span>
                      </div>
                      
                      {agency.fax && (
                        <div className='d-flex align-items-center mb-2 p-2 rounded' style={{background: '#f8f9fa'}}>
                          <i className='bi bi-printer-fill me-2' style={{color: '#0d6efd', fontSize: '1rem'}}></i>
                          <span className='text-muted'>{agency.fax}</span>
                        </div>
                      )}
                      
                      {agency.tty && (
                        <div className='d-flex align-items-center mb-2 p-2 rounded' style={{background: '#f8f9fa'}}>
                          <i className='bi bi-phone-fill me-2' style={{color: '#0d6efd', fontSize: '1rem'}}></i>
                          <span className='text-muted'>{agency.tty}</span>
                        </div>
                      )}
                      
                      {agency.hotline && (
                        <div className='d-flex align-items-center mb-2 p-2 rounded' style={{background: '#f8f9fa'}}>
                          <i className='bi bi-headset me-2' style={{color: '#0d6efd', fontSize: '1rem'}}></i>
                          <span className='text-muted'>{agency.hotline}</span>
                        </div>
                      )}
                      
                      {agency.email && (
                        <div className='d-flex align-items-center mb-2 p-2 rounded' style={{background: '#f8f9fa'}}>
                          <i className='bi bi-envelope-fill me-2' style={{color: '#0d6efd', fontSize: '1rem'}}></i>
                          <span className='text-muted'>{agency.email}</span>
                        </div>
                      )}
                      
                      {agency.web && (
                        <div className='d-flex align-items-center mb-3 p-2 rounded' style={{background: '#f8f9fa'}}>
                          <i className='bi bi-globe me-2' style={{color: '#0d6efd', fontSize: '1rem'}}></i>
                          <span className='text-primary fw-semibold'>{agency.web}</span>
                        </div>
                      )}
                      
                      {/* {agency.website && (
                        <a 
                          href={agency.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='btn btn-primary w-100 mt-2'
                          style={{
                            background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
                            border: 'none',
                            padding: '10px',
                            fontWeight: '600',
                            boxShadow: '0 4px 10px rgba(13, 110, 253, 0.3)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className='bi bi-file-earmark-text me-2'></i>
                          File a Complaint
                        </a>
                      )} */}
                      
              
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Policy