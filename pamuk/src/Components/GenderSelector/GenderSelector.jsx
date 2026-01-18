import { useNavigate } from "react-router-dom";
import "./GenderSelector.css";
import women_symbol from '../../Assets/female.svg'
import men_symbol from '../../Assets/male.svg'

const GenderSelector = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSelect = (gender) => {
    onClose();
    navigate(gender === "men" ? "/men" : "/women");
  };

  return (
    <div className="gender-overlay" onClick={onClose}>
      <div className="gender-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Explore Collections</h2>
        <p>Select your preference</p>

        <div className="gender-options">
          <div
            className="gender-card men"
            onClick={() => handleSelect("men")}
          >
            <div>
                <img src ={men_symbol} alt = "men_symbol" width="120px"/>
          </div>
                <div>Men</div>
          </div>

          <div
            className="gender-card women"
            onClick={() => handleSelect("women")}
          >
            <div>
                <img src ={women_symbol} alt = "women_symbol" width="120px"/>
          </div>
                <div>Women</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelector;
