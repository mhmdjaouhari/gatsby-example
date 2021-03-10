import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Prismic from "@prismicio/client";
import Loading from "../components/loading";
import axios from "axios";

import {
  Card,
  CardBlock,
  CardText,
  CardTitle,
  CardSubtitle,
  Badge as _Badge,
} from "@bootstrap-styled/v4";
import styled from "styled-components";

const apiEndpoint = "https://gatsby-mj-sc.cdn.prismic.io/api/v2";
const Client = Prismic.client(apiEndpoint);

const Div = styled.div`
  margin-top: 1rem;
`;

const Badge = styled(_Badge)`
  margin-right: 6px;
`;

const Keywords = styled.div`
  margin-bottom: 16px;
`;
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await Client.query(
          Prismic.Predicates.at("document.type", "project")
        );
        const res2 = await axios.get(
          "https://api.github.com/search/repositories?q=user:mojaouhari"
        );
        setRepos(res2.data.items);
        setProjects(
          res1.results.map(result => ({ ...result.data, id: result.id }))
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <SEO title="Projects" />
      {!loading ? (
        <>
          <Div>
            <h4>Projects</h4>
            {projects.map(project => (
              <Card key={project.id}>
                <CardBlock>
                  <CardTitle>{project.name[0].text}</CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <CardText>{project.description[0].text}</CardText>
                  <Keywords>
                    {project.keywords.map((keyword, i) => (
                      <Badge key={i}>{keyword.text}</Badge>
                    ))}
                  </Keywords>
                  <a href={project.url.url} className="btn btn-primary">
                    Check it out!
                  </a>
                </CardBlock>
              </Card>
            ))}
          </Div>
          <Div>
            <h4>GitHub repositories</h4>
            {repos.map((repo, i) => (
              <Card key={i}>
                <CardBlock>
                  <CardTitle>{repo.name}</CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <CardText>{repo.description}</CardText>
                  <Keywords>
                    <Badge>
                      <b>Main language: </b>
                      {repo.language}
                    </Badge>
                    <Badge>
                      <b>Stars: </b>
                      {repo.stargazers_count}
                    </Badge>
                    <Badge>
                      <b>Forks: </b>
                      {repo.forks_count}
                    </Badge>
                  </Keywords>
                  <a href={repo.html_url} className="btn btn-primary">
                    Check it out!
                  </a>
                </CardBlock>
              </Card>
            ))}
          </Div>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default Projects;
