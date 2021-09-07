const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4, validate } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  if (!isUuid(repository.id)) {
    return response.status(404).json({ error: 'Invalid ID' });
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(x => x.id === id);

  if (repositorieIndex === -1) {
    return response.status(400).json({ error: 'Repository Invalid' })
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes,
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(x => x.id === id);

  if (repositorieIndex >= 0) {
    repositories.splice(repositorieIndex, 1);
  } else {
    return response.status(400).json({ error: 'Repository Invalid' })
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(x => x.id === id);

  if (repositorieIndex === -1) {
    return response.status(400).json({ error: 'repositorie not found.' });
  }

Console.log(repositorieIndex);
/*Hello World*/

  repositories[repositorieIndex].likes++;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
