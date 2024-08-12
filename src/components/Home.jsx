import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => {
  return (
    <Link to={"/xyz"} style={{ color: "black" }} className="image">
      <img className="image" src="https://live.staticflickr.com/65535/53726399750_65be5b34fa_o.jpg"></img>
    </Link>
  );
};

export default Home;
