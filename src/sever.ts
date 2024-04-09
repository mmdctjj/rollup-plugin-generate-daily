import * as http from "http";

const renderHtml = (data) => {
  return;
};

const createServer = ({ port = 3000, format, userName }) => {
  // 创建 HTTP 服务器
  const server = http.createServer((req, res) => {
    const data = { format, userName };

    const html = renderHtml(data);
    res.statusCode = 200;

    res.setHeader("Content-Type", "text/html");
    res.end(html);
  });

  // 监听指定端口
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

export default createServer;
