export async function POST(request: Request) {
    const body = await request.json();
    const { type, data } = body
  
    if (type === 'video.asset.ready') {
     // save to Database
     console.log("data", data);
    } else {
      /* handle other event types */
    }
    return Response.json({ message: 'ok' });
  }