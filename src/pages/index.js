import { useEffect } from "react";
import { navigate } from "gatsby";

const IndexPage = () => {
  useEffect(() => {
    navigate("/aboutme/");
  }, []);
  return null;
};

export default IndexPage;
