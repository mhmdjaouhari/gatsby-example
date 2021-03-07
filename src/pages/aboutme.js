import React, { useState, useEffect } from "react";
import Prismic from "@prismicio/client";

const apiEndpoint = "https://gatsby-mj-sc.cdn.prismic.io/api/v2";
const Client = Prismic.client(apiEndpoint);

const AboutMe = () => {
  const [doc, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.query(
          Prismic.Predicates.at("document.type", "about_me")
        );
        setDocData(response.results[0].data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(doc);
  }, [doc]);

  return !loading ? (
    <div>
      <h1>{doc.title[0].text}</h1>
      {doc.text.map((paragraph, i) => (
        <p key={i}>{paragraph.text}</p>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default AboutMe;
