import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;

public class Test {
    public static void main(String[] args) throws IOException {
        int port = 8080; // Port on which the server will listen
        System.out.println("Starting server on port " + port);

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", exchange -> {
            String response = "Hello, Kubernetes!";
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        });

        server.setExecutor(null); // creates a default executor
        server.start();
        System.out.println("Server is running at http://localhost:" + port);
    }
}
