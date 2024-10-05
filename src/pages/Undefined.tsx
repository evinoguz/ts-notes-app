import { Link } from "react-router-dom";

const Undefined = () => {
  return (
    <div className="container py-5 mx-auto">
      <h1>404</h1>
      <p>Sayfa bulunamadı.</p>
      <div>
        Anasayfaya gitmek için <Link to="/">burayı</Link> tıklayınız.
      </div>
    </div>
  );
};

export default Undefined;
