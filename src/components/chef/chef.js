import React from 'react';
import './chef.css';
import '../default.css'

const Chefs = () => {
  return (
    <section id="chefs" className="chefs section-bg">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
        <h2 style={{fontSize: '32px', marginBottom: '20px', textAlign: 'center', color: '#ce1212'}}>Đầu Bếp</h2>
          <p className='p custom-font'>Đầu Bếp <span style={{color: '#ce1212'}}>Chuyên Nghiệp</span></p>
        </div>

        <div className="row-chef flex">
          <div className="flex row-chef-member" data-aos="fade-up" data-aos-delay="100">
            <div className="chef-member">
              <div className="member-img">
                <img src="/images/chef/chefs-1.jpg" className="img-fluid" alt="" />
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Walter White</h4>
                <span>Master Chef</span>
                <p>Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut. Ipsum exercitationem iure minima enim corporis et voluptate.</p>
              </div>
            </div>
          </div>

          <div className="flex row-chef-member" data-aos="fade-up" data-aos-delay="200">
            <div className="chef-member">
              <div className="member-img">
                <img src="/images/chef/chefs-2.jpg" className="img-fluid" alt="" />
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Patissier</span>
                <p>Quo esse repellendus quia id. Est eum et accusantium pariatur fugit nihil minima suscipit corporis. Voluptate sed quas reiciendis animi neque sapiente.</p>
              </div>
            </div>
          </div>

          <div className="flex row-chef-member" data-aos="fade-up" data-aos-delay="300">
            <div className="chef-member">
              <div className="member-img">
                <img src="/images/chef/chefs-3.jpg" className="img-fluid" alt="" />
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>William Anderson</h4>
                <span>Cook</span>
                <p>Vero omnis enim consequatur. Voluptas consectetur unde qui molestiae deserunt. Voluptates enim aut architecto porro aspernatur molestiae modi.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Chefs;
