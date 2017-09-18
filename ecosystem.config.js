module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "issue.pnpsw.com",
      cwd: "/root/project/issue/issueWeb/dist",
      args: "-p 9094 -d false",
      script: "http-server"
    }
  ],
};
