export async function GET() {
  return Response.json({
    index: "index",
    host: "host",
    apikey: "apikey",
  });
}
