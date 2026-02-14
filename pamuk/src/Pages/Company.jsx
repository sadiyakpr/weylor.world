import "./CSS/Company.css";
import BrandDesc from "../Components/BrandDesc/BrandDesc";
import { useLocation } from "react-router-dom";
import check_circle2 from '../Assets/check_circle3.svg'

const Company = () => {
  const location = useLocation();

  return (
    <section className="company">
      {location.pathname === "/company" ? (
        <>
          <BrandDesc />
                         
          <div className="company-content">
            <div className="company-block">
                            <img className = 'check-circle' src = {check_circle2} />

              <h2>Who We Are</h2>
              <p>
                We design timeless essentials with a focus on quality, comfort,
                and responsible creation. Every piece is made to last — in style
                and in spirit.
              </p>
            </div>

            <div className="company-block">
            <img className = 'check-circle' src = {check_circle2} />

              <h2>What We Believe</h2>
              <p>
                Fashion should feel good and do good. We believe in slowing
                down, making better choices, and building a brand that respects
                people and the earth.
              </p>
            </div>

            <div className="company-block">
              <img className = 'check-circle' src = {check_circle2} />
              <h2>Our Vision</h2>
              <p>Revolutionizing Fashion — for the earth+.</p>
            </div>
          </div>
        </>
      ) : (
        <div className="company-content">
          <div className="company-block">
                          <img className = 'check-circle' src = {check_circle2} />

            <h2>Who We Are</h2>
            <p>
              We design timeless essentials with a focus on quality, comfort,
              and responsible creation. Every piece is made to last — in style
              and in spirit.
            </p>
          </div>

          <div className="company-block">
            <img className = 'check-circle' src = {check_circle2} />

              <h2>What We Believe</h2>
              <p>
                Fashion should feel good and do good. We believe in slowing
                down, making better choices, and building a brand that respects
                people and the earth.
              </p>
            </div>

            
          <div className="company-block">
                          <img className = 'check-circle' src = {check_circle2} />

            <h2>Our Vision</h2>
            <p>Revolutionizing Fashion — for the earth.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Company;
