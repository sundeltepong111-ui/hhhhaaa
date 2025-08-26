const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, egg, ram, cpu, disk } = req.body;

  try {
    const response = await axios.post(
      "https://keabisanide.sallserver.web.id/api/application/servers",
      {
        name: name,
        user: 1, // ID user, ganti sesuai kebutuhan
        egg: egg,
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: "npm start",
        environment: {
          STARTUP_CMD: "npm start"
        },
        limits: {
          memory: ram,
          cpu: cpu,
          disk: disk,
          swap: 0,
          io: 500
        },
        feature_limits: {
          databases: 2,
          backups: 1
        },
        allocation: {
          default: 1
        }
      },
      {
        headers: {
          Authorization: `Bearer ptla_YjgMD7WzieYTXHRqiksY7JOjyTUOtNsQS8rqatorgku`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({
      error: err.response?.data || err.message
    });
  }
};